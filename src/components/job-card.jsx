import { ExternalLink, Building2 } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { MatchScore } from "./match-score"
import { cn } from "@/lib/utils"

export function JobCard({ job }) {
  const title = job.title || "Unknown Title"
  const company = job.company || "Unknown Company"
  const score = job.matchScore || 0
  const reason = job.reason || "No reasoning provided by AI."
  const applyUrl = job.url || "#"

  return (
    <div className="flex flex-col rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md sm:flex-row sm:gap-6">
      <div className="flex-1 space-y-4">
        <div>
          <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
          <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1 font-medium text-primary">
              <Building2 className="h-4 w-4" />
              {company}
            </span>
          </div>
        </div>

        <div className="rounded-lg bg-muted/50 p-4 text-sm leading-relaxed">
          <span className="font-semibold text-foreground">AI Reasoning: </span>
          <span className="text-muted-foreground">{reason}</span>
        </div>
      </div>

      <div className="mt-6 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 sm:mt-0 sm:w-48 sm:items-end sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
        <MatchScore score={score} />
        
        <a 
          href={applyUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className={cn(
            buttonVariants({ variant: "default" }), 
            "w-full sm:w-auto inline-flex items-center justify-center gap-2"
          )}
        >
          Apply Now
          <ExternalLink className="h-4 w-4 shrink-0" />
        </a>
      </div>
    </div>
  )
}