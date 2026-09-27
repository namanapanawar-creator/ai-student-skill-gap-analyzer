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
  LogIn,
  LogOut,
  User as UserIcon
} from 'lucide-react';
import { SAMPLE_STUDENTS } from '../../data/rolesData';
import { User, StudentProfile, AnalysisReport } from '../../types';
import { exportSqlDump } from '../../db/store';

interface NavbarProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  currentProfile: StudentProfile;
  currentUser: User | null;
  onLogout: () => void;
  onOpenAuth: () => void;
  onLoadSample: (sampleId: string) => void;
  report: AnalysisReport;
  onOpenMobileMenu: () => void;
  mobileMenuOpen: boolean;
  onNavigate: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  onToggleTheme,
  currentProfile,
  currentUser,
  onLogout,
  onOpenAuth,
  onLoadSample,
  report,
  onOpenMobileMenu,
  mobileMenuOpen,
  onNavigate
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

  return (
    <>
      <header className="sticky top-0 z-30 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
        <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Left Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenMobileMenu}
              className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <button
              onClick={() => onNavigate('landing')}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-emerald-500 flex items-center justify-center text-white shadow-sm shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                  AI Skill-Gap Analyzer
                </span>
                <span className="text-[11px] block text-slate-500 dark:text-slate-400 font-medium">
                  College Career Readiness Engine
                </span>
              </div>
            </button>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Sample Profile Selector */}
            <div className="hidden sm:flex items-center gap-1.5 bg-slate-100 dark:bg-slate-900 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800">
              <UserCheck className="w-4 h-4 text-blue-500" />
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Sample:</span>
              <select
                aria-label="Load Sample Student Profile"
                className="bg-transparent text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer"
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
                  Custom Student Profile
                </option>
              </select>
            </div>

            {/* View Database SQL */}
            <button
              onClick={() => setShowSqlModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors"
              title="View & Export Relational Database SQL"
            >
              <Database className="w-3.5 h-3.5 text-indigo-500" />
              <span className="hidden md:inline">SQL Schema</span>
            </button>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            {/* User Session / Auth Action */}
            {currentUser ? (
              <div className="flex items-center gap-2 pl-1 border-l border-slate-200 dark:border-slate-800">
                <button
                  onClick={() => onNavigate('profile')}
                  className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-left transition-colors"
                  title="View profile"
                >
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
                    {currentUser.fullName ? currentUser.fullName.charAt(0) : 'U'}
                  </div>
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[100px]">
                    {currentUser.fullName?.split(' ')[0]}
                  </span>
                </button>

                <button
                  onClick={onLogout}
                  className="p-2 rounded-lg text-slate-500 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="Sign Out / Switch Account"
                  aria-label="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold border border-blue-300 dark:border-blue-700 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950 flex items-center gap-1.5 transition-colors"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
            )}

            {/* Dashboard CTA */}
            <button
              onClick={() => onNavigate('dashboard')}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-sm transition-colors"
            >
              Dashboard
            </button>
          </div>
        </div>
      </header>

      {/* SQL Export Modal */}
      {showSqlModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
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
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 flex-1 overflow-auto bg-slate-950 text-slate-200 font-mono text-xs leading-relaxed">
              <pre>{sqlDump}</pre>
            </div>

            <div className="px-6 py-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/50">
              <span className="text-xs text-slate-500">
                Compatible with PostgreSQL 14+, Supabase, and Cloud SQL
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopySql}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5"
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
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-1.5"
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
