import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import {
  BrainCircuit,
  Briefcase,
  CheckCircle,
  Clock,
  TrendingUp,
  AlertCircle,
  User,
} from "lucide-react";

export default function ApplicantDashboard() {
  const navigate = useNavigate();
  const [profileCompletion] = useState(75);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              <BrainCircuit className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">Hakeem</span>
          </div>
          <div className=" flex items-center gap-2    ">
            <span
              onClick={() => navigate("/applicant/profile")}
              className="text-sm flex items-center   px-4 py-2 bg-indigo-100 rounded-full cursor-pointer  text-gray-600"
            >
              <User className="w-4 h-4 mr-1" />
              Profile
            </span>
            <Button variant="outline" onClick={() => navigate("/")}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back, John! 👋
          </h1>
          <p className="text-gray-600">
            Track your applications and complete your profile
          </p>
        </div>

        {/* Profile Completion Card */}
        <Card className="mb-8 border-l-4 border-l-indigo-600">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>Complete Your Profile</CardTitle>
                <CardDescription>
                  Complete your profile to get better job matches
                </CardDescription>
              </div>
              <Badge variant="secondary">{profileCompletion}%</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={profileCompletion} className="mb-4" />
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm text-gray-700">Basic Info</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm text-gray-700">Work Experience</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-600" />
                <span className="text-sm text-gray-700">Skills Assessment</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">Statistics</h3>
          <span className="text-xs text-gray-500">Last 3 months</span>
        </div>
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">
                  Total Applications
                </span>
                <Briefcase className="w-5 h-5 text-gray-400" />
              </div>
              <p className="text-3xl font-bold text-gray-900">12</p>
              <p className="text-xs text-gray-500 mt-1">+3 this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">In Review</span>
                <Clock className="w-5 h-5 text-blue-400" />
              </div>
              <p className="text-3xl font-bold text-blue-600">5</p>
              <p className="text-xs text-gray-500 mt-1">Pending decision</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Interviews</span>
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
              <p className="text-3xl font-bold text-green-600">3</p>
              <p className="text-xs text-gray-500 mt-1">Scheduled</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">AI Match</span>
                <BrainCircuit className="w-5 h-5 text-indigo-400" />
              </div>
              <p className="text-3xl font-bold text-indigo-600">87%</p>
              <p className="text-xs text-gray-500 mt-1">Avg score</p>
            </CardContent>
          </Card>
        </div>

        {/* CV Upload Card */}
        {/* <Card className="mb-8">
          <CardHeader>
            <CardTitle>Your CV Documents</CardTitle>
            <CardDescription>Upload and manage your resumes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cvDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{doc.name}</p>
                      <p className="text-sm text-gray-500">
                        {doc.size} • Uploaded {doc.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant={
                        doc.status === "Analyzed" ? "default" : "secondary"
                      }
                    >
                      {doc.status}
                    </Badge>
                    {doc.aiScore && (
                      <div className="text-right">
                        <p className="text-sm font-medium text-indigo-600">
                          {doc.aiScore}% Match
                        </p>
                        <p className="text-xs text-gray-500">AI Score</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              <Button variant="outline" className="w-full">
                <Upload className="w-4 h-4 mr-2" />
                Upload New CV
              </Button>
            </div>
          </CardContent>
        </Card> */}

        {/* Applications List */}
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex-1">
                <CardTitle className="mb-2">My Applications</CardTitle>
                <CardDescription>
                  Track the status of your job applications
                </CardDescription>
              </div>
              <Button
                className="cursor-pointer"
                onClick={() => navigate("/jobs")}
              >
                Explore New Jobs
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-900">
                        {app.position}
                      </h3>
                      <p className="text-gray-600">{app.company}</p>
                    </div>
                    <Badge className={getStatusColor(app.status)}>
                      {app.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-gray-500">Applied</p>
                      <p className="text-sm font-medium text-gray-900">
                        {app.appliedDate}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">AI Match Score</p>
                      <p className="text-sm font-medium text-indigo-600">
                        {app.matchScore}%
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Location</p>
                      <p className="text-sm font-medium text-gray-900">
                        {app.location}
                      </p>
                    </div>
                  </div>

                  {app.nextAction && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                      <span>{app.nextAction}</span>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button
                      onClick={() => navigate(`/jobs/${app.id}`)}
                      variant="outline"
                      size="sm"
                      className="cursor-pointer "
                    >
                      View Details
                    </Button>
                    {app.status === "Interview" && (
                      <Button
                        size="sm"
                        className="bg-green-500 hover:bg-green-600 text-white cursor-pointer"
                        variant="default"
                      >
                        Join Interview
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function getStatusColor(status: string) {
  switch (status) {
    case "Interview":
      return "bg-green-100 text-green-800 border-green-200 ";
    case "Under Review":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "Rejected":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
}

const cvDocuments = [
  {
    id: 1,
    name: "John_Doe_Resume_2026.pdf",
    size: "245 KB",
    date: "2 days ago",
    status: "Analyzed",
    aiScore: 92,
  },
  {
    id: 2,
    name: "Software_Engineer_CV.pdf",
    size: "198 KB",
    date: "1 week ago",
    status: "Analyzed",
    aiScore: 88,
  },
];

const applications = [
  {
    id: 1,
    position: "Senior Software Engineer",
    company: "TechCorp Inc.",
    status: "Interview",
    appliedDate: "Jan 10, 2026",
    matchScore: 92,
    location: "Remote",
    nextAction: "Interview on Jan 20, 2026 at 2:00 PM",
  },
  {
    id: 2,
    position: "Full Stack Developer",
    company: "InnovateLabs",
    status: "Under Review",
    appliedDate: "Jan 8, 2026",
    matchScore: 88,
    location: "San Francisco, CA",
    nextAction: null,
  },
  {
    id: 3,
    position: "Frontend Engineer",
    company: "DesignStudio",
    status: "Under Review",
    appliedDate: "Jan 5, 2026",
    matchScore: 85,
    location: "New York, NY",
    nextAction: "Complete technical assessment",
  },
  {
    id: 4,
    position: "Backend Developer",
    company: "DataFlow Systems",
    status: "Rejected",
    appliedDate: "Dec 28, 2025",
    matchScore: 76,
    location: "Austin, TX",
    nextAction: null,
  },
];
