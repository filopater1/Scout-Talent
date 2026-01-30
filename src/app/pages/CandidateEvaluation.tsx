import { useNavigate } from 'react-router-dom';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Progress } from '@/app/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
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
  AlertTriangle
} from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

export default function CandidateEvaluation() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              <BrainCircuit className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">Scout Talent</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate('/recruiter')}>
              Back to Pipeline
            </Button>
            <Button variant="outline" onClick={() => navigate('/')}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Candidate Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex gap-6">
              <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center text-3xl font-bold text-indigo-600">
                AJ
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Alex Johnson</h1>
                <p className="text-xl text-gray-600 mb-4">Senior Software Engineer</p>
                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    <span>alex.johnson@email.com</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    <span>+1 (555) 987-6543</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>San Francisco, CA</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>Applied 2 days ago</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600 mb-1">AI Match Score</div>
              <div className="text-5xl font-bold text-indigo-600 mb-2">95%</div>
              <Badge className="bg-green-100 text-green-800">Excellent Match</Badge>
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
                <TabsTrigger value="code">Code Quality</TabsTrigger>
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
                          <span className="text-sm font-medium text-gray-700">{item.label}</span>
                          <span className="text-sm font-semibold text-indigo-600">{item.score}%</span>
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
                            <Badge key={skill} className="bg-green-100 text-green-800">{skill}</Badge>
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
                            <Badge key={skill} className="bg-amber-100 text-amber-800">{skill}</Badge>
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
                        <Radar name="Candidate" dataKey="candidate" stroke="#6366f1" fill="#6366f1" fillOpacity={0.6} />
                        <Radar name="Required" dataKey="required" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                      </RadarChart>
                    </ResponsiveContainer>

                    <div className="mt-6 space-y-3">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Explicit Skills (from CV)</h4>
                        <div className="flex flex-wrap gap-2">
                          {explicitSkills.map((skill) => (
                            <Badge key={skill} variant="default">{skill}</Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Implicit Skills (AI-detected)</h4>
                        <div className="flex flex-wrap gap-2">
                          {implicitSkills.map((skill) => (
                            <Badge key={skill} variant="secondary">{skill}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="code" className="mt-6">
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
                        <p className="text-sm text-gray-600 mt-1">Overall Score</p>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <p className="text-3xl font-bold text-green-600">A</p>
                        <p className="text-sm text-gray-600 mt-1">Code Quality</p>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <p className="text-3xl font-bold text-blue-600">95%</p>
                        <p className="text-sm text-gray-600 mt-1">Test Coverage</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Performance Metrics</h4>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Time Complexity</span>
                            <span className="font-medium text-green-600">Optimal (O(n log n))</span>
                          </div>
                          <Progress value={95} className="bg-gray-200" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Code Maintainability</span>
                            <span className="font-medium text-green-600">Excellent</span>
                          </div>
                          <Progress value={92} className="bg-gray-200" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Best Practices</span>
                            <span className="font-medium text-green-600">High</span>
                          </div>
                          <Progress value={88} className="bg-gray-200" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

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
                        <span className="font-semibold text-green-900">No Bias Detected</span>
                      </div>
                      <p className="text-sm text-green-700">
                        Our AI has analyzed this evaluation and found no indicators of bias related to protected characteristics.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Fairness Metrics</h4>
                      <div className="space-y-3">
                        {fairnessMetrics.map((metric) => (
                          <div key={metric.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm text-gray-700">{metric.name}</span>
                            <Badge className="bg-green-100 text-green-800">{metric.status}</Badge>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm text-blue-900">
                        <strong>Transparency Note:</strong> This candidate was evaluated purely on technical skills, 
                        experience relevance, and cultural fit indicators. No demographic data influenced the scoring.
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
                <Button className="w-full">Move to Interview</Button>
                <Button variant="outline" className="w-full">Schedule Call</Button>
                <Button variant="outline" className="w-full">Send Assessment</Button>
                <Button variant="outline" className="w-full text-red-600 hover:text-red-700">
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
                  <div className="text-sm text-gray-600 mb-1">Years of Experience</div>
                  <div className="text-2xl font-bold text-gray-900">7 years</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Previous Companies</div>
                  <div className="text-2xl font-bold text-gray-900">4</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Education</div>
                  <div className="font-medium text-gray-900">BS Computer Science</div>
                  <div className="text-sm text-gray-600">Stanford University</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

const scoreBreakdown = [
  { label: 'Technical Skills', score: 96 },
  { label: 'Experience Match', score: 94 },
  { label: 'Education', score: 95 },
  { label: 'Cultural Fit', score: 92 }
];

const strongSkills = ['React', 'Node.js', 'TypeScript', 'AWS', 'PostgreSQL', 'Docker', 'Git', 'Agile'];
const partialSkills = ['Kubernetes', 'GraphQL'];
const explicitSkills = ['React', 'Node.js', 'TypeScript', 'Python', 'AWS', 'Docker'];
const implicitSkills = ['System Design', 'Team Leadership', 'Problem Solving', 'Communication'];

const skillsData = [
  { skill: 'React', candidate: 95, required: 90 },
  { skill: 'Node.js', candidate: 92, required: 85 },
  { skill: 'TypeScript', candidate: 90, required: 80 },
  { skill: 'AWS', candidate: 85, required: 75 },
  { skill: 'System Design', candidate: 88, required: 80 },
  { skill: 'Leadership', candidate: 82, required: 70 }
];

const fairnessMetrics = [
  { name: 'Gender Bias Check', status: 'Pass' },
  { name: 'Age Bias Check', status: 'Pass' },
  { name: 'Name Bias Check', status: 'Pass' },
  { name: 'Location Bias Check', status: 'Pass' }
];
