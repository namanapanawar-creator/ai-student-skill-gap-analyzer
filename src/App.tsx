import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { StudentProfilePage } from './pages/StudentProfilePage';
import { CareerSelectionPage } from './pages/CareerSelectionPage';
import { DashboardPage } from './pages/DashboardPage';
import { SkillAnalysisPage } from './pages/SkillAnalysisPage';
import { SkillGapReportPage } from './pages/SkillGapReportPage';
import { LearningRoadmapPage } from './pages/LearningRoadmapPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ResumeAnalysisPage } from './pages/ResumeAnalysisPage';
import { ProgressTrackerPage } from './pages/ProgressTrackerPage';
import { AiCareerAssistantPage } from './pages/AiCareerAssistantPage';
import { DatabaseSchemaPage } from './pages/DatabaseSchemaPage';
import {
  loadStoredProfile,
  saveStoredProfile,
  loadStoredProgress,
  saveStoredProgress,
  loadStoredTheme,
  saveStoredTheme,
  loadActiveUser,
  saveActiveUser,
  isProfileComplete
} from './db/store';
import { generateSkillAnalysis } from './utils/analyzer';
import { SAMPLE_STUDENTS, ALL_SKILLS } from './data/rolesData';
import { ProgressStatus, StudentProfile, User } from './types';

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => loadStoredTheme());
  const [currentUser, setCurrentUser] = useState<User | null>(() => loadActiveUser());
  const [profile, setProfile] = useState<StudentProfile>(() => loadStoredProfile());
  const [progressState, setProgressState] = useState<Record<string, ProgressStatus>>(() =>
    loadStoredProgress()
  );
  const [currentPage, setCurrentPage] = useState<string>('landing');
  const [isOnboarding, setIsOnboarding] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Synchronize HTML dark class
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    saveStoredTheme(theme);
  }, [theme]);

  // Compute skill gap report dynamically whenever profile or progress updates
  const report = generateSkillAnalysis(profile, progressState);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleSaveProfile = (updatedProfile: StudentProfile) => {
    setProfile(updatedProfile);
    saveStoredProfile(updatedProfile);
    if (isProfileComplete(updatedProfile)) {
      setIsOnboarding(false);
    }
  };

  const handleUpdateStatus = (skillId: string, status: ProgressStatus) => {
    const updated = { ...progressState, [skillId]: status };
    setProgressState(updated);
    saveStoredProgress(updated);
  };

  const handleAuthSuccess = (
    user: User,
    authenticatedProfile: StudentProfile,
    destination: 'dashboard' | 'profile'
  ) => {
    setCurrentUser(user);
    setProfile(authenticatedProfile);
    saveActiveUser(user);
    saveStoredProfile(authenticatedProfile);
    setIsOnboarding(destination === 'profile');
    setCurrentPage(destination);
  };

  const handleLogout = () => {
    saveActiveUser(null);
    setCurrentUser(null);
    setCurrentPage('auth');
  };

  const handleStartAnalysis = () => {
    if (!currentUser) {
      setCurrentPage('auth');
    } else if (!isProfileComplete(profile)) {
      setIsOnboarding(true);
      setCurrentPage('profile');
    } else {
      setCurrentPage('dashboard');
    }
  };

  const handleLoadSample = (sampleId: string) => {
    const sample = SAMPLE_STUDENTS.find((s) => s.id === sampleId) || SAMPLE_STUDENTS[0];
    const newUser: User = {
      id: `user-${sample.id}`,
      email: `${sample.name.toLowerCase().replace(' ', '.')}@university.edu`,
      fullName: sample.name,
      createdAt: '2025-01-15T08:00:00.000Z'
    };

    const newProfile: StudentProfile = {
      id: `profile-${sample.id}`,
      userId: newUser.id,
      fullName: sample.name,
      email: newUser.email,
      degree: sample.degree,
      branch: sample.branch,
      currentYear: sample.year,
      targetRoleId: sample.roleId,
      githubUrl: `https://github.com/${sample.name.toLowerCase().replace(' ', '')}`,
      portfolioUrl: `https://${sample.name.toLowerCase().replace(' ', '')}.dev`,
      skills: sample.skills.map((s, idx) => {
        const meta = ALL_SKILLS.find((sk) => sk.id === s.skillId);
        return {
          id: `skill-${idx}`,
          skillId: s.skillId,
          skillName: meta ? meta.name : s.skillId,
          category: meta ? meta.category : 'Core CS',
          selfProficiencyLevel: s.level,
          proficiencyScore: s.score
        };
      }),
      projects: sample.projects.map((p, idx) => ({
        id: `proj-${idx}`,
        title: p.title,
        description: p.desc,
        techStack: p.tech,
        difficulty: p.diff
      })),
      certifications: sample.certs.map((c, idx) => ({
        id: `cert-${idx}`,
        name: c.name,
        issuingOrganization: c.org,
        issueYear: c.year
      })),
      internships: sample.internships.map((i, idx) => ({
        id: `intern-${idx}`,
        role: i.role,
        company: i.comp,
        duration: i.dur,
        description: i.desc
      })),
      bio: 'Enthusiastic engineering student focused on closing technical gaps and excelling in industry roles.',
      updatedAt: new Date().toISOString()
    };

    setCurrentUser(newUser);
    saveActiveUser(newUser);
    setProfile(newProfile);
    saveStoredProfile(newProfile);
    setIsOnboarding(false);
    setProgressState({});
    saveStoredProgress({});
    setCurrentPage('dashboard');
  };

  const handleSelectRole = (roleId: string) => {
    const updated = { ...profile, targetRoleId: roleId };
    setProfile(updated);
    saveStoredProfile(updated);
    setCurrentPage('analysis');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      {/* Top Navigation */}
      <Navbar
        theme={theme}
        onToggleTheme={handleToggleTheme}
        currentProfile={profile}
        currentUser={currentUser}
        onLogout={handleLogout}
        onOpenAuth={() => setCurrentPage('auth')}
        onLoadSample={handleLoadSample}
        report={report}
        onOpenMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
        mobileMenuOpen={mobileMenuOpen}
        onNavigate={setCurrentPage}
      />

      {/* Main Layout Area */}
      <div className="flex-1 flex w-full">
        {/* Persistent Desktop Sidebar / Drawer Mobile */}
        <Sidebar
          currentPage={currentPage}
          onNavigate={setCurrentPage}
          profile={profile}
          currentUser={currentUser}
          onLogout={handleLogout}
          onOpenAuth={() => setCurrentPage('auth')}
          report={report}
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        />

        {/* Content Pane */}
        <main className="flex-1 lg:pl-64 w-full min-w-0">
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
            {currentPage === 'landing' && (
              <LandingPage
                onStart={handleStartAnalysis}
                onSelectRole={handleSelectRole}
                onLoadSample={handleLoadSample}
                onOpenAuth={() => setCurrentPage('auth')}
              />
            )}

            {currentPage === 'auth' && (
              <AuthPage
                onAuthSuccess={handleAuthSuccess}
                onBackToLanding={() => setCurrentPage('landing')}
              />
            )}

            {currentPage === 'profile' && (
              <StudentProfilePage
                profile={profile}
                onSaveProfile={handleSaveProfile}
                onAnalyze={() => setCurrentPage('dashboard')}
                onLoadSample={handleLoadSample}
                isOnboarding={isOnboarding}
              />
            )}

            {currentPage === 'careers' && (
              <CareerSelectionPage
                currentRoleId={profile.targetRoleId}
                onSelectRole={handleSelectRole}
                onAnalyze={() => setCurrentPage('dashboard')}
              />
            )}

            {currentPage === 'dashboard' && (
              <DashboardPage
                report={report}
                profile={profile}
                onNavigate={setCurrentPage}
              />
            )}

            {currentPage === 'analysis' && (
              <SkillAnalysisPage
                report={report}
                onNavigate={setCurrentPage}
              />
            )}

            {currentPage === 'report' && (
              <SkillGapReportPage
                report={report}
                profile={profile}
                onNavigate={setCurrentPage}
              />
            )}

            {currentPage === 'roadmap' && (
              <LearningRoadmapPage
                report={report}
                onUpdateStatus={handleUpdateStatus}
                onNavigate={setCurrentPage}
              />
            )}

            {currentPage === 'projects' && (
              <ProjectsPage
                report={report}
                profile={profile}
                onNavigate={setCurrentPage}
              />
            )}

            {currentPage === 'resume' && (
              <ResumeAnalysisPage
                report={report}
                profile={profile}
              />
            )}

            {currentPage === 'tracker' && (
              <ProgressTrackerPage
                report={report}
                profile={profile}
                onUpdateStatus={handleUpdateStatus}
                onNavigate={setCurrentPage}
              />
            )}

            {currentPage === 'chat' && (
              <AiCareerAssistantPage
                report={report}
                profile={profile}
              />
            )}

            {currentPage === 'database' && (
              <DatabaseSchemaPage
                profile={profile}
                report={report}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
