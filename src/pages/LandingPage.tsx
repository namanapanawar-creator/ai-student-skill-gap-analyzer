import React from 'react';
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Target,
  FileSpreadsheet,
  Milestone,
  ShieldCheck,
  Code2,
  BarChart3,
  Cpu,
  Cloud,
  Globe,
  Terminal,
  Zap,
  BookOpen
} from 'lucide-react';
import { CAREER_ROLES, SAMPLE_STUDENTS } from '../data/rolesData';

interface LandingPageProps {
  onStart: () => void;
  onSelectRole: (roleId: string) => void;
  onLoadSample: (sampleId: string) => void;
  onOpenAuth: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStart,
  onSelectRole,
  onLoadSample,
  onOpenAuth
}) => {
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
        return <Target className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 sm:pt-14 pb-8">
        <div className="relative max-w-4xl mx-auto text-center space-y-6">
          {/* Subtle Tagline kicker */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI-Driven Career Readiness for College Students & Freshers</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            Discover your skill gaps.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500">
              Build your roadmap.
            </span>{' '}
            Become career ready.
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Stop guessing what hiring managers want. Analyze your current skills, coursework, and projects against real industry role frameworks and get a personalized, week-by-week learning blueprint.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={onStart}
              className="px-6 py-3 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25 flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
            >
              <span>Start Skill Analysis</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenAuth}
              className="px-5 py-3 rounded-xl text-sm font-semibold bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900 transition-colors shadow-2xs"
            >
              Student Login / Sign Up
            </button>

            <button
              onClick={() => onLoadSample('sample-alex')}
              className="px-5 py-3 rounded-xl text-sm font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-800 transition-colors"
            >
              Explore Sample Profile
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center max-w-3xl mx-auto">
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50">
              <div className="text-2xl font-bold text-slate-900 dark:text-white">7+</div>
              <div className="text-xs text-slate-500">Tech Career Roles</div>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">100-Point</div>
              <div className="text-xs text-slate-500">Readiness Score</div>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50">
              <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">4-Phase</div>
              <div className="text-xs text-slate-500">Learning Roadmap</div>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">ATS</div>
              <div className="text-xs text-slate-500">Resume Matcher</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Steps Section */}
      <section className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            How The Platform Works in 3 Steps
          </h2>
          <p className="text-sm text-slate-500">
            A transparent, data-driven methodology tailored specifically for college engineering and tech students.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="relative p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-lg">
                1
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Enter your profile
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Add your degree, branch, current semester, technical languages, projects, certifications, and self-rated proficiencies (Beginner, Intermediate, Advanced).
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center text-xs font-semibold text-blue-600 dark:text-blue-400">
              Takes under 2 minutes
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-lg">
                2
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Analyze your skill gaps
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Our engine compares your assessment against industry skill standards for your target role, calculating exact gaps, critical blockers, and overall career readiness.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              Multi-factor scoring formula
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-lg">
                3
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Follow your roadmap
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Receive a week-by-week actionable study plan, recommended hands-on portfolio projects, milestone trackers, and real-time AI career guidance.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              Track progress to 100%
            </div>
          </div>
        </div>
      </section>

      {/* Target Roles Explorer */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Target Career Role Frameworks
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Select any role to view its required skills, market demand, and benchmark expectations.
            </p>
          </div>
          <button
            onClick={onStart}
            className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:underline"
          >
            <span>View All Role Frameworks</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CAREER_ROLES.map((role) => (
            <div
              key={role.id}
              onClick={() => onSelectRole(role.id)}
              className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-500/50 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {getRoleIcon(role.icon)}
                  </div>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {role.demandLevel} Demand
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {role.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                    {role.description}
                  </p>
                </div>

                <div className="space-y-1.5 pt-2">
                  <div className="text-[10px] font-bold uppercase text-slate-400">Core Expectations</div>
                  <div className="flex flex-wrap gap-1">
                    {role.topSkills.slice(0, 4).map((sk) => (
                      <span
                        key={sk}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300"
                      >
                        {sk}
                      </span>
                    ))}
                    {role.topSkills.length > 4 && (
                      <span className="text-[10px] px-1.5 py-0.5 text-slate-400">
                        +{role.topSkills.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-600 dark:text-slate-400">{role.averageSalary}</span>
                <span className="font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Analyze Role <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Preloaded Sample Profiles Banner */}
      <section className="p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-gradient-to-r from-blue-900/10 via-indigo-900/10 to-emerald-900/10 dark:from-blue-950/40 dark:via-slate-900/60 dark:to-emerald-950/40">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400">
            <Zap className="w-4 h-4" />
            <span>INSTANT DEMO PROFILES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Test real student workflows with one click
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Switch between pre-configured college student records to see how skill gaps, radar charts, and personalized roadmaps recalculate in real-time:
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {SAMPLE_STUDENTS.map((sample) => (
              <button
                key={sample.id}
                onClick={() => onLoadSample(sample.id)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-300 dark:border-slate-700 hover:border-blue-500 shadow-xs transition-colors flex items-center gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>{sample.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
