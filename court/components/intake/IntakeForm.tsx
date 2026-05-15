'use client';

import { useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles } from 'lucide-react';
import { useCaseStore } from '@/store/useCaseStore';
import { useCaseStore as useFrontendCaseStore } from '@/frontend/store/useCaseStore';
import { useAssessment } from '@/frontend/hooks/useAssessment';
import { DemoCaseSelector } from '@/frontend/components/intake/DemoCaseSelector';
import { InsufficientInfoCard } from '@/frontend/components/intake/InsufficientInfoCard';
import { ErrorState } from '@/frontend/components/common/ErrorState';
import { validateIntakeInput } from '@/frontend/lib/intakeValidation';
import { getDemoCases, getDemoCaseFormData } from '@/frontend/lib/demoHelpers';
import { getDemoCaseById } from '@/frontend/lib/demoHelpers';
import { EvidenceChecklist } from './EvidenceChecklist';
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

const inputCls =
  'w-full px-4 py-3 border border-[#B69D74]/30 rounded-xl bg-white text-[#1F2839] placeholder:text-[#1F2839]/30 focus:outline-none focus:ring-2 focus:ring-[#B69D74]/40 focus:border-[#B69D74] transition-colors text-sm';

/** Wraps a label + input so gap handles spacing (margin utilities are overridden by global reset) */
function Field({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      {children}
    </div>
  );
}

function Label({ htmlFor, required, children }: { htmlFor: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#1F2839', fontFamily: 'var(--font-inter)' }}
    >
      {children}
      {required && <span style={{ color: '#ef4444', marginLeft: '3px' }}>*</span>}
    </label>
  );
}

export const IntakeForm = () => {
  const router = useRouter();
  const setCurrentCase = useCaseStore((state) => state.setCurrentCase);
  const setFrontendDemoId = useFrontendCaseStore((state) => state.setDemoId);
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
    setFrontendDemoId(selectedDemoId);
    const result = await runAssessment(data);

    if (result) {
      router.push(ROUTES.DASHBOARD);
      return true;
    }
    return false;
  }, [setCurrentCase, runAssessment, router, selectedDemoId, setFrontendDemoId]);

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
    if (!formData.disputeType || !formData.title || !formData.description) return;

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
    /* Use gap (not space-y/margin) — global * { m-0 p-0 } overrides margin utilities in Tailwind v4 layer cascade */
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}
    >
      {/* Demo case picker */}
      <DemoCaseSelector
        cases={demoCases}
        onSelect={handleDemoSelect}
        selectedId={selectedDemoId}
      />

      {/* Divider */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <div style={{ flex: 1, height: '1px', background: 'rgba(182,157,116,0.2)' }} />
        <span
          style={{
            padding: '4px 14px',
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'rgba(31,40,57,0.35)',
            border: '1px solid rgba(182,157,116,0.2)',
            borderRadius: '999px',
            background: '#fff',
            whiteSpace: 'nowrap',
          }}
        >
          or enter your case manually
        </span>
        <div style={{ flex: 1, height: '1px', background: 'rgba(182,157,116,0.2)' }} />
      </div>

      {/* Autofill hint */}
      {showAutofillHint && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: 'rgba(182,157,116,0.08)',
            border: '1px solid rgba(182,157,116,0.3)',
            borderRadius: '10px',
            padding: '12px 14px',
            fontSize: '13px',
            color: 'rgba(31,40,57,0.8)',
          }}
        >
          <Sparkles style={{ width: '16px', height: '16px', color: '#B69D74', flexShrink: 0 }} />
          <span>
            Demo case autofilled! Review the details below and click{' '}
            <strong style={{ color: '#1F2839' }}>Analyze My Case</strong>.
          </span>
        </div>
      )}

      {/* Dispute Type */}
      <Field>
        <Label htmlFor="disputeType" required>Dispute Type</Label>
        <select
          id="disputeType"
          name="disputeType"
          value={formData.disputeType}
          onChange={handleChange}
          className={inputCls}
          required
        >
          <option value="">Select dispute type…</option>
          {COMMON_DISPUTE_TYPES.map((type) => (
            <option key={type} value={type}>
              {DISPUTE_TYPE_LABELS[type as keyof typeof DISPUTE_TYPE_LABELS] || type}
            </option>
          ))}
        </select>
      </Field>

      {/* Evidence checklist (shows demo evidence when demo selected) */}
      <div
        style={{
          background: 'rgba(245,245,239,0.6)',
          border: '1px solid rgba(182,157,116,0.2)',
          borderRadius: '12px',
          padding: '16px 18px',
        }}
      >
        <EvidenceChecklist evidenceItems={selectedDemo?.evidence} />
      </div>

      {/* Case Title */}
      <Field>
        <Label htmlFor="title" required>Case Title</Label>
        <input
          id="title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g. John Doe vs. ABC Corp — Contract Dispute"
          className={inputCls}
          required
        />
      </Field>

      {/* Case Description */}
      <Field>
        <Label htmlFor="description" required>Case Description</Label>
        <textarea
          ref={descRef}
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Provide detailed information about your case, including key facts, dates, and parties involved"
          rows={6}
          className={inputCls}
          required
        />
      </Field>

      {/* Location + Date — side by side */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <Field>
          <Label htmlFor="location">Location / Jurisdiction</Label>
          <input
            id="location"
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. Mumbai, Maharashtra"
            className={inputCls}
          />
        </Field>
        <Field>
          <Label htmlFor="dateOfIncident">Date of Incident</Label>
          <input
            id="dateOfIncident"
            type="date"
            name="dateOfIncident"
            value={formData.dateOfIncident}
            onChange={handleChange}
            className={inputCls}
          />
        </Field>
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
            primaryAction={{ label: 'Retry', onClick: () => handleContinueAnyway() }}
            secondaryAction={{ label: 'Try Demo Case', onClick: () => { window.location.href = '/'; } }}
          />
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        style={{
          width: '100%',
          padding: '14px 24px',
          borderRadius: '12px',
          fontWeight: 700,
          fontSize: '14px',
          letterSpacing: '0.02em',
          color: '#fff',
          background: loading ? 'rgba(31,40,57,0.5)' : 'linear-gradient(135deg, #1F2839 0%, #2d3a52 100%)',
          boxShadow: loading ? 'none' : '0 4px 16px rgba(31,40,57,0.22)',
          cursor: loading ? 'not-allowed' : 'pointer',
          border: 'none',
          transition: 'all 0.2s ease',
        }}
      >
        {loading ? 'Analyzing…' : 'Analyze My Case →'}
      </button>
    </form>
  );
};
