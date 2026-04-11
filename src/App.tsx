/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Toaster } from "sonner";
import { 
  FileText, 
  Sparkles, 
  MessageSquare, 
  Download, 
  Briefcase,
  Github,
  Twitter,
  Linkedin
} from "lucide-react";
import { useResume } from "@/src/hooks/useResume";
import { ResumeEditor } from "@/src/components/ResumeEditor";
import { ResumePreview } from "@/src/components/ResumePreview";
import { AIOptimizer } from "@/src/components/AIOptimizer";
import { InterviewPrep } from "@/src/components/InterviewPrep";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const resumeHook = useResume();
  const [activeTab, setActiveTab] = useState("builder");

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      <Toaster position="top-center" />
      
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">CareerCraft AI</span>
          </div>
          
          <div className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <button 
              onClick={() => setActiveTab("builder")}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'builder' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Resume Builder
            </button>
            <button 
              onClick={() => setActiveTab("optimizer")}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'optimizer' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-600 hover:text-slate-900'}`}
            >
              AI Optimizer
            </button>
            <button 
              onClick={() => setActiveTab("interview")}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'interview' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Interview Prep
            </button>
          </div>

          <Button onClick={handleDownload} variant="outline" size="sm" className="hidden sm:flex">
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {activeTab === "builder" && (
            <motion.div
              key="builder"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12"
            >
              <div className="max-w-2xl">
                <div className="mb-8">
                  <h1 className="text-3xl font-bold tracking-tight mb-2">Build Your Resume</h1>
                  <p className="text-slate-500">Fill in your details to create a professional, ATS-friendly resume.</p>
                </div>
                <ResumeEditor resumeHook={resumeHook} />
              </div>
              
              <div className="hidden lg:block sticky top-28 h-[calc(100vh-140px)]">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Live Preview</h2>
                  <span className="text-xs text-slate-400">Auto-saves to local storage</span>
                </div>
                <div className="h-full overflow-y-auto rounded-xl border bg-slate-200/50 p-8 shadow-inner">
                  <ResumePreview data={resumeHook.resumeData} />
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "optimizer" && (
            <motion.div
              key="optimizer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-4xl mx-auto"
            >
              <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold tracking-tight mb-2">Optimize for Success</h1>
                <p className="text-slate-500">Let AI analyze your resume against a specific job description.</p>
              </div>
              <AIOptimizer resumeData={resumeHook.resumeData} />
            </motion.div>
          )}

          {activeTab === "interview" && (
            <motion.div
              key="interview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-4xl mx-auto"
            >
              <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold tracking-tight mb-2">Master the Interview</h1>
                <p className="text-slate-500">Practice with our AI interviewer to build confidence and refine your answers.</p>
              </div>
              <InterviewPrep resumeData={resumeHook.resumeData} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white mt-20 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold tracking-tight">CareerCraft AI</span>
            </div>
            
            <div className="flex items-center gap-6 text-slate-400">
              <a href="#" className="hover:text-blue-600 transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="hover:text-blue-600 transition-colors"><Github className="w-5 h-5" /></a>
              <a href="#" className="hover:text-blue-600 transition-colors"><Linkedin className="w-5 h-5" /></a>
            </div>
            
            <p className="text-sm text-slate-500">
              © 2026 CareerCraft AI. Built with Gemini.
            </p>
          </div>
        </div>
      </footer>

      {/* Mobile Preview Toggle (Fab) */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <Button 
          size="lg" 
          className="rounded-full shadow-xl"
          onClick={() => {
            // In a real app, this would open a sheet or modal with the preview
            alert("Use a larger screen for live preview, or export to PDF!");
          }}
        >
          <FileText className="w-5 h-5 mr-2" />
          Preview
        </Button>
      </div>
    </div>
  );
}

