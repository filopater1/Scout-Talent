import { useNavigate, useParams } from "react-router-dom";
import {
  BrainCircuit,
  Building2,
  MapPin,
  DollarSign,
  Clock,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";

import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";

export default function JobDetails() {
  const navigate = useNavigate();
  const { jobId } = useParams();

  // مؤقتاً بيانات Mock — بعدين تتبدل بـ API call
  const job = {
    id: jobId,
    title: "Senior Software Engineer",
    company: "TechCorp Inc.",
    location: "Remote",
    salary: "$120k - $180k",
    type: "Full-time",
    status: "Actively Hiring",
    description: `We're looking for an experienced Software Engineer to join our growing team.
    You'll work on cutting-edge products that impact millions of users worldwide.`,
    skills: ["React", "Node.js", "TypeScript", "AWS", "PostgreSQL", "Docker"],
    responsibilities: [
      "Design and develop scalable web applications",
      "Collaborate with cross-functional teams",
      "Mentor junior developers and conduct code reviews",
      "Participate in architectural decisions",
    ],
    requirements: [
      "5+ years of experience in software development",
      "Strong knowledge of modern JavaScript frameworks",
      "Experience with cloud platforms (AWS preferred)",
      "Excellent communication skills",
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              <BrainCircuit className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              Scout Talent
            </span>
          </div>

          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
        {/* Job Main Info */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-3xl mb-3">{job.title}</CardTitle>

                <div className="flex flex-wrap items-center gap-6 text-gray-600">
                  <div className="flex items-center gap-1">
                    <Building2 className="w-4 h-4" />
                    <span>{job.company}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{job.location}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    <span>{job.salary}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{job.type}</span>
                  </div>
                </div>
              </div>

              <Badge className="bg-green-100 text-green-800">
                {job.status}
              </Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Description */}
        <Card>
          <CardHeader>
            <CardTitle>About the Role</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 leading-relaxed">{job.description}</p>
          </CardContent>
        </Card>

        {/* Skills */}
        <Card>
          <CardHeader>
            <CardTitle>Required Skills</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {job.skills.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </CardContent>
        </Card>

        {/* Responsibilities */}
        <Card>
          <CardHeader>
            <CardTitle>Responsibilities</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {job.responsibilities.map((item, index) => (
              <div key={index} className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <span className="text-gray-600">{item}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Requirements */}
        <Card>
          <CardHeader>
            <CardTitle>Requirements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {job.requirements.map((item, index) => (
              <div key={index} className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-indigo-600 mt-1 flex-shrink-0" />
                <span className="text-gray-600">{item}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Apply Button */}
        <div className="flex justify-end">
          <Button size="lg" onClick={() => navigate(`/jobs/${job.id}/apply`)}>
            Apply Now
          </Button>
        </div>
      </div>
    </div>
  );
}
