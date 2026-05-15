'use client';

interface EvidenceItem {
  id?: string;
  name: string;
  description?: string;
  [key: string]: any;
}

interface EvidenceChecklistProps {
  evidenceItems?: EvidenceItem[];
}

export const EvidenceChecklist = ({ evidenceItems }: EvidenceChecklistProps) => {
  const defaultItems = [
    'Documents & Contracts',
    'Witness Statements',
    'Communications & Correspondence',
  ];

  const items =
    evidenceItems && evidenceItems.length > 0
      ? evidenceItems.map((item) => ({
          label: item.name,
          description: item.description,
          checked: true,
          key: item.id || item.name,
        }))
      : defaultItems.map((label) => ({ label, description: undefined, checked: false, key: label }));

  return (
    /* Use gap throughout — global * { m-0 p-0 } overrides margin utilities in Tailwind v4 */
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <p style={{ fontSize: '13px', fontWeight: 600, color: '#1F2839', fontFamily: 'var(--font-inter)' }}>
          Available Evidence
        </p>
        <p style={{ fontSize: '12px', color: 'rgba(31,40,57,0.45)' }}>
          Select the evidence types you currently have on hand.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {items.map((item) => (
          <label
            key={item.key}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
          >
            <input
              type="checkbox"
              defaultChecked={item.checked}
              style={{ width: '16px', height: '16px', accentColor: '#B69D74', cursor: 'pointer', flexShrink: 0 }}
            />
            <span style={{ fontSize: '13px', color: 'rgba(31,40,57,0.65)', lineHeight: '1.4' }}>
              {item.label}
              {item.description && (
                <span style={{ color: 'rgba(31,40,57,0.35)', fontSize: '11px', marginLeft: '6px' }}>
                  — {item.description}
                </span>
              )}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};
