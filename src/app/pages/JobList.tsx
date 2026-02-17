import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  BrainCircuit,
  Building2,
  MapPin,
  DollarSign,
  Clock,
  Search,
} from "lucide-react";

import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";

export default function JobList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const jobs = [
    {
      id: 1,
      title: "Senior Software Engineer",
      company: "TechCorp Inc.",
      location: "Remote",
      salary: "$120k - $180k",
      type: "Full-time",
      status: "Actively Hiring",
    },
    {
      id: 2,
      title: "Frontend Engineer",
      company: "DesignStudio",
      location: "New York, NY",
      salary: "$90k - $130k",
      type: "Full-time",
      status: "Urgent",
    },
    {
      id: 3,
      title: "Backend Developer",
      company: "DataFlow Systems",
      location: "Austin, TX",
      salary: "$100k - $150k",
      type: "Hybrid",
      status: "Actively Hiring",
    },
  ];

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()),
  );

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

          <Button variant="outline" onClick={() => navigate("/applicant")}>
            Back to Dashboard
          </Button>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Explore Open Positions
          </h1>
          <p className="text-gray-600 mt-2">
            Discover opportunities that match your skills
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search by title or company..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Job Cards */}
        <div className="grid md:grid-cols-1 gap-6">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl mb-2">{job.title}</CardTitle>

                    <div className="flex items-center gap-4 text-gray-600 text-sm">
                      <div className="flex items-center gap-1">
                        <Building2 className="w-4 h-4" />
                        <span>{job.company}</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{job.location}</span>
                      </div>
                    </div>
                  </div>

                  <Badge className="bg-green-100 text-green-800">
                    {job.status}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center gap-6 text-gray-600 text-sm">
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    <span>{job.salary}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{job.type}</span>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => navigate(`/jobs/${job.id}`)}
                  >
                    View Details
                  </Button>

                  <Button
                    className="flex-1"
                    onClick={() => navigate(`/jobs/${job.id}/apply`)}
                  >
                    Apply Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No jobs found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}
