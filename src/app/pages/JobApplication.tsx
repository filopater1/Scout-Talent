import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import {
  BrainCircuit,
  Building2,
  MapPin,
  DollarSign,
  Clock,
  CheckCircle,
  Upload,
  Sparkles,
} from "lucide-react";

export default function JobApplication() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showAIMatch, setShowAIMatch] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const validateFile = (selectedFile: File) => {
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      return "Only PDF or Word documents are allowed.";
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      return "File size must be less than 10MB.";
    }

    return null;
  };

  const handleFile = (selectedFile: File | null) => {
    if (!selectedFile) return;

    const validationError = validateFile(selectedFile);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setFile(selectedFile);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleSubmit = () => {
    setShowAIMatch(true);
    setTimeout(() => {
      navigate("/applicant");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              <BrainCircuit className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              Hakeem
            </span>
          </div>
          <Button variant="ghost" onClick={() => navigate("/applicant")}>
            Exit Application
          </Button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-gray-600">
              Step {step} of 4
            </h2>
            <span className="text-sm text-gray-600">
              {Math.round((step / 4) * 100)}% Complete
            </span>
          </div>
          <Progress value={(step / 4) * 100} />
        </div>

        {!showAIMatch ? (
          <>
            {/* Job Details */}
            {step === 1 && (
              <Card className="w-full max-w-3xl mx-auto">
                <CardHeader>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl sm:text-2xl mb-2">
                        Senior Software Engineer
                      </CardTitle>

                      <div className="grid grid-cols-1 gap-2 text-gray-600 sm:flex sm:flex-wrap sm:items-center sm:gap-4">
                        <div className="flex items-center gap-1">
                          <Building2 className="w-4 h-4 shrink-0" />
                          <span>TechCorp Inc.</span>
                        </div>

                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4 shrink-0" />
                          <span>Remote</span>
                        </div>

                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4 shrink-0" />
                          <span>$120k - $180k</span>
                        </div>

                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4 shrink-0" />
                          <span>Full-time</span>
                        </div>
                      </div>
                    </div>

                    <Badge className="bg-green-100 text-green-800 self-start sm:self-auto">
                      Actively Hiring
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6 p-4 sm:p-6">
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg mb-2">
                      About the Role
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      We're looking for an experienced Software Engineer to join
                      our growing team. You'll work on cutting-edge products
                      that impact millions of users worldwide. This role
                      requires strong technical skills and excellent
                      communication abilities.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-base sm:text-lg mb-2">

                      Required Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "React",
                        "Node.js",
                        "TypeScript",
                        "AWS",
                        "PostgreSQL",
                        "Docker",
                      ].map((skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                   <h3 className="font-semibold text-base sm:text-lg mb-2">


                      Responsibilities
                    </h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>
                          Design and develop scalable web applications
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Collaborate with cross-functional teams</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>
                          Mentor junior developers and conduct code reviews
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Participate in architectural decisions</span>
                      </li>
                    </ul>
                  </div>

                  <Button
                    onClick={() => setStep(2)}
                    className="w-full"
                    size="lg"
                  >
                    Continue to Application
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Personal Info */}
            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" defaultValue="John" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" defaultValue="Doe" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        defaultValue="john.doe@email.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        defaultValue="+1 (555) 123-4567"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Current Location</Label>
                      <Input id="location" defaultValue="San Francisco, CA" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="linkedin">LinkedIn Profile</Label>
                      <Input
                        id="linkedin"
                        defaultValue="https://linkedin.com/in/johndoe"
                      />
                    </div>

                    <div className="flex gap-4">
                      <Button variant="outline" onClick={() => setStep(1)}>
                        Back
                      </Button>
                      <Button onClick={() => setStep(3)} className="flex-1">
                        Continue
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* CV Upload */}
            {step === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle>Upload Your CV</CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragActive(true);
                    }}
                    onDragLeave={() => setDragActive(false)}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-lg 
    p-6 sm:p-10 md:p-12 
    text-center transition cursor-pointer
    ${
      dragActive
        ? "border-indigo-500 bg-indigo-50"
        : "border-gray-300 hover:border-indigo-400"
    }
  `}
                  >
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={(e) => handleFile(e.target.files?.[0] || null)}
                    />

                    {!file ? (
                      <>
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-2">
                          Drag & drop your CV here, or click to browse
                        </p>
                        <p className="text-sm text-gray-500">
                          PDF, DOC, DOCX up to 10MB
                        </p>
                      </>
                    ) : (
                      <div className="flex flex-col sm:flex-row items-center gap-4 justify-center text-center sm:text-left">
                        <div className="w-12 h-12 bg-indigo-100 rounded flex items-center justify-center">
                          <span className="text-indigo-600 font-semibold text-sm">
                            {file.name.split(".").pop()?.toUpperCase()}
                          </span>
                        </div>

                        <div className="text-left">
                          <p className="font-medium text-gray-900 break-all max-w-xs sm:max-w-sm md:max-w-md">
                            {file.name}
                          </p>

                          <p className="text-sm text-gray-600">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setFile(null);
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                    )}
                  </div>

                  {error && (
                    <p className="text-sm text-red-500 text-center">{error}</p>
                  )}

                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setStep(2)}>
                      Back
                    </Button>

                    <Button
                      onClick={() => setStep(4)}
                      className="flex-1"
                      disabled={!file}
                    >
                      Continue
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Cover Letter */}
            {step === 4 && (
              <Card>
                <CardHeader>
                  <CardTitle>Cover Letter (Optional)</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="coverLetter">
                        Tell us why you're a great fit
                      </Label>
                      <Textarea
                        id="coverLetter"
                        rows={10}
                        placeholder="Share your motivation, relevant experience, and why you want to join TechCorp..."
                        defaultValue="I am excited to apply for the Senior Software Engineer position at TechCorp. With over 7 years of experience in full-stack development..."
                      />
                    </div>

                    <div className="flex gap-4">
                      <Button variant="outline" onClick={() => setStep(3)}>
                        Back
                      </Button>
                      <Button onClick={handleSubmit} className="flex-1">
                        Submit Application
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
          </>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <Sparkles className="w-10 h-10 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Analyzing Your Application...
              </h2>
              <p className="text-gray-600 mb-6">
                Our AI is processing your CV and matching it with job
                requirements
              </p>

              <div className="max-w-md mx-auto space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">AI Match Score</span>
                  <span className="text-2xl font-bold text-indigo-600">
                    92%
                  </span>
                </div>
                <Progress value={92} className="h-3" />

                <div className="grid grid-cols-3 gap-4 pt-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">8/10</p>
                    <p className="text-xs text-gray-600">Skills Match</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">95%</p>
                    <p className="text-xs text-gray-600">Experience</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">High</p>
                    <p className="text-xs text-gray-600">Culture Fit</p>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-500 mt-8">
                Redirecting to dashboard...
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
