'use client'

interface Props {
  laws: string[]
}

export default function ApplicableLaws({ laws }: Props) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Possible Applicable Provisions</p>
      {laws.length === 0 ? (
        <p className="text-sm text-gray-400 italic">No provisions identified. Additional case details may help surface relevant laws.</p>
      ) : (
        <div className="space-y-2">
          {laws.map((law, index) => (
            <details
              key={index}
              className="group border border-gray-100 rounded-lg overflow-hidden"
            >
              <summary className="cursor-pointer flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors text-sm font-medium text-gray-800 list-none">
                <span>{law}</span>
                <span className="text-gray-400 group-open:rotate-180 transition-transform text-xs">▼</span>
              </summary>
              <div className="px-4 py-3 text-sm text-gray-500 leading-relaxed border-t border-gray-100">
This provision may be relevant based on extracted facts and dispute classification. Confirm applicability with a qualified legal professional.
              </div>
            </details>
          ))}
        </div>
      )}
    </div>
  )
}
