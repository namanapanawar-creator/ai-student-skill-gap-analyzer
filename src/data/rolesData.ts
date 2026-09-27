import { CareerRole, RoleSkill, Skill } from '../types';

export const ALL_SKILLS: Skill[] = [
  // Programming & Core CS
  { id: 'python', name: 'Python', category: 'Programming', description: 'General purpose scripting, backend, data science, and automation language' },
  { id: 'javascript-ts', name: 'JavaScript / TypeScript', category: 'Programming', description: 'Core modern web and server-side runtime languages with type safety' },
  { id: 'programming', name: 'Core Programming', category: 'Programming', description: 'Syntax fluency, clean code practices, logic formulation, and modular code' },
  { id: 'dsa', name: 'Data Structures & Algorithms', category: 'Core CS', description: 'Arrays, trees, graphs, dynamic programming, time/space complexity' },
  { id: 'oop', name: 'OOP Concepts', category: 'Core CS', description: 'Object-Oriented Design, encapsulation, polymorphism, inheritance, design patterns' },
  { id: 'problem-solving', name: 'Problem Solving', category: 'Core CS', description: 'Algorithmic breakdown, debugging, boundary condition testing' },
  { id: 'os', name: 'Operating Systems', category: 'Core CS', description: 'Process management, memory paging, concurrency, threads, file systems' },
  
  // Databases & Data
  { id: 'dbms', name: 'DBMS Fundamentals', category: 'Database', description: 'ACID properties, relational schemas, indexing, normalization, transactions' },
  { id: 'sql', name: 'SQL', category: 'Database', description: 'Complex joins, aggregations, window functions, CTEs, query optimization' },
  { id: 'excel', name: 'Excel / Spreadsheets', category: 'Data & AI', description: 'Formulas, VLOOKUP/XLOOKUP, pivot tables, macros, data modeling' },
  { id: 'pandas', name: 'Pandas & NumPy', category: 'Data & AI', description: 'DataFrames, series operations, vectorized computing, missing data imputation' },
  { id: 'statistics', name: 'Statistics & Probability', category: 'Data & AI', description: 'Hypothesis testing, distributions, p-values, regression analysis, variance' },
  { id: 'data-viz', name: 'Data Visualization', category: 'Data & AI', description: 'Visual storytelling with Matplotlib, Seaborn, and presentation principles' },
  { id: 'powerbi-tableau', name: 'Power BI / Tableau', category: 'Data & AI', description: 'Interactive dashboard creation, DAX queries, BI data relationships' },
  { id: 'data-cleaning', name: 'Data Cleaning & Preprocessing', category: 'Data & AI', description: 'Outlier detection, formatting, feature transformation, deduplication' },
  { id: 'ml', name: 'Machine Learning', category: 'Data & AI', description: 'Supervised/unsupervised algorithms, evaluation metrics, overfitting avoidance' },
  { id: 'deep-learning', name: 'Deep Learning', category: 'Data & AI', description: 'Neural networks, backpropagation, CNNs, RNNs, transformer fundamentals' },
  { id: 'pytorch-tf', name: 'PyTorch / TensorFlow', category: 'Data & AI', description: 'Model training pipelines, tensor operations, loss functions, GPU acceleration' },
  { id: 'math-linear-algebra', name: 'Mathematics & Linear Algebra', category: 'Data & AI', description: 'Matrix transformations, vector spaces, eigenvalues, gradients' },
  { id: 'model-deployment', name: 'Model Deployment (MLOps)', category: 'Data & AI', description: 'FastAPI model wrappers, ONNX runtime, HuggingFace inference, Docker' },
  { id: 'nlp-cv', name: 'NLP & Computer Vision', category: 'Data & AI', description: 'Tokenization, embeddings, OpenCV, transfer learning with foundation models' },

  // Security
  { id: 'networking', name: 'Computer Networking', category: 'Security', description: 'TCP/IP, OSI model, DNS, DHCP, HTTP/HTTPS, subnetting, Wireshark' },
  { id: 'linux', name: 'Linux System Administration', category: 'Tools & Cloud', description: 'Bash scripting, permissions, systemd, process monitoring, SSH keys' },
  { id: 'cryptography', name: 'Cryptography', category: 'Security', description: 'Symmetric/asymmetric encryption, hashing, TLS/SSL, PKI certificates' },
  { id: 'web-security', name: 'Web Security (OWASP Top 10)', category: 'Security', description: 'XSS, SQLi, CSRF, SSRF, authentication bypass, security headers' },
  { id: 'vulnerability-assessment', name: 'Vulnerability Assessment', category: 'Security', description: 'Scanning with Nessus, Nmap, OpenVAS, CVE tracking, risk scoring' },
  { id: 'siem', name: 'SIEM & Log Analysis', category: 'Security', description: 'Splunk, Elastic SIEM, alert triage, incident detection, syslog correlation' },
  { id: 'incident-response', name: 'Incident Response & Forensics', category: 'Security', description: 'Playbook execution, artifact capture, timeline generation, root-cause analysis' },
  { id: 'security-tools', name: 'Security Tools (Burp, Wireshark, Metasploit)', category: 'Security', description: 'Hands-on offensive/defensive tool proficiency, packet interception' },

  // Cloud & DevOps
  { id: 'git-github', name: 'Git & GitHub', category: 'Tools & Cloud', description: 'Version control, PR reviews, merge conflict resolution, branch workflows' },
  { id: 'cloud-platforms', name: 'Cloud Platforms (AWS / GCP / Azure)', category: 'Tools & Cloud', description: 'IAM, compute (EC2/GCE), storage (S3/GCS), VPC networks, serverless' },
  { id: 'cloud-architecture', name: 'Cloud Architecture & Reliability', category: 'Tools & Cloud', description: 'Well-Architected framework, multi-AZ high availability, load balancers' },
  { id: 'docker', name: 'Docker & Containerization', category: 'Tools & Cloud', description: 'Dockerfile optimization, multi-stage builds, container networking, volumes' },
  { id: 'kubernetes', name: 'Kubernetes (K8s)', category: 'Tools & Cloud', description: 'Pods, Deployments, Services, Ingress, ConfigMaps, Helm charts' },
  { id: 'terraform', name: 'Terraform & IaC', category: 'Tools & Cloud', description: 'Declarative infrastructure, state management, provider modules' },
  { id: 'cicd', name: 'CI/CD Automation', category: 'Tools & Cloud', description: 'GitHub Actions, GitLab CI, automated testing, artifact publishing' },
  { id: 'monitoring', name: 'Monitoring & Observability', category: 'Tools & Cloud', description: 'Prometheus, Grafana, OpenTelemetry, metrics, alerting rules' },
  { id: 'bash-scripting', name: 'Bash & Automation Scripting', category: 'Tools & Cloud', description: 'Shell automation, cron jobs, text processing with awk/sed/grep' },

  // Web & Full Stack
  { id: 'html-css', name: 'HTML5 & Modern CSS / Tailwind', category: 'Web & APIs', description: 'Semantic HTML, responsive grid/flexbox layouts, CSS modern utility frameworks' },
  { id: 'react', name: 'React & Component Architecture', category: 'Web & APIs', description: 'Hooks, functional components, reconciliation, memoization, custom hooks' },
  { id: 'web-dev', name: 'Web Development', category: 'Web & APIs', description: 'DOM manipulation, client-server lifecycle, state sync, browser APIs' },
  { id: 'apis', name: 'REST & GraphQL APIs', category: 'Web & APIs', description: 'HTTP verbs, status codes, payload serialization, auth tokens, rate limits' },
  { id: 'nodejs', name: 'Node.js & Backend Architecture', category: 'Web & APIs', description: 'Event loop, Express/Fastify, middleware design, asynchronous I/O' },
  { id: 'state-management', name: 'State Management & Caching', category: 'Web & APIs', description: 'Zustand, Redux, React Query, cache invalidation, optimistic updates' }
];

