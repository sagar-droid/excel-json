"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ExcelToJson } from "@/components/excel-to-json"
import { JsonToExcel } from "@/components/json-to-excel"

export default function Home() {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Excel ↔ JSON Converter</h1>

      <Tabs defaultValue="excel-to-json" className="max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="excel-to-json">Excel to JSON</TabsTrigger>
          <TabsTrigger value="json-to-excel">JSON to Excel</TabsTrigger>
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
      </Tabs>
    </div>
  )
}
