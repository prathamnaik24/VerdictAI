'use client';

import Link from 'next/link';
import { IntakeForm } from '@/components/intake/IntakeForm';
import { EvidenceChecklist } from '@/components/intake/EvidenceChecklist';
import { PrivacyNotice } from '@/components/intake/PrivacyNotice';
import { ROUTES } from '@/lib/routes';

export default function IntakePage() {
  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        background: '#F5F5EF',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '900px',
          padding: '56px 40px 64px',
        }}
      >
        {/* Page header */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
          <span
            style={{
              display: 'inline-block',
              alignSelf: 'center',
              background: 'rgba(182,157,116,0.15)',
              border: '1px solid rgba(182,157,116,0.35)',
              color: '#B69D74',
              fontSize: '10px',
              fontWeight: 800,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              padding: '5px 14px',
              borderRadius: '999px',
            }}
          >
            AI-Powered Assessment
          </span>

          <h1
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(2.6rem, 5vw, 3.6rem)',
              fontWeight: 700,
              color: '#1F2839',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}
          >
            Case Intake
          </h1>

          <p
            style={{
              fontSize: '15px',
              color: 'rgba(31,40,57,0.55)',
              lineHeight: 1.6,
              maxWidth: '440px',
              margin: '0 auto',
              textAlign: 'center',
            }}
          >
            Tell us about your legal case and receive an instant AI-powered strength assessment.
          </p>
        </div>

        {/* Main form card */}
        <div
          style={{
            background: '#fff',
            borderRadius: '24px',
            border: '1px solid rgba(182,157,116,0.2)',
            boxShadow: '0 2px 24px rgba(31,40,57,0.07)',
            overflow: 'hidden',
          }}
        >
          {/* Form area */}
          <div style={{ padding: '40px 44px 36px' }}>
            <IntakeForm />
          </div>

          {/* Evidence section */}
          <div
            style={{
              borderTop: '1px solid rgba(182,157,116,0.15)',
              background: 'rgba(245,245,239,0.55)',
              padding: '28px 44px',
            }}
          >
            <EvidenceChecklist />
          </div>

          {/* Privacy notice */}
          <div
            style={{
              borderTop: '1px solid rgba(182,157,116,0.15)',
              padding: '22px 44px',
            }}
          >
            <PrivacyNotice />
          </div>
        </div>

        {/* Bottom navigation */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '36px' }}>
          <Link
            href={ROUTES.HOME}
            style={{
              padding: '10px 24px',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: 600,
              border: '1px solid rgba(31,40,57,0.15)',
              color: 'rgba(31,40,57,0.6)',
              background: 'transparent',
              textDecoration: 'none',
              transition: 'all 0.2s',
            }}
          >
            ← Back to Home
          </Link>
          <Link
            href={ROUTES.DASHBOARD}
            style={{
              padding: '10px 24px',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: 600,
              background: '#1F2839',
              color: '#fff',
              textDecoration: 'none',
              boxShadow: '0 2px 10px rgba(31,40,57,0.2)',
              transition: 'all 0.2s',
            }}
          >
            View Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
