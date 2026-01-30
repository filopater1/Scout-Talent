import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Progress } from '@/app/components/ui/progress';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { Label } from '@/app/components/ui/label';
import { 
  BrainCircuit, 
  Building2, 
  MapPin, 
  DollarSign, 
  Clock,
  CheckCircle,
  Upload,
  Sparkles
} from 'lucide-react';

export default function JobApplication() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showAIMatch, setShowAIMatch] = useState(false);

  const handleSubmit = () => {
    setShowAIMatch(true);
    setTimeout(() => {
      navigate('/applicant');
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
            <span className="text-2xl font-bold text-gray-900">Scout Talent</span>
          </div>
          <Button variant="ghost" onClick={() => navigate('/applicant')}>
            Exit Application
          </Button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-gray-600">Step {step} of 4</h2>
            <span className="text-sm text-gray-600">{Math.round((step / 4) * 100)}% Complete</span>
          </div>
          <Progress value={(step / 4) * 100} />
        </div>

        {!showAIMatch ? (
          <>
            {/* Job Details */}
            {step === 1 && (
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl mb-2">Senior Software Engineer</CardTitle>
                      <div className="flex items-center gap-4 text-gray-600">
                        <div className="flex items-center gap-1">
                          <Building2 className="w-4 h-4" />
                          <span>TechCorp Inc.</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>Remote</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          <span>$120k - $180k</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>Full-time</span>
                        </div>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Actively Hiring</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">About the Role</h3>
                    <p className="text-gray-600 leading-relaxed">
                      We're looking for an experienced Software Engineer to join our growing team. 
                      You'll work on cutting-edge products that impact millions of users worldwide.
                      This role requires strong technical skills and excellent communication abilities.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-2">Required Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {['React', 'Node.js', 'TypeScript', 'AWS', 'PostgreSQL', 'Docker'].map(skill => (
                        <Badge key={skill} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-2">Responsibilities</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Design and develop scalable web applications</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Collaborate with cross-functional teams</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Mentor junior developers and conduct code reviews</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Participate in architectural decisions</span>
                      </li>
                    </ul>
                  </div>

                  <Button onClick={() => setStep(2)} className="w-full" size="lg">
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
                      <Input id="email" type="email" defaultValue="john.doe@email.com" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Current Location</Label>
                      <Input id="location" defaultValue="San Francisco, CA" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="linkedin">LinkedIn Profile</Label>
                      <Input id="linkedin" defaultValue="https://linkedin.com/in/johndoe" />
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
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-indigo-400 transition-colors cursor-pointer">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Drag and drop your CV here, or click to browse</p>
                    <p className="text-sm text-gray-500">PDF, DOC, DOCX up to 10MB</p>
                    <Button variant="outline" className="mt-4">
                      Select File
                    </Button>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-2">Uploaded Document</h4>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-100 rounded flex items-center justify-center">
                        <span className="text-red-600 font-semibold text-sm">PDF</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">John_Doe_Resume_2026.pdf</p>
                        <p className="text-sm text-gray-600">245 KB</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Ready</Badge>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setStep(2)}>
                      Back
                    </Button>
                    <Button onClick={() => setStep(4)} className="flex-1">
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
                      <Label htmlFor="coverLetter">Tell us why you're a great fit</Label>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Analyzing Your Application...</h2>
              <p className="text-gray-600 mb-6">Our AI is processing your CV and matching it with job requirements</p>
              
              <div className="max-w-md mx-auto space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">AI Match Score</span>
                  <span className="text-2xl font-bold text-indigo-600">92%</span>
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

              <p className="text-sm text-gray-500 mt-8">Redirecting to dashboard...</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
