import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BrainCircuit,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  BarChart3,
  Activity,
  Settings,
  Edit,
  Sparkles,
} from "lucide-react";

import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Input } from "../components/ui/input";
import { Switch } from "../components/ui/switch";
import { Badge } from "../components/ui/badge";

export default function RecruiterProfile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const recruiterData = {
    name: "Sarah Chen",
    title: "Senior Technical Recruiter",
    company: "TechCorp Inc.",
    email: "sarah.chen@techcorp.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    joined: "March 2022",
    bio: "Experienced recruiter specializing in AI, backend engineering, and scalable systems hiring.",
    stats: {
      totalJobs: 24,
      activeJobs: 6,
      candidatesReviewed: 312,
      interviews: 58,
      hires: 18,
    },
    specializations: [
      "Frontend Engineers",
      "Backend Engineers",
      "AI/ML Engineers",
      "DevOps",
    ],
  };

  const [formData, setFormData] = useState(recruiterData);

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleCancel = () => {
    setFormData(recruiterData);
    setIsEditing(false);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white px-4 sm:px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
            <BrainCircuit className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <span className="text-lg sm:text-2xl font-bold text-gray-900">
            Hakeem
          </span>
        </div>

        <Button variant="outline" size="sm" onClick={() => navigate("/")}>
          Back
        </Button>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Profile Card */}
        <Card className="rounded-xl shadow-sm mb-8">
          <CardContent className="p-6 flex flex-col lg:flex-row gap-6 justify-between">
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center w-full">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-indigo-100 flex items-center justify-center text-3xl font-bold text-indigo-600">
                {formData.name.charAt(0)}
              </div>

              <div className="flex-1 w-full">
                {isEditing ? (
                  <div className="space-y-3">
                    <Input
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                    />
                    <Input
                      value={formData.title}
                      onChange={(e) => handleChange("title", e.target.value)}
                    />
                  </div>
                ) : (
                  <>
                    <h2 className="text-xl sm:text-2xl font-bold">
                      {formData.name}
                    </h2>
                    <p className="text-gray-600">{formData.title}</p>
                  </>
                )}

                <p className="text-gray-500 mt-1">{formData.company}</p>

                <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Mail className="w-4 h-4" /> {formData.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-4 h-4" /> {formData.phone}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" /> {formData.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" /> Joined {formData.joined}
                  </span>
                </div>

                {/* Status */}
                <div className="mt-3">
                  <Badge className="bg-green-100 text-green-600">
                    Actively Hiring
                  </Badge>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <Button onClick={handleSave}>Save</Button>
                  <Button variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Profile Completion */}
        <Card className="mb-6 rounded-xl">
          <CardContent className="p-6">
            <div className="flex justify-between mb-2 text-sm">
              <span>Profile Completion</span>
              <span>85%</span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div className="bg-indigo-600 h-2 rounded-full w-[85%]" />
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="overview">
          <TabsList className="grid grid-cols-4 w-full mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview */}
          <TabsContent value="overview">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="rounded-xl">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">About</h3>
                  <p className="text-sm text-gray-600">{formData.bio}</p>
                </CardContent>
              </Card>

              <Card className="rounded-xl">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">Specializations</h3>
                  <div className="flex flex-wrap gap-2">
                    {formData.specializations.map((spec, i) => (
                      <Badge key={i} variant="secondary">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* AI Insight */}
            <Card className="rounded-xl mt-6 bg-indigo-50 border-indigo-100">
              <CardContent className="p-6 flex gap-3 items-start">
                <Sparkles className="text-indigo-600 w-5 h-5 mt-1" />
                <p className="text-sm text-indigo-700">
                  AI Insight: Your average hiring time improved by 15% this
                  month. You tend to hire strong backend engineers.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activity */}
          <TabsContent value="activity">
            <Card className="rounded-xl">
              <CardContent className="p-6 space-y-3 text-sm text-gray-600">
                <p>• Moved candidate to Interview</p>
                <p>• Sent technical assessment</p>
                <p>• Posted new job opening</p>
                <p>• Successfully hired candidate</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics">
            <div className="grid md:grid-cols-3 gap-6">
              {Object.entries(formData.stats).map(([key, value]) => (
                <Card key={key} className="rounded-xl text-center">
                  <CardContent className="p-6">
                    <p className="text-2xl font-bold text-indigo-600">
                      {value}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">
                      {key.replace(/([A-Z])/g, " $1")}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings">
            <Card className="rounded-xl">
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">
                    Notification Preferences
                  </h3>
                  <div className="flex justify-between items-center">
                    <span>Email when candidate applies</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span>Weekly Report</span>
                    <Switch />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
