"use client"

import React, { useRef, useState } from "react"
import * as XLSX from "xlsx"
import { Button } from "@/components/ui/button"
import { FileUp, Download } from "lucide-react"
import { toast } from "sonner"
import * as pdfjsLib from "pdfjs-dist"

// Configure PDF.js worker
if (typeof window !== "undefined" && pdfjsLib.GlobalWorkerOptions) {
  // Using CDN for the worker file instead of direct import
  pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`
}

export function PdfToExcel() {
  const [fileName, setFileName] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setFileName(file.name)
    setLoading(true)
    setProgress(0)

    try {
      const arrayBuffer = await file.arrayBuffer()
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
      let allText: string[] = []
      const totalPages = pdf.numPages

      for (let i = 1; i <= totalPages; i++) {
        const page = await pdf.getPage(i)
        const content = await page.getTextContent()
        const pageText = content.items.map((item: any) => item.str).join(" ")
        allText.push(pageText)
        setProgress(Math.round((i / totalPages) * 100))
      }

      // Process text into structured data
      const rows = processTextToRows(allText.join("\n"))
      
      // Create Excel file
      const ws = XLSX.utils.aoa_to_sheet(rows)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1")
      const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" })

      // Download the file
      const blob = new Blob([wbout], { type: "application/octet-stream" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = file.name.replace(/\.pdf$/i, ".xlsx")
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      toast.success("Excel file downloaded", { description: `Saved as ${a.download}` })
    } catch (err) {
      console.error(err)
      toast.error("Failed to extract data from PDF", {
        description: "Please try a different PDF file or check file format"
      })
    } finally {
      setLoading(false)
      setProgress(0)
    }
  }

  // Improved text processing function
  const processTextToRows = (text: string): string[][] => {
    // Split by lines first
    const lines = text.split("\n").filter(line => line.trim() !== "")
    
    // Try to detect table structure based on spacing patterns
    return lines.map(line => {
      // Split by multiple spaces, tabs, or other common table delimiters
      return line.split(/\s{2,}|\t|(?:\s*\|\s*)/).filter(cell => cell.trim() !== "")
    })
  }

  return (
    <div className="space-y-4">
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileUpload} 
        accept=".pdf" 
        className="hidden" 
      />
      <Button 
        onClick={() => fileInputRef.current?.click()} 
        className="w-full" 
        variant="outline" 
        disabled={loading}
      >
        <FileUp className="mr-2 h-4 w-4" />
        {loading ? "Processing..." : "Upload PDF File"}
      </Button>
      
      {loading && (
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
      
      {fileName && (
        <p className="mt-2 text-sm text-muted-foreground">
          Selected file: {fileName}
        </p>
      )}
    </div>
  )
}