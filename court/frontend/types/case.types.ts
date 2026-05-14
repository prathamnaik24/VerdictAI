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