export const CAREER_ROLES: CareerRole[] = [
  {
    id: 'software-developer',
    title: 'Software Developer',
    category: 'Software Engineering',
    description: 'Builds robust, high-performance applications, implements algorithmic problem solving, architects object-oriented code, and engineers scalable services.',
    averageSalary: '$85,000 - $130,000',
    demandLevel: 'Very High',
    icon: 'Code2',
    topSkills: ['Data Structures & Algorithms', 'Programming', 'OOP Concepts', 'SQL', 'DBMS Fundamentals', 'Git & GitHub', 'REST & GraphQL APIs', 'Problem Solving']
  },
  {
    id: 'cybersecurity-analyst',
    title: 'Cybersecurity Analyst',
    category: 'Information Security',
    description: 'Protects critical digital infrastructure, monitors SIEM logs, conducts vulnerability assessments, investigates security incidents, and secures networks.',
    averageSalary: '$82,000 - $125,000',
    demandLevel: 'Very High',
    icon: 'ShieldCheck',
    topSkills: ['Computer Networking', 'Linux System Administration', 'Python', 'Web Security (OWASP)', 'Vulnerability Assessment', 'SIEM & Log Analysis', 'Incident Response']
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    category: 'Data Science & Analytics',
    description: 'Transforms raw business data into actionable visual insights, crafts analytical SQL queries, validates statistical models, and builds executive dashboards.',
    averageSalary: '$75,000 - $110,000',
    demandLevel: 'High',
    icon: 'BarChart3',
    topSkills: ['SQL', 'Excel / Spreadsheets', 'Python', 'Pandas & NumPy', 'Data Visualization', 'Power BI / Tableau', 'Statistics & Probability', 'Data Cleaning']
  },
  {
    id: 'aiml-engineer',
    title: 'AI/ML Engineer',
    category: 'Artificial Intelligence',
    description: 'Designs, trains, and deploys intelligent machine learning models, neural networks, and scalable inference pipelines using PyTorch, TensorFlow, and modern LLMs.',
    averageSalary: '$105,000 - $160,000',
    demandLevel: 'Very High',
    icon: 'Cpu',
    topSkills: ['Python', 'Machine Learning', 'Deep Learning', 'PyTorch / TensorFlow', 'Mathematics & Linear Algebra', 'Model Deployment (MLOps)', 'Data Cleaning']
  },
  {
    id: 'cloud-engineer',
    title: 'Cloud Engineer',
    category: 'Cloud & Infrastructure',
    description: 'Architects resilient, cost-effective multi-tier infrastructure on public cloud providers (AWS, GCP, Azure), automated with Terraform and modern containers.',
    averageSalary: '$95,000 - $140,000',
    demandLevel: 'High',
    icon: 'Cloud',
    topSkills: ['Cloud Platforms (AWS/GCP)', 'Cloud Architecture', 'Linux System Administration', 'Docker & Containers', 'Terraform & IaC', 'CI/CD Automation']
  },
  {
    id: 'web-developer',
    title: 'Web Developer (Full Stack)',
    category: 'Web Engineering',
    description: 'Creates responsive, accessible user interfaces and high-performance server APIs with React, TypeScript, Node.js, and modern CSS frameworks.',
    averageSalary: '$80,000 - $120,000',
    demandLevel: 'High',
    icon: 'Globe',
    topSkills: ['JavaScript / TypeScript', 'React & Component Architecture', 'HTML5 & Modern CSS', 'REST & GraphQL APIs', 'Node.js & Backend', 'Git & GitHub']
  },
  {
    id: 'devops-engineer',
    title: 'DevOps Engineer',
    category: 'Operations & Reliability',
    description: 'Bridges software development and infrastructure operations through automated CI/CD pipelines, container orchestration, Kubernetes, and observability systems.',
    averageSalary: '$100,000 - $150,000',
    demandLevel: 'Growing',
    icon: 'Terminal',
    topSkills: ['CI/CD Automation', 'Docker & Containers', 'Kubernetes (K8s)', 'Linux System Administration', 'Terraform & IaC', 'Monitoring & Observability']
  }
];

