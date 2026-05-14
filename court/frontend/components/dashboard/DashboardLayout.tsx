import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">VerdictAI</p>
            <h1 className="text-lg font-bold text-gray-900">Case Assessment Report</h1>
          </div>
          <span className="text-xs text-gray-400 bg-gray-100 border border-gray-200 px-3 py-1 rounded-full">
            AI-generated · Not legal advice
          </span>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        {children}
      </div>
    </div>
  )
}
