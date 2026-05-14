'use client';

import { useState } from 'react';
import { ShieldCheck, HelpCircle, AlertTriangle, ArrowRight, CheckCircle2, Gavel, ScrollText, FileWarning } from 'lucide-react';
import type { DemoCase } from '@/frontend/types/case.types';

interface DemoCaseSelectorProps {
  cases: DemoCase[];
  onSelect: (demoCase: DemoCase) => void;
  selectedId?: string | null;
}

const strengthConfig = {
  strong: {
    icon: ShieldCheck,
    label: 'Strong Case',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    hoverBorder: 'hover:border-emerald-300',
    badge: 'bg-emerald-100 text-emerald-700',
    iconColor: 'text-emerald-500',
    scoreColor: 'text-emerald-600',
    meterBg: 'bg-emerald-500',
  },
  medium: {
    icon: HelpCircle,
    label: 'Uncertain Case',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    hoverBorder: 'hover:border-amber-300',
    badge: 'bg-amber-100 text-amber-700',
    iconColor: 'text-amber-500',
    scoreColor: 'text-amber-600',
    meterBg: 'bg-amber-500',
  },
  weak: {
    icon: AlertTriangle,
    label: 'Weak Case',
    color: 'text-red-600',
    bg: 'bg-red-50',
    border: 'border-red-200',
    hoverBorder: 'hover:border-red-300',
    badge: 'bg-red-100 text-red-700',
    iconColor: 'text-red-500',
    scoreColor: 'text-red-600',
    meterBg: 'bg-red-500',
  },
};

const caseIcons: Record<string, React.ElementType> = {
  'demo-security-deposit': Gavel,
  'demo-unpaid-loan': ScrollText,
  'demo-breach-contract': FileWarning,
};

export function DemoCaseSelector({ cases, onSelect, selectedId }: DemoCaseSelectorProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900">Try a Demo Case</h3>
        <p className="text-sm text-gray-500">
          Select a pre-built case to see how VerdictAI analyzes different case strengths
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {cases.map((demoCase) => {
          const profile = demoCase.strengthProfile as keyof typeof strengthConfig;
          const config = strengthConfig[profile];
          const Icon = config.icon;
          const CaseIcon = caseIcons[demoCase.id] || Gavel;
          const isSelected = selectedId === demoCase.id;
          const isHovered = hoveredId === demoCase.id;
          const readinessScore = (demoCase.assessment?.readinessScore as number) ?? 50;

          return (
            <button
              key={demoCase.id}
              type="button"
              onClick={() => onSelect(demoCase)}
              onMouseEnter={() => setHoveredId(demoCase.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`relative flex flex-col items-start p-5 text-left rounded-xl border-2 transition-all duration-200 ${
                isSelected
                  ? 'border-blue-500 bg-blue-50/80 ring-2 ring-blue-200'
                  : `${config.border} ${config.hoverBorder} bg-white hover:shadow-md hover:-translate-y-0.5`
              }`}
            >
              {isSelected && (
                <div className="absolute top-3 right-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                </div>
              )}

              <div className="flex items-center gap-2.5 mb-3">
                <div className={`p-2 rounded-lg ${config.bg}`}>
                  <CaseIcon className={`w-4 h-4 ${config.iconColor}`} />
                </div>
                <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${config.badge}`}>
                  {config.label}
                </span>
              </div>

              <h4 className="text-sm font-semibold text-gray-900 mb-1.5 leading-snug">
                {demoCase.title}
              </h4>

              <p className="text-xs text-gray-500 mb-3 leading-relaxed line-clamp-2">
                {demoCase.factsSummary}
              </p>

              <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                <span className="flex items-center gap-1">
                  <span className="font-medium">{demoCase.evidence.length}</span> evidence items
                </span>
                <span className="flex items-center gap-1">
                  <span className="font-medium">{demoCase.witnesses.length}</span> witnesses
                </span>
                <span className="flex items-center gap-1">
                  ₹{demoCase.amount.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="w-full mt-auto">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-400">Readiness Score</span>
                  <span className={`text-xs font-semibold ${config.scoreColor}`}>
                    {readinessScore}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${config.meterBg}`}
                    style={{ width: isHovered || isSelected ? `${readinessScore}%` : '0%' }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-1.5 mt-4 text-xs font-medium transition-colors duration-200"
                style={{ color: isSelected ? '#2563eb' : isHovered ? '#1d4ed8' : '#6b7280' }}
              >
                {isSelected ? 'Selected' : 'Use This Case'}
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200"
                  style={{ transform: isHovered || isSelected ? 'translateX(2px)' : 'none' }}
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
