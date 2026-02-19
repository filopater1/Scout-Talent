import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  BrainCircuit, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Clock,
  CheckCircle,
  DollarSign,
  Download
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  AreaChart,
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

export default function AnalyticsReports() {
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
            <span className="text-2xl font-bold text-gray-900">Hakeem</span>
          </div>
          <div className="flex items-center gap-4">
            {/* <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button variant="outline" onClick={() => navigate('/recruiter')}>
              Back to Dashboard
            </Button> */}
            <Button variant="outline" onClick={() => navigate('/')}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics & Reports</h1>
          <p className="text-gray-600">Comprehensive insights into your recruitment performance</p>
        </div>

        {/* KPI Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Total Hires</span>
                <Users className="w-5 h-5 text-green-400" />
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">47</p>
              <div className="flex items-center gap-1 text-sm">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-green-600 font-medium">12%</span>
                <span className="text-gray-500">vs last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Avg Time to Hire</span>
                <Clock className="w-5 h-5 text-blue-400" />
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">18 days</p>
              <div className="flex items-center gap-1 text-sm">
                <TrendingDown className="w-4 h-4 text-green-600" />
                <span className="text-green-600 font-medium">3 days</span>
                <span className="text-gray-500">improvement</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Acceptance Rate</span>
                <CheckCircle className="w-5 h-5 text-purple-400" />
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">78%</p>
              <div className="flex items-center gap-1 text-sm">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-green-600 font-medium">5%</span>
                <span className="text-gray-500">vs last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Cost per Hire</span>
                <DollarSign className="w-5 h-5 text-amber-400" />
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">$3,200</p>
              <div className="flex items-center gap-1 text-sm">
                <TrendingDown className="w-4 h-4 text-green-600" />
                <span className="text-green-600 font-medium">$400</span>
                <span className="text-gray-500">saved</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Analytics Tabs */}
        <Tabs defaultValue="hiring" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="hiring">Hiring Metrics</TabsTrigger>
            <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
            <TabsTrigger value="diversity">Diversity</TabsTrigger>
            <TabsTrigger value="sources">Sources</TabsTrigger>
          </TabsList>

          {/* Hiring Metrics */}
          <TabsContent value="hiring" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Hiring Trend (Last 6 Months)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={hiringTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="hires" stroke="#6366f1" fill="#6366f1" fillOpacity={0.6} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Time to Hire Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={timeToHireData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="range" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Quality of Hire Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-gray-50 rounded-lg">
                    <p className="text-4xl font-bold text-indigo-600 mb-2">4.6/5</p>
                    <p className="text-sm text-gray-600">Manager Satisfaction</p>
                  </div>
                  <div className="text-center p-6 bg-gray-50 rounded-lg">
                    <p className="text-4xl font-bold text-green-600 mb-2">92%</p>
                    <p className="text-sm text-gray-600">90-Day Retention</p>
                  </div>
                  <div className="text-center p-6 bg-gray-50 rounded-lg">
                    <p className="text-4xl font-bold text-blue-600 mb-2">88%</p>
                    <p className="text-sm text-gray-600">Performance Rating</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pipeline Performance */}
          <TabsContent value="pipeline" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Conversion Funnel</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pipelineStages.map((stage, idx) => (
                    <div key={idx}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">{stage.name}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-600">{stage.count} candidates</span>
                          <Badge variant="secondary">{stage.percentage}%</Badge>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-indigo-600 h-3 rounded-full transition-all" 
                          style={{ width: `${stage.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Stage Duration (Avg Days)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={stageDurationData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="stage" type="category" width={100} />
                      <Tooltip />
                      <Bar dataKey="days" fill="#6366f1" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Drop-off by Stage</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={dropoffData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomLabel}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {dropoffData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Diversity & Fairness */}
          <TabsContent value="diversity" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CardTitle>Diversity & Inclusion Metrics</CardTitle>
                  <Badge className="bg-green-100 text-green-800">Compliant</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-6 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-3xl font-bold text-green-600 mb-2">48%</p>
                    <p className="text-sm text-gray-600">Gender Diversity</p>
                    <p className="text-xs text-gray-500 mt-1">Target: 45%+</p>
                  </div>
                  <div className="text-center p-6 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-3xl font-bold text-blue-600 mb-2">62%</p>
                    <p className="text-sm text-gray-600">Underrepresented Groups</p>
                    <p className="text-xs text-gray-500 mt-1">Target: 50%+</p>
                  </div>
                  <div className="text-center p-6 bg-purple-50 border border-purple-200 rounded-lg">
                    <p className="text-3xl font-bold text-purple-600 mb-2">0.98</p>
                    <p className="text-sm text-gray-600">Fairness Score</p>
                    <p className="text-xs text-gray-500 mt-1">Target: 0.95+</p>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Bias Detection Summary</h4>
                  <p className="text-sm text-blue-800">
                    Our AI has analyzed 1,247 hiring decisions in the past quarter. 
                    No systematic bias was detected across gender, ethnicity, or age groups. 
                    All protected characteristics show balanced representation within acceptable variance.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Hiring Distribution by Department</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={departmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="department" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="diverse" stackId="a" fill="#10b981" name="Diverse Hires" />
                    <Bar dataKey="other" stackId="a" fill="#6366f1" name="Other Hires" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Source Analytics */}
          <TabsContent value="sources" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Candidates by Source</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={sourceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomLabel}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {sourceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quality Score by Source</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sourceQualityData.map((source, idx) => (
                      <div key={idx}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">{source.name}</span>
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-indigo-600 font-semibold">{source.score}/10</span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-indigo-600 h-2 rounded-full" 
                            style={{ width: `${(source.score / 10) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Source Performance Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Source</th>
                        <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Applicants</th>
                        <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Hires</th>
                        <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Conversion</th>
                        <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Avg Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sourcePerformanceData.map((source, idx) => (
                        <tr key={idx} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4 text-sm text-gray-900">{source.name}</td>
                          <td className="py-3 px-4 text-sm text-gray-600 text-right">{source.applicants}</td>
                          <td className="py-3 px-4 text-sm text-gray-600 text-right">{source.hires}</td>
                          <td className="py-3 px-4 text-sm text-right">
                            <Badge className="bg-indigo-100 text-indigo-800">{source.conversion}%</Badge>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600 text-right">{source.avgTime}d</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

const renderCustomLabel = ({ name, percent }: any) => {
  return `${name} ${(percent * 100).toFixed(0)}%`;
};

const hiringTrendData = [
  { month: 'Aug', hires: 6 },
  { month: 'Sep', hires: 8 },
  { month: 'Oct', hires: 7 },
  { month: 'Nov', hires: 9 },
  { month: 'Dec', hires: 11 },
  { month: 'Jan', hires: 12 }
];

const timeToHireData = [
  { range: '0-7d', count: 5 },
  { range: '8-14d', count: 12 },
  { range: '15-21d', count: 18 },
  { range: '22-30d', count: 10 },
  { range: '30+d', count: 2 }
];

const pipelineStages = [
  { name: 'Applications', count: 234, percentage: 100 },
  { name: 'Screening', count: 156, percentage: 67 },
  { name: 'Interview', count: 89, percentage: 38 },
  { name: 'Offer', count: 47, percentage: 20 },
  { name: 'Hired', count: 37, percentage: 16 }
];

const stageDurationData = [
  { stage: 'Screening', days: 3 },
  { stage: 'Interview', days: 7 },
  { stage: 'Assessment', days: 4 },
  { stage: 'Offer', days: 2 },
  { stage: 'Acceptance', days: 2 }
];

const dropoffData = [
  { name: 'After Screening', value: 78 },
  { name: 'After Interview', value: 42 },
  { name: 'After Offer', value: 10 }
];

const departmentData = [
  { department: 'Engineering', diverse: 12, other: 8 },
  { department: 'Product', diverse: 6, other: 4 },
  { department: 'Design', diverse: 5, other: 3 },
  { department: 'Sales', diverse: 8, other: 6 },
  { department: 'Marketing', diverse: 6, other: 4 }
];

const sourceData = [
  { name: 'LinkedIn', value: 35 },
  { name: 'Company Site', value: 28 },
  { name: 'Referrals', value: 20 },
  { name: 'Indeed', value: 12 },
  { name: 'Other', value: 5 }
];

const sourceQualityData = [
  { name: 'Referrals', score: 9.2 },
  { name: 'LinkedIn', score: 8.5 },
  { name: 'Company Site', score: 8.1 },
  { name: 'Indeed', score: 7.3 },
  { name: 'Other Boards', score: 6.8 }
];

const sourcePerformanceData = [
  { name: 'LinkedIn', applicants: 456, hires: 18, conversion: 3.9, avgTime: 19 },
  { name: 'Company Career Site', applicants: 312, hires: 14, conversion: 4.5, avgTime: 16 },
  { name: 'Employee Referrals', applicants: 89, hires: 12, conversion: 13.5, avgTime: 12 },
  { name: 'Indeed', applicants: 234, hires: 7, conversion: 3.0, avgTime: 22 },
  { name: 'Glassdoor', applicants: 156, hires: 4, conversion: 2.6, avgTime: 25 }
];
