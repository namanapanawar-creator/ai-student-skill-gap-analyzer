import React from 'react';
import {
  Compass,
  User,
  Briefcase,
  Layers,
  LayoutDashboard,
  FileSpreadsheet,
  Milestone,
  FolderGit2,
  FileSearch,
  CheckSquare,
  MessageSquareCode,
  Database,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { StudentProfile, AnalysisReport } from '../../types';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  profile: StudentProfile;
  report: AnalysisReport;
  isOpen: boolean;
  onClose: () => void;
}

interface SidebarNavItem {
  id: string;
  label: string;
  icon: any;
  badge?: string;
  isAi?: boolean;
}

interface SidebarSection {
  title: string;
  items: SidebarNavItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onNavigate,
  profile,
  report,
  isOpen,
  onClose
}) => {
  const navSections: SidebarSection[] = [
    {
      title: 'Overview & Setup',
      items: [
        { id: 'landing', label: 'Landing Page', icon: Compass },
        { id: 'profile', label: 'Student Profile', icon: User, badge: `${profile.skills.length} skills` },
        { id: 'careers', label: 'Career Roles', icon: Briefcase }
      ]
    },
    {
      title: 'Gap Intelligence',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: `${report.readinessScore}%` },
        { id: 'analysis', label: 'AI Skill Analysis', icon: Layers },
        { id: 'report', label: 'Skill Gap Report', icon: FileSpreadsheet, badge: `${report.criticalGaps.length} critical` },
        { id: 'resume', label: 'Resume Analysis', icon: FileSearch }
      ]
    },
    {
      title: 'Action & Execution',
      items: [
        { id: 'roadmap', label: 'Learning Roadmap', icon: Milestone },
        { id: 'projects', label: 'Recommended Projects', icon: FolderGit2, badge: `${report.recommendedProjects.length}` },
        { id: 'tracker', label: 'Progress Tracker', icon: CheckSquare },
        { id: 'chat', label: 'AI Career Assistant', icon: MessageSquareCode, isAi: true, badge: 'AI Coach' }
      ]
    },
    {
      title: 'Architecture',
      items: [
        { id: 'database', label: 'Relational Database', icon: Database, badge: '11 Tables' }
      ]
    }
  ];

  const handleItemClick = (id: string) => {
    onNavigate(id);
    onClose();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-30 bg-black/50 lg:hidden backdrop-blur-xs"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-16 bottom-0 left-0 z-40 w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {navSections.map((section, sIdx) => (
            <div key={`section-${sIdx}`} className="space-y-1">
              <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                {section.title}
              </div>
              <div className="mt-1 space-y-0.5">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPage === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleItemClick(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-xl transition-all ${
                        isActive
                          ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-semibold shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Icon
                          className={`w-4 h-4 shrink-0 ${
                            isActive
                              ? 'text-blue-600 dark:text-blue-400'
                              : item.isAi
                              ? 'text-emerald-500'
                              : 'text-slate-400 dark:text-slate-500'
                          }`}
                        />
                        <span className="truncate">{item.label}</span>
                      </div>

                      {item.badge && (
                        <span
                          className={`ml-2 text-[10px] px-2 py-0.5 rounded-full font-medium ${
                            isActive
                              ? 'bg-blue-600 text-white'
                              : item.isAi
                              ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-semibold'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Student Context Card */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40">
          <div className="p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-2">
            <button
              onClick={() => handleItemClick('profile')}
              className="w-full text-left group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate group-hover:text-blue-600 transition-colors">
                  {profile.fullName || 'Student'}
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  {report.readinessScore}% Ready
                </span>
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                🎯 {report.roleTitle || 'Select Role'}
              </div>
            </button>

            <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px]">
              <button
                onClick={() => handleItemClick('profile')}
                className="text-blue-600 dark:text-blue-400 font-semibold hover:underline flex items-center gap-1"
              >
                <span>Edit Profile</span>
                <ArrowRight className="w-3 h-3" />
              </button>

              <button
                onClick={() => handleItemClick('chat')}
                className="text-emerald-600 dark:text-emerald-400 font-medium hover:underline flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3" />
                <span>Ask AI</span>
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
