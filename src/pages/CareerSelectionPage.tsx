import React, { useState } from 'react';
import {
  Code2,
  ShieldCheck,
  BarChart3,
  Cpu,
  Cloud,
  Globe,
  Terminal,
  ArrowRight,
  Check,
  CheckCircle2,
  TrendingUp,
  Layers,
  Sparkles
} from 'lucide-react';
import { CAREER_ROLES, ROLE_SKILL_FRAMEWORK, ALL_SKILLS } from '../data/rolesData';
import { StudentProfile } from '../types';

interface CareerSelectionPageProps {
  currentRoleId: string;
  onSelectRole: (roleId: string) => void;
  onAnalyze: () => void;
}

export const CareerSelectionPage: React.FC<CareerSelectionPageProps> = ({
  currentRoleId,
  onSelectRole,
  onAnalyze
}) => {
  const [selectedId, setSelectedId] = useState<string>(currentRoleId);

  const getRoleIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2':
        return <Code2 className="w-5 h-5 text-blue-500" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-emerald-500" />;
      case 'BarChart3':
        return <BarChart3 className="w-5 h-5 text-amber-500" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-purple-500" />;
      case 'Cloud':
        return <Cloud className="w-5 h-5 text-cyan-500" />;
      case 'Globe':
        return <Globe className="w-5 h-5 text-indigo-500" />;
      case 'Terminal':
        return <Terminal className="w-5 h-5 text-rose-500" />;
      default:
        return <Code2 className="w-5 h-5 text-blue-500" />;
    }
  };

  const handleChoose = (roleId: string) => {
    setSelectedId(roleId);
    onSelectRole(roleId);
  };

  const activeRole = CAREER_ROLES.find((r) => r.id === selectedId) || CAREER_ROLES[0];
  const activeFramework = ROLE_SKILL_FRAMEWORK[activeRole.id] || [];

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Industry Career Roles & Skill Frameworks
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Select a target engineering specialization to evaluate your skills against benchmark requirements.
          </p>
        </div>

        <button
          onClick={onAnalyze}
          className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-md flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4" />
          <span>Analyze Selected Role</span>
        </button>
      </div>

      {/* Grid of Roles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {CAREER_ROLES.map((role) => {
          const isSelected = selectedId === role.id;
          return (
            <div
              key={role.id}
              onClick={() => handleChoose(role.id)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-blue-500 bg-blue-50/20 dark:bg-blue-950/30 ring-2 ring-blue-500/20 shadow-md'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                    {getRoleIcon(role.icon)}
                  </div>
                  {isSelected ? (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-600 text-white flex items-center gap-1">
                      <Check className="w-3 h-3" /> Selected
                    </span>
                  ) : (
                    <span className="text-[11px] font-semibold text-slate-500">
                      {role.demandLevel} Demand
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {role.title}
                  </h3>
                  <div className="text-[11px] text-blue-600 dark:text-blue-400 font-medium">
                    {role.category}
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                    {role.description}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  {role.averageSalary}
                </span>
                <span
                  className={`text-xs font-bold flex items-center gap-1 ${
                    isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'
                  }`}
                >
                  Select <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Role Framework Detail */}
      <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Benchmark Framework
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
              {activeRole.title} Required Skills & Competencies
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Industry hiring standards for entry-level / junior candidates in this track.
            </p>
          </div>

          <button
            onClick={onAnalyze}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>Proceed with {activeRole.title}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Framework Table */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeFramework.map((req) => {
            const skillMeta = ALL_SKILLS.find((s) => s.id === req.skillId);
            return (
              <div
                key={req.skillId}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      {skillMeta ? skillMeta.name : req.skillId}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      ({skillMeta?.category || 'Core'})
                    </span>
                  </div>

                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      req.priority === 'Critical'
                        ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20'
                        : req.priority === 'High'
                        ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                        : 'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                    }`}
                  >
                    {req.priority} Priority
                  </span>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed">
                  {req.guidance}
                </p>

                <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-slate-400">Required Level:</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">
                    {req.requiredProficiency}% / 100%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
