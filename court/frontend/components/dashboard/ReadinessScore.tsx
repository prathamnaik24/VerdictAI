'use client';

export const ReadinessScore = ({ score }: { score: number }) => {
  const pct = Math.min(100, Math.max(0, score));
  const label = pct >= 75 ? 'Ready' : pct >= 50 ? 'Partially Ready' : 'Needs Preparation';
  const labelColor = pct >= 75 ? '#166534' : pct >= 50 ? '#B69D74' : '#991b1b';
  const barColor  = pct >= 75 ? '#16a34a' : pct >= 50 ? '#B69D74' : '#dc2626';

  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid rgba(182,157,116,0.22)',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '0 1px 8px rgba(31,40,57,0.06)',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}
    >
      <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(31,40,57,0.4)' }}>
        Litigation Readiness
      </p>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px' }}>
        <span style={{ fontSize: '52px', fontWeight: 800, color: '#1F2839', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
          {Math.round(pct)}
        </span>
        <span style={{ fontSize: '18px', color: 'rgba(31,40,57,0.35)', marginBottom: '6px' }}>/100</span>
      </div>
      <p style={{ fontSize: '12px', fontWeight: 700, color: labelColor }}>{label}</p>
      <div style={{ width: '100%', height: '5px', background: 'rgba(31,40,57,0.08)', borderRadius: '99px', overflow: 'hidden', marginTop: '4px' }}>
        <div
          style={{
            height: '100%',
            width: `${pct}%`,
            background: barColor,
            borderRadius: '99px',
            transition: 'width 0.7s ease-out',
          }}
        />
      </div>
    </div>
  );
};
