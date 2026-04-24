import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Plus, Trash2, Globe, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { useResume } from "@/src/hooks/useResume";

export function ResumeEditor({ resumeHook }: { resumeHook: ReturnType<typeof useResume> }) {
  const {
    resumeData,
    updatePersonalInfo,
    addExperience,
    updateExperience,
    removeExperience,
    addEducation,
    updateEducation,
    removeEducation,
    addProject,
    updateProject,
    removeProject,
    updateSkills,
  } = resumeHook;

  return (
    <div className="space-y-8 pb-20">
      {/* Personal Info */}
      <Card className="border-none shadow-none bg-transparent">
        <CardHeader className="px-0">
          <CardTitle className="text-2xl font-semibold tracking-tight">Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="px-0 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={resumeData.personalInfo.fullName}
                onChange={(e) => updatePersonalInfo({ fullName: e.target.value })}
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={resumeData.personalInfo.email}
                onChange={(e) => updatePersonalInfo({ email: e.target.value })}
                placeholder="john@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={resumeData.personalInfo.phone}
                onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
                placeholder="+1 234 567 890"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={resumeData.personalInfo.location}
                onChange={(e) => updatePersonalInfo({ location: e.target.value })}
                placeholder="New York, NY"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input
                id="linkedin"
                value={resumeData.personalInfo.linkedin}
                onChange={(e) => updatePersonalInfo({ linkedin: e.target.value })}
                placeholder="linkedin.com/in/johndoe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={resumeData.personalInfo.website}
                onChange={(e) => updatePersonalInfo({ website: e.target.value })}
                placeholder="johndoe.com"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="summary">Professional Summary</Label>
            <Textarea
              id="summary"
              value={resumeData.personalInfo.summary}
              onChange={(e) => updatePersonalInfo({ summary: e.target.value })}
              placeholder="Briefly describe your professional background and key achievements..."
              className="min-h-[120px]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Experience */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-semibold tracking-tight">Work Experience</h3>
          <Button variant="outline" size="sm" onClick={addExperience}>
            <Plus className="w-4 h-4 mr-2" />
            Add Experience
          </Button>
        </div>
        <Accordion className="w-full">
          {resumeData.experience.map((exp, index) => (
            <AccordionItem key={exp.id} value={exp.id}>
              <AccordionTrigger className="hover:no-underline">
                <div className="flex flex-col items-start text-left">
                  <span className="font-medium">{exp.position || "New Position"}</span>
                  <span className="text-sm text-muted-foreground">{exp.company || "Company Name"}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Company</Label>
                    <Input
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Position</Label>
                    <Input
                      value={exp.position}
                      onChange={(e) => updateExperience(exp.id, { position: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Input
                      value={exp.startDate}
                      onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                      placeholder="MM/YYYY"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Input
                      value={exp.endDate}
                      disabled={exp.current}
                      onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                      placeholder="MM/YYYY"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`current-${exp.id}`}
                    checked={exp.current}
                    onChange={(e) => updateExperience(exp.id, { current: e.target.checked })}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor={`current-${exp.id}`}>I currently work here</Label>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={exp.description}
                    onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                    placeholder="Describe your responsibilities and achievements..."
                    className="min-h-[150px]"
                  />
                </div>
                <Button variant="destructive" size="sm" onClick={() => removeExperience(exp.id)}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Remove
                </Button>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Education */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-semibold tracking-tight">Education</h3>
          <Button variant="outline" size="sm" onClick={addEducation}>
            <Plus className="w-4 h-4 mr-2" />
            Add Education
          </Button>
        </div>
        <Accordion className="w-full">
          {resumeData.education.map((edu) => (
            <AccordionItem key={edu.id} value={edu.id}>
              <AccordionTrigger className="hover:no-underline">
                <div className="flex flex-col items-start text-left">
                  <span className="font-medium">{edu.degree || "Degree"}</span>
                  <span className="text-sm text-muted-foreground">{edu.school || "School"}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>School</Label>
                    <Input
                      value={edu.school}
                      onChange={(e) => updateEducation(edu.id, { school: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Degree</Label>
                    <Input
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Field of Study</Label>
                    <Input
                      value={edu.field}
                      onChange={(e) => updateEducation(edu.id, { field: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input
                      value={edu.location}
                      onChange={(e) => updateEducation(edu.id, { location: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Input
                      value={edu.startDate}
                      onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Input
                      value={edu.endDate}
                      onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                    />
                  </div>
                </div>
                <Button variant="destructive" size="sm" onClick={() => removeEducation(edu.id)}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Remove
                </Button>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Skills */}
      <Card className="border-none shadow-none bg-transparent">
        <CardHeader className="px-0">
          <CardTitle className="text-2xl font-semibold tracking-tight">Skills</CardTitle>
        </CardHeader>
        <CardContent className="px-0 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="skills">Skills (comma separated)</Label>
            <Input
              id="skills"
              value={resumeData.skills.join(", ")}
              onChange={(e) => updateSkills(e.target.value.split(",").map((s) => s.trim()))}
              placeholder="React, TypeScript, Node.js, Project Management..."
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}