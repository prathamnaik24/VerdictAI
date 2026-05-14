'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCaseStore } from '@/store/useCaseStore';
import { useAssessment } from '@/frontend/hooks/useAssessment';
import { ROUTES } from '@/lib/routes';
import { DISPUTE_TYPES, DISPUTE_TYPE_LABELS } from '@/shared/constants/disputeTypes';
import type { DisputeType } from '@/shared/constants/disputeTypes';

const COMMON_DISPUTE_TYPES: DisputeType[] = [
  DISPUTE_TYPES.SECURITY_DEPOSIT_DISPUTE as DisputeType,
  DISPUTE_TYPES.UNPAID_PERSONAL_LOAN as DisputeType,
  DISPUTE_TYPES.CONSUMER_FRAUD as DisputeType,
  DISPUTE_TYPES.WRONGFUL_TERMINATION as DisputeType,
  DISPUTE_TYPES.BREACH_OF_SERVICE_CONTRACT as DisputeType,
  DISPUTE_TYPES.CHEQUE_BOUNCE as DisputeType,
];

export const IntakeForm = () => {
  const router = useRouter();
  const setCurrentCase = useCaseStore((state) => state.setCurrentCase);
  const { runAssessment, loading, error } = useAssessment();

  const [formData, setFormData] = useState({
    disputeType: '' as DisputeType | '',
    title: '',
    description: '',
    location: '',
    dateOfIncident: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.disputeType || !formData.title || !formData.description) {
      return;
    }

    const caseData = {
      id: `case-${Date.now()}`,
      disputeType: formData.disputeType as DisputeType,
      title: formData.title,
      description: formData.description,
      location: formData.location,
      dateOfIncident: formData.dateOfIncident,
      amount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setCurrentCase(caseData);

    const result = await runAssessment(formData);

    if (result) {
      router.push(ROUTES.DASHBOARD);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="disputeType" className="block text-gray-700 font-medium mb-2">
          Dispute Type <span className="text-red-600">*</span>
        </label>
        <select
          id="disputeType"
          name="disputeType"
          value={formData.disputeType}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          required
        >
          <option value="">Select dispute type...</option>
          {COMMON_DISPUTE_TYPES.map((type) => (
            <option key={type} value={type}>
              {DISPUTE_TYPE_LABELS[type as keyof typeof DISPUTE_TYPE_LABELS] || type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
          Case Title <span className="text-red-600">*</span>
        </label>
        <input
          id="title"
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
        <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
          Case Description <span className="text-red-600">*</span>
        </label>
        <textarea
          id="description"
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
        <label htmlFor="location" className="block text-gray-700 font-medium mb-2">
          Location/Jurisdiction
        </label>
        <input
          id="location"
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Where is the dispute located?"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="dateOfIncident" className="block text-gray-700 font-medium mb-2">
          Date of Incident
        </label>
        <input
          id="dateOfIncident"
          type="date"
          name="dateOfIncident"
          value={formData.dateOfIncident}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        />
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Analyzing case...' : 'Analyze My Case'}
      </button>
    </form>
  );
};
