import React, { useState } from 'react';
import {
  Milestone,
  Clock,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
  BookOpen,
  Target,
  PlayCircle
} from 'lucide-react';
import { AnalysisReport, LearningRoadmapItem, ProgressStatus } from '../types';

interface LearningRoadmapPageProps {
  report: AnalysisReport;
  onUpdateStatus: (skillId: string, status: ProgressStatus) => void;
  onNavigate: (page: string) => void;
}

export const LearningRoadmapPage: React.FC<LearningRoadmapPageProps> = ({
  report,
  onUpdateStatus,
  onNavigate
}) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>('All');

  const timeframes = ['All', 'Week 1–2', 'Week 3–4', 'Month 2', 'Month 3'];

  const filteredItems = report.roadmap.filter((item) => {
    if (selectedTimeframe === 'All') return true;
    return item.timeframe === selectedTimeframe;
  });

  const completedCount = report.roadmap.filter((item) => item.status === 'Completed').length;
  const totalCount = report.roadmap.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-2">
            <Milestone className="w-3.5 h-3.5" />
            <span>Target Role: {report.roleTitle}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Personalized Learning Roadmap
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Sequential week-by-week curriculum structured to close your skill gaps efficiently.
          </p>
        </div>

        {/* Quick Progress Banner */}
        <div className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-4">
          <div>
            <div className="text-[10px] font-semibold text-slate-400 uppercase">Roadmap Progress</div>
            <div className="text-lg font-bold text-slate-900 dark:text-white">
              {completedCount} / {totalCount} Completed ({progressPercent}%)
            </div>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-emerald-500/20 flex items-center justify-center text-xs font-bold text-emerald-500">
            {progressPercent}%
          </div>
        </div>
      </div>

      {/* Timeframe Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {timeframes.map((tf) => (
          <button
            key={tf}
            onClick={() => setSelectedTimeframe(tf)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedTimeframe === tf
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {tf}
          </button>
        ))}
      </div>

      {/* Roadmap Items Timeline */}
      <div className="space-y-4">
        {filteredItems.map((item, idx) => {
          const isDone = item.status === 'Completed';
          const isLearning = item.status === 'Learning';

          return (
            <div
              key={item.id}
              className={`p-6 rounded-3xl border transition-all ${
                isDone
                  ? 'border-emerald-500/30 bg-emerald-500/5 dark:bg-emerald-950/10'
                  : isLearning
                  ? 'border-blue-500/40 bg-blue-500/5 dark:bg-blue-950/20'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                {/* Title & Timeframe */}
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      📅 {item.timeframe}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-500">
                      {item.category}
                    </span>
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        item.difficulty === 'Beginner'
                          ? 'bg-emerald-500/10 text-emerald-500'
                          : item.difficulty === 'Intermediate'
                          ? 'bg-amber-500/10 text-amber-500'
                          : 'bg-rose-500/10 text-rose-500'
                      }`}
                    >
                      {item.difficulty}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white pt-1">
                    {item.skillName}
                  </h3>
                </div>

                {/* Status Switcher & Estimated Hours */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Clock className="w-3.5 h-3.5" />
                    <span>~{item.estimatedHours} hrs</span>
                  </div>

                  <select
                    aria-label={`Status for ${item.skillName}`}
                    value={item.status}
                    onChange={(e) => onUpdateStatus(item.skillId, e.target.value as ProgressStatus)}
                    className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-colors cursor-pointer ${
                      isDone
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : isLearning
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                    }`}
                  >
                    <option value="Not Started" className="dark:bg-slate-900 text-slate-800 dark:text-slate-200">
                      Not Started
                    </option>
                    <option value="Learning" className="dark:bg-slate-900 text-slate-800 dark:text-slate-200">
                      Learning (In Progress)
                    </option>
                    <option value="Completed" className="dark:bg-slate-900 text-slate-800 dark:text-slate-200">
                      Completed ✓
                    </option>
                  </select>
                </div>
              </div>

              {/* 3 Detail Blocks */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80 text-xs">
                {/* What to learn */}
                <div className="space-y-1">
                  <div className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-blue-500" />
                    <span>What to Learn:</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.whatToLearn}
                  </p>
                </div>

                {/* Why it matters */}
                <div className="space-y-1">
                  <div className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Why It Matters:</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.whyItMatters}
                  </p>
                </div>

                {/* Suggested task */}
                <div className="space-y-1">
                  <div className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <PlayCircle className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Practice Task:</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.suggestedTask}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA to Projects */}
      <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
            Ready to apply these skills in a real portfolio piece?
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Explore recommended hands-on projects curated specifically to bridge your gaps.
          </p>
        </div>
        <button
          onClick={() => onNavigate('projects')}
          className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-1.5 self-start sm:self-auto shadow-md"
        >
          <span>View Recommended Projects</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
