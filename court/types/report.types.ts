// Report type definitions
export interface Assessment {
  overallScore: number;
  confidence: number;
  likelihood: 'very-likely' | 'likely' | 'neutral' | 'unlikely' | 'very-unlikely';
  riskFactors: string[];
  favorableFactors: string[];
}

export interface ReportData {
  id: string;
  caseId: string;
  assessment: Assessment;
  precedents: any[];
  generatedAt: Date;
  disclaimer: string;
}
