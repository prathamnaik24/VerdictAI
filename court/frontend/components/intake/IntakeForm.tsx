'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAssessment } from '@/frontend/hooks/useAssessment'
import LoadingScreen from '@/frontend/components/common/LoadingScreen'

export const IntakeForm = () => {
  const router = useRouter()
  const { runAssessment, loading, error } = useAssessment()

  const [formData, setFormData] = useState({
    disputeType: '',
    title: '',
    description: '',
    location: '',
    dateOfIncident: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!formData.disputeType || !formData.title || !formData.description) {
      alert('Please fill in all required fields')
      return
    }

    const result = await runAssessment(formData)

    if (result) {
      router.push('/dashboard')
    }
  }

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Dispute Type <span className="text-red-600">*</span>
        </label>
        <select
          name="disputeType"
          value={formData.disputeType}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          required
        >
          <option value="">Select dispute type...</option>
          <option value="cheque-bounce">Cheque Bounce</option>
          <option value="consumer-fraud">Consumer Fraud</option>
          <option value="wrongful-termination">Wrongful Termination</option>
          <option value="security-deposit-dispute">Security Deposit Dispute</option>
          <option value="unpaid-personal-loan">Unpaid Personal Loan</option>
          <option value="breach-of-service-contract">Breach of Service Contract</option>
        </select>
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Case Title <span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Brief title of your case"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Case Description <span className="text-red-600">*</span>
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Provide detailed information about your case, including key facts, dates, and parties involved"
          rows={6}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Location / Jurisdiction
        </label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Where is the dispute located?"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Date of Incident
        </label>
        <input
          type="date"
          name="dateOfIncident"
          value={formData.dateOfIncident}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        />
      </div>

      {error && (
        <p className="text-red-600 text-sm">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Analyze My Case
      </button>
    </form>
  )
}
