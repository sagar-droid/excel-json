# Excel ↔ JSON Converter

A simple web application to convert Excel files (`.xlsx`, `.xls`) to JSON and JSON data to Excel, built with Next.js, React, and Tailwind CSS.

## Features

- **Excel to JSON:** Upload an Excel file and instantly convert its contents to JSON.
- **JSON to Excel:** Paste or upload JSON data and download it as an Excel file.
- **Copy & Download:** Easily copy JSON output to clipboard or download as a file.
- **User-friendly UI:** Responsive, accessible, and styled with Tailwind CSS.
- **Notifications:** Success and error messages powered by [sonner](https://sonner.emilkowal.ski/).
- **Dark mode support.**

## Tech Stack

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [xlsx](https://github.com/SheetJS/sheetjs) (Excel parsing)
- [Radix UI](https://www.radix-ui.com/) (Tabs, Slot)
- [sonner](https://sonner.emilkowal.ski/) (Toasts)
- [lucide-react](https://lucide.dev/) (Icons)

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

1. **Clone the repository:**
   git clone https://github.com/your-username/excel-json.git
   cd excel-json

2. **Install dependencies:**
    npm install

3. **Install dependencies:**
    npm run dev

4. Open http://localhost:3000 in your browser.

5. **Build for Production:**
    - npm run build
    - npm start

**Usage**
**Excel to JSON:**

- Click "Upload Excel File" and select a .xlsx or .xls file.
- View the converted JSON in the textarea.
- Download the JSON or copy it to clipboard.

**JSON to Excel:**

- Paste your JSON data or upload a .json file.
- Click "Convert to Excel" to download the Excel file.

**Project Structure**
- app/ — Next.js app directory (pages, layout, global styles)
- components/ — React components for conversion and UI
- lib/ — Utility functions
- public/ — Static assets (SVGs, icons)

**Customization**
- Tailwind CSS is configured in app/globals.css and postcss.config.mjs.
- UI components use shadcn/ui conventions.