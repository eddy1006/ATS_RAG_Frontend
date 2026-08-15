import { useRef, useState } from "react"
import { FileText, Sparkles, UploadCloud, X, Settings2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function UploadState({ onScan }) {
  const [file, setFile] = useState(null)
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef(null)

  // New Search Parameters State
  const [location, setLocation] = useState("")
  const [jobType, setJobType] = useState("all")
  const [experienceLevel, setExperienceLevel] = useState("all")
  const [datePosted, setDatePosted] = useState("all")
  const [workplaceType, setWorkplaceType] = useState("all")

  function handleFileChange(e) {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) setFile(selectedFile)
  }

  function handleDrop(e) {
    e.preventDefault()
    setDragging(false)
    const droppedFile = e.dataTransfer.files?.[0]
    if (droppedFile) {
      if (droppedFile.type === "application/pdf") {
        setFile(droppedFile)
      } else {
        alert("Please upload a PDF file.")
      }
    }
  }

  // Handle submit and package everything together
  function handleScanClick() {
    onScan({
      file,
      location,
      jobType,
      experienceLevel,
      datePosted,
      workplaceType,
    })
  }

  // Reusable CSS for form inputs to match shadcn style
  const inputClass = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"

  return (
    <section className="mx-auto flex w-full max-w-2xl flex-col items-center px-6 py-12 text-center sm:py-16">
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
        <Sparkles className="h-3.5 w-3.5 text-primary" />
        AI-powered job matching
      </div>

      <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
        Find Your Perfect Role
      </h1>
      <p className="mt-4 max-w-md text-pretty leading-relaxed text-muted-foreground">
        Upload your resume and configure your search preferences to let our AI scan live job postings.
      </p>

      <div className="mt-10 w-full space-y-6">
        {/* FILE UPLOAD ZONE */}
        {file ? (
          <div className="flex items-center justify-between rounded-xl border border-border bg-card p-4 text-left">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                <FileText className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{file.name}</p>
                <p className="text-xs text-muted-foreground">Ready to scan</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setFile(null)
                if (inputRef.current) inputRef.current.value = ""
              }}
              className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault()
              setDragging(true)
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            className={`flex w-full flex-col items-center gap-3 rounded-xl border-2 border-dashed p-10 transition-colors ${
              dragging ? "border-primary bg-accent/60" : "border-border bg-card hover:border-primary/60 hover:bg-accent/30"
            }`}
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-primary">
              <UploadCloud className="h-6 w-6" />
            </span>
            <span className="text-sm font-medium">Drag and drop your resume (PDF) or click to browse</span>
            <input ref={inputRef} onChange={handleFileChange} type="file" accept=".pdf" className="hidden" />
          </button>
        )}

        {/* SEARCH PREFERENCES FORM */}
        <div className="rounded-xl border border-border bg-card p-6 text-left shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <Settings2 className="h-5 w-5 text-muted-foreground" />
            <h3 className="font-medium">Search Preferences</h3>
          </div>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Location */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-sm font-medium text-foreground">Location</label>
              <input
                type="text"
                placeholder="e.g. Remote, San Francisco, New York..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className={inputClass}
              />
            </div>

            {/* Job Type */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Job Type</label>
              <select value={jobType} onChange={(e) => setJobType(e.target.value)} className={inputClass}>
                <option value="all">All</option>
                <option value="F">Full-time</option>
                <option value="P">Part-time</option>
                <option value="C">Contract</option>
                <option value="T">Temporary</option>
                <option value="I">Internship</option>
              </select>
            </div>

            {/* Workplace Type */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Workplace Type</label>
              <select value={workplaceType} onChange={(e) => setWorkplaceType(e.target.value)} className={inputClass}>
                <option value="all">All</option>
                <option value="1">On-site</option>
                <option value="2">Remote</option>
                <option value="3">Hybrid</option>
              </select>
            </div>

            {/* Experience Level */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Experience Level</label>
              <select value={experienceLevel} onChange={(e) => setExperienceLevel(e.target.value)} className={inputClass}>
                <option value="all">All</option>
                <option value="1">Internship</option>
                <option value="2">Entry</option>
                <option value="3">Associate</option>
                <option value="4">Mid-Senior</option>
                <option value="5">Director</option>
                <option value="6">Executive</option>
              </select>
            </div>

            {/* Date Posted */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Date Posted</label>
              <select value={datePosted} onChange={(e) => setDatePosted(e.target.value)} className={inputClass}>
                <option value="all">All time</option>
                <option value="r86400">Past 24 hours</option>
                <option value="r604800">Past week</option>
                <option value="r2592000">Past month</option>
              </select>
            </div>
          </div>
        </div>

        <Button
          size="lg"
          disabled={!file}
          onClick={handleScanClick}
          className="mt-2 w-full sm:w-auto sm:min-w-48"
        >
          Scan Jobs
        </Button>
      </div>
    </section>
  )
}