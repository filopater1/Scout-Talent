import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  BrainCircuit,
  Users,
  Clock,
  TrendingUp,
  CheckCircle,
  Plus,
  Search,
  Filter,
  Menu,
  X,
  User,
} from "lucide-react";
import { Input } from "../components/ui/input";

type CandidateStatus = "New" | "Screening" | "Interview" | "Offer" | "Hired";

interface Candidate {
  id: number;
  name: string;
  position: string;
  aiScore: number;
  skills: string[];
  appliedDate: string;
  avatar: string;
  status: CandidateStatus;
}

export default function RecruiterDashboard() {
  const navigate = useNavigate();
  const [candidates] = useState<Candidate[]>(initialCandidates);
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<CandidateStatus | "All">(
    "All",
  );
  const [minScore, setMinScore] = useState(0);
  const [skillFilter, setSkillFilter] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const filteredCandidates = candidates.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.position.toLowerCase().includes(search.toLowerCase()) ||
      c.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus =
      selectedStatus === "All" || c.status === selectedStatus;

    const matchesScore = c.aiScore >= minScore;

    const matchesSkill =
      skillFilter === "" ||
      c.skills.some((s) => s.toLowerCase().includes(skillFilter.toLowerCase()));

    return matchesSearch && matchesStatus && matchesScore && matchesSkill;
  });

  const getColumnCandidates = (status: CandidateStatus) => {
    return filteredCandidates.filter((c) => c.status === status);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="max-w-full px-4 sm:px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              <BrainCircuit className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl sm:text-2xl font-bold text-gray-900">
              Hakeem
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate("/analytics")}>
              Analytics
            </Button>

            <Button onClick={() => navigate("/my-posts")}>My Job Posts</Button>

            <Button
              onClick={() => navigate("/company/profile")}
              variant="outline"
            >
              <User className="w-4 h-4 mr-1" />
              Profile
            </Button>

            <Button variant="outline" onClick={() => navigate("/")}>
              Logout
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="md:hidden px-4 pb-4 space-y-3  bg-white">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate("/analytics")}
            >
              Analytics
            </Button>

            <Button
              variant="outline"
              className="w-full  cursor-pointer text-gray-600"
              onClick={() => navigate("/my-posts")}
            >
              My Job Posts
            </Button>

            <Button
              onClick={() => navigate("/company/profile")}
              variant="outline"
              className="w-full text-sm flex items-center  cursor-pointer  text-gray-600"
            >
              <User className="w-4 h-4 mr-1" />
              Profile
            </Button>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate("/")}
            >
              Logout
            </Button>
          </div>
        )}
      </header>

      <div className="max-w-full px-6 py-8">
        {/* Welcome & KPIs */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Recruitment Pipeline
          </h1>

          {/* KPI Cards */}
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold">Statistics</h3>
            <span className="text-xs text-gray-500">Last 3 months</span>
          </div>
          <div className="grid md:grid-cols-5 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Active Jobs</span>
                  <Users className="w-5 h-5 text-indigo-400" />
                </div>
                <p className="text-3xl font-bold text-gray-900">8</p>
                <p className="text-xs text-gray-500 mt-1">+2 this month</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">
                    Total Candidates
                  </span>
                  <Users className="w-5 h-5 text-blue-400" />
                </div>
                <p className="text-3xl font-bold text-blue-600">47</p>
                <p className="text-xs text-gray-500 mt-1">In pipeline</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">
                    Avg. Time to Hire
                  </span>
                  <Clock className="w-5 h-5 text-amber-400" />
                </div>
                <p className="text-3xl font-bold text-amber-600">18d</p>
                <p className="text-xs text-gray-500 mt-1">
                  -3 days vs last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Offers Sent</span>
                  <TrendingUp className="w-5 h-5 text-green-400" />
                </div>
                <p className="text-3xl font-bold text-green-600">12</p>
                <p className="text-xs text-gray-500 mt-1">This month</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Hired</span>
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                </div>
                <p className="text-3xl font-bold text-emerald-600">9</p>
                <p className="text-xs text-gray-500 mt-1">
                  75% acceptance rate
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <div className="mb-6">
            {/* Top Row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <Input
                  placeholder="Search candidates by name, skills, or position..."
                  className="pl-10"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>

            {/* Filters Panel */}
            {showFilters && (
              <div className="mt-4 bg-white border rounded-lg p-4 grid sm:grid-cols-4 gap-3">
                {/* Status */}
                <select
                  className="border rounded px-3 py-2 text-sm"
                  onChange={(e) =>
                    setSelectedStatus(e.target.value as CandidateStatus | "All")
                  }
                >
                  <option value="All">All Status</option>
                  {columns.map((col) => (
                    <option key={col.id} value={col.id}>
                      {col.title}
                    </option>
                  ))}
                </select>

                {/* Score */}
                <select
                  className="border rounded px-3 py-2 text-sm"
                  onChange={(e) => setMinScore(Number(e.target.value))}
                >
                  <option value={0}>Any Score</option>
                  <option value={70}>70%+</option>
                  <option value={80}>80%+</option>
                  <option value={90}>90%+</option>
                </select>

                {/* Skill */}
                <Input
                  placeholder="Filter by skill..."
                  value={skillFilter}
                  onChange={(e) => setSkillFilter(e.target.value)}
                />

                {/* Reset */}
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearch("");
                    setSelectedStatus("All");
                    setMinScore(0);
                    setSkillFilter("");
                  }}
                >
                  Reset
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Kanban Board */}
        <div
          className="
  flex 
  gap-4 
  overflow-x-auto 
  pb-4
