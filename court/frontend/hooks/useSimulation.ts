// Frontend simulation hook
'use client';

import { useState } from 'react';
import { simulationService } from '../services/simulation.service';

export const useSimulation = () => {
  const [rounds, setRounds] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addRound = async (caseDetails: any, userStatement: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await simulationService.runRound(caseDetails, userStatement);
      setRounds((prev) => [...prev, { userStatement, ...result.simulation }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Simulation failed');
    } finally {
      setLoading(false);
    }
  };

  return { rounds, loading, error, addRound };
};
