'use client';

import { useState } from 'react';
import type { DemoCaseType } from '@/frontend/lib/demoHelpers';
import { DEMO_LABELS } from '@/frontend/lib/demoHelpers';

interface DemoCaseButtonProps {
  onSelect: (caseType: DemoCaseType) => void;
  label?: string;
}

const CASE_TYPES: DemoCaseType[] = ['security-deposit', 'unpaid-loan', 'breach-contract'];

export function DemoCaseButton({ onSelect, label = 'Load Demo Case' }: DemoCaseButtonProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          padding: '11px 20px',
          background: '#fff',
          color: '#1F2839',
          border: '1px solid rgba(31,40,57,0.2)',
          borderRadius: '11px',
          fontSize: '14px',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'all 0.18s ease',
          boxShadow: '0 1px 6px rgba(31,40,57,0.08)',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#F5F5EF'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#fff'; }}
      >
        {label}
      </button>
      {expanded && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setExpanded(false)} />
          <div
            style={{
              position: 'absolute',
              right: 0,
              top: 'calc(100% + 8px)',
              width: '260px',
              background: '#fff',
              border: '1px solid rgba(182,157,116,0.25)',
              borderRadius: '12px',
              boxShadow: '0 8px 28px rgba(31,40,57,0.12)',
              zIndex: 20,
              overflow: 'hidden',
            }}
          >
            <p
              style={{
                fontSize: '10px',
                fontWeight: 800,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'rgba(31,40,57,0.4)',
                padding: '12px 16px 8px',
              }}
            >
              Select a demo case
            </p>
            {CASE_TYPES.map((type, i) => (
              <button
                key={type}
                onClick={() => { onSelect(type); setExpanded(false); }}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '11px 16px',
                  background: 'transparent',
                  border: 'none',
                  borderTop: i === 0 ? 'none' : '1px solid rgba(182,157,116,0.12)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#F5F5EF'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
              >
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#1F2839' }}>
                  {DEMO_LABELS[type].title}
                </span>
                <span style={{ fontSize: '11px', color: 'rgba(31,40,57,0.45)' }}>
                  {DEMO_LABELS[type].subtitle}
                </span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
