import React, { useState } from 'react';
import {
  CheckSquare,
  CheckCircle2,
  Circle,
  Clock,
  Sparkles,
  Plus,
  ArrowRight,
  TrendingUp,
  BarChart2
} from 'lucide-react';
import { AnalysisReport, ProgressStatus, StudentProfile } from '../types';

interface ProgressTrackerPageProps {
  report: AnalysisReport;
  profile: StudentProfile;
  onUpdateStatus: (skillId: string, status: ProgressStatus) => void;
  onNavigate: (page: string) => void;
}

export const ProgressTrackerPage: React.FC<ProgressTrackerPageProps> = ({
  report,
  profile,
  onUpdateStatus,
  onNavigate
}) => {
  const [filter, setFilter] = useState<string>('all');

  const skills = report.skillGaps;
  const completedCount = skills.filter((s) => s.status === 'Completed').length;
  const learningCount = skills.filter((s) => s.status === 'Learning').length;
  const notStartedCount = skills.filter((s) => s.status === 'Not Started').length;
  const totalCount = skills.length;
  const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const filteredSkills = skills.filter((s) => {
    if (filter === 'all') return true;
    return s.status.toLowerCase() === filter.toLowerCase();
  });

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-2">
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Target Role: {report.roleTitle}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Skill Mastery & Progress Tracker
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Mark your skills as Not Started, Learning, or Completed. Dynamic updates sync immediately with your dashboard.
          </p>
        </div>

        <button
          onClick={() => onNavigate('dashboard')}
          className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-md flex items-center gap-1.5 self-start sm:self-auto"
        >
          <span>View Updated Dashboard</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Progress Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Total Progress */}
        <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
          <div className="text-xs font-semibold text-slate-400 uppercase">Completion</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400">
            {completionPercentage}%
          </div>
          <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        {/* Completed */}
        <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
          <div className="text-xs font-semibold text-slate-400 uppercase">Completed</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-500">
            {completedCount}
          </div>
          <div className="text-[11px] text-slate-500">Skills fully verified</div>
        </div>

        {/* In Progress */}
        <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
          <div className="text-xs font-semibold text-slate-400 uppercase">Learning</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-500">
            {learningCount}
          </div>
          <div className="text-[11px] text-slate-500">Active coursework</div>
        </div>

        {/* Not Started */}
        <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
          <div className="text-xs font-semibold text-slate-400 uppercase">Not Started</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-400">
            {notStartedCount}
          </div>
          <div className="text-[11px] text-slate-500">Upcoming in roadmap</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        {['all', 'not started', 'learning', 'completed'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium capitalize transition-colors ${
              filter === tab
                ? 'bg-blue-600 text-white font-bold'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Skills Table List */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xs overflow-hidden">
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {filteredSkills.map((s) => {
            const isDone = s.status === 'Completed';
            const isLearning = s.status === 'Learning';

            return (
              <div
                key={s.skillId}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => {
                      const next = isDone ? 'Not Started' : isLearning ? 'Completed' : 'Learning';
                      onUpdateStatus(s.skillId, next);
                    }}
                    className="mt-1"
                    title="Click to toggle status"
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    ) : isLearning ? (
                      <Clock className="w-5 h-5 text-amber-500" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-300 dark:text-slate-600" />
                    )}
                  </button>

                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900 dark:text-white">
                        {s.skillName}
                      </span>
                      <span className="text-[10px] text-slate-400">({s.category})</span>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          s.priority === 'Critical'
                            ? 'bg-rose-500/10 text-rose-500'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                        }`}
                      >
                        {s.priority} Priority
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 max-w-xl">{s.learningGuidance}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <div className="text-right text-xs">
                    <div className="font-semibold text-slate-800 dark:text-slate-200">
                      {s.currentProficiency}% / {s.requiredProficiency}%
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {s.gap === 0 ? 'Goal Reached' : `${s.gap}% gap remaining`}
                    </div>
                  </div>

                  <select
                    aria-label={`Status for ${s.skillName}`}
                    value={s.status}
                    onChange={(e) => onUpdateStatus(s.skillId, e.target.value as ProgressStatus)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-xl border transition-colors cursor-pointer ${
                      isDone
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                        : isLearning
                        ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-700'
                    }`}
                  >
                    <option value="Not Started" className="dark:bg-slate-900 text-slate-800 dark:text-slate-200">
                      Not Started
                    </option>
                    <option value="Learning" className="dark:bg-slate-900 text-slate-800 dark:text-slate-200">
                      Learning
                    </option>
                    <option value="Completed" className="dark:bg-slate-900 text-slate-800 dark:text-slate-200">
                      Completed ✓
                    </option>
                  </select>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
