// Frontend report service
import { apiCall } from '../lib/api';
import { API_ENDPOINTS } from '../lib/constants';

export const reportService = {
  async generateReport(caseType: string, caseDetails: any) {
    return apiCall(API_ENDPOINTS.REPORT, {
      method: 'POST',
      body: JSON.stringify({ caseType, caseDetails }),
    });
  },
};
