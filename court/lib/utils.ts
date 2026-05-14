import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Combine classNames with Tailwind merge
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Utility functions
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 11);
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US');
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount);
};
