'use client';

import { CheckCircle2, AlertCircle } from 'lucide-react';
import type { ConfidenceLevel } from '@/shared/types/assessment.types';

interface ConfidenceMeterProps {
  confidence: number; // 0-1
  label?: ConfidenceLevel;
}

export const ConfidenceMeter = ({ 
  confidence,
  label
}: ConfidenceMeterProps) => {
  /**
   * Determine confidence level from numeric value
   */
  const getConfidenceLabel = (c: number): ConfidenceLevel => {
    if (label) return label;
    if (c >= 0.85) return 'Very High';
    if (c >= 0.7) return 'High';
    if (c >= 0.5) return 'Moderate';
    return 'Low';
  };

  const confidenceLabel = getConfidenceLabel(confidence);

  /**
   * Get styling based on confidence level
   */
  const getConfidenceStyles = (l: ConfidenceLevel) => {
    const styles: Record<ConfidenceLevel, {
      bg: string;
      border: string;
      badge: string;
      barColor: string;
      icon: any;
    }> = {
      'Very High': {
        bg: 'bg-green-50',
        border: 'border-green-200',
        badge: 'bg-green-100 text-green-800',
        barColor: 'bg-green-500',
        icon: CheckCircle2,
      },
      'High': {
        bg: 'bg-emerald-50',
        border: 'border-emerald-200',
        badge: 'bg-emerald-100 text-emerald-800',
        barColor: 'bg-emerald-500',
        icon: CheckCircle2,
      },
      'Moderate': {
        bg: 'bg-yellow-50',
        border: 'border-yellow-200',
        badge: 'bg-yellow-100 text-yellow-800',
        barColor: 'bg-yellow-500',
        icon: AlertCircle,
      },
      'Low': {
        bg: 'bg-orange-50',
        border: 'border-orange-200',
        badge: 'bg-orange-100 text-orange-800',
        barColor: 'bg-orange-500',
        icon: AlertCircle,
      },
    };
    return styles[l];
  };

  const styles = getConfidenceStyles(confidenceLabel);
  const Icon = styles.icon;
  const confidencePercent = Math.round(confidence * 100);

  return (
    <div className={`border rounded-lg p-6 ${styles.bg} ${styles.border}`}>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Assessment Confidence</h3>
          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${styles.badge}`}>
            <Icon className="w-4 h-4" />
            {confidenceLabel} Confidence
          </span>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">Scoring Engine Confidence</p>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className={`${styles.barColor} h-4 rounded-full transition-all`}
                style={{ width: `${confidencePercent}%` }}
              ></div>
            </div>
          </div>
          <span className="text-2xl font-bold text-gray-900">{confidencePercent}%</span>
        </div>
      </div>

      <div className="p-4 bg-white bg-opacity-60 rounded border border-gray-200">
        <p className="text-xs text-gray-700 leading-relaxed">
          <strong>What this means:</strong> This represents confidence in the <em>quality of our assessment</em>, not a guaranteed legal outcome. 
          {confidenceLabel === 'Very High' && ' We have strong indicators supporting this evaluation.'}
          {confidenceLabel === 'High' && ' We have good indicators supporting this evaluation.'}
          {confidenceLabel === 'Moderate' && ' The assessment is based on available data, but some factors remain uncertain.'}
          {confidenceLabel === 'Low' && ' Limited information is available; consider gathering additional evidence.'}
        </p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-gray-600">
        <div>
          <p className="font-medium text-gray-900">Interpretation</p>
          <p className="mt-1">{confidenceLabel === 'Very High' ? 'Very reliable assessment' : confidenceLabel === 'High' ? 'Reliable assessment' : confidenceLabel === 'Moderate' ? 'Provisional assessment' : 'Preliminary assessment'}</p>
        </div>
        <div>
          <p className="font-medium text-gray-900">Next Step</p>
          <p className="mt-1">{confidenceLabel === 'Very High' || confidenceLabel === 'High' ? 'Proceed with analysis' : 'Gather more evidence'}</p>
        </div>
      </div>
    </div>
  );
};
