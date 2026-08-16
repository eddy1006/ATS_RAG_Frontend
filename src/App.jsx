import { useState } from "react"
import { ScanSearch } from "lucide-react"
import { UploadState } from "@/components/upload-state"
import { ProcessingState } from "@/components/processing-state"
import { ResultsState } from "@/components/results-state"

export default function App() {
  const [state, setState] = useState("UPLOAD")
  const [searchData, setSearchData] = useState(null)
  
  // New state to hold the final JSON from the backend
  const [jobResults, setJobResults] = useState(null)

  // Triggered when the polling loop detects a non-PROCESSING state
  function handleProcessComplete(resultPayload) {
    setJobResults(resultPayload)
    setState("RESULTS")
  }

  function handleReset() {
    setSearchData(null)
    setJobResults(null)
    setState("UPLOAD")
  }

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
              setSearchData(data)
              setState("PROCESSING")
            }} 
          />
        )}
        
        {state === "PROCESSING" && (
          <ProcessingState 
            searchData={searchData} 
            onComplete={handleProcessComplete} 
          />
        )}
        
        {state === "RESULTS" && (
          // We pass the payload here so ResultsState can adapt to it later
          <ResultsState payload={jobResults} onReset={handleReset} />
        )}
      </main>
    </div>
  )
}