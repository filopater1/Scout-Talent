import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from '@/app/pages/LandingPage';
import AuthPage from '@/app/pages/AuthPage';
import ApplicantDashboard from '@/app/pages/ApplicantDashboard';
import RecruiterDashboard from '@/app/pages/RecruiterDashboard';
import JobApplication from '@/app/pages/JobApplication';
import CandidateEvaluation from '@/app/pages/CandidateEvaluation';
import TechnicalAssessment from '@/app/pages/TechnicalAssessment';
import AnalyticsReports from '@/app/pages/AnalyticsReports';

export default function App() {
  return (
    <div className="size-full">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/applicant" element={<ApplicantDashboard />} />
          <Route path="/recruiter" element={<RecruiterDashboard />} />
          <Route path="/apply/:jobId" element={<JobApplication />} />
          <Route path="/evaluate/:candidateId" element={<CandidateEvaluation />} />
          <Route path="/assessment/:testId" element={<TechnicalAssessment />} />
          <Route path="/analytics" element={<AnalyticsReports />} />
        </Routes>
      </Router>
    </div>
  );
}