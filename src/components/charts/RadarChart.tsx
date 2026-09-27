import React, { useState } from 'react';
import { SkillGapItem } from '../../types';

interface RadarChartProps {
  skills: SkillGapItem[];
  size?: number;
}

export const RadarChart: React.FC<RadarChartProps> = ({ skills, size = 380 }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!skills || skills.length === 0) {
    return <div className="p-8 text-center text-slate-400">No skill data available</div>;
  }

  const center = size / 2;
  const radius = (size - 100) / 2;
  const total = skills.length;
  const angleStep = (Math.PI * 2) / total;

  // Grid levels (20%, 40%, 60%, 80%, 100%)
  const levels = [0.2, 0.4, 0.6, 0.8, 1.0];

  const getCoordinates = (index: number, valueRatio: number) => {
    const angle = index * angleStep - Math.PI / 2; // start from top
    const r = radius * valueRatio;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle)
    };
  };

  // Build required polygon points
  const requiredPoints = skills
    .map((s, i) => {
      const coord = getCoordinates(i, s.requiredProficiency / 100);
      return `${coord.x},${coord.y}`;
    })
    .join(' ');

  // Build current polygon points
  const currentPoints = skills
    .map((s, i) => {
      const coord = getCoordinates(i, Math.min(100, s.currentProficiency) / 100);
      return `${coord.x},${coord.y}`;
    })
    .join(' ');

  return (
    <div className="relative flex flex-col items-center justify-center">
      <svg width={size} height={size} className="overflow-visible">
        {/* Background Web Polygons */}
        {levels.map((level, lvlIdx) => {
          const points = skills
            .map((_, i) => {
              const coord = getCoordinates(i, level);
              return `${coord.x},${coord.y}`;
            })
            .join(' ');
          return (
            <polygon
              key={`grid-${lvlIdx}`}
              points={points}
              fill="none"
              stroke="currentColor"
              className="text-slate-200 dark:text-slate-800"
              strokeWidth="1"
              strokeDasharray={lvlIdx === levels.length - 1 ? 'none' : '2,2'}
            />
          );
        })}

        {/* Radial Axis Spokes */}
        {skills.map((_, i) => {
          const coord = getCoordinates(i, 1.0);
          return (
            <line
              key={`spoke-${i}`}
              x1={center}
              y1={center}
              x2={coord.x}
              y2={coord.y}
              stroke="currentColor"
              className="text-slate-200 dark:text-slate-800"
              strokeWidth="1"
            />
          );
        })}

        {/* Required Polygon (Target) */}
        <polygon
          points={requiredPoints}
          fill="rgba(59, 130, 246, 0.08)"
          stroke="#3b82f6"
          strokeWidth="2"
          strokeDasharray="4,4"
        />

        {/* Current Polygon (Student) */}
        <polygon
          points={currentPoints}
          fill="rgba(16, 185, 129, 0.25)"
          stroke="#10b981"
          strokeWidth="2.5"
        />

        {/* Dots on Current Points */}
        {skills.map((s, i) => {
          const coord = getCoordinates(i, Math.min(100, s.currentProficiency) / 100);
          const isHovered = hoveredIndex === i;
          return (
            <circle
              key={`dot-${i}`}
              cx={coord.x}
              cy={coord.y}
              r={isHovered ? 6 : 4}
              fill="#10b981"
              stroke="#ffffff"
              strokeWidth="2"
              className="cursor-pointer transition-all duration-200"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
          );
        })}

        {/* Labels */}
        {skills.map((s, i) => {
          const labelCoord = getCoordinates(i, 1.18);
          const isHovered = hoveredIndex === i;
          // Determine text-anchor based on angle
          const angle = i * angleStep - Math.PI / 2;
          const cos = Math.cos(angle);
          let textAnchor: 'start' | 'end' | 'middle' = 'middle';
          if (cos > 0.3) textAnchor = 'start';
          else if (cos < -0.3) textAnchor = 'end';

          return (
            <text
              key={`label-${i}`}
              x={labelCoord.x}
              y={labelCoord.y}
              textAnchor={textAnchor}
              dominantBaseline="middle"
              className={`text-[11px] font-medium transition-colors cursor-pointer select-none ${
                isHovered
                  ? 'fill-emerald-500 font-bold'
                  : 'fill-slate-600 dark:fill-slate-300'
              }`}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {s.skillName.length > 16 ? s.skillName.slice(0, 14) + '…' : s.skillName}
            </text>
          );
        })}
      </svg>

      {/* Legend & Tooltip */}
      <div className="flex items-center gap-6 mt-3 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          <span className="font-medium text-slate-700 dark:text-slate-200">Current Level</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 border border-dashed border-blue-500 rounded-full inline-block" />
          <span className="font-medium text-slate-700 dark:text-slate-200">Required Level</span>
        </div>
      </div>

      {hoveredIndex !== null && skills[hoveredIndex] && (
        <div className="mt-2 text-xs py-1 px-3 bg-slate-900 text-white dark:bg-slate-800 rounded-lg shadow-md border border-slate-700">
          <span className="font-semibold">{skills[hoveredIndex].skillName}</span>:{' '}
          Current <span className="text-emerald-400">{skills[hoveredIndex].currentProficiency}%</span> / Required{' '}
          <span className="text-blue-400">{skills[hoveredIndex].requiredProficiency}%</span> (Gap:{' '}
          <span className="text-amber-400">{skills[hoveredIndex].gap}%</span>)
        </div>
      )}
    </div>
  );
};
