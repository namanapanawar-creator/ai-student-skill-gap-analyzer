import React from 'react';

interface ReadinessGaugeProps {
  score: number; // 0-100
  size?: number;
}

export const ReadinessGauge: React.FC<ReadinessGaugeProps> = ({ score, size = 180 }) => {
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  // Arc over 260 degrees (leaving bottom open)
  const arcLength = circumference * 0.75;
  const progressLength = (score / 100) * arcLength;
  const dashOffset = arcLength - progressLength;

  // Determine tier and color
  let color = '#ef4444'; // Red
  let tierLabel = 'Early Preparation';
  let tierBg = 'bg-rose-500/10 text-rose-400 border-rose-500/20';

  if (score >= 80) {
    color = '#10b981'; // Emerald
    tierLabel = 'Job & Internship Ready';
    tierBg = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
  } else if (score >= 65) {
    color = '#3b82f6'; // Blue
    tierLabel = 'Interview Ready Candidate';
    tierBg = 'bg-blue-500/10 text-blue-400 border-blue-500/20';
  } else if (score >= 45) {
    color = '#f59e0b'; // Amber
    tierLabel = 'Developing Competence';
    tierBg = 'bg-amber-500/10 text-amber-400 border-amber-500/20';
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative" style={{ width: size, height: size * 0.85 }}>
        <svg
          width={size}
          height={size}
          className="transform rotate-[135deg]"
          viewBox={`0 0 ${size} ${size}`}
        >
          {/* Background Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="currentColor"
            className="text-slate-200 dark:text-slate-800"
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeLinecap="round"
          />
          {/* Progress Arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
          <div className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            {score}<span className="text-xl font-normal text-slate-400 dark:text-slate-500">%</span>
          </div>
          <span className="text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">
            Readiness
          </span>
        </div>
      </div>

      <div className={`mt-1 text-xs px-2.5 py-1 rounded-full border font-medium ${tierBg}`}>
        {tierLabel}
      </div>
    </div>
  );
};
