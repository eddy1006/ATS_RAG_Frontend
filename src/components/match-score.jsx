function scoreColor(score) {
  if (score > 85) return "text-emerald-500"
  if (score > 70) return "text-amber-500"
  return "text-muted-foreground"
}

export function MatchScore({ score }) {
  const radius = 26
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference
  const color = scoreColor(score)

  return (
    <div className="relative flex h-16 w-16 shrink-0 items-center justify-center">
      <svg className="h-16 w-16 -rotate-90" viewBox="0 0 64 64">
        <circle
          cx="32"
          cy="32"
          r={radius}
          fill="none"
          strokeWidth="5"
          className="stroke-border"
        />
        <circle
          cx="32"
          cy="32"
          r={radius}
          fill="none"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={`${color} transition-[stroke-dashoffset] duration-1000 ease-out`}
          stroke="currentColor"
        />
      </svg>
      <span className={`absolute text-sm font-semibold ${color}`}>{score}%</span>
    </div>
  )
}
