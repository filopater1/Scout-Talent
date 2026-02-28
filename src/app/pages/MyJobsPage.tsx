"use client";

import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { BrainCircuit } from "lucide-react";

/* ================= ENUMS ================= */

enum JobType {
  FULL_TIME = "Full_Time",
  PART_TIME = "Part_Time",
  CONTRACT = "Contract",
  FREELANCE = "Freelance",
  INTERNSHIP = "Internship",
  TEMPORARY = "Temporary",
}

enum WorkMode {
  ONSITE = "Onsite",
  REMOTE = "Remote",
  HYBRID = "Hybrid",
}

enum JobStatus {
  DRAFT = "Draft",
  PUBLISHED = "Published",
  CLOSED = "Closed",
  PAUSED = "Paused",
  EXPIRED = "Expired",
  FILLED = "Filled",
}

/* ================= TYPES ================= */

type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  salaryMin: number | "";
  salaryMax: number | "";
  type: JobType | "";
  workMode: WorkMode | "";
  status: JobStatus;
  description: string;
  skills: string[];
  responsibilities: string[];
  requirements: string[];
};

type TabType = "ALL" | JobStatus;

/* ================= COMPONENT ================= */

export default function MyJobPosts() {
  const navigate = useNavigate();

  /* ================= STATE ================= */

  const [activeTab, setActiveTab] = useState<TabType>("ALL");

  const [jobs, setJobs] = useState<Job[]>([]);

  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [showForm, setShowForm] = useState(false);

  /* ================= HELPERS ================= */

  const createEmptyJob = (): Job => ({
    id: Date.now(),
    title: "",
    company: "",
    location: "",
    salaryMin: "",
    salaryMax: "",
    type: "",
    workMode: "",
    status: JobStatus.DRAFT, // ⭐ مهم
    description: "",
    skills: [],
    responsibilities: [],
    requirements: [],
  });

  const [formData, setFormData] = useState<Job>(createEmptyJob());

  const filteredJobs = useMemo(() => {
    if (activeTab === "ALL") return jobs;
    return jobs.filter((j) => j.status === activeTab);
  }, [jobs, activeTab]);

  /* ================= VALIDATION ================= */

  const isSalaryValid =
    formData.salaryMin !== "" &&
    formData.salaryMax !== "" &&
    Number(formData.salaryMax) >= Number(formData.salaryMin);

  /* ================= CRUD ================= */

  const handleSubmit = (statusOverride?: JobStatus) => {
    if (!isSalaryValid) {
      alert("Max salary must be greater than or equal to min salary");
      return;
    }

    const payload: Job = {
      ...formData,
      status: statusOverride ?? formData.status,
    };

    if (editingJob) {
      setJobs((prev) =>
        prev.map((j) => (j.id === editingJob.id ? payload : j)),
      );
    } else {
      setJobs((prev) => [...prev, payload]);
    }

    setShowForm(false);
    setEditingJob(null);
    setFormData(createEmptyJob());
  };

  const handleDelete = (id: number) => {
    setJobs((prev) => prev.filter((job) => job.id !== id));
  };

  const handleEdit = (job: Job) => {
    setEditingJob(job);
    setFormData(job);
    setShowForm(true);
  };

  /* ================= STATUS ACTIONS ================= */

  const updateStatus = (id: number, status: JobStatus) => {
    setJobs((prev) => prev.map((j) => (j.id === id ? { ...j, status } : j)));
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ================= HEADER ================= */}
      <header className="border-b bg-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              <BrainCircuit className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">Hakeem</span>
          </div>

          <Button variant="outline" onClick={() => navigate("/company")}>
            Back to Dashboard
          </Button>
        </div>
      </header>

      <div className="p-6 max-w-6xl mx-auto">
        {/* ================= TABS ================= */}
        <div className="flex flex-wrap gap-2 mb-6">
          {["ALL", ...Object.values(JobStatus)].map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab(tab as TabType)}
            >
              {tab}
            </Button>
          ))}
        </div>

        {/* ================= ADD BUTTON ================= */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">My Job Posts</h2>
          <Button
            onClick={() => {
              setFormData(createEmptyJob());
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

              {/* <Input
                placeholder="Company"
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
              /> */}

              <Input
                placeholder="Location"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
              />

              {/* Salary */}
              <div className="grid grid-cols-2 gap-3">
                <Input
                  type="number"
                  placeholder="Min Salary"
                  value={formData.salaryMin}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      salaryMin: Number(e.target.value),
                    })
                  }
                />
                <Input
                  type="number"
                  placeholder="Max Salary"
                  value={formData.salaryMax}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      salaryMax: Number(e.target.value),
                    })
                  }
                />
              </div>

              {/* Job Type */}
              <select
                className="w-full border rounded-md p-2"
                value={formData.type}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    type: e.target.value as JobType,
                  })
                }
              >
                <option value="">Select Job Type</option>
                {Object.values(JobType).map((type) => (
                  <option key={type} value={type}>
                    {type.replace("_", " ")}
                  </option>
                ))}
              </select>

              {/* Work Mode */}
              <select
                className="w-full border rounded-md p-2"
                value={formData.workMode}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    workMode: e.target.value as WorkMode,
                  })
                }
              >
                <option value="">Select Work Mode</option>
                {Object.values(WorkMode).map((mode) => (
                  <option key={mode} value={mode}>
                    {mode}
                  </option>
                ))}
              </select>

              <Textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => handleSubmit(JobStatus.DRAFT)}
                >
                  Save Draft
                </Button>

                <Button onClick={() => handleSubmit(JobStatus.PUBLISHED)}>
                  Publish Now
                </Button>

                <Button variant="ghost" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* ================= JOB LIST ================= */}
        <div className="grid gap-6">
          {filteredJobs.map((job) => (
            <Card key={job.id}>
              <CardContent className="p-5 space-y-3">
                <h3 className="font-semibold text-lg">{job.title}</h3>

                <p className="text-sm text-gray-600">
                  {job.company} • {job.location}
                </p>

                <div className="text-sm">
                  <span>
                    ${job.salaryMin} - ${job.salaryMax}
                  </span>{" "}
                  • <span>{job.type}</span> •{" "}
                  <span className="font-medium">{job.status}</span>
                </div>

                {/* ACTIONS */}
                <div className="flex flex-wrap gap-2 pt-3">
                  <Button size="sm" onClick={() => navigate(`/jobs/${job.id}`)}>
                    View
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(job)}
                  >
                    Edit
                  </Button>

                  {job.status === JobStatus.DRAFT && (
                    <Button
                      size="sm"
                      onClick={() => updateStatus(job.id, JobStatus.PUBLISHED)}
                    >
                      Publish
                    </Button>
                  )}

                  {job.status === JobStatus.PAUSED && (
                    <Button
                      size="sm"
                      onClick={() => updateStatus(job.id, JobStatus.PUBLISHED)}
                    >
                      Resume
                    </Button>
                  )}

                  {job.status === JobStatus.PUBLISHED && (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateStatus(job.id, JobStatus.PAUSED)}
                      >
                        Pause
                      </Button>

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateStatus(job.id, JobStatus.CLOSED)}
                      >
                        Close
                      </Button>

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateStatus(job.id, JobStatus.FILLED)}
                      >
                        Mark Filled
                      </Button>
                    </>
                  )}

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

          {filteredJobs.length === 0 && (
            <div className="text-center text-gray-500 py-10">
              No jobs in this section
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
