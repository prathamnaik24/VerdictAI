'use client';

import { useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles } from 'lucide-react';
import { useCaseStore } from '@/store/useCaseStore';
import { useAssessment } from '@/frontend/hooks/useAssessment';
import { DemoCaseSelector } from '@/frontend/components/intake/DemoCaseSelector';
import { InsufficientInfoCard } from '@/frontend/components/intake/InsufficientInfoCard';
import { ErrorState } from '@/frontend/components/common/ErrorState';
import { validateIntakeInput } from '@/frontend/lib/intakeValidation';
import { getDemoCases, getDemoCaseFormData } from '@/frontend/lib/demoHelpers';
import { getDemoCaseById } from '@/frontend/lib/demoHelpers';
import EvidenceChecklist from './EvidenceChecklist';
import { ROUTES } from '@/lib/routes';
import { DISPUTE_TYPES, DISPUTE_TYPE_LABELS } from '@/shared/constants/disputeTypes';
import type { DisputeType } from '@/shared/constants/disputeTypes';
import type { DemoCase } from '@/frontend/types/case.types';
import type { ValidationIssue } from '@/frontend/lib/intakeValidation';

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
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({
    disputeType: '' as DisputeType | '',
    title: '',
    description: '',
    location: '',
    dateOfIncident: '',
  });

  const [selectedDemoId, setSelectedDemoId] = useState<string | null>(null);
  const [showAutofillHint, setShowAutofillHint] = useState(false);
  const [validationIssues, setValidationIssues] = useState<ValidationIssue[] | null>(null);
  const [bypassValidation, setBypassValidation] = useState(false);
  const descRef = useRef<HTMLTextAreaElement>(null);

  const demoCases = getDemoCases();

  const runSubmit = useCallback(async (data: typeof formData) => {
    if (!data.disputeType || !data.title || !data.description) return false;

    const caseData = {
      id: `case-${Date.now()}`,
      disputeType: data.disputeType as DisputeType,
      title: data.title,
      description: data.description,
      location: data.location,
      dateOfIncident: data.dateOfIncident,
      amount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setCurrentCase(caseData);
    const result = await runAssessment(data);

    if (result) {
      router.push(ROUTES.DASHBOARD);
      return true;
    }
    return false;
  }, [setCurrentCase, runAssessment, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (selectedDemoId) setSelectedDemoId(null);
    setValidationIssues(null);
    setBypassValidation(false);
  };

  const handleDemoSelect = (demoCase: DemoCase) => {
    const formFields = getDemoCaseFormData(demoCase);
    setFormData({
      disputeType: formFields.disputeType as DisputeType,
      title: formFields.title,
      description: formFields.description,
      location: formFields.location,
      dateOfIncident: formFields.dateOfIncident,
    });
    setSelectedDemoId(demoCase.id);
    setShowAutofillHint(true);
    setTimeout(() => setShowAutofillHint(false), 4000);
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  const selectedDemo = selectedDemoId ? getDemoCaseById(selectedDemoId) : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.disputeType || !formData.title || !formData.description) {
      return;
    }

    if (!bypassValidation) {
      const validation = validateIntakeInput(formData);
      if (!validation.isValid) {
        setValidationIssues(validation.issues);
        return;
      }
    }

    setValidationIssues(null);
    await runSubmit(formData);
  };

  const handleContinueAnyway = () => {
    setBypassValidation(true);
    setValidationIssues(null);
    runSubmit(formData);
  };

  const handleImproveDetails = () => {
    setValidationIssues(null);
    descRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    descRef.current?.focus();
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
      <DemoCaseSelector
        cases={demoCases}
        onSelect={handleDemoSelect}
        selectedId={selectedDemoId}
      />

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-3 text-gray-400">or enter your case manually</span>
        </div>
      </div>

      {showAutofillHint && (
        <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-700 animate-pulse">
          <Sparkles className="w-4 h-4 shrink-0" />
          <span>Demo case autofilled! Review the details below and click <strong>Analyze My Case</strong>.</span>
        </div>
      )}

      <div>
        <label htmlFor="disputeType" className="block text-gray-700 font-medium mb-2">
          Dispute Type <span className="text-red-600">*</span>
        </label>
        <select
          id="disputeType"
          name="disputeType"
          value={formData.disputeType}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white"
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
        <EvidenceChecklist evidenceItems={selectedDemo?.evidence} />
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
          placeholder="e.g. John Doe vs. ABC Corp — Contract Dispute"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
          Case Description <span className="text-red-600">*</span>
        </label>
        <textarea
          ref={descRef}
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
          Location / Jurisdiction
        </label>
        <input
          id="location"
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="e.g. Mumbai, Maharashtra"
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

      {validationIssues && (
        <InsufficientInfoCard
          issues={validationIssues}
          onContinue={handleContinueAnyway}
          onImprove={handleImproveDetails}
        />
      )}

{error && !validationIssues && (
          <div className="bg-white border border-red-100 rounded-xl">
            <ErrorState
              title="Assessment could not be completed"
              message={error}
              variant="warning"
              primaryAction={{
                label: 'Retry',
                onClick: () => handleContinueAnyway(),
              }}
              secondaryAction={{
                label: 'Try Demo Case',
                onClick: () => window.location.href = '/',
              }}
            />
          </div>
        )}

      <button
        type="submit"
        disabled={loading}
        className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Analyzing…' : 'Analyze My Case'}
      </button>
    </form>
  );
};
