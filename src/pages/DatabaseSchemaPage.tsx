import React, { useState } from 'react';
import {
  Database,
  Table,
  Key,
  FileCode,
  Download,
  Copy,
  Check,
  ExternalLink,
  Layers,
  ArrowRight
} from 'lucide-react';
import { ALL_SKILLS, CAREER_ROLES, ROLE_SKILL_FRAMEWORK } from '../data/rolesData';
import { StudentProfile, AnalysisReport } from '../types';
import { exportSqlDump } from '../db/store';

interface DatabaseSchemaPageProps {
  profile: StudentProfile;
  report: AnalysisReport;
}

export const DatabaseSchemaPage: React.FC<DatabaseSchemaPageProps> = ({
  profile,
  report
}) => {
  const [selectedTable, setSelectedTable] = useState<string>('student_profiles');
  const [copied, setCopied] = useState<boolean>(false);

  const tables = [
    {
      id: 'users',
      name: 'users',
      description: 'Registered student and fresher user accounts',
      rowCount: 1,
      columns: [
        { name: 'id', type: 'UUID PRIMARY KEY', desc: 'Unique student identifier' },
        { name: 'email', type: 'VARCHAR(255) UNIQUE', desc: 'University or personal email' },
        { name: 'full_name', type: 'VARCHAR(150)', desc: 'Display name' },
        { name: 'created_at', type: 'TIMESTAMP WITH TIME ZONE', desc: 'Account creation date' }
      ]
    },
    {
      id: 'student_profiles',
      name: 'student_profiles',
      description: 'Academic background, degree, branch, year, target career role, and readiness score',
      rowCount: 1,
      columns: [
        { name: 'id', type: 'UUID PRIMARY KEY', desc: 'Profile identifier' },
        { name: 'user_id', type: 'UUID REFERENCES users(id)', desc: 'Owner user foreign key' },
        { name: 'degree', type: 'VARCHAR(100)', desc: 'e.g. B.Tech in Computer Science' },
        { name: 'branch', type: 'VARCHAR(100)', desc: 'e.g. Computer Science and Engineering' },
        { name: 'current_year', type: 'VARCHAR(50)', desc: 'e.g. 3rd Year / 6th Semester' },
        { name: 'target_role_id', type: 'VARCHAR(50) REFERENCES career_roles(id)', desc: 'Target career track' },
        { name: 'readiness_score', type: 'INT (0-100)', desc: 'Computed readiness score' }
      ]
    },
    {
      id: 'career_roles',
      name: 'career_roles',
      description: 'Predefined career tracks and market salary bands',
      rowCount: CAREER_ROLES.length,
      columns: [
        { name: 'id', type: 'VARCHAR(50) PRIMARY KEY', desc: 'e.g. software-developer, data-analyst' },
        { name: 'title', type: 'VARCHAR(100)', desc: 'Full role designation' },
        { name: 'category', type: 'VARCHAR(50)', desc: 'Domain specialization' },
        { name: 'average_salary', type: 'VARCHAR(50)', desc: 'Market benchmark salary' },
        { name: 'demand_level', type: 'VARCHAR(30)', desc: 'High, Very High, Growing' }
      ]
    },
    {
      id: 'skills',
      name: 'skills',
      description: 'Master catalog of programming languages, tools, and computer science concepts',
      rowCount: ALL_SKILLS.length,
      columns: [
        { name: 'id', type: 'VARCHAR(50) PRIMARY KEY', desc: 'Skill unique slug' },
        { name: 'name', type: 'VARCHAR(100)', desc: 'Readable skill name' },
        { name: 'category', type: 'VARCHAR(50)', desc: 'Programming, Core CS, Database, Tools, Security' },
        { name: 'description', type: 'TEXT', desc: 'Skill scope description' }
      ]
    },
    {
      id: 'role_skills',
      name: 'role_skills',
      description: 'Role benchmark requirements, required proficiencies, weights, and priorities',
      rowCount: Object.values(ROLE_SKILL_FRAMEWORK).reduce((sum, arr) => sum + arr.length, 0),
      columns: [
        { name: 'id', type: 'UUID PRIMARY KEY', desc: 'Requirement record ID' },
        { name: 'role_id', type: 'VARCHAR(50) REFERENCES career_roles(id)', desc: 'Career role FK' },
        { name: 'skill_id', type: 'VARCHAR(50) REFERENCES skills(id)', desc: 'Skill FK' },
        { name: 'required_proficiency', type: 'INT (0-100)', desc: 'Target minimum proficiency' },
        { name: 'priority', type: 'VARCHAR(20)', desc: 'Critical, High, Medium, Low' },
        { name: 'learning_guidance', type: 'TEXT', desc: 'Preparation instructions' }
      ]
    },
    {
      id: 'student_skills',
      name: 'student_skills',
      description: 'Student self-rated skill proficiencies and verification status',
      rowCount: profile.skills.length,
      columns: [
        { name: 'id', type: 'UUID PRIMARY KEY', desc: 'Record ID' },
        { name: 'profile_id', type: 'UUID REFERENCES student_profiles(id)', desc: 'Student profile FK' },
        { name: 'skill_id', type: 'VARCHAR(50) REFERENCES skills(id)', desc: 'Skill FK' },
        { name: 'self_proficiency_level', type: 'VARCHAR(20)', desc: 'Beginner, Intermediate, Advanced' },
        { name: 'proficiency_score', type: 'INT (0-100)', desc: 'Numeric rating' }
      ]
    },
    {
      id: 'projects',
      name: 'projects',
      description: 'Student personal and academic project portfolio entries',
      rowCount: profile.projects.length,
      columns: [
        { name: 'id', type: 'UUID PRIMARY KEY', desc: 'Project ID' },
        { name: 'profile_id', type: 'UUID REFERENCES student_profiles(id)', desc: 'Student profile FK' },
        { name: 'title', type: 'VARCHAR(150)', desc: 'Project title' },
        { name: 'description', type: 'TEXT', desc: 'Architecture summary' },
        { name: 'tech_stack', type: 'TEXT[]', desc: 'Array of technologies utilized' },
        { name: 'difficulty', type: 'VARCHAR(30)', desc: 'Beginner, Intermediate, Advanced' }
      ]
    },
    {
      id: 'certifications',
      name: 'certifications',
      description: 'Industry credentials, vendor certifications, and specializations',
      rowCount: profile.certifications.length,
      columns: [
        { name: 'id', type: 'UUID PRIMARY KEY', desc: 'Certification ID' },
        { name: 'profile_id', type: 'UUID REFERENCES student_profiles(id)', desc: 'Student profile FK' },
        { name: 'name', type: 'VARCHAR(150)', desc: 'Certificate title' },
        { name: 'issuing_organization', type: 'VARCHAR(150)', desc: 'e.g. AWS, Meta, Google, CompTIA' },
        { name: 'issue_year', type: 'INT', desc: 'Year acquired' }
      ]
    },
    {
      id: 'learning_roadmaps',
      name: 'learning_roadmaps',
      description: 'Generated timeline items (Week 1-2, Week 3-4, Month 2, Month 3)',
      rowCount: report.roadmap.length,
      columns: [
        { name: 'id', type: 'UUID PRIMARY KEY', desc: 'Roadmap task ID' },
        { name: 'profile_id', type: 'UUID REFERENCES student_profiles(id)', desc: 'Student profile FK' },
        { name: 'timeframe_phase', type: 'VARCHAR(50)', desc: 'Week 1-2, Week 3-4, Month 2, Month 3' },
        { name: 'what_to_learn', type: 'TEXT', desc: 'Specific curriculum objectives' },
        { name: 'suggested_task', type: 'TEXT', desc: 'Hands-on practice task' },
        { name: 'estimated_hours', type: 'INT', desc: 'Estimated study hours' }
      ]
    },
    {
      id: 'progress',
      name: 'progress',
      description: 'Skill completion status tracking (Not Started, Learning, Completed)',
      rowCount: report.skillGaps.length,
      columns: [
        { name: 'id', type: 'UUID PRIMARY KEY', desc: 'Progress tracking ID' },
        { name: 'profile_id', type: 'UUID REFERENCES student_profiles(id)', desc: 'Student profile FK' },
        { name: 'skill_id', type: 'VARCHAR(50) REFERENCES skills(id)', desc: 'Skill FK' },
        { name: 'status', type: 'VARCHAR(30)', desc: 'Not Started, Learning, Completed' },
        { name: 'completion_percentage', type: 'INT', desc: '0 to 100%' }
      ]
    },
    {
      id: 'analysis_reports',
      name: 'analysis_reports',
      description: 'Historical and current computed skill gap reports and JSON snapshots',
      rowCount: 1,
      columns: [
        { name: 'id', type: 'UUID PRIMARY KEY', desc: 'Report ID' },
        { name: 'profile_id', type: 'UUID REFERENCES student_profiles(id)', desc: 'Student profile FK' },
        { name: 'role_id', type: 'VARCHAR(50)', desc: 'Target role analyzed' },
        { name: 'readiness_score', type: 'INT', desc: 'Final computed score' },
        { name: 'report_data', type: 'JSONB', desc: 'Full serialized analysis payload' }
      ]
    }
  ];

  const currentTable = tables.find((t) => t.id === selectedTable) || tables[0];
  const sqlDump = exportSqlDump(profile, report);

  const handleCopySql = () => {
    navigator.clipboard.writeText(sqlDump);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadSql = () => {
    const blob = new Blob([sqlDump], { type: 'text/sql' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `skill_gap_schema_${profile.targetRoleId}.sql`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 mb-2">
            <Database className="w-3.5 h-3.5" />
            <span>PostgreSQL Relational Schema</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Database Architecture & Data Model
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Explore the 11 normalized relational database tables powering the skill-gap analysis engine.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopySql}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-1.5 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied SQL' : 'Copy SQL'}</span>
          </button>

          <button
            onClick={handleDownloadSql}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-1.5 shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Download SQL Dump</span>
          </button>
        </div>
      </div>

      {/* Tables Browser */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left List of Tables (4 cols) */}
        <div className="lg:col-span-4 space-y-1.5 bg-white dark:bg-slate-900 p-3 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs h-fit">
          <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Relational Tables ({tables.length})
          </div>
          {tables.map((t) => {
            const isSelected = selectedTable === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setSelectedTable(t.id)}
                className={`w-full flex items-center justify-between p-3 rounded-2xl text-left text-xs transition-colors ${
                  isSelected
                    ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-bold border border-blue-200 dark:border-blue-900 shadow-2xs'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <Table className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="font-mono text-xs">{t.name}</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 shrink-0">
                  {t.rowCount} record{t.rowCount !== 1 ? 's' : ''}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Table Schema Detail (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4">
            <div>
              <div className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                Table Definition
              </div>
              <h3 className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-0.5">
                {currentTable.name}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {currentTable.description}
              </p>
            </div>

            {/* Columns Table */}
            <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-[11px] font-semibold text-slate-500 uppercase">
                  <tr>
                    <th className="py-3 px-4">Column Name</th>
                    <th className="py-3 px-4 font-mono">Data Type & Constraint</th>
                    <th className="py-3 px-4">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {currentTable.columns.map((col) => (
                    <tr key={col.name} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                      <td className="py-3 px-4 font-bold font-mono text-slate-900 dark:text-white flex items-center gap-1.5">
                        {col.type.includes('PRIMARY') && <Key className="w-3.5 h-3.5 text-amber-500 shrink-0" />}
                        {col.name}
                      </td>
                      <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">
                        {col.type}
                      </td>
                      <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                        {col.desc}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* DDL Code Snippet */}
          <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-950 text-slate-200 font-mono text-xs space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-[11px] border-b border-slate-800 pb-2">
              <span>DDL Specification</span>
              <span>PostgreSQL Syntax</span>
            </div>
            <pre className="overflow-x-auto pt-2 leading-relaxed text-slate-300">
{`CREATE TABLE IF NOT EXISTS ${currentTable.name} (
${currentTable.columns.map(c => `    ${c.name.padEnd(24, ' ')} ${c.type}`).join(',\n')}
);`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
