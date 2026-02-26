import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../components/ui/dialog";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  BrainCircuit,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  Code,
  Shield,
  CheckCircle,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";

export default function CandidateEvaluation() {
  const navigate = useNavigate();

  const [actionType, setActionType] = useState<string | null>(null);
  const [candidateStatus, setCandidateStatus] = useState("Under Review");

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
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate("/company")}>
              Back to Pipeline
            </Button>
            <Button variant="outline" onClick={() => navigate("/")}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Candidate Header */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            {/* LEFT SIDE */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              {/* Avatar */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-indigo-100 rounded-full flex items-center justify-center text-2xl sm:text-3xl font-bold text-indigo-600 shrink-0">
                AJ
              </div>

              {/* Info */}
              <div className="min-w-0">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-2 break-words">
                  Alex Johnson
                </h1>

                <p className="text-base sm:text-lg text-gray-600 mb-3 sm:mb-4">
                  Senior Software Engineer
                </p>

                {/* Contact Info */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Mail className="w-4 h-4 shrink-0" />
                    <span className="break-all">alex.johnson@email.com</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Phone className="w-4 h-4 shrink-0" />
                    <span>+1 (555) 987-6543</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span>San Francisco, CA</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 shrink-0" />
                    <span>Applied 2 days ago</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE — AI SCORE */}
            <div className="flex flex-col items-start lg:items-end text-left lg:text-right">
              <div className="text-sm text-gray-600 mb-1">AI Match Score</div>

              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-indigo-600 mb-2">
                95%
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge className="bg-green-100 text-green-800">
                  Excellent Match
                </Badge>

                <Badge className="bg-indigo-100 text-indigo-800">
                  {candidateStatus}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Detailed Analysis */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="overview">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                {/* <TabsTrigger value="code">Code Quality</TabsTrigger> */}
                <TabsTrigger value="fairness">Fairness</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6 mt-6">
                {/* AI Score Breakdown */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BrainCircuit className="w-5 h-5 text-indigo-600" />
                      AI Match Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {scoreBreakdown.map((item) => (
                      <div key={item.label}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">
                            {item.label}
                          </span>
                          <span className="text-sm font-semibold text-indigo-600">
                            {item.score}%
                          </span>
                        </div>
                        <Progress value={item.score} />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Semantic CV Matching */}
                <Card>
                  <CardHeader>
                    <CardTitle>Semantic CV Matching</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 className="font-medium text-green-900 mb-2 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5" />
                          Strong Matches (8/10)
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {strongSkills.map((skill) => (
                            <Badge
                              key={skill}
                              className="bg-green-100 text-green-800"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                        <h4 className="font-medium text-amber-900 mb-2 flex items-center gap-2">
                          <AlertTriangle className="w-5 h-5" />
                          Partial Matches (2/10)
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {partialSkills.map((skill) => (
                            <Badge
                              key={skill}
                              className="bg-amber-100 text-amber-800"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="skills" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Skills Radar</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <RadarChart data={skillsData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="skill" />
                        <PolarRadiusAxis angle={90} domain={[0, 100]} />
                        <Radar
                          name="Candidate"
                          dataKey="candidate"
                          stroke="#6366f1"
                          fill="#6366f1"
                          fillOpacity={0.6}
                        />
                        <Radar
                          name="Required"
                          dataKey="required"
                          stroke="#10b981"
                          fill="#10b981"
                          fillOpacity={0.3}
                        />
                      </RadarChart>
                    </ResponsiveContainer>

                    <div className="mt-6 space-y-3">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Explicit Skills (from CV)
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {explicitSkills.map((skill) => (
                            <Badge key={skill} variant="default">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Implicit Skills (AI-detected)
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {implicitSkills.map((skill) => (
                            <Badge key={skill} variant="secondary">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* <TabsContent value="code" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Code className="w-5 h-5 text-indigo-600" />
                      Code Assessment Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <p className="text-3xl font-bold text-indigo-600">92</p>
                        <p className="text-sm text-gray-600 mt-1">
                          Overall Score
                        </p>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <p className="text-3xl font-bold text-green-600">A</p>
                        <p className="text-sm text-gray-600 mt-1">
                          Code Quality
                        </p>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <p className="text-3xl font-bold text-blue-600">95%</p>
                        <p className="text-sm text-gray-600 mt-1">
                          Test Coverage
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">
                        Performance Metrics
                      </h4>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Time Complexity</span>
                            <span className="font-medium text-green-600">
                              Optimal (O(n log n))
                            </span>
                          </div>
                          <Progress value={95} className="bg-gray-200" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Code Maintainability</span>
                            <span className="font-medium text-green-600">
                              Excellent
                            </span>
                          </div>
                          <Progress value={92} className="bg-gray-200" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Best Practices</span>
                            <span className="font-medium text-green-600">
                              High
                            </span>
                          </div>
                          <Progress value={88} className="bg-gray-200" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent> */}

              <TabsContent value="fairness" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-green-600" />
                      Bias & Fairness Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="font-semibold text-green-900">
                          No Bias Detected
                        </span>
                      </div>
                      <p className="text-sm text-green-700">
                        Our AI has analyzed this evaluation and found no
                        indicators of bias related to protected characteristics.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Fairness Metrics</h4>
                      <div className="space-y-3">
                        {fairnessMetrics.map((metric) => (
                          <div
                            key={metric.name}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                          >
                            <span className="text-sm text-gray-700">
                              {metric.name}
                            </span>
                            <Badge className="bg-green-100 text-green-800">
                              {metric.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm text-blue-900">
                        <strong>Transparency Note:</strong> This candidate was
                        evaluated purely on technical skills, experience
                        relevance, and cultural fit indicators. No demographic
                        data influenced the scoring.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  className="w-full"
                  onClick={() => setActionType("interview")}
                >
                  Move to Interview
                </Button>

                {/* <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setActionType("call")}
                >
                  Schedule Call
                </Button> */}

                {/* <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setActionType("assessment")}
                >
                  Send Assessment
                </Button> */}

                <Button
                  variant="outline"
                  className="w-full text-red-600 hover:text-red-700"
                  onClick={() => setActionType("reject")}
                >
                  Reject
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">
                    Years of Experience
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    7 years
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">
                    Previous Companies
                  </div>
                  <div className="text-2xl font-bold text-gray-900">4</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Education</div>
                  <div className="font-medium text-gray-900">
                    BS Computer Science
                  </div>
                  <div className="text-sm text-gray-600">
                    Stanford University
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Dialog
        open={actionType === "interview"}
        onOpenChange={() => setActionType(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Schedule Interview</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Interview Type</label>
              <select className="w-full mt-1 border rounded-md p-2">
                <option>Technical Interview</option>
                <option>HR Interview</option>
                <option>Final Interview</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">Select Date & Time</label>
              <input
                type="datetime-local"
                className="w-full mt-1 border rounded-md p-2"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setActionType(null)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setCandidateStatus("Interview Scheduled");
                setActionType(null);
              }}
            >
              Confirm & Notify Candidate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog
        open={actionType === "reject"}
        onOpenChange={() => setActionType(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-red-600">Reject Candidate</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Reason (Required)</label>
              <select className="w-full mt-1 border rounded-md p-2">
                <option>Not enough experience</option>
                <option>Skill mismatch</option>
                <option>Culture fit concerns</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">Internal Notes</label>
              <textarea
                className="w-full mt-1 border rounded-md p-2"
                placeholder="Optional internal feedback..."
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setActionType(null)}>
              Cancel
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700"
              onClick={() => {
                setCandidateStatus("Rejected");
                setActionType(null);
              }}
            >
              Confirm Rejection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog
        open={actionType === "assessment"}
        onOpenChange={() => setActionType(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Assessment</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <select className="w-full border rounded-md p-2">
              <option>Frontend React Test</option>
              <option>System Design Challenge</option>
              <option>Backend Node.js Task</option>
            </select>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setActionType(null)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setCandidateStatus("Assessment Sent");
                setActionType(null);
              }}
            >
              Send Assessment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const scoreBreakdown = [
  { label: "Technical Skills", score: 96 },
  { label: "Experience Match", score: 94 },
  { label: "Education", score: 95 },
  { label: "Cultural Fit", score: 92 },
];

const strongSkills = [
  "React",
  "Node.js",
  "TypeScript",
  "AWS",
  "PostgreSQL",
  "Docker",
  "Git",
  "Agile",
];
const partialSkills = ["Kubernetes", "GraphQL"];
const explicitSkills = [
  "React",
  "Node.js",
  "TypeScript",
  "Python",
  "AWS",
  "Docker",
];
const implicitSkills = [
  "System Design",
  "Team Leadership",
  "Problem Solving",
  "Communication",
];

const skillsData = [
  { skill: "React", candidate: 95, required: 90 },
  { skill: "Node.js", candidate: 92, required: 85 },
  { skill: "TypeScript", candidate: 90, required: 80 },
  { skill: "AWS", candidate: 85, required: 75 },
  { skill: "System Design", candidate: 88, required: 80 },
  { skill: "Leadership", candidate: 82, required: 70 },
];

const fairnessMetrics = [
  { name: "Gender Bias Check", status: "Pass" },
  { name: "Age Bias Check", status: "Pass" },
  { name: "Name Bias Check", status: "Pass" },
  { name: "Location Bias Check", status: "Pass" },
];
