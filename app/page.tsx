"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ExcelToJson } from "@/components/excel-to-json"
import { JsonToExcel } from "@/components/json-to-excel"
import { PdfToExcel } from "@/components/pdf-to-excel"
import { ExcelToPdf } from "@/components/excel-to-pdf"

export default function Home() {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Excel ↔ JSON Converter</h1>

      <Tabs defaultValue="excel-to-json" className="max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="excel-to-json">Excel to JSON</TabsTrigger>
          <TabsTrigger value="json-to-excel">JSON to Excel</TabsTrigger>
          <TabsTrigger value="excel-to-pdf">Excel to PDF</TabsTrigger>
          {/* <TabsTrigger value="pdf-to-excel">PDF to Excel</TabsTrigger> */}
        </TabsList>

        <TabsContent value="excel-to-json">
          <Card>
            <CardHeader>
              <CardTitle>Convert Excel to JSON</CardTitle>
              <CardDescription>Upload an Excel file (.xlsx, .xls) and convert it to JSON format.</CardDescription>
            </CardHeader>
            <CardContent>
              <ExcelToJson />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="json-to-excel">
          <Card>
            <CardHeader>
              <CardTitle>Convert JSON to Excel</CardTitle>
              <CardDescription>Paste your JSON data and convert it to an Excel file.</CardDescription>
            </CardHeader>
            <CardContent>
              <JsonToExcel />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="excel-to-pdf">
          <Card>
            <CardHeader>
              <CardTitle>Convert Excel to PDF</CardTitle>
              <CardDescription>Upload your Excel file and convert it to a PDF file.</CardDescription>
            </CardHeader>
            <CardContent>
              <ExcelToPdf />
            </CardContent>
          </Card>
        </TabsContent>
        {/* <TabsContent value="pdf-to-excel">
          <Card>
            <CardHeader>
              <CardTitle>Convert PDF to Excel</CardTitle>
              <CardDescription>Upload your PDF and convert it to an Excel file.</CardDescription>
            </CardHeader>
            <CardContent>
              <PdfToExcel />
            </CardContent>
          </Card>
        </TabsContent> */}
      </Tabs>
    </div>
  )
}
