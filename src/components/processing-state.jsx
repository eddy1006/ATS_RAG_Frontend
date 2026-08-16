import { useEffect, useState, useRef } from "react"
import { Loader2, AlertCircle } from "lucide-react"

const STEPS = [
  "Parsing resume...",
  "Scraping live jobs...",
  "AI evaluating matches...",
  "Finalizing scores..."
]

export function ProcessingState({ searchData, onComplete }) {
  const [stepIndex, setStepIndex] = useState(0)
  const [error, setError] = useState(null)
  
  const isPolling = useRef(false)
  const hasStarted = useRef(false)

  // 1. UI Animation Loop
  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % STEPS.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  // 2. Network Polling Logic
  useEffect(() => {
    if (!searchData || !searchData.file) return;
    if (hasStarted.current) return;
    
    hasStarted.current = true;
    let pollInterval;

    const startProcess = async () => {
      try {
        const formData = new FormData()
        formData.append("file", searchData.file)
        
        if (searchData.location) formData.append("location", searchData.location)
        if (searchData.jobType) formData.append("jobType", searchData.jobType)
        if (searchData.experienceLevel) formData.append("experienceLevel", searchData.experienceLevel)
        if (searchData.datePosted) formData.append("datePosted", searchData.datePosted)
        if (searchData.workplaceType) formData.append("workplaceType", searchData.workplaceType)

        // 1. Initial POST request
        const postRes = await fetch("http://localhost:8080/api/resume/upload", {
          method: "POST",
          body: formData,
        })

        if (!postRes.ok) throw new Error(`Upload failed with status: ${postRes.status}`)
        
        const postData = await postRes.json()
        const taskId = postData.taskId

        if (!taskId) throw new Error("No taskId returned from backend.")

        // 2. Start polling the GET endpoint
        pollInterval = setInterval(async () => {
          if (isPolling.current) return;
          isPolling.current = true;

          try {
            const statusRes = await fetch(`http://localhost:8080/api/resume/status/${taskId}`)
            
            if (!statusRes.ok) {
              if (statusRes.status === 404) {
                throw new Error("Task not found or failed on the backend.");
              }
              console.warn("Polling warning:", statusRes.status);
              isPolling.current = false;
              return;
            }

            const statusData = await statusRes.json()

            // If status is SUCCESS (or anything other than PROCESSING)
            if (statusData.status !== "PROCESSING") {
              clearInterval(pollInterval)
              
              // We now know statusData.result is a clean array based on your backend update
              const finalPayload = statusData.result || []
              onComplete(finalPayload)
            }
          } catch (err) {
            console.error("Polling error:", err)
            clearInterval(pollInterval)
            setError(err.message)
          } finally {
            isPolling.current = false;
          }
        }, 5000)

      } catch (err) {
        console.error("Initialization error:", err)
        setError(err.message)
      }
    }

    startProcess()

    return () => {
      if (pollInterval) clearInterval(pollInterval)
    }
  }, [searchData, onComplete])

  if (error) {
    return (
      <section className="mx-auto flex min-h-[60vh] w-full max-w-md flex-col items-center justify-center px-6 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 text-destructive mb-6">
          <AlertCircle className="h-8 w-8" />
        </div>
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Something went wrong
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-6 text-sm font-medium text-primary hover:underline"
        >
          Start over
        </button>
      </section>
    )
  }

  return (
    <section className="mx-auto flex min-h-[60vh] w-full max-w-md flex-col items-center justify-center px-6 text-center">
      <span className="relative flex h-16 w-16 items-center justify-center">
        <span className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-primary">
          <Loader2 className="h-7 w-7 animate-spin" />
        </span>
      </span>
      <h2 className="mt-8 text-xl font-semibold tracking-tight">
        Matching you to live roles
      </h2>
      <p
        key={stepIndex}
        className="mt-2 animate-in fade-in text-sm text-muted-foreground"
      >
        {STEPS[stepIndex]}
      </p>
      <div className="mt-8 flex w-full items-center gap-2">
        {STEPS.map((_, i) => (
          <span
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${
              i <= stepIndex ? "bg-primary" : "bg-border"
            }`}
          />
        ))}
      </div>
    </section>
  )
}