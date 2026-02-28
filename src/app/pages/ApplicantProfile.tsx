import { useState, useRef } from "react";
import {
  BrainCircuit,
  User,
  Briefcase,
  Award,
  Upload,
  Edit,
  X,
} from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/badge";
import { uploadCV } from "../../services/profileService";

export default function ApplicantProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [skills, setSkills] = useState(["React", "TypeScript"]);
  const [newSkill, setNewSkill] = useState("");
  const [experiences, setExperiences] = useState([
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "Google",
      startDate: "2021",
      endDate: "Present",
      description:
        "Working on scalable React applications used by millions of users.",
    },
  ]);

  const [isAddingExp, setIsAddingExp] = useState(false);
  const [editingExpId, setEditingExpId] = useState<number | null>(null);

  const [expForm, setExpForm] = useState({
    title: "",
    company: "",
    startDate: "",
    endDate: "",
    description: "",
  });
  const handleExpChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setExpForm({ ...expForm, [e.target.name]: e.target.value });
  };

  const resetExpForm = () => {
    setExpForm({
      title: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
    });
    setEditingExpId(null);
    setIsAddingExp(false);
  };

  const saveExperience = () => {
    if (!expForm.title || !expForm.company) return;

    if (editingExpId) {
      setExperiences((prev) =>
        prev.map((exp) =>
          exp.id === editingExpId ? { ...exp, ...expForm } : exp,
        ),
      );
    } else {
      setExperiences([...experiences, { id: Date.now(), ...expForm }]);
    }

    resetExpForm();
  };

  const editExperience = (exp: any) => {
    setExpForm(exp);
    setEditingExpId(exp.id);
    setIsAddingExp(true);
  };

  const deleteExperience = (id: number) => {
    setExperiences(experiences.filter((exp) => exp.id !== id));
  };

  //   const [file, setFile] = useState<File | null>(null);
  //   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  //   const [isUploading, setIsUploading] = useState(false);
  //   const [error, setError] = useState<string | null>(null);

  //   const fileInputRef = useRef<HTMLInputElement>(null);

  //   const handleCardClick = () => {
  //     fileInputRef.current?.click();
  //   };

  //   const handleUpload = async () => {
  //     if (!file) return;

  //     try {
  //       setIsUploading(true);
  //       await uploadCV("1", file);
  //       alert("CV Uploaded Successfully");
  //     } catch (err) {
  //       setError("Upload failed. Please try again.");
  //     } finally {
  //       setIsUploading(false);
  //     }
  //   };

  //   const handleFileChange = (selectedFile: File | null) => {
  //     if (!selectedFile) return;

  //     const allowedTypes = [
  //       "application/pdf",
  //       "application/msword",
  //       "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  //     ];

  //     if (!allowedTypes.includes(selectedFile.type)) {
  //       setError("Only PDF or Word documents are allowed.");
  //       return;
  //     }

  //     if (selectedFile.size > 5 * 1024 * 1024) {
  //       setError("File size must be less than 5MB.");
  //       return;
  //     }

  //     setError(null);
  //     setFile(selectedFile);

  //     if (selectedFile.type === "application/pdf") {
  //       const url = URL.createObjectURL(selectedFile);
  //       setPreviewUrl(url);
  //     } else {
  //       setPreviewUrl(null);
  //     }
  //   };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const profileCompletion = 75;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
            <BrainCircuit className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-gray-900">Hakeem</span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        {/* Profile Completion */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Complete Your Profile</CardTitle>
              <Badge>{profileCompletion}%</Badge>
            </div>
            <p className="text-gray-600 text-sm">
              Complete your profile to get better job matches
            </p>
          </CardHeader>
          <CardContent>
            <Progress value={profileCompletion} />
            <div className="flex gap-6 mt-4 text-sm">
              <span className="text-green-600">✔ Basic Info</span>
              <span className="text-green-600">✔ Work Experience</span>
              <span className="text-orange-500">⚠ Skills Assessment</span>
            </div>
          </CardContent>
        </Card>

        {/* Basic Info */}
        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Basic Information
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Edit className="w-4 h-4 mr-1" />
              {isEditing ? "Cancel" : "Edit"}
            </Button>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            <Input defaultValue="John" disabled={!isEditing} />
            <Input
              defaultValue="Senior Software Engineer"
              disabled={!isEditing}
            />
            <Input defaultValue="john.doe@email.com" disabled={!isEditing} />
            <Input defaultValue="+1 555 123 4567" disabled={!isEditing} />
            <Input defaultValue="San Francisco, CA" disabled={!isEditing} />
            <Input
              defaultValue="https://linkedin.com/in/johndoe"
              disabled={!isEditing}
            />
          </CardContent>
        </Card>

        {/* Work Experience */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              Work Experience
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {experiences.map((exp) => (
              <div key={exp.id} className="border rounded-lg p-4 relative">
                <div className="absolute top-3 right-3 flex gap-2">
                  <button onClick={() => editExperience(exp)}>
                    <Edit className="w-4 h-4 text-gray-500 hover:text-black" />
                  </button>
                  <button onClick={() => deleteExperience(exp.id)}>
                    <X className="w-4 h-4 text-red-500" />
                  </button>
                </div>

                <h4 className="font-semibold">{exp.title}</h4>
                <p className="text-sm text-gray-600">
                  {exp.company} • {exp.startDate} - {exp.endDate}
                </p>
                <p className="text-gray-600 mt-2 text-sm">{exp.description}</p>
              </div>
            ))}

            {!isAddingExp ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAddingExp(true)}
              >
                + Add Experience
              </Button>
            ) : (
              <div className="border rounded-lg p-4 space-y-3 bg-gray-50">
                <Input
                  name="title"
                  placeholder="Job Title"
                  value={expForm.title}
                  onChange={handleExpChange}
                />
                <Input
                  name="company"
                  placeholder="Company"
                  value={expForm.company}
                  onChange={handleExpChange}
                />
                <div className="flex gap-2">
                  <Input
                    name="startDate"
                    placeholder="Start Date"
                    value={expForm.startDate}
                    onChange={handleExpChange}
                  />
                  <Input
                    name="endDate"
                    placeholder="End Date (or Present)"
                    value={expForm.endDate}
                    onChange={handleExpChange}
                  />
                </div>
                <Textarea
                  name="description"
                  placeholder="Describe your responsibilities..."
                  value={expForm.description}
                  onChange={handleExpChange}
                />

                <div className="flex justify-end gap-2">
                  <Button variant="ghost" onClick={resetExpForm}>
                    Cancel
                  </Button>
                  <Button onClick={saveExperience}>
                    {editingExpId ? "Update" : "Save"}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Skills */}
        <Card>
          <CardHeader>
            <CardTitle>Skills</CardTitle>
          </CardHeader>

          <CardContent>
            {/* Existing Skills */}
            <div className="flex flex-wrap gap-2 mb-4">
              {skills.map((skill) => (
                <div
                  key={skill}
                  className="flex items-center gap-1 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
                >
                  {skill}

                  <button onClick={() => removeSkill(skill)}>
                    <X className="w-3 h-3 cursor-pointer" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add Skill */}

            <div className="flex gap-2">
              <input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addSkill()}
                placeholder="Add a skill..."
                className="flex-1 border rounded-md px-3 py-2 text-sm"
              />

              <Button onClick={addSkill} size="sm">
                Add
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* CV Upload */}
        {/* <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              CV Documents
            </CardTitle>
          </CardHeader>
          <CardContent
            onClick={() => !file && fileInputRef.current?.click()}
            className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition space-y-4"
          >
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              ref={fileInputRef}
              className="hidden"
              onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
            />

            {!file ? (
              <>
                <Upload className="w-8 h-8 mx-auto text-gray-400" />
                <p className="text-gray-600">
                  Click to upload your CV (PDF, DOC, DOCX)
                </p>
                <p className="text-xs text-gray-400">Max size: 5MB</p>
              </>
            ) : (
              <div className="space-y-4">
           
                <div className="bg-gray-100 rounded-lg p-4 text-left">
                  <p className="font-medium text-sm">{file.name}</p>
                  <p className="text-xs text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>

             

          
                <div className="flex justify-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFile(null);
                      setPreviewUrl(null);
                    }}
                  >
                    Remove
                  </Button>

                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUpload();
                    }}
                    disabled={isUploading}
                  >
                    {isUploading ? "Uploading..." : "Upload CV"}
                  </Button>
                </div>
              </div>
            )}

            {error && <p className="text-sm text-red-500">{error}</p>}
          </CardContent>
        </Card> */}

        {/* Save */}
        {isEditing && (
          <div className="flex justify-end">
            <Button size="lg">Save Changes</Button>
          </div>
        )}
      </div>
    </div>
  );
}
