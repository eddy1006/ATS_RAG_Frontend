import { RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { JobCard } from "./job-card"

export function ResultsState({ payload, onReset }) {
  // Ensure payload is an array (fallback to empty array if something goes wrong)
  const jobs = Array.isArray(payload) ? payload : []

  return (
    <section className="mx-auto w-full max-w-4xl px-6 py-12 sm:py-16">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            We found {jobs.length} high-match roles for you.
          </h2>
          <p className="mt-1 text-muted-foreground">
            Based on your resume and search preferences.
          </p>
        </div>
        <Button variant="outline" onClick={onReset} className="shrink-0 gap-2">
          <RefreshCw className="h-4 w-4" />
          Start Over
        </Button>
      </div>

      <div className="grid gap-4">
        {jobs.length > 0 ? (
          jobs.map((job, index) => (
            // Using index as key since the backend doesn't return an 'id'
            <JobCard key={index} job={job} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card py-16 text-center">
            <p className="text-lg font-medium text-foreground">No matches found</p>
            <p className="text-sm text-muted-foreground">Try adjusting your search parameters or uploading a different resume.</p>
          </div>
        )}
      </div>
    </section>
  )
}