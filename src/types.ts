export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  subBullets: string[];
  iconName: string;
  category: string;
}

export interface StackTool {
  name: string;
  role: string;
  category: 'data' | 'outbound' | 'automation' | 'infra';
  highlight?: boolean;
  status: string;
}

export interface StackCluster {
  id: 'data' | 'outbound' | 'automation' | 'infra';
  title: string;
  desc: string;
  tools: StackTool[];
}

export interface ResultStat {
  id: string;
  value: number;
  prefix?: string;
  suffix?: string;
  displayOverride?: string;
  label: string;
  subtext: string;
  changeRate?: string;
}

export interface CaseStudy {
  id: string;
  tag: string;
  title: string;
  timeframe: string;
  challenge: string;
  diagnosis: string[];
  architecture: string[];
  metrics: { label: string; value: string; detail: string }[];
  resultSummary: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  tagline: string;
  timeframe?: string;
  description: string;
  deliverables: string[];
  keyOutcome?: string;
}

export interface ApproachPrinciple {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  contrast: { conventional: string; systemFixer: string };
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  companyCategory?: string;
  avatarUrl?: string;
  impactMetric: string;
  metricLabel: string;
  verifiedTag: string;
  rating?: number;
  highlightedResult?: string;
  isVisible?: boolean;
}

export interface SiteMediaConfig {
  heroPhotoUrl: string;
  aboutPhotoUrl: string;
}

export interface SiteContentState {
  testimonials: TestimonialItem[];
  maxVisibleTestimonials: number;
  media: SiteMediaConfig;
  lastUpdated: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'deliverability' | 'data' | 'process' | 'crm' | 'general';
}

export type PageView = 'home' | 'case-studies' | 'how-i-work';
