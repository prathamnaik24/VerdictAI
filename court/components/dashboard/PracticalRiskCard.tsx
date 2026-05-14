'use client';

import { AlertTriangle, TrendingDown, TrendingUp } from 'lucide-react';
import type { RiskFactor } from '@/shared/types/assessment.types';

interface PracticalRiskCardProps {
  score: number; // 0-100, higher = more risk
  difficulty: 'Easy' | 'Moderate' | 'Difficult' | 'Very Difficult';
  riskFactors: RiskFactor[];
}

export const PracticalRiskCard = ({
  score,
  difficulty,
  riskFactors,
}: PracticalRiskCardProps) => {
  /**
   * Get color scheme based on risk score
   */
  const getRiskColors = (s: number) => {
    if (s >= 75) return {
      bg: 'bg-red-50',
      border: 'border-red-200',
      label: 'text-red-700',
      badge: 'bg-red-100 text-red-800',
      icon: 'text-red-600',
    };
    if (s >= 50) return {
      bg: 'bg-orange-50',
      border: 'border-orange-200',
      label: 'text-orange-700',
      badge: 'bg-orange-100 text-orange-800',
      icon: 'text-orange-600',
    };
    if (s >= 25) return {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      label: 'text-yellow-700',
      badge: 'bg-yellow-100 text-yellow-800',
      icon: 'text-yellow-600',
    };
    return {
      bg: 'bg-green-50',
      border: 'border-green-200',
      label: 'text-green-700',
      badge: 'bg-green-100 text-green-800',
      icon: 'text-green-600',
    };
  };

  const colors = getRiskColors(score);

  const riskLabel = difficulty === 'Very Difficult' ? 'Very High' :
                    difficulty === 'Difficult' ? 'High' :
                    difficulty === 'Moderate' ? 'Moderate' :
                    'Low';

  const criticalFactors = riskFactors.filter(f => f.severity === 'critical' || f.severity === 'high');
  const otherFactors = riskFactors.filter(f => f.severity === 'medium' || f.severity === 'low');

  return (
    <div className={`border rounded-lg p-6 ${colors.bg} ${colors.border}`}>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className={`w-5 h-5 ${colors.icon}`} />
            <h3 className="font-semibold text-gray-900">Practical Litigation Risk</h3>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${colors.badge}`}>
            {riskLabel} Risk
          </span>
        </div>

        <p className="text-sm text-gray-600">
          This assesses how difficult it would be to pursue this case through litigation, independent of legal merit.
        </p>
      </div>

      {/* Risk Gauge */}
      <div className="mb-6">
        <div className="flex items-end justify-between mb-2">
          <span className="text-xs font-medium text-gray-600">Risk Level</span>
          <span className={`text-2xl font-bold ${colors.label}`}>{score}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all ${
              score >= 75 ? 'bg-red-500' :
              score >= 50 ? 'bg-orange-500' :
              score >= 25 ? 'bg-yellow-500' :
              'bg-green-500'
            }`}
            style={{ width: `${score}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-1 text-xs text-gray-500">
          <span>Lower Risk</span>
          <span>Higher Risk</span>
        </div>
      </div>

      {/* Critical Factors */}
      {criticalFactors.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <TrendingDown className="w-4 h-4 text-red-600" />
            Critical Challenges
          </h4>
          <ul className="space-y-2">
            {criticalFactors.map((factor, i) => (
              <li key={i} className="text-sm flex gap-2">
                <span className="text-red-600 font-bold flex-shrink-0">⚠</span>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{factor.title}</p>
                  <p className="text-xs text-gray-600">{factor.explanation}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Other Risk Factors */}
      {otherFactors.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-2">Other Considerations</h4>
          <ul className="space-y-1">
            {otherFactors.map((factor, i) => (
              <li key={i} className="text-sm flex gap-2 text-gray-700">
                <span className="flex-shrink-0">•</span>
                <span>{factor.title}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Contextual Guidance */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-600">
          {score >= 75 && 'Significant practical barriers exist. Carefully weigh whether litigation is advisable.'}
          {score >= 50 && score < 75 && 'Notable practical challenges present. Consider mitigation strategies.'}
          {score >= 25 && score < 50 && 'Some practical challenges, but generally manageable.'}
          {score < 25 && 'Practical barriers are minimal. Case is well-positioned for litigation.'}
        </p>
      </div>
    </div>
  );
};
