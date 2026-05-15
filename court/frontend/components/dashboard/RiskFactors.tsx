'use client';

export const RiskFactors = ({ factors }: { factors: string[] }) => {
  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid rgba(182,157,116,0.22)',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '0 1px 8px rgba(31,40,57,0.06)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#dc2626', flexShrink: 0 }} />
        <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(31,40,57,0.4)' }}>
          Risk Factors
        </p>
      </div>

      {factors.length === 0 ? (
        <p style={{ fontSize: '13px', color: 'rgba(31,40,57,0.4)', fontStyle: 'italic' }}>
          No significant risk factors identified.
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {factors.map((factor, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <div
                style={{
                  flexShrink: 0,
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  background: 'rgba(220,38,38,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '1px',
                }}
              >
                <span style={{ fontSize: '10px', fontWeight: 800, color: '#dc2626' }}>!</span>
              </div>
              <span style={{ fontSize: '13px', color: 'rgba(31,40,57,0.75)', lineHeight: '1.5' }}>{factor}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
