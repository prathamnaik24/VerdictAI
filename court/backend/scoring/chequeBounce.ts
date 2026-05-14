import { clampScore, calculateWeightedAverage, deduplicateFactors, filterMeaningfulFactors } from './helpers';

export const scoreChequeBounce = (caseDetails: any): { score: number; factors: string[]; riskFactors: string[] } => {
  const factors: string[] = [];
  const riskFactors: string[] = [];
  
  const description = (caseDetails.description || '').toLowerCase();
  const evidence = (caseDetails.evidence || []).map((e: string) => e.toLowerCase());

  // ========================================================================
  // STATUTORY REQUIREMENTS (Sec 138 NI Act) - 60% Weight
  // ========================================================================
  let statutoryScore = 40; // Base score

  // 1. Return Memo / Reason
  const memoKeywords = ['return memo', 'insufficient funds', 'funds insufficient', 'bounced', 'dishonoured', 'returned unpaid'];
  const hasMemo = memoKeywords.some(kw => description.includes(kw) || evidence.some((e: string) => e.includes(kw)));
  if (hasMemo) {
    statutoryScore += 20;
    factors.push('Bank return memo clearly documented');
  } else {
    riskFactors.push('Missing specific bank return reason/memo');
  }

  // 2. Legal Notice Sent (within 30 days)
  const noticeKeywords = ['legal notice', 'demand notice', 'statutory notice', 'sent notice', 'advocate notice'];
  const hasNotice = noticeKeywords.some(kw => description.includes(kw) || evidence.some((e: string) => e.includes(kw)));
  if (hasNotice) {
    statutoryScore += 25;
    factors.push('Statutory legal demand notice issued');
  } else {
    riskFactors.push('No mention of statutory legal demand notice (Required within 30 days of bounce)');
  }

  // 3. 15-Day Wait Period Mentioned
  if (description.includes('15 days') || description.includes('15-day') || description.includes('wait period') || description.includes('statutory period')) {
    statutoryScore += 15;
    factors.push('15-day statutory cure period observed');
  } else if (hasNotice) {
    riskFactors.push('Unclear if 15-day statutory payment period has expired');
  }

  // ========================================================================
  // EVIDENCE & DEBT VALIDITY - 40% Weight
  // ========================================================================
  let evidenceScore = 40; // Base

  // Proof of underlying debt
  const debtKeywords = ['invoice', 'supplied goods', 'loan agreement', 'contract', 'business payment', 'purchase order'];
  const hasDebtProof = debtKeywords.some(kw => description.includes(kw) || evidence.some((e: string) => e.includes(kw)));
  if (hasDebtProof) {
    evidenceScore += 30;
    factors.push('Underlying legally enforceable debt is well established');
  } else {
    riskFactors.push('Underlying legal debt/transaction not explicitly proven');
  }

  // Exact dates mentioned (Crucial for limitation periods)
  const dateRegex = /\b\d{1,2}[-/thstndrd]+\s*(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|[a-z]+)?[-/]?\d{2,4}\b/gi;
  const hasDates = dateRegex.test(caseDetails.description || '') || (caseDetails.timeline && caseDetails.timeline.length > 5);
  
  if (hasDates) {
    evidenceScore += 30;
    factors.push('Specific transaction and default dates provided');
  } else {
    riskFactors.push('Vague timeline - Strict limitation periods apply to cheque bounce cases');
  }

  // Calculate final score
  const finalScore = calculateWeightedAverage([statutoryScore, evidenceScore], [0.6, 0.4]);

  return {
    score: clampScore(finalScore),
    factors: deduplicateFactors(filterMeaningfulFactors(factors)),
    riskFactors: deduplicateFactors(filterMeaningfulFactors(riskFactors)),
  };
};
