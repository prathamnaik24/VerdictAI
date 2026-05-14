// Application constants
export const APP_NAME = 'VerdictAI';
export const APP_DESCRIPTION = 'AI-powered courtroom simulation and legal case assessment platform';

export const PAGES = {
  HOME: '/',
  INTAKE: '/intake',
  DASHBOARD: '/dashboard',
  SIMULATOR: '/simulator',
  REPORT: '/report',
} as const;

export const API_ENDPOINTS = {
  EXTRACT: '/api/extract',
  RETRIEVE: '/api/retrieve',
  SCORE: '/api/score',
  EXPLAIN: '/api/explain',
  SIMULATE: '/api/simulate',
  REPORT: '/api/report',
} as const;
