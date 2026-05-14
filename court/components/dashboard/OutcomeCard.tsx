'use client';

import { TrendingUp, TrendingDown } from 'lucide-react';
import type { LegalDirection } from '@/shared/types/assessment.types';

interface OutcomeCardProps {
  score: number; // 0-100
  label: LegalDirection;
  explanation?: string;
}

export const OutcomeCard = ({ 
  score, 
  label = 'Neutral' as LegalDirection,
  explanation = 'Based on provided case details and supporting evidence.'
}: OutcomeCardProps) => {
  /**
   * Get styling based on legal direction
   */
  const getDirectionStyles = (dir: LegalDirection) => {
    const styles: Record<LegalDirection, { 
      bg: string; 
      border: string; 
      badge: string; 
      icon: any;
      scoreColor: string;
      textColor: string;
    }> = {
      'Strongly Favorable': {
        bg: 'bg-green-50',
        border: 'border-green-200',
        badge: 'bg-green-100 text-green-800',
        icon: TrendingUp,
        scoreColor: 'text-green-600',
        textColor: 'text-green-900',
      },
      'Favorable': {
        bg: 'bg-emerald-50',
        border: 'border-emerald-200',
        badge: 'bg-emerald-100 text-emerald-800',
        icon: TrendingUp,
        scoreColor: 'text-emerald-600',
        textColor: 'text-emerald-900',
      },
      'Neutral': {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        badge: 'bg-blue-100 text-blue-800',
        icon: TrendingUp,
        scoreColor: 'text-blue-600',
        textColor: 'text-blue-900',
      },
      'Unfavorable': {
        bg: 'bg-orange-50',
        border: 'border-orange-200',
        badge: 'bg-orange-100 text-orange-800',
        icon: TrendingDown,
        scoreColor: 'text-orange-600',
        textColor: 'text-orange-900',
      },
      'Strongly Unfavorable': {
        bg: 'bg-red-50',
        border: 'border-red-200',
        badge: 'bg-red-100 text-red-800',
        icon: TrendingDown,
        scoreColor: 'text-red-600',
        textColor: 'text-red-900',
      },
    };
    return styles[dir];
  };

  const styles = getDirectionStyles(label);
  const Icon = styles.icon;

  return (
    <div className={`border rounded-lg p-6 ${styles.bg} ${styles.border}`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Legal Assessment</h3>
          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${styles.badge}`}>
            <Icon className="w-4 h-4" />
            {label}
          </span>
        </div>
      </div>

      <div className="mt-6 mb-4">
        <p className="text-sm text-gray-600 mb-3">Assessment Score</p>
        <div className="flex items-baseline gap-2">
          <span className={`text-5xl font-bold ${styles.scoreColor}`}>{score}</span>
          <span className="text-gray-600 text-lg">/100</span>
        </div>
      </div>

      <p className="text-sm text-gray-700 leading-relaxed">
        {explanation}
      </p>

      {/* Score Gauge */}
      <div className="mt-5 pt-5 border-t border-gray-200">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all ${
              score >= 70 ? 'bg-green-500' :
              score >= 50 ? 'bg-blue-500' :
              score >= 30 ? 'bg-orange-500' :
              'bg-red-500'
            }`}
            style={{ width: `${score}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>Unfavorable</span>
          <span>Neutral</span>
          <span>Favorable</span>
        </div>
      </div>
    </div>
  );
};
