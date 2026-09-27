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
  ExternalLink,
  ChevronRight,
  LogIn,
  LogOut
} from 'lucide-react';
import { User as UserType, StudentProfile, AnalysisReport } from '../../types';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  profile: StudentProfile;
  currentUser: UserType | null;
  onLogout: () => void;
  onOpenAuth: () => void;
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
  currentUser,
  onLogout,
  onOpenAuth,
  report,
  isOpen,
  onClose
}) => {
  const navSections: SidebarSection[] = [
    {
      title: 'Overview & Setup',
      items: [
        { id: 'landing', label: 'Landing Page', icon: Compass },
        { id: 'auth', label: currentUser ? 'Account / Switch' : 'Login / Sign Up', icon: LogIn, badge: currentUser ? 'Active' : undefined },
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
        { id: 'chat', label: 'AI Career Assistant', icon: MessageSquareCode, isAi: true }
      ]
    },
    {
      title: 'Architecture',
      items: [
        { id: 'database', label: 'Relational Database', icon: Database }
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
                          className={`ml-2 text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                            isActive
                              ? 'bg-blue-600 text-white'
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
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 space-y-2">
          <div className="flex items-center justify-between px-1">
            <button
              onClick={() => handleItemClick('profile')}
              className="text-left flex-1 min-w-0 group"
            >
              <div className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate group-hover:text-blue-600 transition-colors">
                {currentUser ? currentUser.fullName : profile.fullName || 'Student'}
              </div>
              <div className="text-[11px] text-blue-600 dark:text-blue-400 truncate font-medium">
                🎯 {report.roleTitle || 'Role Undecided'}
              </div>
            </button>

            {currentUser ? (
              <button
                onClick={onLogout}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Log Out"
                aria-label="Log Out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={onOpenAuth}
                className="text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:underline"
              >
                Log In
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};
