"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { BrainCircuit } from "lucide-react";

type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  status: string;
  description: string;
  skills: string[];
  responsibilities: string[];
  requirements: string[];
};

export default function MyJobPosts() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState<Job[]>([
    {
      id: 1,
      title: "Senior Software Engineer",
      company: "TechCorp Inc.",
      location: "Remote",
      salary: "$120k - $180k",
      type: "Full-time",
      status: "Actively Hiring",
      description: `We're looking for an experienced Software Engineer to join our growing team.`,
      skills: ["React", "Node.js", "TypeScript"],
      responsibilities: ["Design scalable web apps", "Collaborate with teams"],
      requirements: ["5+ years experience", "Strong JS knowledge"],
    },
    {
      id: 2,
      title: "Senior Software Engineer",
      company: "TechCorp Inc.",
      location: "Remote",
      salary: "$120k - $180k",
      type: "Full-time",
      status: "Actively Hiring",
      description: `We're looking for an experienced Software Engineer to join our growing team.`,
      skills: ["React", "Node.js", "TypeScript"],
      responsibilities: ["Design scalable web apps", "Collaborate with teams"],
      requirements: ["5+ years experience", "Strong JS knowledge"],
    },
  ]);

  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [showForm, setShowForm] = useState(false);

  const emptyJob: Job = {
    id: Date.now(),
    title: "",
    company: "",
    location: "",
    salary: "",
    type: "",
    status: "",
    description: "",
    skills: [],
    responsibilities: [],
    requirements: [],
  };

  const [formData, setFormData] = useState<Job>(emptyJob);

  // Add or Update Job
  const handleSubmit = () => {
    if (editingJob) {
      setJobs(jobs.map((j) => (j.id === editingJob.id ? formData : j)));
    } else {
      setJobs([...jobs, formData]);
    }

    setShowForm(false);
    setEditingJob(null);
    setFormData(emptyJob);
  };

  // Delete
  const handleDelete = (id: number) => {
    setJobs(jobs.filter((job) => job.id !== id));
  };

  // Edit
  const handleEdit = (job: Job) => {
    setEditingJob(job);
    setFormData(job);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              <BrainCircuit className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">Hakeem</span>
          </div>

          <Button variant="outline" onClick={() => navigate("/recruiter")}>
            Back to Dashboard
          </Button>
        </div>
      </header>
      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">My Job Posts</h2>
          <Button
            onClick={() => {
              setFormData(emptyJob);
              setEditingJob(null);
              setShowForm(true);
            }}
          >
            + Add Job
          </Button>
        </div>

        {/* ================= FORM ================= */}
        {showForm && (
          <Card className="mb-8">
            <CardContent className="p-6 space-y-4">
              <Input
                placeholder="Job Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />

              <Input
                placeholder="Company"
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
              />

              <Input
                placeholder="Location"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
              />

              <Input
                placeholder="Salary"
                value={formData.salary}
                onChange={(e) =>
                  setFormData({ ...formData, salary: e.target.value })
                }
              />

              <Input
                placeholder="Job Type"
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
              />

              <Input
                placeholder="Status"
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
              />

              <Textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />

              <Input
                placeholder="Skills (comma separated)"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    skills: e.target.value.split(","),
                  })
                }
              />

              <Input
                placeholder="Responsibilities (comma separated)"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    responsibilities: e.target.value.split(","),
                  })
                }
              />

              <Input
                placeholder="Requirements (comma separated)"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    requirements: e.target.value.split(","),
                  })
                }
              />

              <div className="flex gap-3">
                <Button onClick={handleSubmit}>
                  {editingJob ? "Update Job" : "Create Job"}
                </Button>

                <Button variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* ================= JOB LIST ================= */}
        <div className="grid gap-6">
          {jobs.map((job) => (
            <Card key={job.id}>
              <CardContent className="p-5 space-y-3">
                <h3 className="font-semibold text-lg">{job.title}</h3>
                <p className="text-sm text-gray-600">
                  {job.company} • {job.location}
                </p>

                <div className="text-sm">
                  <span>{job.salary}</span> • <span>{job.type}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 px-2 py-1 text-xs rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2 pt-3">
                  <Button size="sm" onClick={() => navigate(`/jobs/${job.id}`)}>
                    View Details
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(job)}
                  >
                    Edit
                  </Button>

                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(job.id)}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
