"use client"

import React, { useRef, useState } from "react"
import * as XLSX from "xlsx"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import { Button } from "@/components/ui/button"
import { FileUp } from "lucide-react"
import { toast } from "sonner"

export function ExcelToPdf() {
  const [fileName, setFileName] = useState("")
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setFileName(file.name)
    setLoading(true)

    try {
      const data = await file.arrayBuffer()
      const workbook = XLSX.read(data, { type: "array" })
      const worksheet = workbook.Sheets[workbook.SheetNames[0]]
      const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][]

      const doc = new jsPDF()
      autoTable(doc, { body: rows })
      doc.save(file.name.replace(/\.(xlsx|xls)$/i, ".pdf"))

      toast.success("PDF file downloaded", { description: "Excel converted to PDF" })
    } catch (err) {
      toast.error("Failed to convert Excel to PDF", { description: "Check file format." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept=".xlsx,.xls"
        className="hidden"
      />
      <Button
        onClick={() => fileInputRef.current?.click()}
        className="w-full"
        variant="outline"
        disabled={loading}
      >
        <FileUp className="mr-2 h-4 w-4" />
        {loading ? "Processing..." : "Upload Excel File"}
      </Button>
      {fileName && (
        <p className="mt-2 text-sm text-muted-foreground">
          Selected file: {fileName}
        </p>
      )}
    </div>
  )
}