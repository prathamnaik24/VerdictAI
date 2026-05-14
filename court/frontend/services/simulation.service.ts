// Frontend simulation service
import { apiCall } from '../lib/api';
import { API_ENDPOINTS } from '../lib/constants';

export const simulationService = {
  async runRound(caseDetails: any, userStatement: string) {
    return apiCall(API_ENDPOINTS.SIMULATE, {
      method: 'POST',
      body: JSON.stringify({ caseDetails, userStatement }),
    });
  },
};
