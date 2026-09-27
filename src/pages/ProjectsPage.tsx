import React, { useState } from 'react';
import {
  FolderGit2,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Layers,
  CheckSquare,
  Square,
  ExternalLink,
  Code
} from 'lucide-react';
import { AnalysisReport, StudentProfile } from '../types';

interface ProjectsPageProps {
  report: AnalysisReport;
  profile: StudentProfile;
  onNavigate: (page: string) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  report,
  profile,
  onNavigate
}) => {
  // Store user's checked milestone checkboxes locally
  const [completedMilestones, setCompletedMilestones] = useState<Record<string, boolean>>({});

  const toggleMilestone = (key: string) => {
    setCompletedMilestones((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Gap-Bridging Projects for {report.roleTitle}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Recommended Portfolio Projects
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Projects designed to simultaneously demonstrate multiple missing competencies on your resume and GitHub.
          </p>
        </div>

        <button
          onClick={() => onNavigate('resume')}
          className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-md flex items-center gap-1.5 self-start sm:self-auto"
        >
          <span>Resume Keyword Analysis</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Projects List */}
      <div className="space-y-6">
        {report.recommendedProjects.map((proj, pIdx) => {
          return (
            <div
              key={proj.id}
              className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                        proj.difficulty === 'Beginner'
                          ? 'bg-emerald-500/10 text-emerald-500'
                          : proj.difficulty === 'Intermediate'
                          ? 'bg-blue-500/10 text-blue-500'
                          : 'bg-purple-500/10 text-purple-500'
                      }`}
                    >
                      {proj.difficulty} Difficulty
                    </span>
                    <span className="text-xs text-slate-400">
                      Recommendation #{pIdx + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white pt-1">
                    {proj.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-1.5 self-start">
                  {proj.skillsDeveloped.map((sk) => (
                    <span
                      key={sk}
                      className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                    >
                      + {sk}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {proj.description}
              </p>

              {/* Expected Outcome Box */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Target Portfolio Outcome:
                </div>
                <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  {proj.expectedOutcome}
                </div>
              </div>

              {/* Guided Milestone Checklist */}
              <div className="space-y-2 pt-2">
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <CheckSquare className="w-4 h-4 text-emerald-500" />
                  <span>Interactive Implementation Milestones:</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {proj.milestones.map((ms, mIdx) => {
                    const key = `${proj.id}-ms-${mIdx}`;
                    const isChecked = !!completedMilestones[key];

                    return (
                      <div
                        key={key}
                        onClick={() => toggleMilestone(key)}
                        className={`p-3 rounded-xl border text-xs cursor-pointer select-none transition-all flex items-start gap-2.5 ${
                          isChecked
                            ? 'border-emerald-500/30 bg-emerald-500/5 text-emerald-700 dark:text-emerald-300 line-through'
                            : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900'
                        }`}
                      >
                        <div className="mt-0.5">
                          {isChecked ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          ) : (
                            <Square className="w-4 h-4 text-slate-400 shrink-0" />
                          )}
                        </div>
                        <span className="leading-snug">{ms}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
