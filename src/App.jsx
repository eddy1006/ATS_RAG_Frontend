import { useEffect, useState } from "react"
import { ScanSearch } from "lucide-react"
import { UploadState } from "@/components/upload-state"
import { ProcessingState } from "@/components/processing-state"
import { ResultsState } from "@/components/results-state"

export default function App() {
  const [state, setState] = useState("UPLOAD")
  // Now stores an object containing the file and all search parameters
  const [searchData, setSearchData] = useState(null)

  useEffect(() => {
    if (state !== "PROCESSING") return
    const timeout = setTimeout(() => setState("RESULTS"), 3000)
    return () => clearTimeout(timeout)
  }, [state])

  return (
    <div className="flex min-h-svh flex-col">
      <header className="border-b border-border">
        <div className="mx-auto flex w-full max-w-2xl items-center gap-2 px-6 py-4">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <ScanSearch className="h-4 w-4" />
          </span>
          <span className="text-sm font-semibold tracking-tight">
            Resume Matcher
          </span>
        </div>
      </header>

      <main className="flex-1">
        {state === "UPLOAD" && (
          <UploadState 
            onScan={(data) => {
              setSearchData(data)      // Save the bundle
              setState("PROCESSING")   // Move to the next screen
            }} 
          />
        )}
        
        {/* Pass the bundled data object into the processing component */}
        {state === "PROCESSING" && <ProcessingState searchData={searchData} />}
        
        {state === "RESULTS" && (
          <ResultsState onReset={() => setState("UPLOAD")} />
        )}
      </main>
    </div>
  )
}