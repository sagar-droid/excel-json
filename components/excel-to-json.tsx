"use client"

import type React from "react"

import { useState, useRef } from "react"
import * as XLSX from "xlsx"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { FileUp, Download, Copy } from "lucide-react"
import { toast } from "sonner"

export function ExcelToJson() {
  const [jsonData, setJsonData] = useState<string>("")
  const [fileName, setFileName] = useState<string>("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setFileName(file.name)

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target?.result as ArrayBuffer)
        const workbook = XLSX.read(data, { type: "array" })

        const worksheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[worksheetName]

        const jsonResult = XLSX.utils.sheet_to_json(worksheet)

        const formattedJson = JSON.stringify(jsonResult, null, 2)
        setJsonData(formattedJson)

        toast.success("Excel file loaded successfully", {
          description: `Converted ${jsonResult.length} rows to JSON`,
        })
      } catch (error) {
        console.error("Error parsing Excel file:", error)
        toast.error("Error parsing Excel file", {
          description: "Please make sure the file is a valid Excel document",
        })
      }
    }
    reader.readAsArrayBuffer(file)
  }

  const handleDownload = () => {
    if (!jsonData) return

    const blob = new Blob([jsonData], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = fileName.replace(/\.(xlsx|xls)$/i, ".json") || "data.json"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast.success("JSON file downloaded", {
      description: `Saved as ${a.download}`,
    })
  }

  const handleCopy = () => {
    if (!jsonData) return

    navigator.clipboard.writeText(jsonData)
    toast.success("Copied to clipboard", {
      description: "JSON data has been copied to your clipboard",
    })
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4">
        <div>
          <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept=".xlsx,.xls" className="hidden" />
          <Button onClick={triggerFileInput} className="w-full" variant="outline">
            <FileUp className="mr-2 h-4 w-4" />
            Upload Excel File
          </Button>
          {fileName && <p className="mt-2 text-sm text-muted-foreground">Selected file: {fileName}</p>}
        </div>

        <Textarea
          placeholder="JSON output will appear here..."
          value={jsonData}
          onChange={(e) => setJsonData(e.target.value)}
          className="min-h-[300px] font-mono text-sm"
        />

        <div className="flex gap-2">
          <Button onClick={handleDownload} disabled={!jsonData} className="flex-1">
            <Download className="mr-2 h-4 w-4" />
            Download JSON
          </Button>
          <Button onClick={handleCopy} variant="outline" disabled={!jsonData} className="flex-1">
            <Copy className="mr-2 h-4 w-4" />
            Copy to Clipboard
          </Button>
        </div>
      </div>
    </div>
  )
}
