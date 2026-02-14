import { useState, useMemo } from "react";
import { Eye, EyeOff, Copy, Shield, ShieldCheck, ShieldAlert, Lightbulb, Sparkles, Loader } from "lucide-react";
import { analyzePassword, StrengthLevel } from "@/lib/passwordAnalyzer";
import { getAISuggestions } from "@/lib/aiSuggestions";
import StrengthMeter from "./StrengthMeter";
import CriteriaChecklist from "./CriteriaChecklist";
import { toast } from "sonner";
import { Button } from "./ui/button";

const shieldIcons: Record<StrengthLevel, typeof Shield> = {
  empty: Shield,
  weak: ShieldAlert,
  medium: ShieldAlert,
  strong: ShieldCheck,
  excellent: ShieldCheck,
};

export default function PasswordAnalyzerCard() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState("");
  const [isAILoading, setIsAILoading] = useState(false);

  const analysis = useMemo(() => analyzePassword(password), [password]);

  const ShieldIcon = shieldIcons[analysis.level];

  const handleCopy = async () => {
    if (!password) return;
    await navigator.clipboard.writeText(password);
    toast.success("Password copied to clipboard!");
  };

  const handleGetAISuggestions = async () => {
    if (!password) {
      toast.error("Please enter a password first.");
      return;
    }
    setIsAILoading(true);
    setAiSuggestions("");
    const suggestions = await getAISuggestions(password);
    setAiSuggestions(suggestions);
    setIsAILoading(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Card */}
      <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-cyber space-y-6">
        {/* Password Input */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password..."
            className="w-full rounded-lg border border-border bg-input px-4 py-3 pr-24 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all font-mono text-sm"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="p-2 rounded-md text-muted-foreground hover:text-foreground transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
            <button
              onClick={handleCopy}
              className="p-2 rounded-md text-muted-foreground hover:text-primary transition-colors"
              aria-label="Copy password"
              disabled={!password}
            >
              <Copy className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Strength Meter */}
        <StrengthMeter score={analysis.score} level={analysis.level} />

        {/* Body: Criteria + Crack Time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <CriteriaChecklist criteria={analysis.criteria} hasInput={password.length > 0} />

          <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-secondary/30 p-6">
            <ShieldIcon
              className={`h-10 w-10 transition-colors duration-500 ${
                analysis.level === "excellent"
                  ? "text-success"
                  : analysis.level === "strong"
                  ? "text-primary"
                  : analysis.level === "medium"
                  ? "text-warning"
                  : analysis.level === "weak"
                  ? "text-destructive"
                  : "text-muted-foreground"
              }`}
            />
            <div className="text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                Estimated Crack Time
              </p>
              <p
                className={`text-xl font-display font-bold tracking-wide ${
                  analysis.level === "excellent"
                    ? "text-success text-glow"
                    : analysis.level === "strong"
                    ? "text-primary"
                    : analysis.level === "medium"
                    ? "text-warning"
                    : analysis.level === "weak"
                    ? "text-destructive"
                    : "text-muted-foreground"
                }`}
              >
                {analysis.crackTime}
              </p>
            </div>
          </div>
        </div>

        {/* Suggestions */}
        {password.length > 0 && (
          <div className="rounded-xl border border-border bg-secondary/20 p-4 space-y-2">
            <div className="flex items-center gap-2 text-primary">
              <Lightbulb className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Suggestions</span>
            </div>
            <ul className="space-y-1.5">
              {analysis.suggestions.map((s, i) => {
                const isCritical = s.startsWith("CRITICAL:");
                const message = isCritical ? s.substring("CRITICAL:".length).trim() : s;
                
                return (
                  <li key={i} className={`text-sm flex items-start gap-2 ${
                    isCritical ? "text-destructive" : "text-muted-foreground"
                  }`}>
                    <span className="font-bold text-lg leading-none mt-0.5">•</span>
                    <div>
                      {isCritical && <span className="font-bold">CRITICAL: </span>}
                      {message}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {/* AI Suggestions */}
        <div className="rounded-xl border border-border bg-secondary/20 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-primary">
              <Sparkles className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">AI-Powered Advice</span>
            </div>
            <Button size="sm" onClick={handleGetAISuggestions} disabled={isAILoading || !password}>
              {isAILoading ? <Loader className="h-4 w-4 animate-spin" /> : "Analyze with AI"}
            </Button>
          </div>
          {(isAILoading || aiSuggestions) && (
            <div className="p-3 bg-background/50 rounded-lg">
              {isAILoading && <p className="text-sm text-muted-foreground animate-pulse">AI is analyzing your password...</p>}
              {aiSuggestions && <p className="text-sm text-muted-foreground">{aiSuggestions}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
