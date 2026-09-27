import React from 'react';
import { SkillGapItem } from '../../types';

interface CategoryDistributionProps {
  skills: SkillGapItem[];
}

export const CategoryDistribution: React.FC<CategoryDistributionProps> = ({ skills }) => {
  // Aggregate category stats
  const catMap: Record<string, { total: number; currentSum: number; reqSum: number }> = {};

  skills.forEach((s) => {
    const cat = s.category || 'General';
    if (!catMap[cat]) {
      catMap[cat] = { total: 0, currentSum: 0, reqSum: 0 };
    }
    catMap[cat].total += 1;
    catMap[cat].currentSum += s.currentProficiency;
    catMap[cat].reqSum += s.requiredProficiency;
  });

  const categories = Object.keys(catMap).map((cat) => {
    const info = catMap[cat];
    const avgCurrent = Math.round(info.currentSum / info.total);
    const avgRequired = Math.round(info.reqSum / info.total);
    const matchPct = Math.min(100, Math.round((avgCurrent / avgRequired) * 100));
    return {
      name: cat,
      count: info.total,
      avgCurrent,
      avgRequired,
      matchPct
    };
  });

  const getBarColor = (pct: number) => {
    if (pct >= 80) return 'bg-emerald-500';
    if (pct >= 60) return 'bg-blue-500';
    if (pct >= 40) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {categories.map((c) => (
        <div
          key={c.name}
          className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50"
        >
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-semibold text-slate-800 dark:text-slate-200">{c.name}</span>
            <span className="text-[11px] font-medium text-slate-500">
              {c.avgCurrent}% / {c.avgRequired}% avg
            </span>
          </div>
          <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${getBarColor(c.matchPct)}`}
              style={{ width: `${c.matchPct}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1.5">
            <span>{c.count} skill{c.count > 1 ? 's' : ''} assessed</span>
            <span className="font-medium text-slate-600 dark:text-slate-300">{c.matchPct}% mastery</span>
          </div>
        </div>
      ))}
    </div>
  );
};
