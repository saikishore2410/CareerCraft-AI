import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { optimizeResume } from "@/src/services/geminiService";
import { ResumeData } from "@/src/types";

export function AIOptimizer({ resumeData }: { resumeData: ResumeData }) {
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleOptimize = async () => {
    if (!jobDescription) return;
    setLoading(true);
    try {
      const data = await optimizeResume(resumeData, jobDescription);
      setResults(data);
    } catch (error) {
      console.error("Optimization failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-500" />
            AI Resume Optimizer
          </CardTitle>
          <CardDescription>
            Paste the job description you're targeting to get personalized optimization suggestions.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Paste the job description here..."
            className="min-h-[200px]"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
          <Button 
            className="w-full" 
            onClick={handleOptimize} 
            disabled={loading || !jobDescription}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Analyze & Optimize"
            )}
          </Button>
        </CardContent>
      </Card>

      {results && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
          <Card>
            <CardHeader>
              <CardTitle>Match Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Job Match Score</span>
                <span className={`text-2xl font-bold ${results.matchScore > 70 ? 'text-green-500' : 'text-orange-500'}`}>
                  {results.matchScore}%
                </span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ${results.matchScore > 70 ? 'bg-green-500' : 'bg-orange-500'}`}
                  style={{ width: `${results.matchScore}%` }}
                />
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  Recommended Improvements
                </h4>
                <ul className="space-y-2">
                  {results.improvements.map((improvement: string, i: number) => (
                    <li key={i} className="text-sm text-slate-600 flex gap-2">
                      <span className="text-slate-400">•</span>
                      {improvement}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-orange-500" />
                  Missing Keywords
                </h4>
                <div className="flex flex-wrap gap-2">
                  {results.missingKeywords.map((keyword: string, i: number) => (
                    <Badge key={i} variant="secondary" className="bg-orange-50 text-orange-700 hover:bg-orange-100 border-none">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-semibold">Skills to Highlight</h4>
                <div className="flex flex-wrap gap-2">
                  {results.highlightSkills.map((skill: string, i: number) => (
                    <Badge key={i} variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-none">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
