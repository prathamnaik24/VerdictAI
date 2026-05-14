interface Props {
  items: string[]
}

export default function MissingEvidence({ items }: Props) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-amber-400" />
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Missing Evidence</p>
      </div>
      {items.length === 0 ? (
        <p className="text-sm text-gray-400 italic">No evidence gaps identified.</p>
      ) : (
        <ul className="space-y-2.5">
          {items.map((item, index) => (
            <li key={index} className="flex items-start gap-2.5 text-sm text-gray-700">
              <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs">
                ◦
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
