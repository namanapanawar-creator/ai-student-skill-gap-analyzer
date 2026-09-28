import React, { useState } from 'react';
import {
  Sun,
  Moon,
  Sparkles,
  Database,
  UserCheck,
  Download,
  Menu,
  X,
  FileCode2,
  CheckCircle2,
  ChevronDown,
  LayoutDashboard,
  Layers,
  Milestone,
  MessageSquareCode,
  FolderGit2
} from 'lucide-react';
import { SAMPLE_STUDENTS } from '../../data/rolesData';
import { StudentProfile, AnalysisReport } from '../../types';
import { exportSqlDump } from '../../db/store';

interface NavbarProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  currentProfile: StudentProfile;
  onLoadSample: (sampleId: string) => void;
  report: AnalysisReport;
  onOpenMobileMenu: () => void;
  mobileMenuOpen: boolean;
  onNavigate: (page: string) => void;
  currentPage?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  onToggleTheme,
  currentProfile,
  onLoadSample,
  report,
  onOpenMobileMenu,
  mobileMenuOpen,
  onNavigate,
  currentPage = 'dashboard'
}) => {
  const [showSqlModal, setShowSqlModal] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  const sqlDump = exportSqlDump(currentProfile, report);

  const handleCopySql = () => {
    navigator.clipboard.writeText(sqlDump);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  const handleDownloadSql = () => {
    const blob = new Blob([sqlDump], { type: 'text/sql' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `skill_gap_analyzer_${currentProfile.targetRoleId}.sql`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const navLinks = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'analysis', label: 'Skills', icon: Layers },
    { id: 'roadmap', label: 'Roadmap', icon: Milestone },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'chat', label: 'AI Coach', icon: MessageSquareCode, isAi: true }
  ];

  return (
    <>
      <header className="sticky top-0 z-30 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md transition-colors">
        <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
          {/* Left Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenMobileMenu}
              className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <button
              onClick={() => onNavigate('landing')}
              className="flex items-center gap-2.5 text-left group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-emerald-500 flex items-center justify-center text-white shadow-sm shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="hidden sm:block">
                <span className="text-base font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                  SkillGap<span className="text-blue-600 dark:text-blue-400">AI</span>
                </span>
                <span className="text-[10px] block text-slate-400 dark:text-slate-500 font-medium tracking-wide">
                  Career Readiness Engine
                </span>
              </div>
            </button>
          </div>

          {/* Center Navigation Links (Visible on desktop) */}
          <nav className="hidden xl:flex items-center gap-1 p-1 rounded-2xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-2xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  <Icon
                    className={`w-3.5 h-3.5 ${
                      link.isAi ? 'text-emerald-500' : isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'
                    }`}
                  />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Quick Sample Profile Selector */}
            <div className="hidden md:flex items-center gap-1.5 bg-slate-100/90 dark:bg-slate-900/90 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs shadow-2xs">
              <UserCheck className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Demo:</span>
              <div className="relative inline-flex items-center">
                <select
                  aria-label="Load Sample Student Profile"
                  className="appearance-none bg-transparent pr-5 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer"
                  value={
                    SAMPLE_STUDENTS.find((s) => s.name === currentProfile.fullName)?.id || 'custom'
                  }
                  onChange={(e) => {
                    if (e.target.value !== 'custom') {
                      onLoadSample(e.target.value);
                    }
                  }}
                >
                  <option value="sample-alex" className="dark:bg-slate-900 text-slate-800 dark:text-slate-200">
                    Alex (Software Dev)
                  </option>
                  <option value="sample-priya" className="dark:bg-slate-900 text-slate-800 dark:text-slate-200">
                    Priya (Data Analyst)
                  </option>
                  <option value="sample-marcus" className="dark:bg-slate-900 text-slate-800 dark:text-slate-200">
                    Marcus (Cybersecurity)
                  </option>
                  <option value="custom" className="dark:bg-slate-900 text-slate-800 dark:text-slate-200">
                    Custom Profile
                  </option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 absolute right-0 pointer-events-none text-slate-400" />
              </div>
            </div>

            {/* Target Role & Readiness Score Pill */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-600 dark:text-blue-400">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="truncate max-w-[110px]">{report.roleTitle}</span>
              <span className="tabular-nums font-bold">{report.readinessScore}%</span>
            </div>

            {/* View Database SQL */}
            <button
              onClick={() => setShowSqlModal(true)}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-medium rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors cursor-pointer"
              title="View & Export Relational Database SQL Schema"
            >
              <Database className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
              <span className="hidden lg:inline font-semibold">SQL</span>
            </button>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            {/* Student Profile Quick Button */}
            <button
              onClick={() => onNavigate('profile')}
              className="flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-left transition-colors cursor-pointer"
              title="Edit Student Profile & Skills"
            >
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center text-[10px] font-bold shadow-xs shrink-0">
                {currentProfile.fullName ? currentProfile.fullName.charAt(0) : 'S'}
              </div>
              <span className="hidden lg:inline text-xs font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[100px]">
                {currentProfile.fullName ? currentProfile.fullName.split(' ')[0] : 'Profile'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* SQL Export Modal */}
      {showSqlModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
                  <FileCode2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    PostgreSQL Relational Schema & Data Dump
                  </h3>
                  <p className="text-xs text-slate-500">
                    Tables: users, student_profiles, career_roles, skills, student_skills, projects, certifications, analysis_reports
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowSqlModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 p-6 overflow-y-auto bg-slate-950 font-mono text-xs text-slate-300">
              <pre className="whitespace-pre">{sqlDump}</pre>
            </div>

            <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Exports live relational data for current active student state.
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopySql}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedSql ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <span>Copy SQL</span>
                  )}
                </button>

                <button
                  onClick={handleDownloadSql}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .sql</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
