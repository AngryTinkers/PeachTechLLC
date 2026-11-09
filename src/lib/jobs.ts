/**
 * Open engineering roles. Each one gets its own page at /careers/[slug]
 * with schema.org JobPosting structured data (Google for Jobs, AI search).
 *
 * Edit this list to add, remove or update roles. Keep `datePosted` and
 * `validThrough` current — expired postings are dropped by job search engines.
 */
export type Job = {
  slug: string;
  title: string;
  team: string;
  employmentType: "FULL_TIME" | "PART_TIME" | "CONTRACTOR";
  remote: boolean;
  location: string;
  /** ISO-3166 country codes (or names) applicants may work from when remote. */
  applicantCountries: string[];
  datePosted: string;
  validThrough: string;
  salary?: { min: number; max: number; currency: string; unit: "YEAR" | "HOUR" };
  summary: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  skills: string[];
};

export const jobs: Job[] = [
  {
    slug: "senior-full-stack-engineer",
    title: "Senior Full-Stack Engineer (React / Node.js)",
    team: "Product Engineering",
    employmentType: "FULL_TIME",
    remote: true,
    location: "Remote",
    applicantCountries: ["US"],
    datePosted: "2026-11-01",
    validThrough: "2027-02-28",
    salary: { min: 120000, max: 170000, currency: "USD", unit: "YEAR" },
    summary:
      "Build and ship AI-powered web products end to end for PeachTech and our partner technology companies.",
    responsibilities: [
      "Design, build and maintain production web applications with Next.js, React and Node.js",
      "Integrate large language model APIs into reliable, user-facing features",
      "Own features from technical design through deployment and monitoring",
      "Review code and mentor engineers on partner teams",
    ],
    requirements: [
      "5+ years of professional software engineering experience",
      "Strong TypeScript, React and Node.js skills",
      "Experience with SQL databases and REST or GraphQL APIs",
      "Clear written and spoken English communication",
    ],
    niceToHave: ["Experience with LLM APIs, RAG or vector databases", "AWS, GCP or Vercel deployment experience"],
    skills: ["TypeScript", "React", "Next.js", "Node.js", "PostgreSQL", "LLM APIs"],
  },
  {
    slug: "ai-ml-engineer",
    title: "AI / Machine Learning Engineer",
    team: "AI Platform",
    employmentType: "FULL_TIME",
    remote: true,
    location: "Remote",
    applicantCountries: ["US"],
    datePosted: "2026-11-01",
    validThrough: "2027-02-28",
    salary: { min: 140000, max: 190000, currency: "USD", unit: "YEAR" },
    summary:
      "Turn state-of-the-art models into dependable product features: retrieval, agents, evaluation and fine-tuning.",
    responsibilities: [
      "Build retrieval-augmented generation (RAG) pipelines and AI agents",
      "Design evaluation suites that measure quality, cost and latency",
      "Fine-tune and serve models where off-the-shelf APIs fall short",
      "Partner with product engineers to ship AI features to production",
    ],
    requirements: [
      "3+ years building ML or LLM-based systems in production",
      "Strong Python; familiarity with PyTorch or similar frameworks",
      "Hands-on experience with embeddings, vector search and prompt design",
    ],
    niceToHave: ["MLOps experience (model serving, monitoring)", "Published work or open-source contributions"],
    skills: ["Python", "PyTorch", "LLMs", "RAG", "Vector databases", "MLOps"],
  },
  {
    slug: "frontend-engineer",
    title: "Frontend Engineer (Next.js / Tailwind CSS)",
    team: "Product Engineering",
    employmentType: "FULL_TIME",
    remote: true,
    location: "Remote",
    applicantCountries: ["US"],
    datePosted: "2026-11-01",
    validThrough: "2027-02-28",
    salary: { min: 100000, max: 145000, currency: "USD", unit: "YEAR" },
    summary:
      "Craft fast, accessible and beautiful interfaces for AI-powered products and services.",
    responsibilities: [
      "Build responsive UI with React, Next.js and Tailwind CSS",
      "Design streaming and conversational interfaces for AI features",
      "Own Core Web Vitals, accessibility and SEO for our products",
    ],
    requirements: [
      "3+ years of frontend development experience",
      "Expert knowledge of React, TypeScript and modern CSS",
      "An eye for detail in design, motion and usability",
    ],
    niceToHave: ["Experience with design systems", "Familiarity with Figma"],
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Accessibility"],
  },
  {
    slug: "backend-engineer",
    title: "Backend Engineer (Python / Go)",
    team: "Platform",
    employmentType: "FULL_TIME",
    remote: true,
    location: "Remote",
    applicantCountries: ["US"],
    datePosted: "2026-11-01",
    validThrough: "2027-02-28",
    salary: { min: 115000, max: 160000, currency: "USD", unit: "YEAR" },
    summary:
      "Design the APIs, data pipelines and job systems that power our AI web services at scale.",
    responsibilities: [
      "Build scalable APIs and background processing services",
      "Model data and optimize PostgreSQL performance",
      "Improve reliability with observability, testing and automation",
    ],
    requirements: [
      "4+ years of backend engineering experience",
      "Proficiency in Python or Go",
      "Solid understanding of distributed systems and databases",
    ],
    niceToHave: ["Event-driven architectures (Kafka, SQS)", "Experience serving ML models"],
    skills: ["Python", "Go", "PostgreSQL", "Redis", "Docker", "APIs"],
  },
  {
    slug: "devops-cloud-engineer",
    title: "DevOps / Cloud Engineer",
    team: "Infrastructure",
    employmentType: "CONTRACTOR",
    remote: true,
    location: "Remote",
    applicantCountries: ["US"],
    datePosted: "2026-11-01",
    validThrough: "2027-02-28",
    summary:
      "Keep our products and partner platforms fast, secure and cost-efficient on the cloud.",
    responsibilities: [
      "Manage infrastructure as code on AWS or GCP",
      "Build CI/CD pipelines and GPU-aware deployment workflows",
      "Own monitoring, alerting, incident response and cost optimization",
    ],
    requirements: [
      "3+ years in DevOps, SRE or cloud engineering",
      "Experience with Terraform, Kubernetes and Docker",
      "Strong Linux and networking fundamentals",
    ],
    niceToHave: ["Cloud certifications", "Experience running GPU workloads"],
    skills: ["AWS", "GCP", "Terraform", "Kubernetes", "CI/CD", "Observability"],
  },
];

export const employmentLabel: Record<Job["employmentType"], string> = {
  FULL_TIME: "Full-time",
  PART_TIME: "Part-time",
  CONTRACTOR: "Contract",
};

export const getJob = (slug: string) => jobs.find((j) => j.slug === slug);
