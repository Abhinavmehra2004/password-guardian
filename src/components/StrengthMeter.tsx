import { StrengthLevel } from "@/lib/passwordAnalyzer";

interface StrengthMeterProps {
  score: number;
  level: StrengthLevel;
}

const levelConfig: Record<StrengthLevel, { label: string; colorClass: string; gradient: string }> = {
  empty: { label: "", colorClass: "text-muted-foreground", gradient: "bg-muted" },
  weak: { label: "Weak", colorClass: "text-destructive", gradient: "bg-gradient-to-r from-destructive to-destructive" },
  medium: { label: "Medium", colorClass: "text-warning", gradient: "bg-gradient-to-r from-destructive via-warning to-warning" },
  strong: { label: "Strong", colorClass: "text-primary", gradient: "bg-gradient-to-r from-warning via-primary to-primary" },
  excellent: { label: "Excellent", colorClass: "text-success", gradient: "bg-gradient-to-r from-primary to-success" },
};

export default function StrengthMeter({ score, level }: StrengthMeterProps) {
  const config = levelConfig[level];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Strength</span>
        <div className="flex items-center gap-2">
          <span className={`text-sm font-semibold ${config.colorClass}`}>{config.label}</span>
          {level !== "empty" && (
            <span className={`text-xs font-mono ${config.colorClass}`}>{score}%</span>
          )}
        </div>
      </div>
      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${config.gradient}`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}
