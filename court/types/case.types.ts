// Case type definitions
import type { DisputeType } from '@/shared/constants/disputeTypes';

export type { DisputeType };

export interface CaseDetails {
  id: string;
  disputeType: DisputeType;
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

export interface CaseFile {
  id: string;
  caseId: string;
  fileName: string;
  fileType: string;
  uploadedAt: Date;
}
