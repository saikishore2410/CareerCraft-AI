import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Send, Loader2, User, Bot, Sparkles } from "lucide-react";
import { startMockInterview } from "@/src/services/geminiService";
import { ResumeData, InterviewMessage } from "@/src/types";
import ReactMarkdown from "react-markdown";

export function InterviewPrep({ resumeData }: { resumeData: ResumeData }) {
  const [jobDescription, setJobDescription] = useState("");
  const [messages, setMessages] = useState<InterviewMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleStartInterview = async () => {
    if (!jobDescription) return;
    setLoading(true);
    setInterviewStarted(true);
    try {
      const initialPrompt = "Hello! I'm ready for the mock interview. Please start by introducing yourself and asking the first question.";
      const response = await startMockInterview(resumeData, jobDescription, [{ role: "user", content: initialPrompt }]);
      setMessages([{ role: "assistant", content: response, timestamp: Date.now() }]);
    } catch (error) {
      console.error("Failed to start interview:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: InterviewMessage = {
      role: "user",
      content: input,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await startMockInterview(resumeData, jobDescription, [...messages, userMessage]);
      setMessages((prev) => [...prev, { role: "assistant", content: response, timestamp: Date.now() }]);
    } catch (error) {
      console.error("Failed to get response:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!interviewStarted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-blue-500" />
            AI Mock Interview
          </CardTitle>
          <CardDescription>
            Practice your interview skills with an AI interviewer tailored to your resume and a specific job.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Target Job Description</label>
            <Textarea
              placeholder="Paste the job description here to tailor the interview..."
              className="min-h-[200px]"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </div>
          <Button
            className="w-full"
            onClick={handleStartInterview}
            disabled={loading || !jobDescription}
          >
            {loading
              ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Preparing Interview...
                </>
              )
              : "Start Mock Interview"}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="flex flex-col h-[600px] max-w-3xl mx-auto border rounded-xl overflow-hidden bg-white shadow-sm">
      <div className="p-4 border-b bg-slate-50 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-blue-600" />
          <span className="font-semibold">AI Interviewer</span>
        </div>
        <Button variant="ghost" size="sm" onClick={() => setInterviewStarted(false)}>
          End Session
        </Button>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-2xl ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white rounded-tr-none"
                    : "bg-slate-100 text-slate-800 rounded-tl-none"
                }`}
              >
                <div className="flex items-center gap-2 mb-1 opacity-70 text-[10px] uppercase font-bold tracking-wider">
                  {msg.role === "user"
                    ? (
                      <>
                        <span>You</span>
                        <User className="w-3 h-3" />
                      </>
                    )
                    : (
                      <>
                        <Bot className="w-3 h-3" />
                        <span>AI Interviewer</span>
                      </>
                    )}
                </div>
                <div className="prose prose-sm prose-slate max-w-none dark:prose-invert">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-slate-100 p-3 rounded-2xl rounded-tl-none flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                <span className="text-sm text-slate-500">AI is thinking...</span>
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      <div className="p-4 border-t bg-white">
        <div className="flex gap-2">
          <Textarea
            placeholder="Type your answer..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            className="min-h-[80px] resize-none"
          />
          <Button
            className="self-end h-10 w-10 p-0"
            onClick={handleSendMessage}
            disabled={loading || !input.trim()}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-[10px] text-slate-400 mt-2 text-center">
          Press Enter to send, Shift + Enter for new line.
        </p>
      </div>
    </div>
  );
}