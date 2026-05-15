import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function DashboardLayout({ children }: Props) {
  return (
    <div style={{ minHeight: '100vh', background: '#F5F5EF' }}>
      {/* Top header bar */}
      <div
        style={{
          background: '#1F2839',
          borderBottom: '1px solid rgba(182,157,116,0.2)',
        }}
      >
        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            padding: '14px 40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span
              style={{
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#B69D74',
              }}
            >
              VerdictAI
            </span>
            <span
              style={{
                fontSize: '15px',
                fontWeight: 700,
                color: '#fff',
                fontFamily: 'var(--font-inter)',
              }}
            >
              Case Assessment Report
            </span>
          </div>
          <span
            style={{
              fontSize: '11px',
              color: 'rgba(245,245,239,0.45)',
              background: 'rgba(245,245,239,0.07)',
              border: '1px solid rgba(245,245,239,0.12)',
              padding: '4px 12px',
              borderRadius: '999px',
            }}
          >
            AI-generated · Not legal advice
          </span>
        </div>
      </div>

      {/* Page content */}
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '36px 40px 64px',
        }}
      >
        {children}
      </div>
    </div>
  )
}