export const ROLE_SKILL_FRAMEWORK: Record<string, { skillId: string; requiredProficiency: number; priority: 'Critical' | 'High' | 'Medium'; guidance: string }[]> = {
  'software-developer': [
    { skillId: 'dsa', requiredProficiency: 85, priority: 'Critical', guidance: 'Master trees, graphs, dynamic programming, and binary search. Aim for 150+ solved LeetCode mediums.' },
    { skillId: 'programming', requiredProficiency: 85, priority: 'Critical', guidance: 'Write clean, idiomatic code in Java, C++, or Python with modular functions and strict typing.' },
    { skillId: 'oop', requiredProficiency: 80, priority: 'High', guidance: 'Understand SOLID principles, factory/singleton patterns, and clean architecture abstractions.' },
    { skillId: 'dbms', requiredProficiency: 75, priority: 'High', guidance: 'Grasp B-Tree indexes, transactions, normalization, and relational integrity.' },
    { skillId: 'sql', requiredProficiency: 80, priority: 'High', guidance: 'Write multi-table joins, subqueries, group by aggregations, and window functions.' },
    { skillId: 'git-github', requiredProficiency: 75, priority: 'Medium', guidance: 'Branching strategies, rebase vs merge, solving merge conflicts, pull request etiquette.' },
    { skillId: 'web-dev', requiredProficiency: 70, priority: 'Medium', guidance: 'Understand client-server architecture, JSON serialization, and HTTP status codes.' },
    { skillId: 'apis', requiredProficiency: 75, priority: 'High', guidance: 'Design RESTful endpoints with idempotency, token headers, error schemas, and validation.' },
    { skillId: 'problem-solving', requiredProficiency: 85, priority: 'Critical', guidance: 'Deconstruct vague system prompts into discrete algorithmic steps and edge case tests.' }
  ],
  'cybersecurity-analyst': [
    { skillId: 'networking', requiredProficiency: 85, priority: 'Critical', guidance: 'TCP three-way handshake, subnet masks, DNS records, packet structures, Wireshark PCAP analysis.' },
    { skillId: 'linux', requiredProficiency: 80, priority: 'High', guidance: 'Command-line administration, /var/log parsing, iptables/ufw firewalls, user permissions.' },
    { skillId: 'python', requiredProficiency: 70, priority: 'Medium', guidance: 'Automate port scanning, hash checking, scraping threat intelligence feeds, and log parsing.' },
    { skillId: 'os', requiredProficiency: 75, priority: 'High', guidance: 'Windows registry inspection, Linux kernel processes, DLL injection concepts, memory basics.' },
    { skillId: 'cryptography', requiredProficiency: 75, priority: 'High', guidance: 'AES vs RSA, SHA-256 integrity checks, public key infrastructure (PKI), TLS handshake.' },
    { skillId: 'web-security', requiredProficiency: 85, priority: 'Critical', guidance: 'Detect and mitigate OWASP Top 10 vulnerabilities (SQLi, XSS, CSRF, broken access control).' },
    { skillId: 'vulnerability-assessment', requiredProficiency: 80, priority: 'Critical', guidance: 'Execute scans with Nessus/OpenVAS, prioritize CVE scores, write remediation briefs.' },
    { skillId: 'siem', requiredProficiency: 80, priority: 'High', guidance: 'Search and correlate alert logs in Splunk or Elastic, establish baseline anomalies.' },
    { skillId: 'incident-response', requiredProficiency: 75, priority: 'High', guidance: 'Follow NIST containment steps, preserve digital chain of custody, conduct post-mortems.' },
    { skillId: 'security-tools', requiredProficiency: 80, priority: 'High', guidance: 'Proficiency with Burp Suite Proxy, Nmap scripting engine, Metasploit payloads.' }
  ],
  'data-analyst': [
    { skillId: 'excel', requiredProficiency: 85, priority: 'Critical', guidance: 'XLOOKUP, nested INDEX-MATCH, pivot tables, slicers, Power Query ETL pipelines.' },
    { skillId: 'sql', requiredProficiency: 85, priority: 'Critical', guidance: 'Aggregations, RANK/DENSE_RANK, LEAD/LAG window functions, self-joins, CTE optimization.' },
    { skillId: 'python', requiredProficiency: 75, priority: 'High', guidance: 'Scripting data pipelines, connecting to database drivers, automating CSV/JSON imports.' },
    { skillId: 'statistics', requiredProficiency: 75, priority: 'High', guidance: 'Mean/median/mode, standard deviation, confidence intervals, A/B hypothesis tests.' },
    { skillId: 'data-viz', requiredProficiency: 80, priority: 'High', guidance: 'Selecting right chart types, decluttering charts, color theory for data storytelling.' },
    { skillId: 'powerbi-tableau', requiredProficiency: 80, priority: 'High', guidance: 'Building multi-page interactive dashboards, star schemas, measures, published apps.' },
    { skillId: 'pandas', requiredProficiency: 80, priority: 'High', guidance: 'groupby, merge, melt, apply functions, datetime manipulation, handling missing values.' },
    { skillId: 'data-cleaning', requiredProficiency: 85, priority: 'Critical', guidance: 'Removing duplicates, regex string cleanup, outlier trimming, validation checks.' }
  ],
  'aiml-engineer': [
    { skillId: 'python', requiredProficiency: 90, priority: 'Critical', guidance: 'Advanced OOP, generator pipelines, vectorized math, typing, profiling memory usage.' },
    { skillId: 'ml', requiredProficiency: 85, priority: 'Critical', guidance: 'Random Forests, XGBoost, SVMs, hyperparameter tuning (Optuna), cross-validation.' },
    { skillId: 'deep-learning', requiredProficiency: 85, priority: 'Critical', guidance: 'Backpropagation, transformers, attention mechanisms, transfer learning, regularization.' },
    { skillId: 'math-linear-algebra', requiredProficiency: 80, priority: 'High', guidance: 'Matrix multiplications, eigenvalues, multivariable calculus gradients, probability.' },
    { skillId: 'pytorch-tf', requiredProficiency: 80, priority: 'High', guidance: 'Custom PyTorch Dataset/DataLoader, training loop checkpoints, GPU mixed precision.' },
    { skillId: 'model-deployment', requiredProficiency: 75, priority: 'High', guidance: 'FastAPI model endpoints, Docker containerization, latency quantization, Triton/ONNX.' },
    { skillId: 'data-cleaning', requiredProficiency: 80, priority: 'High', guidance: 'Feature scaling, embedding creation, balancing imbalanced datasets with SMOTE.' },
    { skillId: 'nlp-cv', requiredProficiency: 75, priority: 'Medium', guidance: 'HuggingFace pipelines, Tokenizers, sentence embeddings, OpenCV image augmentations.' }
  ],
  'cloud-engineer': [
    { skillId: 'cloud-platforms', requiredProficiency: 85, priority: 'Critical', guidance: 'AWS (VPC, IAM, EC2, S3, RDS, Lambda) or GCP equivalent resource lifecycle.' },
    { skillId: 'cloud-architecture', requiredProficiency: 80, priority: 'High', guidance: 'Reliability, disaster recovery, security perimeters, multi-region failover.' },
    { skillId: 'linux', requiredProficiency: 80, priority: 'High', guidance: 'Kernel parameters, systemd services, disk volume mounting, iptables routing.' },
    { skillId: 'docker', requiredProficiency: 80, priority: 'High', guidance: 'Multi-stage Dockerfiles, image caching, container security scanning (Trivy).' },
    { skillId: 'terraform', requiredProficiency: 75, priority: 'High', guidance: 'Terraform HCL syntax, remote S3 state backends, variable modules, drift detection.' },
    { skillId: 'networking', requiredProficiency: 80, priority: 'High', guidance: 'CIDR blocks, NAT Gateways, route tables, VPN gateways, DNS resolving.' },
    { skillId: 'cicd', requiredProficiency: 75, priority: 'Medium', guidance: 'Automating plan/apply infrastructure pipelines via GitHub Actions.' }
  ],
  'web-developer': [
    { skillId: 'html-css', requiredProficiency: 85, priority: 'High', guidance: 'Semantic tags, Flexbox/Grid masterclass, responsive breakpoints, Tailwind CSS.' },
    { skillId: 'javascript-ts', requiredProficiency: 85, priority: 'Critical', guidance: 'ESNext closures, async/await, DOM event bubbling, TypeScript interfaces & generics.' },
    { skillId: 'react', requiredProficiency: 85, priority: 'Critical', guidance: 'Hooks (useState, useEffect, useMemo), render cycles, component modularity.' },
    { skillId: 'nodejs', requiredProficiency: 75, priority: 'High', guidance: 'Express/Fastify servers, middleware auth verification, JSON schema validation.' },
    { skillId: 'apis', requiredProficiency: 80, priority: 'High', guidance: 'REST API consumption, error handling, CORS headers, optimistic mutation.' },
    { skillId: 'state-management', requiredProficiency: 75, priority: 'Medium', guidance: 'Zustand, React Query caching, local state vs global state separation.' },
    { skillId: 'git-github', requiredProficiency: 75, priority: 'Medium', guidance: 'Pull requests, git branch flow, semantic commits, conflict resolution.' }
  ],
  'devops-engineer': [
    { skillId: 'cicd', requiredProficiency: 85, priority: 'Critical', guidance: 'Complex multi-stage workflows, matrix testing, secret management, artifact caching.' },
    { skillId: 'docker', requiredProficiency: 85, priority: 'Critical', guidance: 'Small production images, rootless execution, Compose orchestrations.' },
    { skillId: 'kubernetes', requiredProficiency: 80, priority: 'Critical', guidance: 'Deployments, services, ingresses, rolling updates, resource limits, Helm.' },
    { skillId: 'linux', requiredProficiency: 85, priority: 'Critical', guidance: 'Shell scripting, process diagnostic tools (top, htop, strace, lsof, journalctl).' },
    { skillId: 'terraform', requiredProficiency: 80, priority: 'High', guidance: 'Modular IaC, workspace management, policy as code (OPA).' },
    { skillId: 'monitoring', requiredProficiency: 75, priority: 'High', guidance: 'Prometheus metrics scraping, Alertmanager rules, Grafana dashboard panels.' },
    { skillId: 'bash-scripting', requiredProficiency: 80, priority: 'High', guidance: 'Bash functions, error handling (`set -euo pipefail`), cron automation.' }
  ]
};

