// Simulation service
import { generateOpposingArgument } from '@/simulation/opposingCounsel';
import { generateJudgeQuestions } from '@/simulation/judgeQuestions';

export const runSimulationRound = async (
  caseDetails: any,
  userStatement: string
): Promise<any> => {
  const opposingArgument = await generateOpposingArgument(caseDetails);
  const judgeQuestions = await generateJudgeQuestions(caseDetails);

  return {
    opposingArgument,
    judgeQuestions: judgeQuestions[0],
    feedback: 'Round feedback placeholder',
  };
};
