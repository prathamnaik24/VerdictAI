'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle2, Gavel, ScrollText, FileWarning } from 'lucide-react';
import type { DemoCase } from '@/frontend/types/case.types';

interface DemoCaseSelectorProps {
  cases: DemoCase[];
  onSelect: (demoCase: DemoCase) => void;
  selectedId?: string | null;
}

const caseIcons: Record<string, React.ElementType> = {
  'demo-security-deposit': Gavel,
  'demo-unpaid-loan': ScrollText,
  'demo-breach-contract': FileWarning,
};

export function DemoCaseSelector({ cases, onSelect, selectedId }: DemoCaseSelectorProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    /* Use gap throughout — global * { m-0 p-0 } overrides margin utilities in Tailwind v4 */
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

      {/* Section header — p tag to avoid global h3 font-size override */}
      <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <p style={{ fontSize: '16px', fontWeight: 700, color: '#1F2839', fontFamily: 'var(--font-inter)' }}>
          Try a Demo Case
        </p>
        <p style={{ fontSize: '13px', color: 'rgba(31,40,57,0.45)' }}>
          Select a pre-built case to see how VerdictAI analyzes your situation
        </p>
      </div>

      {/* Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
        {cases.map((demoCase) => {
          const CaseIcon = caseIcons[demoCase.id] || Gavel;
          const isSelected = selectedId === demoCase.id;
          const isHovered = hoveredId === demoCase.id;
          const active = isSelected || isHovered;
          const readinessScore = (demoCase.assessment?.readinessScore as number) ?? 50;

          return (
            <button
              key={demoCase.id}
              type="button"
              onClick={() => onSelect(demoCase)}
              onMouseEnter={() => setHoveredId(demoCase.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'left',
                borderRadius: '16px',
                border: `2px solid ${isSelected ? '#B69D74' : active ? 'rgba(182,157,116,0.55)' : 'rgba(31,40,57,0.1)'}`,
                background: isSelected
                  ? 'linear-gradient(160deg, rgba(182,157,116,0.07) 0%, #fff 60%)'
                  : '#fff',
                boxShadow: active ? '0 4px 16px rgba(31,40,57,0.1)' : '0 1px 4px rgba(31,40,57,0.05)',
                transform: active && !isSelected ? 'translateY(-2px)' : 'none',
                transition: 'all 0.2s ease',
                overflow: 'hidden',
                cursor: 'pointer',
              }}
            >
              {/* Top accent strip */}
              <div
                style={{
                  height: '3px',
                  width: '100%',
                  background: active
                    ? 'linear-gradient(90deg, #B69D74, #d4c5a9)'
                    : 'transparent',
                  transition: 'background 0.3s ease',
                  flexShrink: 0,
                }}
              />

              <div style={{ padding: '18px 18px 16px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                {/* Selected check */}
                {isSelected && (
                  <div style={{ position: 'absolute', top: '14px', right: '14px' }}>
                    <CheckCircle2 style={{ width: '16px', height: '16px', color: '#B69D74' }} />
                  </div>
                )}

                {/* Icon */}
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: active ? 'rgba(182,157,116,0.15)' : 'rgba(31,40,57,0.06)',
                    transition: 'background 0.2s',
                    flexShrink: 0,
                  }}
                >
                  <CaseIcon
                    style={{
                      width: '18px',
                      height: '18px',
                      color: active ? '#B69D74' : 'rgba(31,40,57,0.5)',
                      transition: 'color 0.2s',
                    }}
                  />
                </div>

                {/* Title */}
                <p
                  style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#1F2839',
                    lineHeight: '1.4',
                    paddingRight: isSelected ? '20px' : '0',
                    fontFamily: 'var(--font-inter)',
                  }}
                >
                  {demoCase.title}
                </p>

                {/* Summary */}
                <p
                  style={{
                    fontSize: '12px',
                    color: 'rgba(31,40,57,0.45)',
                    lineHeight: '1.55',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    flex: 1,
                  }}
                >
                  {demoCase.factsSummary}
                </p>

                {/* Stats */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {[
                    { value: demoCase.evidence.length, label: 'evidence' },
                    { value: demoCase.witnesses.length, label: 'witnesses' },
                    { value: `₹${demoCase.amount.toLocaleString('en-IN')}`, label: 'disputed' },
                  ].map((stat, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {i > 0 && (
                        <div style={{ width: '1px', height: '22px', background: 'rgba(31,40,57,0.1)', flexShrink: 0 }} />
                      )}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <span style={{ fontSize: '13px', fontWeight: 700, color: 'rgba(31,40,57,0.7)', lineHeight: 1 }}>
                          {stat.value}
                        </span>
                        <span style={{ fontSize: '10px', color: 'rgba(31,40,57,0.35)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          {stat.label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Readiness bar */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '10px', color: 'rgba(31,40,57,0.35)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                      Readiness
                    </span>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: active ? '#B69D74' : 'rgba(31,40,57,0.35)', transition: 'color 0.2s' }}>
                      {readinessScore}%
                    </span>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: 'rgba(31,40,57,0.08)', borderRadius: '99px', overflow: 'hidden' }}>
                    <div
                      style={{
                        height: '100%',
                        width: active ? `${readinessScore}%` : '0%',
                        background: 'linear-gradient(90deg, #B69D74, #d4c5a9)',
                        borderRadius: '99px',
                        transition: 'width 0.7s ease-out',
                      }}
                    />
                  </div>
                </div>

                {/* CTA */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: active ? '#B69D74' : 'rgba(31,40,57,0.28)',
                    transition: 'color 0.2s',
                  }}
                >
                  {isSelected ? 'Case Selected' : 'Use This Case'}
                  <ArrowRight
                    style={{
                      width: '13px',
                      height: '13px',
                      transform: active ? 'translateX(3px)' : 'none',
                      transition: 'transform 0.2s',
                      flexShrink: 0,
                    }}
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