"
        >
          {columns.map((column) => (
            <KanbanColumn
              key={column.id}
              title={column.title}
              count={getColumnCandidates(column.id).length}
              color={column.color}
              candidates={getColumnCandidates(column.id)}
              onCandidateClick={(id) => navigate(`/evaluate/${id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface KanbanColumnProps {
  title: string;
  count: number;
  color: string;
  candidates: Candidate[];
  onCandidateClick: (id: number) => void;
}

function KanbanColumn({
  title,
  count,
  color,
  candidates,
  onCandidateClick,
}: KanbanColumnProps) {
  return (
    <div className="flex flex-col min-w-[85%] sm:min-w-[280px]">
      {/* Column Header */}
      <div className={`p-4 rounded-t-lg ${color}`}>
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <Badge variant="secondary" className="bg-white">
            {count}
          </Badge>
        </div>
      </div>

      {/* Cards Container */}
      <div className="flex-1 bg-gray-100 p-3 rounded-b-lg space-y-3 min-h-[600px]">
        {candidates.map((candidate) => (
          <Card
            key={candidate.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onCandidateClick(candidate.id)}
          >
            <CardContent className="p-5 sm:p-4">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center font-semibold text-indigo-600">
                  {candidate.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 text-base sm:text-sm">
                    {candidate.name}
                  </h4>
                  <p className="text-sm sm:text-xs text-gray-600">
                    {candidate.position}
                  </p>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-600">AI Match Score</span>
                  <span className="text-xs font-semibold text-indigo-600">
                    {candidate.aiScore}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className="bg-indigo-600 h-1.5 rounded-full"
                    style={{ width: `${candidate.aiScore}%` }}
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-3">
                {candidate.skills.slice(0, 3).map((skill, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>

              <div className="text-xs text-gray-500 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Applied {candidate.appliedDate}
              </div>
            </CardContent>
          </Card>
        ))}

        {candidates.length === 0 && (
          <div className="text-center py-8 text-gray-400 text-sm">
            No candidates in this stage
          </div>
        )}
      </div>
    </div>
  );
}

const columns: Array<{ id: CandidateStatus; title: string; color: string }> = [
  { id: "New", title: "New Applications", color: "bg-blue-100" },
  { id: "Screening", title: "Screening", color: "bg-purple-100" },
  { id: "Interview", title: "Interview", color: "bg-amber-100" },
  { id: "Offer", title: "Offer Sent", color: "bg-green-100" },
  { id: "Hired", title: "Hired", color: "bg-emerald-100" },
];

const initialCandidates: Candidate[] = [
  {
    id: 1,
    name: "Alex Johnson",
    position: "Senior Software Engineer",
    aiScore: 95,
    skills: ["React", "Node.js", "AWS"],
    appliedDate: "2 days ago",
    avatar: "AJ",
    status: "New",
  },
  {
    id: 2,
    name: "Maria Garcia",
    position: "Full Stack Developer",
    aiScore: 92,
    skills: ["Python", "Django", "PostgreSQL"],
    appliedDate: "3 days ago",
    avatar: "MG",
    status: "New",
  },
  {
    id: 3,
    name: "James Lee",
    position: "Frontend Engineer",
    aiScore: 88,
    skills: ["Vue.js", "TypeScript", "CSS"],
    appliedDate: "4 days ago",
    avatar: "JL",
    status: "New",
  },
  {
    id: 4,
    name: "Sarah Williams",
    position: "DevOps Engineer",
    aiScore: 94,
    skills: ["Kubernetes", "Docker", "CI/CD"],
    appliedDate: "1 week ago",
    avatar: "SW",
    status: "Screening",
  },
  {
    id: 5,
    name: "David Chen",
    position: "Backend Developer",
    aiScore: 90,
    skills: ["Java", "Spring Boot", "Microservices"],
    appliedDate: "1 week ago",
    avatar: "DC",
    status: "Screening",
  },
  {
    id: 6,
    name: "Emily Brown",
    position: "UI/UX Developer",
    aiScore: 87,
    skills: ["Figma", "React", "Design Systems"],
    appliedDate: "1 week ago",
    avatar: "EB",
    status: "Screening",
  },
  {
    id: 7,
    name: "Michael Taylor",
    position: "Senior Software Engineer",
    aiScore: 93,
    skills: ["Go", "Microservices", "gRPC"],
    appliedDate: "2 weeks ago",
    avatar: "MT",
    status: "Interview",
  },
  {
    id: 8,
    name: "Lisa Anderson",
    position: "Data Engineer",
    aiScore: 91,
    skills: ["Spark", "Airflow", "Python"],
    appliedDate: "2 weeks ago",
    avatar: "LA",
    status: "Interview",
  },
  {
    id: 9,
    name: "Robert Martinez",
    position: "Full Stack Developer",
    aiScore: 89,
    skills: ["Angular", "NestJS", "MongoDB"],
    appliedDate: "3 weeks ago",
    avatar: "RM",
    status: "Offer",
  },
  {
    id: 10,
    name: "Jennifer Wilson",
    position: "Senior Backend Engineer",
    aiScore: 96,
    skills: [".NET", "Azure", "SQL Server"],
    appliedDate: "3 weeks ago",
    avatar: "JW",
    status: "Offer",
  },
  {
    id: 11,
    name: "Thomas Moore",
    position: "DevOps Engineer",
    aiScore: 92,
    skills: ["Terraform", "AWS", "Jenkins"],
    appliedDate: "1 month ago",
    avatar: "TM",
    status: "Hired",
  },
  {
    id: 12,
    name: "Patricia Davis",
    position: "Frontend Developer",
    aiScore: 88,
    skills: ["React", "Next.js", "Tailwind"],
    appliedDate: "1 month ago",
    avatar: "PD",
    status: "Hired",
  },
];
