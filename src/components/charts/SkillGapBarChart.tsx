import React from 'react';
import { SkillGapItem } from '../../types';

interface SkillGapBarChartProps {
  skills: SkillGapItem[];
}

export const SkillGapBarChart: React.FC<SkillGapBarChartProps> = ({ skills }) => {
  return (
    <div className="space-y-4">
      {skills.map((skill) => {
        const gap = skill.gap;
        let gapColor = 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
        let barColor = 'bg-emerald-500';

        if (gap >= 30) {
          gapColor = 'text-rose-500 bg-rose-500/10 border-rose-500/20';
          barColor = 'bg-rose-500';
        } else if (gap >= 15) {
          gapColor = 'text-amber-500 bg-amber-500/10 border-amber-500/20';
          barColor = 'bg-amber-500';
        } else if (gap > 0) {
          gapColor = 'text-blue-500 bg-blue-500/10 border-blue-500/20';
          barColor = 'bg-blue-500';
        }

        return (
          <div key={skill.skillId} className="group">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-900 dark:text-slate-100">
                  {skill.skillName}
                </span>
                <span className="text-[10px] text-slate-400">({skill.category})</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-slate-500 dark:text-slate-400">
                  Current: <strong className="text-slate-800 dark:text-slate-200">{skill.currentProficiency}%</strong>
                </span>
                <span className="text-slate-400">/</span>
                <span className="text-slate-500 dark:text-slate-400">
                  Target: <strong className="text-blue-600 dark:text-blue-400">{skill.requiredProficiency}%</strong>
                </span>
                <span className={`px-2 py-0.5 rounded text-[11px] font-medium border ${gapColor}`}>
                  {gap === 0 ? 'Matched ✓' : `-${gap}% Gap`}
                </span>
              </div>
            </div>

            {/* Bar Track */}
            <div className="relative w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              {/* Target Indicator Line */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-blue-400 dark:bg-blue-300 z-10"
                style={{ left: `${skill.requiredProficiency}%` }}
                title={`Target: ${skill.requiredProficiency}%`}
              />
              {/* Current Fill */}
              <div
                className={`h-full rounded-full transition-all duration-700 ease-out ${barColor}`}
                style={{ width: `${Math.min(100, skill.currentProficiency)}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
