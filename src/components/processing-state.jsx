import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"

const STEPS = [
  "Parsing resume...",
  "Scraping live jobs...",
  "AI evaluating matches...",
]

export function ProcessingState({ searchData }) {
  const [stepIndex, setStepIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % STEPS.length)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Safety check in case the user forces a refresh
    if (!searchData || !searchData.file) return;

    const uploadResume = async () => {
      try {
        const formData = new FormData()
        
        // Append the file
        formData.append("file", searchData.file)
        
        // Append all the search parameters
        formData.append("location", searchData.location)
        formData.append("jobType", searchData.jobType)
        formData.append("experienceLevel", searchData.experienceLevel)
        formData.append("datePosted", searchData.datePosted)
        formData.append("workplaceType", searchData.workplaceType)

        const response = await fetch("http://localhost:8080/api/resume/upload", {
          method: "POST",
          body: formData,
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        console.log("Backend response:", data)
      } catch (error) {
        console.error("Failed to upload resume and params:", error)
      }
    }

    uploadResume()
  }, [searchData])

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