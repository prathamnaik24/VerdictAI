// Cheque bounce scoring logic
export const scoreChequeBounce = (caseDetails: any): { score: number; factors: string[] } => {
  // TODO: Implement cheque bounce scoring algorithm
  const factors = ['Cheque date clear', 'Return memo documented'];
  return { score: 65, factors };
};
