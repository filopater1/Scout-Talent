import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { BrainCircuit, User, Briefcase, Building2 } from "lucide-react";

export default function AuthPage() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<
    "applicant" | "recruiter" | "hr"
  >("applicant");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    role: "applicant",
    jobTitle: "",
    yearsOfExperience: "",
    location: "",
    linkedinUrl: "",
    companyName: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect based on role
    if (selectedRole === "applicant") {
      navigate("/applicant");
    } else if (selectedRole === "recruiter") {
      navigate("/recruiter");
    } else {
      navigate("/analytics");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center">
              <BrainCircuit className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-bold text-gray-900">Hakeem</span>
          </div>
          <p className="text-gray-600">AI-Powered Recruitment Platform</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4 mt-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      defaultValue="demo@scouttalent.ai"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      defaultValue="demo123"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Select Your Role</Label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedRole("applicant")}
                        className={`p-3 border rounded-lg flex flex-col items-center gap-2 transition-all ${
                          selectedRole === "applicant"
                            ? "border-indigo-600 bg-indigo-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <User
                          className={`w-5 h-5 ${selectedRole === "applicant" ? "text-indigo-600" : "text-gray-600"}`}
                        />
                        <span
                          className={`text-xs font-medium ${selectedRole === "applicant" ? "text-indigo-600" : "text-gray-600"}`}
                        >
                          Applicant
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedRole("recruiter")}
                        className={`p-3 border rounded-lg flex flex-col items-center gap-2 transition-all ${
                          selectedRole === "recruiter"
                            ? "border-indigo-600 bg-indigo-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <Briefcase
                          className={`w-5 h-5 ${selectedRole === "recruiter" ? "text-indigo-600" : "text-gray-600"}`}
                        />
                        <span
                          className={`text-xs font-medium ${selectedRole === "recruiter" ? "text-indigo-600" : "text-gray-600"}`}
                        >
                          Recruiter
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedRole("hr")}
                        className={`p-3 border rounded-lg flex flex-col items-center gap-2 transition-all ${
                          selectedRole === "hr"
                            ? "border-indigo-600 bg-indigo-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <Building2
                          className={`w-5 h-5 ${selectedRole === "hr" ? "text-indigo-600" : "text-gray-600"}`}
                        />
                        <span
                          className={`text-xs font-medium ${selectedRole === "hr" ? "text-indigo-600" : "text-gray-600"}`}
                        >
                          HR
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <input
                        id="remember"
                        type="checkbox"
                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      <Label
                        htmlFor="remember"
                        className="text-sm text-gray-600"
                      >
                        Remember me
                      </Label>
                    </div>

                    <Link
                      to="/forgot-password"
                      className="text-sm text-indigo-600 hover:underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <Button type="submit" className="w-full">
                    Sign In
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4 mt-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      name="fullName"
                      onChange={handleChange}

                      placeholder="John Doe"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input
                      name="phone"
                      placeholder="+20 10 1234 5678"
                      onChange={handleChange}
                    />
                  </div>

                      <div className="space-y-2">
                        <Label htmlFor="jobTitle">Job Title</Label>
                        <Input
                          id="jobTitle"
                          name="jobTitle"
                          placeholder="Frontend Developer"
                          onChange={handleChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          name="location"
                          placeholder="Cairo, Egypt"
                          onChange={handleChange}
                        />
                      </div>
                  {selectedRole === "applicant" && (
                    <>

                      <div className="space-y-2">
                        <Label htmlFor="linkedinUrl">LinkedIn Profile</Label>
                        <Input
                          id="linkedinUrl"
                          name="linkedinUrl"
                          placeholder="https://linkedin.com/in/username"
                          onChange={handleChange}
                        />
                      </div>
                    </>
                  )}
                  {(selectedRole === "recruiter" || selectedRole === "hr") && (
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input
                        name="companyName"
                        placeholder="Company Name"
                        onChange={handleChange}
                      />
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      name="password"
                      onChange={handleChange}
                      placeholder="••••••••"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Confirm Password</Label>
                    <Input
                      type="password"
                      name="confirmPassword"

                      placeholder="••••••••"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>I am a...</Label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedRole("applicant")}
                        className={`p-3 border rounded-lg flex flex-col items-center gap-2 transition-all ${
                          selectedRole === "applicant"
                            ? "border-indigo-600 bg-indigo-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <User
                          className={`w-5 h-5 ${selectedRole === "applicant" ? "text-indigo-600" : "text-gray-600"}`}
                        />
                        <span
                          className={`text-xs font-medium ${selectedRole === "applicant" ? "text-indigo-600" : "text-gray-600"}`}
                        >
                          Applicant
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedRole("recruiter")}
                        className={`p-3 border rounded-lg flex flex-col items-center gap-2 transition-all ${
                          selectedRole === "recruiter"
                            ? "border-indigo-600 bg-indigo-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <Briefcase
                          className={`w-5 h-5 ${selectedRole === "recruiter" ? "text-indigo-600" : "text-gray-600"}`}
                        />
                        <span
                          className={`text-xs font-medium ${selectedRole === "recruiter" ? "text-indigo-600" : "text-gray-600"}`}
                        >
                          Recruiter
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedRole("hr")}
                        className={`p-3 border rounded-lg flex flex-col items-center gap-2 transition-all ${
                          selectedRole === "hr"
                            ? "border-indigo-600 bg-indigo-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <Building2
                          className={`w-5 h-5 ${selectedRole === "hr" ? "text-indigo-600" : "text-gray-600"}`}
                        />
                        <span
                          className={`text-xs font-medium ${selectedRole === "hr" ? "text-indigo-600" : "text-gray-600"}`}
                        >
                          HR
                        </span>
                      </button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full">
                    Create Account
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-gray-600 mt-6">
          <button
            onClick={() => navigate("/")}
            className="text-indigo-600 hover:underline"
          >
            ← Back to Home
          </button>
        </p>
      </div>
    </div>
  );
}
