// Frontend case type definitions
export interface CaseDetails {
  id: string;
  disputeType: string;
  title: string;
  description: string;
  amount: number;
  dateOfIncident: string;
  location: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Party {
  name: string;
  role: 'plaintiff' | 'defendant';
  contact?: string;
  address?: string;
}

export interface DemoEvidence {
  name: string;
  description: string;
}

export interface DemoWitness {
  name: string;
  relation: string;
  statement: string;
}

export interface DemoCommunication {
  type: string;
  date: string;
  summary: string;
}

export interface DemoCase {
  id: string;
  type: string;
  title: string;
  disputeType: string;
  jurisdiction: string;
  incidentDate: string;
  factsSummary: string;
  evidence: DemoEvidence[];
  witnesses: DemoWitness[];
  communications: DemoCommunication[];
  strengthProfile: 'strong' | 'medium' | 'weak';
  amount: number;
  applicableProvisions: string[];
  assessment: Record<string, unknown>;
  precedents: Record<string, unknown>[];
  simulationFeedback: Record<string, unknown>;
}
