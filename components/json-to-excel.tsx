"use client"

import type React from "react"

import { useState } from "react"
import * as XLSX from "xlsx"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Download, FileUp } from "lucide-react"
import { toast } from "sonner"

export function JsonToExcel() {
  const [jsonInput, setJsonInput] = useState<string>("")
  const [isValidJson, setIsValidJson] = useState<boolean>(true)

  const validateJson = (input: string): boolean => {
    if (!input.trim()) return false

    try {
      JSON.parse(input)
      return true
    } catch (e) {
      return false
    }
  }

  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value
    setJsonInput(input)
    setIsValidJson(validateJson(input))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string
        const parsedJson = JSON.parse(content)
        const formattedJson = JSON.stringify(parsedJson, null, 2)
        setJsonInput(formattedJson)
        setIsValidJson(true)

        toast.success("JSON file loaded successfully", {
          description: "You can now convert it to Excel",
        })
      } catch (error) {
        console.error("Error parsing JSON file:", error)
        setIsValidJson(false)
        toast.error("Invalid JSON file", {
          description: "The file does not contain valid JSON data",
        })
      }
    }
    reader.readAsText(file)
  }

  const convertToExcel = () => {
    if (!jsonInput || !isValidJson) return

    try {
      // Parse JSON
      const jsonData = JSON.parse(jsonInput)

      // Check if it's an array
      if (!Array.isArray(jsonData)) {
        // If it's an object, wrap it in an array
        const dataArray = [jsonData]
        handleExcelConversion(dataArray)
      } else {
        handleExcelConversion(jsonData)
      }
    } catch (error) {
      console.error("Error converting to Excel:", error)
      toast.error("Conversion failed", {
        description: "Error converting JSON to Excel",
      })
    }
  }

  const handleExcelConversion = (data: any[]) => {
    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(data)

    // Create workbook
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data")

    // Generate Excel file
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" })

    // Save file
    const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "converted-data.xlsx"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast.success("Excel file created", {
      description: "Your JSON data has been converted to Excel",
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <input type="file" id="json-file" onChange={handleFileUpload} accept=".json" className="hidden" />
          <Button onClick={() => document.getElementById("json-file")?.click()} variant="outline" className="flex-1">
            <FileUp className="mr-2 h-4 w-4" />
            Upload JSON File
          </Button>
        </div>

        <Textarea
          placeholder="Paste your JSON data here..."
          value={jsonInput}
          onChange={handleJsonChange}
          className={`min-h-[300px] font-mono text-sm ${!isValidJson && jsonInput ? "border-red-500" : ""}`}
        />

        {!isValidJson && jsonInput && <p className="text-red-500 text-sm">Invalid JSON format</p>}

        <Button onClick={convertToExcel} disabled={!isValidJson || !jsonInput}>
          <Download className="mr-2 h-4 w-4" />
          Convert to Excel
        </Button>
      </div>
    </div>
  )
}
