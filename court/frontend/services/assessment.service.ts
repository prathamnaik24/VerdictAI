// Frontend assessment service
import { apiCall } from '../lib/api';
import { API_ENDPOINTS } from '../lib/constants';

export const assessmentService = {
  async extractCase(caseDescription: string) {
    return apiCall(API_ENDPOINTS.EXTRACT, {
      method: 'POST',
      body: JSON.stringify({ caseDescription }),
    });
  },

  async retrieveCases(caseDescription: string, caseType: string) {
    return apiCall(API_ENDPOINTS.RETRIEVE, {
      method: 'POST',
      body: JSON.stringify({ caseDescription, caseType }),
    });
  },

  async scoreCase(caseType: string, caseDetails: any) {
    return apiCall(API_ENDPOINTS.SCORE, {
      method: 'POST',
      body: JSON.stringify({ caseType, caseDetails }),
    });
  },

  async explainScore(score: number, factors: string[]) {
    return apiCall(API_ENDPOINTS.EXPLAIN, {
      method: 'POST',
      body: JSON.stringify({ score, factors }),
    });
  },
};