export const SAMPLE_STUDENTS: { id: string; name: string; label: string; roleId: string; degree: string; branch: string; year: string; skills: { skillId: string; level: 'Beginner' | 'Intermediate' | 'Advanced'; score: number }[]; projects: { title: string; desc: string; tech: string[]; diff: 'Beginner' | 'Intermediate' | 'Advanced' }[]; certs: { name: string; org: string; year: number }[]; internships: { role: string; comp: string; dur: string; desc: string }[] }[] = [
  {
    id: 'sample-alex',
    name: 'Alex Rivera',
    label: 'Alex Rivera (3rd Year CS Student -> Target: Software Developer)',
    roleId: 'software-developer',
    degree: 'B.Tech in Computer Science',
    branch: 'Computer Science and Engineering',
    year: '3rd Year / 6th Semester',
    skills: [
      { skillId: 'programming', level: 'Intermediate', score: 65 },
      { skillId: 'dsa', level: 'Intermediate', score: 60 },
      { skillId: 'oop', level: 'Intermediate', score: 70 },
      { skillId: 'dbms', level: 'Intermediate', score: 60 },
      { skillId: 'sql', level: 'Intermediate', score: 55 },
      { skillId: 'git-github', level: 'Intermediate', score: 70 },
      { skillId: 'web-dev', level: 'Intermediate', score: 65 },
      { skillId: 'apis', level: 'Beginner', score: 45 },
      { skillId: 'problem-solving', level: 'Intermediate', score: 60 }
    ],
    projects: [
      { title: 'Campus Event Booking Portal', desc: 'Full-stack web application allowing campus clubs to reserve auditoriums and manage student tickets.', tech: ['React', 'Node.js', 'Express', 'MongoDB'], diff: 'Intermediate' },
      { title: 'Pathfinding Visualizer', desc: 'Interactive browser visualization of Dijkstra and A* search algorithms on grid obstacles.', tech: ['JavaScript', 'HTML5 Canvas', 'CSS3'], diff: 'Intermediate' }
    ],
    certs: [
      { name: 'Meta Front-End Developer Specialization', org: 'Coursera / Meta', year: 2025 }
    ],
    internships: [
      { role: 'Web Development Intern', comp: 'InnovateX Labs', dur: '2 Months (Summer 2025)', desc: 'Built reusable React components and integrated REST endpoints for client dashboard.' }
    ]
  },
  {
    id: 'sample-priya',
    name: 'Priya Sharma',
    label: 'Priya Sharma (Final Year IT -> Target: Data Analyst)',
    roleId: 'data-analyst',
    degree: 'B.S. in Information Technology',
    branch: 'Information Technology',
    year: '4th Year / 7th Semester',
    skills: [
      { skillId: 'excel', level: 'Advanced', score: 85 },
      { skillId: 'sql', level: 'Intermediate', score: 65 },
      { skillId: 'python', level: 'Intermediate', score: 60 },
      { skillId: 'statistics', level: 'Beginner', score: 45 },
      { skillId: 'data-viz', level: 'Intermediate', score: 70 },
      { skillId: 'powerbi-tableau', level: 'Intermediate', score: 60 },
      { skillId: 'pandas', level: 'Intermediate', score: 55 },
      { skillId: 'data-cleaning', level: 'Intermediate', score: 65 }
    ],
    projects: [
      { title: 'E-Commerce Sales Insights Dashboard', desc: 'Analyzed 100,000+ retail records in Power BI to reveal seasonal revenue dips and customer retention rates.', tech: ['Power BI', 'SQL', 'Excel'], diff: 'Intermediate' }
    ],
    certs: [
      { name: 'Google Data Analytics Professional Certificate', org: 'Google / Coursera', year: 2025 }
    ],
    internships: []
  },
  {
    id: 'sample-marcus',
    name: 'Marcus Chen',
    label: 'Marcus Chen (3rd Year Cybersecurity Enthusiast -> Target: Cybersecurity Analyst)',
    roleId: 'cybersecurity-analyst',
    degree: 'B.S. in Cybersecurity',
    branch: 'Information Assurance & Security',
    year: '3rd Year / 5th Semester',
    skills: [
      { skillId: 'networking', level: 'Intermediate', score: 65 },
      { skillId: 'linux', level: 'Intermediate', score: 70 },
      { skillId: 'python', level: 'Beginner', score: 45 },
      { skillId: 'os', level: 'Intermediate', score: 60 },
      { skillId: 'cryptography', level: 'Beginner', score: 40 },
      { skillId: 'web-security', level: 'Beginner', score: 50 },
      { skillId: 'vulnerability-assessment', level: 'Beginner', score: 45 },
      { skillId: 'siem', level: 'Beginner', score: 35 },
      { skillId: 'incident-response', level: 'Beginner', score: 35 },
      { skillId: 'security-tools', level: 'Intermediate', score: 65 }
    ],
    projects: [
      { title: 'Home Lab Active Directory & SIEM', desc: 'Configured a virtualized Windows Server domain controller and forwarded event logs to Splunk.', tech: ['VirtualBox', 'Windows Server', 'Splunk', 'Sysmon'], diff: 'Intermediate' }
    ],
    certs: [
      { name: 'CompTIA Security+', org: 'CompTIA', year: 2025 }
    ],
    internships: []
  }
];

