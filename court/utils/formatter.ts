// Formatter utility
export const formatNumber = (num: number, decimals: number = 2): string => {
  return num.toFixed(decimals);
};

export const formatText = (text: string): string => {
  return text.trim().replace(/\s+/g, ' ');
};
