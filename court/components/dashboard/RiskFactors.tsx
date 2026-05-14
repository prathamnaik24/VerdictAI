'use client';

import { AlertTriangle, AlertCircle, Info } from 'lucide-react';
import type { RiskFactor } from '@/shared/types/assessment.types';

interface RiskFactorsProps {
  factors: RiskFactor[] | string[];
}

export const RiskFactors = ({ factors }: RiskFactorsProps) => {
  /**
   * Convert to RiskFactor objects if needed
   */
  const riskFactors: RiskFactor[] = factors.map(factor => {
    if (typeof factor === 'string') {
      return {
        title: factor,
        severity: 'medium',
        impact: 'legal',
        explanation: '',
      };
    }
    return factor;
  });

  /**
   * Group by severity
   */
  const critical = riskFactors.filter(f => f.severity === 'critical' || f.severity === 'high');
  const medium = riskFactors.filter(f => f.severity === 'medium');
  const low = riskFactors.filter(f => f.severity === 'low');

  const getSeverityIcon = (severity: string) => {
    if (severity === 'critical' || severity === 'high') return AlertTriangle;
    if (severity === 'medium') return AlertCircle;
    return Info;
  };

  const getSeverityColor = (severity: string) => {
    if (severity === 'critical' || severity === 'high') return 'text-red-600';
    if (severity === 'medium') return 'text-orange-600';
    return 'text-yellow-600';
  };

  if (riskFactors.length === 0) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Risk Factors</h3>
        <p className="text-gray-700">No significant risk factors identified.</p>
      </div>
    );
  }

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Factors</h3>

      <div className="space-y-4">
        {/* Critical/High severity */}
        {critical.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-red-900 mb-2 flex items-center gap-1">
              <AlertTriangle className="w-4 h-4" />
              Critical Issues
            </h4>
            <ul className="space-y-2">
              {critical.map((factor, i) => {
                const Icon = getSeverityIcon(factor.severity);
                return (
                  <li key={i} className="flex gap-2 text-sm">
                    <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${getSeverityColor(factor.severity)}`} />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{factor.title}</p>
                      {factor.explanation && (
                        <p className="text-xs text-gray-600 mt-0.5">{factor.explanation}</p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {/* Medium severity */}
        {medium.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-orange-900 mb-2 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              Notable Concerns
            </h4>
            <ul className="space-y-2">
              {medium.map((factor, i) => {
                const Icon = getSeverityIcon(factor.severity);
                return (
                  <li key={i} className="flex gap-2 text-sm">
                    <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${getSeverityColor(factor.severity)}`} />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{factor.title}</p>
                      {factor.explanation && (
                        <p className="text-xs text-gray-600 mt-0.5">{factor.explanation}</p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {/* Low severity */}
        {low.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-yellow-900 mb-2 flex items-center gap-1">
              <Info className="w-4 h-4" />
              Minor Considerations
            </h4>
            <ul className="space-y-1">
              {low.map((factor, i) => (
                <li key={i} className="flex gap-2 text-sm text-gray-700">
                  <span className="flex-shrink-0 mt-0.5">•</span>
                  <span>{factor.title}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
