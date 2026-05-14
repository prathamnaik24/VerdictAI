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
import { DemoCaseButton } from "@/frontend/components/common/DemoCaseButton";
import { LoadingState } from "@/frontend/components/common/LoadingState";
import { PageTransition } from "@/frontend/components/animations/PageTransition";
import { staggerItem } from "@/frontend/components/animations/StaggerContainer";
import { getDemoSimulation } from "@/frontend/lib/demoHelpers";
import type { DemoCaseType } from "@/frontend/lib/demoHelpers";

const STEP_LABELS = ["Opening Statement", "Opposing Counsel", "Judge Question", "Evaluation"];

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
                <button
                  onClick={handleStart}
                  disabled={loading || !statement.trim()}
                  className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
                >
                  {loading ? "Running Simulation..." : "Start Simulation"}
                </button>
                <DemoCaseButton onSelect={handleDemoSelect} label="Demo Simulation" />
              </div>
              {statement.length > 0 && (
                <span className="text-xs text-gray-400">{statement.length} characters</span>
              )}
            </div>
            <p className="mt-2 text-xs text-gray-400">
              Press {typeof window !== "undefined" && /Mac/.test(navigator.platform) ? "Cmd" : "Ctrl"}+Enter to submit
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
              <LoadingState message="Loading demo simulation..." variant="inline" />
            </div>
          )}

          {error && !demoResult && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 animate-fade-in-up">
              <div className="flex items-center justify-between">
                <p className="text-red-700 text-sm">{error}</p>
                <DemoCaseButton onSelect={handleDemoSelect} label="Load Demo Instead" />
              </div>
            </div>
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
                      Showing demo simulation. Submit an opening statement to run a live AI-powered simulation.
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {!displayResult && !loading && !error && !demoLoading && (
            <EmptyState
              title="Ready for Simulation"
              description="Enter an opening statement above, or load a demo case to see a pre-built simulation."
            />
          )}

          <div className="flex justify-between pt-8">
            <Link
              href={ROUTES.DASHBOARD}
              className="px-4 py-2 text-sm text-gray-500 hover:text-gray-800 transition-colors"
            >
              &larr; Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </PageContainer>
    </PageTransition>
  );
}
