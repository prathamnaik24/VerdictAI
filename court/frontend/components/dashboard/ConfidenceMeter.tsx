'use client';

const LEVEL_MAP: Record<string, { value: number; barColor: string; labelColor: string }> = {
  'Very High': { value: 0.95, barColor: '#16a34a', labelColor: '#166534' },
  'High':      { value: 0.80, barColor: '#B69D74', labelColor: '#9d845f' },
  'Moderate':  { value: 0.65, barColor: '#B69D74', labelColor: '#B69D74' },
  'Low':       { value: 0.40, barColor: '#dc2626', labelColor: '#991b1b' },
};

export const ConfidenceMeter = ({ level }: { level: string }) => {
  const cfg = LEVEL_MAP[level] ?? LEVEL_MAP['Moderate'];
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
        AI Confidence
      </p>
      <p style={{ fontSize: '26px', fontWeight: 800, color: '#1F2839', lineHeight: 1.2 }}>{level}</p>
      <p style={{ fontSize: '12px', color: cfg.labelColor, fontWeight: 600 }}>
        {Math.round(cfg.value * 100)}% confidence score
      </p>
      <div style={{ width: '100%', height: '5px', background: 'rgba(31,40,57,0.08)', borderRadius: '99px', overflow: 'hidden', marginTop: '4px' }}>
        <div
          style={{
            height: '100%',
            width: `${cfg.value * 100}%`,
            background: cfg.barColor,
            borderRadius: '99px',
            transition: 'width 0.7s ease-out',
          }}
        />
      </div>
    </div>
  );
};
