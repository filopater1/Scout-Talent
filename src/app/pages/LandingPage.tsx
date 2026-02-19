import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { 
  BrainCircuit,  
  Shield, 
  Users, 
  BarChart3,
  Sparkles,
  Target,
  Zap
} from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              <BrainCircuit className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">Hakeem</span>
          </div>
          <Button onClick={() => navigate('/auth')}>
            Get Started
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            AI-Powered Recruitment
          </div>
          
          <h1 className="text-6xl font-bold text-gray-900 tracking-tight">
            Hire Smarter with
            <br />
            <span className="text-indigo-600">AI-Driven Insights</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform your recruitment process with ethical AI matching, semantic CV analysis, 
            and comprehensive candidate evaluation.
          </p>

          <div className="flex gap-4 justify-center pt-4">
            <Button 
              size="lg" 
              className="bg-indigo-600 hover:bg-indigo-700"
              onClick={() => navigate('/auth')}
            >
              Start Free Trial
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/analytics')}
            >
              View Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
          <p className="text-xl text-gray-600">Everything you need for modern recruitment</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600">Simple, fast, and effective</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div key={idx} className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                {idx + 1}
              </div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Hiring?</h2>
          <p className="text-xl opacity-90 mb-8">
            Join hundreds of companies using Hakeem for smarter recruitment
          </p>
          <Button 
            size="lg" 
            className="bg-white text-indigo-600 hover:bg-gray-100"
            onClick={() => navigate('/auth')}
          >
            Get Started Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-gray-600">
          <p>© 2026 Hakeem. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    icon: <BrainCircuit className="w-6 h-6 text-indigo-600" />,
    title: 'AI Match Scoring',
    description: 'Advanced algorithms analyze candidate fit with explainable insights and transparency.'
  },
  {
    icon: <Target className="w-6 h-6 text-indigo-600" />,
    title: 'Semantic CV Analysis',
    description: 'Deep understanding of skills, experience, and qualifications beyond keywords.'
  },
  {
    icon: <Shield className="w-6 h-6 text-indigo-600" />,
    title: 'Bias Detection',
    description: 'Built-in fairness metrics and bias indicators for ethical hiring practices.'
  },
  {
    icon: <Zap className="w-6 h-6 text-indigo-600" />,
    title: 'Technical Assessments',
    description: 'Code challenges with real-time execution and automated quality analysis.'
  },
  {
    icon: <BarChart3 className="w-6 h-6 text-indigo-600" />,
    title: 'Analytics Dashboard',
    description: 'Comprehensive metrics on hiring performance, diversity, and time-to-hire.'
  },
  {
    icon: <Users className="w-6 h-6 text-indigo-600" />,
    title: 'Kanban Pipeline',
    description: 'Visual candidate management with drag-and-drop workflow customization.'
  }
];

const steps = [
  {
    title: 'Post Job',
    description: 'Create detailed job descriptions with AI-powered requirement matching'
  },
  {
    title: 'AI Analysis',
    description: 'Candidates are automatically scored and ranked by relevance'
  },
  {
    title: 'Evaluate',
    description: 'Review comprehensive profiles with skill breakdowns and insights'
  },
  {
    title: 'Hire',
    description: 'Make data-driven decisions with confidence and transparency'
  }
];