export const PROJECT_CATALOG: Record<string, { title: string; skillsDeveloped: string[]; difficulty: 'Beginner' | 'Intermediate' | 'Advanced'; description: string; expectedOutcome: string; milestones: string[] }[]> = {
  'software-developer': [
    {
      title: 'High-Throughput Microservice with In-Memory Caching',
      skillsDeveloped: ['APIs', 'DBMS Fundamentals', 'SQL', 'OOP Concepts'],
      difficulty: 'Intermediate',
      description: 'Build an API service handling 5,000 requests/sec with Redis caching, PostgreSQL connection pooling, and JWT authentication.',
      expectedOutcome: 'A production-grade backend demonstrating database performance tuning, concurrency control, and API testing coverage.',
      milestones: [
        'Design relational schema with foreign keys and index analysis',
        'Implement RESTful endpoints with validation and error middleware',
        'Integrate Redis caching layer with TTL eviction strategy',
        'Stress test with k6/Apache Bench and document latency improvements'
      ]
    },
    {
      title: 'Distributed Job Queue & Task Scheduler',
      skillsDeveloped: ['Core Programming', 'Data Structures & Algorithms', 'Problem Solving'],
      difficulty: 'Advanced',
      description: 'Implement a background worker queue with priority heaps, retry policies with exponential backoff, and dead-letter queues.',
      expectedOutcome: 'Demonstrates deep systems understanding, async design patterns, and algorithmic data structure choices.',
      milestones: [
        'Build in-memory min-heap priority scheduler',
        'Handle concurrent consumer threads with mutex locks',
        'Implement fault-tolerant checkpointing to persistent storage',
        'Write automated unit and integration tests'
      ]
    },
    {
      title: 'Collaborative Document Editor with Operational Transforms',
      skillsDeveloped: ['Web Development', 'Git & GitHub', 'OOP Concepts'],
      difficulty: 'Advanced',
      description: 'Create a multi-user real-time rich-text editor using WebSockets and conflict resolution algorithms.',
      expectedOutcome: 'Shows advanced full-stack mastery, real-time networking, and client-server synchronization.',
      milestones: [
        'Set up WebSocket server with room broadcasting',
        'Implement OT or CRDT algorithm for concurrent keystrokes',
        'Store document revision history with version rollback',
        'Deploy with CI/CD pipeline on Docker'
      ]
    }
  ],
  'cybersecurity-analyst': [
    {
      title: 'Network Packet Sniffer & Intrusion Detection Script',
      skillsDeveloped: ['Computer Networking', 'Python', 'Security Tools'],
      difficulty: 'Intermediate',
      description: 'Develop a raw socket Python tool that captures packets, detects ARP spoofing or port scans, and alerts administrators.',
      expectedOutcome: 'Proves practical understanding of TCP/IP headers, low-level packet capture, and network-based attack indicators.',
      milestones: [
        'Implement Scapy/socket parser for Ethernet, IP, and TCP headers',
        'Write signature detection logic for SYN flood and port scans',
        'Generate structured JSON alert logs with severity tags',
        'Test in isolated virtual network against Nmap scans'
      ]
    },
    {
      title: 'Automated Web Vulnerability Scanner & OWASP Auditor',
      skillsDeveloped: ['Web Security (OWASP)', 'Vulnerability Assessment', 'Python'],
      difficulty: 'Intermediate',
      description: 'Build a CLI tool that crawls web endpoints, checks for missing security headers, SQL injection flags, and reflected XSS.',
      expectedOutcome: 'Showcases application security principles, automated fuzzing logic, and professional risk scoring reporting.',
      milestones: [
        'Crawl target domains while respecting robots.txt',
        'Fuzz input parameters with crafted payloads for SQLi and XSS',
        'Analyze HTTP response headers (CSP, HSTS, X-Frame-Options)',
        'Export executive summary PDF and technical remediation markdown'
      ]
    },
    {
      title: 'Enterprise SIEM Log Hunting & Incident Playbook',
      skillsDeveloped: ['SIEM & Log Analysis', 'Incident Response & Forensics', 'Linux Administration'],
      difficulty: 'Advanced',
      description: 'Simulate a multi-stage brute force and lateral movement attack in a virtual lab, ingest logs to Splunk, and document forensics.',
      expectedOutcome: 'Directly mirrors real SOC analyst daily duties: alert triage, correlation rules, and forensic documentation.',
      milestones: [
        'Generate attack traffic using Hydra and Metasploit in closed lab',
        'Create Splunk search queries (SPL) to isolate attacker IP & user agent',
        'Draft an Incident Response Timeline following NIST SP 800-61',
        'Automate firewall IP ban rule upon repeated failures'
      ]
    }
  ],
  'data-analyst': [
    {
      title: 'Student Performance & Retention Analytics Dashboard',
      skillsDeveloped: ['Python', 'SQL', 'Data Visualization', 'Pandas & NumPy'],
      difficulty: 'Intermediate',
      description: 'Analyze multi-year university student enrollment, grade distributions, and attendance to predict drop-out risks.',
      expectedOutcome: 'An end-to-end portfolio project featuring cleaned real-world data, statistical hypothesis tests, and dynamic dashboards.',
      milestones: [
        'Clean raw CSV dataset with missing records and outliers using Pandas',
        'Execute analytical SQL queries using window functions and CTEs',
        'Build statistical correlation matrix of factors impacting GPA',
        'Design interactive executive dashboard with drill-down filters'
      ]
    },
    {
      title: 'Financial Market Trends & Customer Sentiment Model',
      skillsDeveloped: ['Excel / Spreadsheets', 'Statistics & Probability', 'Data Cleaning'],
      difficulty: 'Intermediate',
      description: 'Build dynamic financial models with scenario analysis (bull/base/bear cases), sensitivity tables, and Monte Carlo simulation.',
      expectedOutcome: 'Exemplifies rigorous business acumen, spreadsheet financial engineering, and statistical modeling.',
      milestones: [
        'Collect and normalize raw historical transactional data',
        'Implement dynamic formulas with INDEX-MATCH and financial functions',
        'Perform hypothesis testing to evaluate promotional campaign lift',
        'Create visual interactive pitch deck for stakeholders'
      ]
    },
    {
      title: 'Supply Chain Operations & Inventory Optimization Suite',
      skillsDeveloped: ['Power BI / Tableau', 'SQL', 'Data Cleaning & Preprocessing'],
      difficulty: 'Advanced',
      description: 'Construct a star-schema database tracking warehouse stock levels, supplier lead times, and fulfillment bottlenecks.',
      expectedOutcome: 'Demonstrates enterprise data modeling, DAX measure craftsmanship, and operational BI storytelling.',
      milestones: [
        'Model dimension and fact tables in relational 3NF schema',
        'Write complex DAX measures for Year-over-Year inventory turnover',
        'Implement automated alert triggers for low-stock thresholds',
        'Deploy dashboard with user role level security'
      ]
    }
  ],
  'aiml-engineer': [
    {
      title: 'End-to-End Medical Image Classifier & Inference API',
      skillsDeveloped: ['PyTorch / TensorFlow', 'Deep Learning', 'Model Deployment (MLOps)'],
      difficulty: 'Advanced',
      description: 'Train a convolutional neural network with transfer learning on chest X-rays, optimize with ONNX, and deploy via FastAPI.',
      expectedOutcome: 'Full-stack AI portfolio piece highlighting deep learning rigor, data augmentation, and production deployment.',
      milestones: [
        'Augment and normalize image dataset with PyTorch torchvision',
        'Fine-tune pre-trained ResNet/EfficientNet backbone',
        'Calculate ROC-AUC curves, precision-recall, and confusion matrix',
        'Containerize FastAPI endpoint with Docker for sub-100ms inference'
      ]
    },
    {
      title: 'Intelligent Semantic Code Search with Embeddings',
      skillsDeveloped: ['Python', 'NLP & Computer Vision', 'Machine Learning'],
      difficulty: 'Intermediate',
      description: 'Index GitHub codebases using transformer embeddings and build a vector similarity search engine for natural language queries.',
      expectedOutcome: 'Hands-on demonstration of modern embedding models, vector indexing, and generative retrieval.',
      milestones: [
        'Chunk and tokenize code repositories with AST parsers',
        'Generate dense vectors using open-source sentence-transformers',
        'Implement cosine similarity search with Faiss or ChromaDB',
        'Build clean web UI for querying function implementations'
      ]
    }
  ],
  'cloud-engineer': [
    {
      title: 'Multi-Tier Cloud Architecture with Terraform & AWS',
      skillsDeveloped: ['Cloud Platforms (AWS/GCP)', 'Cloud Architecture', 'Terraform & IaC'],
      difficulty: 'Intermediate',
      description: 'Provision a high-availability VPC across 2 Availability Zones with public/private subnets, ALB, and Auto Scaling group via Terraform.',
      expectedOutcome: 'Clean, reproducible Infrastructure as Code project adhering to AWS Well-Architected Framework guidelines.',
      milestones: [
        'Write modular Terraform files for VPC, subnets, and internet gateways',
        'Configure Application Load Balancer with HTTPS listeners',
        'Set up Auto Scaling Launch Template with cloud-init scripts',
        'Verify zero-downtime failover and store state in encrypted S3 bucket'
      ]
    }
  ],
  'web-developer': [
    {
      title: 'Modern Full-Stack Kanban Workspace with Real-Time Sync',
      skillsDeveloped: ['React & Component Architecture', 'JavaScript / TypeScript', 'REST & GraphQL APIs', 'HTML5 & Modern CSS'],
      difficulty: 'Intermediate',
      description: 'Build an intuitive productivity tool featuring drag-and-drop task columns, optimistic UI updates, and dark mode.',
      expectedOutcome: 'A visually stunning web app showcasing clean TypeScript, accessible drag-and-drop, and state management.',
      milestones: [
        'Create drag-and-drop board using dnd-kit or HTML Drag and Drop API',
        'Implement state management with Zustand and persistent storage',
        'Build responsive dark/light theme system with Tailwind CSS',
        'Add keyboard shortcuts and WCAG AA accessibility compliance'
      ]
    }
  ],
  'devops-engineer': [
    {
      title: 'Production Kubernetes Cluster with GitOps & Observability',
      skillsDeveloped: ['Kubernetes (K8s)', 'CI/CD Automation', 'Monitoring & Observability', 'Docker & Containers'],
      difficulty: 'Advanced',
      description: 'Deploy a microservices application on Kubernetes using ArgoCD for GitOps synchronization, monitored with Prometheus and Grafana.',
      expectedOutcome: 'Enterprise DevOps pipeline showing modern GitOps delivery, automated container builds, and observability.',
      milestones: [
        'Containerize multi-service app with optimized Dockerfiles',
        'Write Kubernetes manifests (Deployment, Service, Ingress, HPA)',
        'Configure ArgoCD pipeline that syncs on Git commit',
        'Set up Grafana alerts for pod CPU/memory spikes'
      ]
    }
  ]
};
