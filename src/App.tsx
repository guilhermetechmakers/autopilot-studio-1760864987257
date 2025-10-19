import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";

// Pages
import LandingPage from "@/pages/LandingPage";
import LoginPage from "@/pages/auth/LoginPage";
import SignupPage from "@/pages/auth/SignupPage";
import PasswordResetPage from "@/pages/auth/PasswordResetPage";
import EmailVerificationPage from "@/pages/auth/EmailVerificationPage";
import DashboardPage from "@/pages/dashboard/DashboardPage";
import IntakePage from "@/pages/dashboard/IntakePage";
import ProposalsPage from "@/pages/dashboard/ProposalsPage";
import ProjectWorkspacePage from "@/pages/dashboard/ProjectWorkspacePage";
import ClientPortalPage from "@/pages/dashboard/ClientPortalPage";
import TasksPage from "@/pages/dashboard/TasksPage";
import MeetingsPage from "@/pages/dashboard/MeetingsPage";
import LaunchPage from "@/pages/dashboard/LaunchPage";
import BillingPage from "@/pages/dashboard/BillingPage";
import HandoverPage from "@/pages/dashboard/HandoverPage";
import NotificationsPage from "@/pages/dashboard/NotificationsPage";
import AdminPage from "@/pages/dashboard/AdminPage";
import ProfilePage from "@/pages/dashboard/ProfilePage";
import PricingPage from "@/pages/PricingPage";
import NotFoundPage from "@/pages/NotFoundPage";

// React Query client with optimal defaults
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            
            {/* Auth Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/password-reset" element={<PasswordResetPage />} />
            <Route path="/email-verification" element={<EmailVerificationPage />} />
            
            {/* Dashboard Routes */}
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/dashboard/intake" element={<IntakePage />} />
            <Route path="/dashboard/proposals" element={<ProposalsPage />} />
            <Route path="/dashboard/projects/:id" element={<ProjectWorkspacePage />} />
            <Route path="/dashboard/client-portal/:id" element={<ClientPortalPage />} />
            <Route path="/dashboard/tasks" element={<TasksPage />} />
            <Route path="/dashboard/meetings" element={<MeetingsPage />} />
            <Route path="/dashboard/launch" element={<LaunchPage />} />
            <Route path="/dashboard/billing" element={<BillingPage />} />
            <Route path="/dashboard/handover" element={<HandoverPage />} />
            <Route path="/dashboard/notifications" element={<NotificationsPage />} />
            <Route path="/dashboard/admin" element={<AdminPage />} />
            <Route path="/dashboard/profile" element={<ProfilePage />} />
            
            {/* 404 Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
