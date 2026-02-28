import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BrainCircuit,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Plus,
  X,
} from "lucide-react";

import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Textarea } from "../components/ui/textarea";

export default function RecruiterProfile() {
  const navigate = useNavigate();

  // ================= edit states =================
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [isEditingSpecs, setIsEditingSpecs] = useState(false);
  const [newSpec, setNewSpec] = useState("");

  // ================= data =================
  const recruiterData = {
    name: "Sarah Chen",
    title: "Senior Technical Recruiter",
    company: "TechCorp Inc.",
    email: "sarah.chen@techcorp.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    joined: "March 2022",
    linkedin: "https://www.linkedin.com/in/sarah-chen/",
    bio: "Experienced recruiter specializing in AI, backend engineering, and scalable systems hiring.",
    specializations: [
      "Frontend Engineers",
      "Backend Engineers",
      "AI/ML Engineers",
      "DevOps",
    ],
  };

  const [formData, setFormData] = useState(recruiterData);
  const profileCompletionData = {
    personalInfo: 80,
    about: 60,
    specializations: 75,
  };
  const calculateOverall = () => {
    const values = Object.values(profileCompletionData);
    const total = values.reduce((acc, val) => acc + val, 0);
    return Math.round(total / values.length);
  };

  const completion = calculateOverall();

  // ================= handlers =================
  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // ===== specializations =====
  const handleAddSpec = () => {
    if (!newSpec.trim()) return;

    setFormData((prev) => ({
      ...prev,
      specializations: [...prev.specializations, newSpec.trim()],
    }));
    setNewSpec("");
  };

  const handleRemoveSpec = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      specializations: prev.specializations.filter((_, i) => i !== index),
    }));
  };

  const resetData = () => setFormData(recruiterData);

  // ================= UI =================
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white px-4 sm:px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
            <BrainCircuit className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-gray-900">Hakeem</span>
        </div>

        <Button variant="outline" size="sm" onClick={() => navigate("/")}>
          Back
        </Button>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <Card className="rounded-xl shadow-sm">
          <CardContent className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">Profile Completion</h3>
              <span className="text-sm font-bold text-indigo-600">
                {completion}%
              </span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-indigo-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${completion}%` }}
              />
            </div>
            {/* <div className="space-y-3 pt-2">
              <SectionProgress
                label="Personal Info"
                value={profileCompletionData.personalInfo}
              />
              <SectionProgress
                label="About"
                value={profileCompletionData.about}
              />
              <SectionProgress
                label="Specializations"
                value={profileCompletionData.specializations}
              />
            </div> */}
          </CardContent>
        </Card>
        {/* ================= PERSONAL INFO ================= */}

        <Card className="rounded-xl shadow-sm">
          <CardContent className="p-6">
            <div className="flex justify-between mb-4">
              <h3 className="font-semibold text-lg">Personal Information</h3>

              {isEditingProfile ? (
                <div className="flex gap-2">
                  <Button onClick={() => setIsEditingProfile(false)}>
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      resetData();
                      setIsEditingProfile(false);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button onClick={() => setIsEditingProfile(true)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              )}
            </div>

            <div className="flex gap-6">
              <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center text-3xl font-bold text-indigo-600">
                {formData.name.charAt(0)}
              </div>

              <div className="flex-1 space-y-3">
                {isEditingProfile ? (
                  <>
                    <Input
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      placeholder="Name"
                    />
                    <Input
                      value={formData.title}
                      onChange={(e) => handleChange("title", e.target.value)}
                      placeholder="Title"
                    />
                    <Input
                      value={formData.linkedin}
                      onChange={(e) => handleChange("linkedin", e.target.value)}
                      placeholder="linkedIn URL"
                    />
                    <Input
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="Email"
                    />
                    <Input
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      placeholder="Phone"
                    />
                    <Input
                      value={formData.location}
                      onChange={(e) => handleChange("location", e.target.value)}
                      placeholder="Location"
                    />
                  </>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold">{formData.name}</h2>
                    <p className="text-gray-600">{formData.title}</p>
                    <p className="text-gray-500">{formData.linkedin}</p>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
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
                        <Calendar className="w-4 h-4" /> Joined{" "}
                        {formData.joined}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ================= ABOUT ================= */}
        <Card className="rounded-xl">
          <CardContent className="p-6">
            <div className="flex justify-between mb-4">
              <h3 className="font-semibold text-lg">About</h3>

              {isEditingAbout ? (
                <div className="flex gap-2">
                  <Button onClick={() => setIsEditingAbout(false)}>Save</Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      resetData();
                      setIsEditingAbout(false);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button onClick={() => setIsEditingAbout(true)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              )}
            </div>

            {isEditingAbout ? (
              <Textarea
                rows={5}
                value={formData.bio}
                onChange={(e) => handleChange("bio", e.target.value)}
              />
            ) : (
              <p className="text-sm text-gray-600">{formData.bio}</p>
            )}
          </CardContent>
        </Card>

        {/* ================= SPECIALIZATIONS ================= */}
        <Card className="rounded-xl">
          <CardContent className="p-6">
            <div className="flex justify-between mb-4">
              <h3 className="font-semibold text-lg">Specializations</h3>

              {isEditingSpecs ? (
                <div className="flex gap-2">
                  <Button onClick={() => setIsEditingSpecs(false)}>Save</Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      resetData();
                      setIsEditingSpecs(false);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button onClick={() => setIsEditingSpecs(true)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              {formData.specializations.map((spec, i) => (
                <Badge
                  key={i}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {spec}

                  {isEditingSpecs && (
                    <X
                      className="w-3 h-3 cursor-pointer"
                      onClick={() => handleRemoveSpec(i)}
                    />
                  )}
                </Badge>
              ))}
            </div>

            {isEditingSpecs && (
              <div className="flex gap-2">
                <Input
                  placeholder="Add specialization"
                  value={newSpec}
                  onChange={(e) => setNewSpec(e.target.value)}
                />
                <Button size="icon" onClick={handleAddSpec}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// const SectionProgress = ({
//   label,
//   value,
// }: {
//   label: string;
//   value: number;
// }) => (
//   <div className="space-y-1">
//     <div className="flex justify-between text-xs text-gray-600">
//       <span>{label}</span>
//       <span>{value}%</span>
//     </div>
//     <div className="w-full bg-gray-200 rounded-full h-2">
//       <div
//         className="bg-indigo-500 h-2 rounded-full"
//         style={{ width: `${value}%` }}
//       />
//     </div>
//   </div>
// );
