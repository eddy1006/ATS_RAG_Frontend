import { RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { JobCard } from "@/components/job-card"
import { MATCHED_JOBS } from "@/lib/jobs-data"

export function ResultsState({ onReset }) {
  return (
    <section className="mx-auto w-full max-w-2xl px-6 py-12 sm:py-16">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-primary">Scan complete</p>
          <h1 className="mt-1 text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
            We found {MATCHED_JOBS.length} high-match roles for you
          </h1>
        </div>
        <Button
          variant="outline"
          onClick={onReset}
          className="shrink-0 bg-transparent"
        >
          <RotateCcw className="h-4 w-4" />
          Start Over
        </Button>
      </div>

      <div className="mt-8 flex flex-col gap-4">
        {MATCHED_JOBS.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </section>
  )
}
