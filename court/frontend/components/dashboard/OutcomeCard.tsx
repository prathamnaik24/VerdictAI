'use client';

const DIRECTION_CONFIG: Record<string, { color: string; bg: string; barColor: string }> = {
  'Favourable':   { color: '#166534', bg: 'rgba(22,101,52,0.08)',   barColor: '#16a34a' },
  'Unfavourable': { color: '#991b1b', bg: 'rgba(153,27,27,0.08)',   barColor: '#dc2626' },
  'Neutral':      { color: '#B69D74', bg: 'rgba(182,157,116,0.1)',  barColor: '#B69D74' },
};

export const OutcomeCard = ({ label, score }: { label: string; score: number }) => {
  const cfg = DIRECTION_CONFIG[label] ?? DIRECTION_CONFIG['Neutral'];
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
        gap: '12px',
      }}
    >
      <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(31,40,57,0.4)' }}>
        Direction Assessment
      </p>
      <span
        style={{
          display: 'inline-flex',
          alignSelf: 'flex-start',
          padding: '3px 10px',
          borderRadius: '999px',
          fontSize: '12px',
          fontWeight: 700,
          background: cfg.bg,
          color: cfg.color,
          border: `1px solid ${cfg.color}22`,
        }}
      >
        {label}
      </span>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px' }}>
        <span style={{ fontSize: '52px', fontWeight: 800, color: '#1F2839', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
          {score}
        </span>
        <span style={{ fontSize: '18px', color: 'rgba(31,40,57,0.35)', marginBottom: '6px' }}>/100</span>
      </div>
      <div style={{ width: '100%', height: '5px', background: 'rgba(31,40,57,0.08)', borderRadius: '99px', overflow: 'hidden' }}>
        <div
          style={{
            height: '100%',
            width: `${score}%`,
            background: cfg.barColor,
            borderRadius: '99px',
            transition: 'width 0.7s ease-out',
          }}
        />
      </div>
    </div>
  );
};
