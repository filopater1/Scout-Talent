import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { BrainCircuit, User, Building2 } from "lucide-react";

type Role = "applicant" | "company";

export default function AuthPage() {
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState<Role>("applicant");
  const [companyMode, setCompanyMode] = useState<"create" | "join">("create");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    role: "applicant",
    jobTitle: "",
    location: "",
    linkedinUrl: "",
    companyName: "",
    inviteCode: "",
  });

  /* ==============================
     Sync role
  ============================== */
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      role: selectedRole,
    }));
  }, [selectedRole]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* ==============================
     LOGIN (mock)
  ============================== */
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedRole === "applicant") {
      navigate("/applicant");
    } else {
      navigate("/company");
    }
  };

  /* ==============================
     SIGNUP
  ============================== */
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const payload = {
      ...formData,
      companyName:
        selectedRole === "company" && companyMode === "create"
          ? formData.companyName
          : undefined,
      inviteCode:
        selectedRole === "company" && companyMode === "join"
          ? formData.inviteCode
          : undefined,
    };

    console.log("Signup Payload:", payload);

    navigate("/login");
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
            <CardTitle>Welcome</CardTitle>
            <CardDescription>Login or create your account</CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              {/* ================= LOGIN ================= */}
              <TabsContent value="login" className="space-y-4 mt-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input type="email" placeholder="you@example.com" />
                  </div>

                  <div className="space-y-2">
                    <Label>Password</Label>
                    <Input type="password" placeholder="••••••••" />
                  </div>

                  {/* Role selector */}
                  <div className="space-y-2">
                    <Label>Select Your Role</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {(["applicant", "company"] as Role[]).map((role) => (
                        <button
                          key={role}
                          type="button"
                          onClick={() => setSelectedRole(role)}
                          className={`p-3 border rounded-lg flex flex-col items-center gap-2 transition-all ${
                            selectedRole === role
                              ? "border-indigo-600 bg-indigo-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          {role === "applicant" && <User />}
                          {role === "company" && <Building2 />}
                          <span className="text-xs font-medium capitalize">
                            {role}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button type="submit" className="w-full">
                    Sign In
                  </Button>
                </form>
              </TabsContent>

              {/* ================= SIGNUP ================= */}
              <TabsContent value="signup" className="space-y-4 mt-4">
                <form onSubmit={handleSignup} className="space-y-4">
                  <Input
                    name="fullName"
                    placeholder={
                      selectedRole === "applicant"
                        ? "Full Name"
                        : "Company Name"
                    }
                    onChange={handleChange}
                  />
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email"
                    onChange={handleChange}
                  />
                  <Input
                    name="phone"
                    placeholder="Phone"
                    onChange={handleChange}
                  />
                  <Input
                    name="jobTitle"
                    placeholder="Job Title"
                    onChange={handleChange}
                  />
                  <Input
                    name="location"
                    placeholder="Location"
                    onChange={handleChange}
                  />

                  {/* Applicant only */}

                  <Input
                    name="linkedinUrl"
                    placeholder="LinkedIn URL"
                    onChange={handleChange}
                  />

                  {/* {selectedRole === "company" && (
                    <Input
                      name="companyName"
                      placeholder="Company Name"
                      onChange={handleChange}
                    />
                  )} */}
                  {/* Company only */}
                  {/* {selectedRole === "company" && (
                    <div className="space-y-3">
                      <Label>Company Setup</Label>

                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant={
                            companyMode === "create" ? "default" : "outline"
                          }
                          onClick={() => setCompanyMode("create")}
                        >
                          Create
                        </Button>

                        <Button
                          type="button"
                          variant={
                            companyMode === "join" ? "default" : "outline"
                          }
                          onClick={() => setCompanyMode("join")}
                        >
                          Join
                        </Button>
                      </div>

                      {companyMode === "create" ? (
                        <Input
                          name="companyName"
                          placeholder="Company Name"
                          onChange={handleChange}
                        />
                      ) : (
                        <Input
                          name="inviteCode"
                          placeholder="Company Invite Code"
                          onChange={handleChange}
                        />
                      )}
                    </div>
                  )} */}

                  <Input
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                  />

                  <Input
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    onChange={handleChange}
                  />

                  {/* Role selector */}
                  <div className="grid grid-cols-2 gap-2">
                    {(["applicant", "company"] as Role[]).map((role) => (
                      <button
                        key={role}
                        type="button"
                        onClick={() => setSelectedRole(role)}
                        className={`p-3 border rounded-lg ${
                          selectedRole === role
                            ? "border-indigo-600 bg-indigo-50"
                            : "border-gray-200"
                        }`}
                      >
                        <span className="text-xs font-medium capitalize">
                          {role}
                        </span>
                      </button>
                    ))}
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
