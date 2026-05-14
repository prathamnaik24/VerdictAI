// API client
import { PAGES } from './constants';

export const apiCall = async (
  endpoint: string,
  options?: RequestInit
): Promise<any> => {
  const response = await fetch(endpoint, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }

  return response.json();
};
