// Frontend report types
export interface ReportData {
  id: string;
  caseId: string;
  assessment: any;
  precedents: any[];
  generatedAt: Date;
  disclaimer: string;
}
