import { Building2, ExternalLink, MapPin, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MatchScore } from "@/components/match-score"
import { MATCHED_JOBS } from "@/lib/jobs-data"


export function JobCard({ job }) {
  return (
    <article className="rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-sm sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-balance text-lg font-semibold tracking-tight">
            {job.title}
          </h3>
          <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Building2 className="h-4 w-4" />
              {job.company}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              {job.location}
            </span>
          </div>
        </div>
        <MatchScore score={job.matchScore} />
      </div>

      <div className="mt-4 rounded-lg bg-muted/60 p-4">
        <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          AI Reasoning
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {job.reasoning}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {job.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-border bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="mt-5 flex justify-end">
        <Button
          nativeButton={false}
          render={
            <a href={job.applyUrl} target="_blank" rel="noopener noreferrer" />
          }
        >
          Apply Now
          <ExternalLink className="h-4 w-4" />
        </Button>
      </div>
    </article>
  )
}
