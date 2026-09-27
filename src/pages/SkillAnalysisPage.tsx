import React, { useState } from 'react';
import {
  Layers,
  Search,
  SlidersHorizontal,
  ArrowRight,
  TrendingDown,
  CheckCircle2,
  AlertOctagon,
  AlertTriangle,
  Info
} from 'lucide-react';
import { AnalysisReport, PriorityLevel, SkillGapItem } from '../types';

interface SkillAnalysisPageProps {
  report: AnalysisReport;
  onNavigate: (page: string) => void;
}

export const SkillAnalysisPage: React.FC<SkillAnalysisPageProps> = ({
  report,
  onNavigate
}) => {
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredSkills = report.skillGaps.filter((item) => {
    const matchesPriority =
      filterPriority === 'all' || item.priority.toLowerCase() === filterPriority.toLowerCase();
    const matchesSearch =
      item.skillName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPriority && matchesSearch;
  });

  const getPriorityBadge = (priority: PriorityLevel) => {
    switch (priority) {
      case 'Critical':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-500 border border-rose-500/20">
            <AlertOctagon className="w-3 h-3" /> Critical
          </span>
        );
      case 'High':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20">
            <AlertTriangle className="w-3 h-3" /> High
          </span>
        );
      case 'Medium':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20">
            <Info className="w-3 h-3" /> Medium
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
            <CheckCircle2 className="w-3 h-3" /> Matched / Low
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 mb-2">
            <span>Target Role: {report.roleTitle}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Granular Skill Gap Analysis
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Transparent 0–100 scoring model comparing your assessed proficiency directly to market requirements.
          </p>
        </div>

        <button
          onClick={() => onNavigate('roadmap')}
          className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-md flex items-center gap-1.5 self-start sm:self-auto"
        >
          <span>View Learning Roadmap</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search skills or categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs font-medium text-slate-400 mr-1 hidden sm:inline">Priority:</span>
          {['all', 'critical', 'high', 'medium', 'low'].map((p) => (
            <button
              key={p}
              onClick={() => setFilterPriority(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                filterPriority === p
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Skills Table Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
              <tr>
                <th className="py-3.5 px-4">Skill & Category</th>
                <th className="py-3.5 px-4 text-center">Current</th>
                <th className="py-3.5 px-4 text-center">Required</th>
                <th className="py-3.5 px-4 text-center">Skill Gap</th>
                <th className="py-3.5 px-4 text-center">Priority</th>
                <th className="py-3.5 px-4">Learning Guidance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredSkills.map((item) => (
                <tr key={item.skillId} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900 dark:text-white">
                      {item.skillName}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {item.category}
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {item.currentProficiency}%
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <span className="font-semibold text-blue-600 dark:text-blue-400">
                      {item.requiredProficiency}%
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`inline-block px-2 py-0.5 rounded font-bold text-xs ${
                        item.gap === 0
                          ? 'text-emerald-500 bg-emerald-500/10'
                          : item.gap >= 25
                          ? 'text-rose-500 bg-rose-500/10'
                          : 'text-amber-500 bg-amber-500/10'
                      }`}
                    >
                      {item.gap === 0 ? '0% (Met)' : `-${item.gap}%`}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-center whitespace-nowrap">
                    {getPriorityBadge(item.priority)}
                  </td>

                  <td className="py-3.5 px-4 max-w-sm text-slate-500 dark:text-slate-400 text-xs">
                    {item.learningGuidance}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
