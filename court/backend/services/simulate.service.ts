// Simulate service - runs courtroom simulation
import { generateOpposingArgument } from '@/backend/simulation/opposingCounsel';
import { generateJudgeQuestions } from '@/backend/simulation/judgeQuestions';
import { SimulationOutput } from '@/shared/types/simulation.types';

export const runSimulationRound = async (
  caseDetails: any,
  userStatement: string
): Promise<SimulationOutput> => {
  console.log('[Backend] Running simulation round');
  
  const opposingArgument = await generateOpposingArgument(caseDetails);
  const questions = await generateJudgeQuestions(caseDetails);
  
  return {
    opposingArgument,
    judgeQuestion: questions[0] || 'Judge question placeholder',
    feedback: 'Feedback placeholder',
  };
};
