import React from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  Flame,
  Award,
  FolderGit2,
  Briefcase,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Download,
  Share2
} from 'lucide-react';
import { AnalysisReport, StudentProfile } from '../types';
import { ReadinessGauge } from '../components/charts/ReadinessGauge';
import { RadarChart } from '../components/charts/RadarChart';
import { SkillGapBarChart } from '../components/charts/SkillGapBarChart';
import { CategoryDistribution } from '../components/charts/CategoryDistribution';

interface DashboardPageProps {
  report: AnalysisReport;
  profile: StudentProfile;
  onNavigate: (page: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  report,
  profile,
  onNavigate
}) => {
  const matchedCount = report.strengths.length;
  const criticalCount = report.criticalGaps.length;
  const moderateCount = report.moderateGaps.length;
  const totalEvaluated = report.skillGaps.length;

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Top Header Card */}
      <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Target Role: {report.roleTitle}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {profile.fullName}'s Readiness Dashboard
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
            {profile.degree} · {profile.branch} ({profile.currentYear}). Real-time gap analysis against hiring benchmarks.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => onNavigate('report')}
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-md flex items-center gap-1.5 transition-colors"
          >
            <span>Full Gap Report</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => onNavigate('roadmap')}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 transition-colors"
          >
            Personalized Roadmap
          </button>
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {/* Readiness */}
        <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Readiness
          </div>
          <div className="my-1 text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400">
            {report.readinessScore}%
          </div>
          <div className="text-[10px] text-slate-500">100-point scale</div>
        </div>

        {/* Skills Matched */}
        <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Skills Matched
          </div>
          <div className="my-1 text-2xl sm:text-3xl font-extrabold text-emerald-500">
            {matchedCount} / {totalEvaluated}
          </div>
          <div className="text-[10px] text-slate-500">
            {Math.round((matchedCount / totalEvaluated) * 100)}% on target
          </div>
        </div>

        {/* Critical Gaps */}
        <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Critical Gaps
          </div>
          <div className="my-1 text-2xl sm:text-3xl font-extrabold text-rose-500">
            {criticalCount}
          </div>
          <div className="text-[10px] text-slate-500">Requires focus</div>
        </div>

        {/* Projects */}
        <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Projects
          </div>
          <div className="my-1 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {profile.projects?.length || 0}
          </div>
          <div className="text-[10px] text-emerald-500 font-medium">
            +{report.breakdown.projectBonus} bonus pts
          </div>
        </div>

        {/* Certifications */}
        <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Certifications
          </div>
          <div className="my-1 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {profile.certifications?.length || 0}
          </div>
          <div className="text-[10px] text-emerald-500 font-medium">
            +{report.breakdown.certBonus} bonus pts
          </div>
        </div>

        {/* Experience */}
        <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Internships
          </div>
          <div className="my-1 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {profile.internships?.length || 0}
          </div>
          <div className="text-[10px] text-emerald-500 font-medium">
            +{report.breakdown.internshipBonus} bonus pts
          </div>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Readiness Meter & Score Breakdown (4 cols) */}
        <div className="lg:col-span-4 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col justify-between space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Overall Career Readiness
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Multi-factor weighted evaluation against industry role benchmarks.
            </p>
          </div>

          <ReadinessGauge score={report.readinessScore} size={210} />

          {/* Breakdown List */}
          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Core Skills Weighted Score</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {report.breakdown.skillsScore}%
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Project Portfolio Weight</span>
              <span className="font-semibold text-emerald-500">
                +{report.breakdown.projectBonus}%
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Certifications Bonus</span>
              <span className="font-semibold text-emerald-500">
                +{report.breakdown.certBonus}%
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Work/Internship Experience</span>
              <span className="font-semibold text-emerald-500">
                +{report.breakdown.internshipBonus}%
              </span>
            </div>
          </div>
        </div>

        {/* Skill Radar Chart (8 cols) */}
        <div className="lg:col-span-8 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Skill Competency Radar
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Comparison of your current self-assessment vs target benchmarks.
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              Interactive
            </span>
          </div>

          <div className="py-2 flex items-center justify-center">
            <RadarChart skills={report.skillGaps} size={360} />
          </div>

          <div className="text-[11px] text-center text-slate-400">
            Hover over any radial point to view exact percentages and gap details.
          </div>
        </div>
      </div>

      {/* Second Row: Bar Chart & Category Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Skill Gap Comparison Bar Chart (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Skill Gap Breakdown (Current vs Required)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Vertical blue ticks show the minimum target proficiency benchmark.
              </p>
            </div>
            <button
              onClick={() => onNavigate('analysis')}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Detailed Table
            </button>
          </div>

          <SkillGapBarChart skills={report.skillGaps} />
        </div>

        {/* Category Mastery Distribution (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Skill Category Mastery
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Performance distributed across engineering domains.
                </p>
              </div>
            </div>

            <div className="mt-4">
              <CategoryDistribution skills={report.skillGaps} />
            </div>
          </div>

          {/* Quick AI Suggestion Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20 space-y-2 mt-4">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400">
              <Sparkles className="w-4 h-4" />
              <span>AI Priority Recommendation</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Your highest-impact gap is{' '}
              <strong className="text-slate-900 dark:text-white">
                {report.criticalGaps[0]?.skillName || 'Data Structures & Algorithms'}
              </strong>
              . Closing this single skill gap will increase your overall readiness score to{' '}
              <strong className="text-emerald-500">
                {Math.min(100, report.readinessScore + 12)}%
              </strong>
              .
            </p>
            <button
              onClick={() => onNavigate('roadmap')}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:underline pt-1"
            >
              <span>View Week 1–2 Roadmap Tasks</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
