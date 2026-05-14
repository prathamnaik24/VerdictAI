'use client';

import { useState, useCallback } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageTitle } from "@/components/common/PageTitle";
import { OpeningStatement } from "@/frontend/components/simulator/OpeningStatement";
import { OpposingCounsel } from "@/frontend/components/simulator/OpposingCounsel";
import { JudgeQuestions } from "@/frontend/components/simulator/JudgeQuestions";
import { SimulationFeedback } from "@/frontend/components/simulator/SimulationFeedback";
import { useSimulation } from "@/frontend/hooks/useSimulation";
import { ROUTES } from "@/lib/routes";
import Link from "next/link";
import { motion } from "framer-motion";
import { EmptyState } from "@/frontend/components/common/EmptyState";
import { ErrorState } from "@/frontend/components/common/ErrorState";
import { getEmptyStatePreset } from "@/frontend/lib/emptyStatePresets";
import { DemoCaseButton } from "@/frontend/components/common/DemoCaseButton";
import { LoadingState } from "@/frontend/components/common/LoadingState";
import { MotionButton } from "@/frontend/components/common/MotionButton";
import { PageTransition } from "@/frontend/components/animations/PageTransition";
import { staggerItem } from "@/frontend/components/animations/StaggerContainer";
import { getDemoSimulation } from "@/frontend/lib/demoHelpers";
import type { DemoCaseType } from "@/frontend/lib/demoHelpers";

const STEP_LABELS = ["Opening Statement", "Opposing Argument", "Judge's Question", "Evaluation"];

export default function SimulatorPage() {
  const [statement, setStatement] = useState("");
  const { loading, error, result, phase, phaseLabel, runCourtroomSimulation } = useSimulation();
  const [demoResult, setDemoResult] = useState<{
    opposingCounsel: string;
    judgeQuestion: string;
    feedback: { strongestPoint: string; weakestPoint: string; improvementSuggestion: string; argumentScore: number };
  } | null>(null);
  const [demoLoading, setDemoLoading] = useState(false);

  const handleStart = useCallback(() => {
    if (!statement.trim() || loading) return;
    setDemoResult(null);
    runCourtroomSimulation({
      caseType: "civil-dispute",
      caseTitle: "Contract Dispute",
      caseDescription: "A dispute over breach of contract terms between two parties.",
      openingStatement: statement,
    });
  }, [statement, loading, runCourtroomSimulation]);

  const handleDemoSelect = useCallback((caseType: DemoCaseType) => {
    setDemoLoading(true);
    setDemoResult(null);
    setTimeout(() => {
      const sim = getDemoSimulation(caseType);
      setDemoResult({
        opposingCounsel: sim.opposingCounsel,
        judgeQuestion: sim.judgeQuestion,
        feedback: sim.feedback,
      });
      setDemoLoading(false);
    }, 800);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        handleStart();
      }
    },
    [handleStart]
  );

  const currentStep = phase === "idle" ? -1 : phase === "rebuttal" ? 0 : phase === "judge" ? 1 : phase === "evaluation" ? 2 : 3;
  const displayResult = result || demoResult;

  return (
    <PageTransition>
    <PageContainer>
      <div className="max-w-4xl mx-auto">
        <PageTitle
          title="Courtroom Simulator"
          subtitle="Present your opening statement, face opposing counsel, and receive structured feedback."
        />

        <div className="space-y-6">
          <div className="animate-fade-in-up">
            <OpeningStatement
              value={statement}
              onChange={setStatement}
              disabled={loading}
            />
            <div className="mt-4 flex items-center justify-between">
<div className="flex items-center gap-3">
                 <MotionButton
                   variant="primary"
                   onClick={handleStart}
                   disabled={loading || !statement.trim()}
                   className="px-6 py-2.5"
                 >
                   {loading ? 'Analyzing arguments…' : 'Start Simulation'}
                 </MotionButton>
                 <DemoCaseButton onSelect={handleDemoSelect} label="Try Demo" />
               </div>
               {statement.length > 0 && (
                 <span className="text-xs text-gray-400">{statement.length} characters</span>
               )}
             </div>
             <p className="mt-2 text-xs text-gray-400">
               Press{' '}
               {typeof window !== 'undefined' && /Mac/.test(navigator.platform)
                 ? '⌘'
                 : 'Ctrl'}
               +Enter to submit
             </p>
          </div>

          {loading && (
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm animate-fade-in-up">
              <div className="flex items-center justify-between mb-4">
                {STEP_LABELS.map((label, i) => (
                  <div key={label} className="flex items-center gap-2">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                        i < currentStep
                          ? "bg-blue-600 text-white"
                          : i === currentStep
                          ? "bg-blue-100 text-blue-600 border-2 border-blue-600"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {i < currentStep ? "\u2713" : i + 1}
                    </div>
                    <span
                      className={`text-xs hidden sm:inline ${
                        i === currentStep ? "text-blue-600 font-medium" : "text-gray-400"
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center gap-2 pt-2">
                <LoadingState message={phaseLabel} variant="inline" />
              </div>
            </div>
          )}

          {demoLoading && (
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm animate-fade-in-up">
              <LoadingState message="Loading demo…" variant="inline" />
            </div>
          )}

{error && !demoResult && (
             <motion.div
               initial={{ opacity: 0, y: -8 }}
               animate={{ opacity: 1, y: 0 }}
             >
               <ErrorState
                 title="Simulation could not complete"
                 message={error}
                 variant="warning"
                 primaryAction={{
                   label: 'Retry',
                   loading,
                   onClick: handleStart,
                 }}
                 secondaryAction={{
                   label: 'Try Demo Instead',
                   onClick: () => handleDemoSelect('security-deposit'),
                 }}
               />
             </motion.div>
           )}

          {displayResult && !loading && !demoLoading && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.12 } },
              }}
              className="space-y-6"
            >
              <motion.div variants={staggerItem}>
                <OpposingCounsel argument={displayResult.opposingCounsel} />
              </motion.div>
              <motion.div variants={staggerItem}>
                <JudgeQuestions question={displayResult.judgeQuestion} />
              </motion.div>
              <motion.div variants={staggerItem}>
                <SimulationFeedback feedback={displayResult.feedback} />
              </motion.div>
              {demoResult && !result && (
                <motion.div variants={staggerItem}>
                  <div className="bg-amber-50/70 border border-amber-200 rounded-lg px-4 py-3 text-center">
                    <p className="text-sm text-amber-800">
                      Showing demo simulation. Submit an opening statement to run a live analysis.
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {!displayResult && !loading && !error && !demoLoading && (
            <EmptyState
              icon={getEmptyStatePreset('noSimulations').icon}
              title={getEmptyStatePreset('noSimulations').title}
              description={getEmptyStatePreset('noSimulations').description}
              variant="inline"
            />
          )}

          <div className="flex justify-between pt-8 border-t border-gray-100 mt-8">
            <Link
              href={ROUTES.DASHBOARD}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-navy/70 hover:text-navy hover:bg-navy/5 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Dashboard
            </Link>
            <Link
              href={ROUTES.REPORT}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-navy hover:bg-navy/90 rounded-lg transition-colors"
            >
              View Full Report
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </PageContainer>
    </PageTransition>
  );
}
