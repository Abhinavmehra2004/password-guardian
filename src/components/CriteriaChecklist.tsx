import { PasswordCriteria } from "@/lib/passwordAnalyzer";
import { Check, X } from "lucide-react";

interface CriteriaChecklistProps {
  criteria: PasswordCriteria;
  hasInput: boolean;
}

const criteriaLabels: { key: keyof PasswordCriteria; label: string }[] = [
  { key: "length", label: "8+ Characters" },
  { key: "uppercase", label: "Uppercase (A-Z)" },
  { key: "lowercase", label: "Lowercase (a-z)" },
  { key: "numbers", label: "Numbers (0-9)" },
  { key: "symbols", label: "Symbols (!@#$)" },
];

export default function CriteriaChecklist({ criteria, hasInput }: CriteriaChecklistProps) {
  return (
    <div className="space-y-3">
      {criteriaLabels.map(({ key, label }) => {
        const met = criteria[key];
        return (
          <div key={key} className="flex items-center gap-3">
            <div
              className={`flex h-6 w-6 items-center justify-center rounded-full transition-all duration-300 ${
                met
                  ? "bg-success/20 text-success"
                  : hasInput
                  ? "bg-destructive/20 text-destructive"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {met ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
            </div>
            <span
              className={`text-sm transition-colors duration-300 ${
                met ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
