import {
  BarChart3,
  FileText,
  FileSearch,
  Library,
  Scale,
  Shield,
  Swords,
  ThumbsUp,
} from 'lucide-react';
import type { ElementType } from 'react';

interface EmptyStatePreset {
  icon: ElementType;
  title: string;
  description: string;
}

export const EMPTY_STATE_PRESETS: Record<string, EmptyStatePreset> = {
  noDashboard: {
    icon: BarChart3,
    title: 'No Assessment Data',
    description:
      'Submit your case through the intake form or load a demo case to see your assessment dashboard.',
  },
  noReport: {
    icon: FileText,
    title: 'No Report Generated',
    description:
      'Complete the intake process to generate a detailed litigation readiness report with case strength analysis, precedent matches, and recommended next steps.',
  },
  noEvidence: {
    icon: FileSearch,
    title: 'No Evidence Uploaded',
    description:
      'Upload documents related to your case. Evidence helps the AI provide a more accurate analysis of your legal position.',
  },
  noPrecedents: {
    icon: Library,
    title: 'No Precedents Found',
    description:
      'No similar cases were found in our database. This may indicate a novel legal question or a highly specialised area of law.',
  },
  noSimulations: {
    icon: Swords,
    title: 'No Simulations Run',
    description:
      'You haven\'t run any courtroom simulations yet. Practice your arguments against AI opposing counsel and receive structured feedback.',
  },
  noFavorableFactors: {
    icon: ThumbsUp,
    title: 'No Favorable Factors Identified',
    description:
      'The assessment did not identify specific factors working in your favour. Consider consulting a legal professional for a detailed evaluation.',
  },
  noRiskFactors: {
    icon: Shield,
    title: 'No Risk Factors Identified',
    description:
      'The assessment did not flag any significant risk factors. This is positive, but a legal professional should still review your case.',
  },
  noEvidenceGaps: {
    icon: FileSearch,
    title: 'No Evidence Gaps Recorded',
    description:
      'Your evidence appears complete based on the information provided. No missing items were identified.',
  },
  noApplicableLaws: {
    icon: Scale,
    title: 'No Applicable Laws Referenced',
    description:
      'The system did not identify specific legal provisions. Additional case details may help surface relevant laws.',
  },
} as const;

export function getEmptyStatePreset(key: string): EmptyStatePreset {
  return EMPTY_STATE_PRESETS[key] || EMPTY_STATE_PRESETS.noDashboard;
}
