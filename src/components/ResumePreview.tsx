import { ResumeData } from "@/src/types";
import { Mail, Phone, MapPin, Globe, Linkedin } from "lucide-react";

export function ResumePreview({ data }: { data: ResumeData }) {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <div className="bg-white text-slate-900 p-8 shadow-lg min-h-[11in] w-full max-w-[8.5in] mx-auto font-sans">
      {/* Header */}
      <header className="border-b-2 border-slate-900 pb-6 mb-6">
        <h1 className="text-4xl font-bold uppercase tracking-tight mb-2">{personalInfo.fullName || "Your Name"}</h1>
        <div className="flex flex-wrap gap-4 text-sm text-slate-600">
          {personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center gap-1">
              <Linkedin className="w-3.5 h-3.5" />
              <span>{personalInfo.linkedin}</span>
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5" />
              <span>{personalInfo.website}</span>
            </div>
          )}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-8">
          <h2 className="text-lg font-bold uppercase tracking-wider border-b border-slate-300 mb-3">Professional Summary</h2>
          <p className="text-sm leading-relaxed text-slate-700 whitespace-pre-wrap">{personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold uppercase tracking-wider border-b border-slate-300 mb-4">Work Experience</h2>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-base">{exp.position}</h3>
                  <span className="text-sm font-medium text-slate-500">
                    {exp.startDate} — {exp.current ? "Present" : exp.endDate}
                  </span>
                </div>
                <div className="flex justify-between items-baseline mb-2">
                  <span className="font-semibold text-slate-700">{exp.company}</span>
                  <span className="text-xs italic text-slate-500">{exp.location}</span>
                </div>
                <p className="text-sm text-slate-600 whitespace-pre-wrap leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold uppercase tracking-wider border-b border-slate-300 mb-4">Education</h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-base">{edu.degree} in {edu.field}</h3>
                  <span className="text-sm font-medium text-slate-500">
                    {edu.startDate} — {edu.endDate}
                  </span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="font-semibold text-slate-700">{edu.school}</span>
                  <span className="text-xs italic text-slate-500">{edu.location}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold uppercase tracking-wider border-b border-slate-300 mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, i) => (
              <span key={i} className="text-sm text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
