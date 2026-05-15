'use client';

import { ShieldCheck } from 'lucide-react';

export const PrivacyNotice = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        background: 'rgba(31,40,57,0.03)',
        border: '1px solid rgba(182,157,116,0.22)',
        borderRadius: '12px',
        padding: '14px 16px',
      }}
    >
      <div
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: 'rgba(182,157,116,0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <ShieldCheck style={{ width: '15px', height: '15px', color: '#B69D74' }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <p style={{ fontSize: '13px', fontWeight: 700, color: '#1F2839', fontFamily: 'var(--font-inter)' }}>
          Your Data Is Secure
        </p>
        <p style={{ fontSize: '12px', color: 'rgba(31,40,57,0.55)', lineHeight: '1.55' }}>
          All case information is encrypted and processed securely. We do not store or share personal data.
          This tool provides analysis only and is not a substitute for professional legal counsel.
        </p>
      </div>
    </div>
  );
};
