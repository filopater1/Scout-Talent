import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import ApplicantDashboard from "./pages/ApplicantDashboard";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import JobApplication from "./pages/JobApplication";
import CandidateEvaluation from "./pages/CandidateEvaluation";
import TechnicalAssessment from "./pages/TechnicalAssessment";
import AnalyticsReports from "./pages/AnalyticsReports";
import VerifyPage from "./pages/VerifyPage";
import JobList from "./pages/JobList";
import JobDetails from "./pages/JobDetails";
import ApplicantProfile from "./pages/ApplicantProfile";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import MyJobsPage from "./pages/MyJobsPage";
import RecruiterProfile from "./pages/RecruiterProfile";
import HRInterviewDashboard from "./pages/HRInterviewDashboard";

export default function App() {
  return (
    <div className="size-full">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/verify" element={<VerifyPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/my-posts" element={<MyJobsPage />} />

          <Route path="/applicant" element={<ApplicantDashboard />} />
          <Route path="/company" element={<RecruiterDashboard />} />
          <Route path="/jobs" element={<JobList />} />
          <Route path="/jobs/:jobId/apply" element={<JobApplication />} />
          <Route path="/jobs/:jobId" element={<JobDetails />} />
          <Route path="/applicant/profile" element={<ApplicantProfile />} />
          <Route path="/company/profile" element={<RecruiterProfile />} />
          <Route path="/hr/interviews" element={<HRInterviewDashboard />} />
          <Route
            path="/evaluate/:candidateId"
            element={<CandidateEvaluation />}
          />
          <Route path="/assessment/:testId" element={<TechnicalAssessment />} />
          <Route path="/analytics" element={<AnalyticsReports />} />
        </Routes>
      </Router>
    </div>
  );
}
