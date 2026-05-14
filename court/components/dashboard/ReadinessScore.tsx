'use client';

import { CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import type { ReadinessLevel } from '@/shared/types/assessment.types';

interface ReadinessScoreProps {
  score: number; // 0-100
  level?: ReadinessLevel;
  blockers?: string[];
}

export const ReadinessScore = ({ 
  score,
  level,
  blockers = []
}: ReadinessScoreProps) => {
  /**
   * Determine readiness level from score
   */
  const getReadinessLevel = (s: number): ReadinessLevel => {
    if (level) return level;
    if (s >= 85) return 'Trial Ready';
    if (s >= 70) return 'Mostly Ready';
    if (s >= 50) return 'Partially Ready';
    if (s >= 30) return 'Needs Work';
    return 'Not Ready';
  };

  const readinessLevel = getReadinessLevel(score);

  /**
   * Get styling based on readiness level
   */
  const getReadinessStyles = (l: ReadinessLevel) => {
    const styles: Record<ReadinessLevel, {
      bg: string;
      border: string;
      badge: string;
      barColor: string;
      icon: any;
      description: string;
    }> = {
      'Trial Ready': {
        bg: 'bg-green-50',
        border: 'border-green-200',
        badge: 'bg-green-100 text-green-800',
        barColor: 'bg-green-500',
        icon: CheckCircle2,
        description: 'Your case has strong preparation and is ready for litigation.',
      },
      'Mostly Ready': {
        bg: 'bg-emerald-50',
        border: 'border-emerald-200',
        badge: 'bg-emerald-100 text-emerald-800',
        barColor: 'bg-emerald-500',
        icon: CheckCircle2,
        description: 'Your case is well-prepared. Address minor gaps if possible.',
      },
      'Partially Ready': {
        bg: 'bg-yellow-50',
        border: 'border-yellow-200',
        badge: 'bg-yellow-100 text-yellow-800',
        barColor: 'bg-yellow-500',
        icon: Clock,
        description: 'Your case needs more preparation. Gather additional evidence.',
      },
      'Needs Work': {
        bg: 'bg-orange-50',
        border: 'border-orange-200',
        badge: 'bg-orange-100 text-orange-800',
        barColor: 'bg-orange-500',
        icon: AlertCircle,
        description: 'Significant preparation needed before proceeding.',
      },
      'Not Ready': {
        bg: 'bg-red-50',
        border: 'border-red-200',
        badge: 'bg-red-100 text-red-800',
        barColor: 'bg-red-500',
        icon: AlertCircle,
        description: 'Extensive preparation required. Do not proceed yet.',
      },
    };
    return styles[l];
  };

  const styles = getReadinessStyles(readinessLevel);
  const Icon = styles.icon;

  return (
    <div className={`border rounded-lg p-6 ${styles.bg} ${styles.border}`}>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Litigation Readiness</h3>
          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${styles.badge}`}>
            <Icon className="w-4 h-4" />
            {readinessLevel}
          </span>
        </div>
      </div>

      {/* Score Display */}
      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-2">Preparation Score</p>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-gray-900">{Math.round(score)}</span>
          <span className="text-gray-600">/100</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className={`${styles.barColor} h-3 rounded-full transition-all`}
            style={{ width: `${score}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>Not Ready</span>
          <span>Mostly Ready</span>
          <span>Trial Ready</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-700 mb-4">{styles.description}</p>

      {/* Blockers */}
      {blockers.length > 0 && (
        <div className="p-4 bg-white bg-opacity-60 rounded border border-gray-200">
          <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            Items to Address
          </h4>
          <ul className="space-y-1">
            {blockers.map((blocker, i) => (
              <li key={i} className="text-sm text-gray-700 flex gap-2">
                <span className="flex-shrink-0">•</span>
                <span>{blocker}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {score >= 85 && (
        <div className="mt-4 p-3 bg-white bg-opacity-60 rounded border border-green-200">
          <p className="text-xs text-gray-700">
            <strong>Recommendation:</strong> Your case is well-prepared and ready for litigation proceedings.
          </p>
        </div>
      )}
    </div>
  );
};
