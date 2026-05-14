'use client'

interface Props {
  laws: string[]
  nextSteps?: string[]
}

const LAW_MAP: Record<string, { plain: string; actions: string[] }> = {
  'Section 43 of the Maharashtra Rent Control Act, 1999 — Recovery of possession and deposit refund': {
    plain: 'Landlords should return a tenant\'s security deposit after they move out unless they can prove specific damages with invoices or inspection reports.',
    actions: [
      'Request a written itemised damage report from the landlord',
      'Gather timestamped move-out photographs and receipts',
      'Consider filing a complaint in the Small Causes Court if landlord refuses'
    ],
  },
  'Section 73 of the Indian Contract Act, 1872 — Compensation for loss or damage caused by breach of contract': {
    plain: 'If a party breaches a contract and causes loss, the injured party can claim compensation for the loss directly caused by that breach.',
    actions: ['Collect documentary proof of breach and losses', 'Calculate reasonable compensation with receipts', 'Seek legal advice on filing a civil claim']
  },
  'Section 4 of the Negotiable Instruments Act, 1881 — Promissory note definition and enforceability': {
    plain: 'A promissory note is a written promise to pay a certain sum and is generally enforceable in court.',
    actions: ['Keep the original promissory note safe', 'Gather bank transfer records and supporting messages', 'Consider issuing a formal demand notice via lawyer']
  },
  'Section 25(3) of the Indian Contract Act, 1872 — Promise in writing and registered': {
    plain: 'A written promise to repay is stronger evidence; registration increases enforceability in some cases.',
    actions: ['If possible, register the agreement or gather supporting documents', 'Collect any contemporaneous written acknowledgements']
  },
  'Section 10 of the Indian Contract Act, 1872 — What agreements are contracts': {
    plain: 'Not every agreement is a legally enforceable contract — key terms, offer, acceptance, and consideration must be present.',
    actions: ['Document the scope of work, deliverables, and timeline in writing', 'If disputed, obtain independent valuations and witness statements']
  },
  'Section 36 of the Indian Contract Act, 1872 — Effect of failure to perform at fixed time': {
    plain: 'When a party fails to perform by an agreed time, remedies depend on whether time was of the essence; courts look at reasonableness.',
    actions: ['Show evidence of agreed timelines and communications', 'Consider mediation before filing suit']
  }
}

export default function ApplicableLaws({ laws, nextSteps = [] }: Props) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Possible Applicable Provisions (plain English)</p>
      {laws.length === 0 ? (
        <p className="text-sm text-gray-400 italic">No provisions identified. Additional case details may help surface relevant laws.</p>
      ) : (
        <div className="space-y-3">
          {laws.map((law, index) => {
            const mapped = LAW_MAP[law]
            return (
              <div key={index} className="border border-gray-100 rounded-lg p-3">
                <div className="text-sm font-medium text-gray-800">{law}</div>
                <div className="text-sm text-gray-600 mt-2">{mapped ? mapped.plain : 'This provision may be relevant based on extracted facts. Consult a lawyer to confirm applicability.'}</div>
                {mapped && (
                  <div className="mt-3">
                    <div className="text-xs font-semibold text-gray-500">What you can do</div>
                    <ul className="mt-1 text-sm text-gray-700 list-disc list-inside space-y-1">
                      {mapped.actions.map((a, i) => (
                        <li key={i}>{a}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )
          })}

          {nextSteps.length > 0 && (
            <div className="mt-4 border-t pt-3">
              <div className="text-sm font-semibold text-gray-800">Suggested Next Steps (simple)</div>
              <ul className="mt-2 text-sm text-gray-700 list-disc list-inside space-y-1">
                {nextSteps.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
