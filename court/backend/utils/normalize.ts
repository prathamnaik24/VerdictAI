// Normalize utility
export const normalizeText = (text: string): string => {
  return text.toLowerCase().trim();
};

export const normalizeNumber = (num: any): number => {
  const parsed = parseFloat(num);
  return isNaN(parsed) ? 0 : parsed;
};
