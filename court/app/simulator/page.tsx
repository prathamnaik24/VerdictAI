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

const STEP_LABELS = ["Opening Statement", "Opposing Counsel", "Judge Question", "Evaluation"];

export default function SimulatorPage() {
  const [statement, setStatement] = useState("");
  const { loading, error, result, phase, phaseLabel, runCourtroomSimulation } = useSimulation();

  const handleStart = useCallback(() => {
    if (!statement.trim() || loading) return;
    runCourtroomSimulation({
      caseType: "civil-dispute",
      caseTitle: "Contract Dispute",
      caseDescription: "A dispute over breach of contract terms between two parties.",
      openingStatement: statement,
    });
  }, [statement, loading, runCourtroomSimulation]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        handleStart();
      }
    },
    [handleStart]
  );

  const currentStep = phase === "idle" ? -1 : phase === "rebuttal" ? 0 : phase === "judge" ? 1 : phase === "evaluation" ? 2 : 3;

  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto">
        <PageTitle
          title="Courtroom Simulator"
          subtitle="Present your opening statement, face opposing counsel, and receive structured feedback."
        />

        <div className="space-y-6">
          {/* Opening Statement */}
          <div className="animate-fade-in-up">
            <OpeningStatement
              value={statement}
              onChange={setStatement}
              disabled={loading}
            />
            <div className="mt-4 flex items-center justify-between">
              <button
                onClick={handleStart}
                disabled={loading || !statement.trim()}
                className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
              >
                {loading ? "Running Simulation..." : "Start Simulation"}
              </button>
              {statement.length > 0 && (
                <span className="text-xs text-gray-400">{statement.length} characters</span>
              )}
            </div>
            <p className="mt-2 text-xs text-gray-400">
              Press {typeof window !== "undefined" && /Mac/.test(navigator.platform) ? "Cmd" : "Ctrl"}+Enter to submit
            </p>
          </div>

          {/* Progress Steps */}
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
                      {i < currentStep ? "✓" : i + 1}
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
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse-dot" style={{ animationDelay: "0s" }} />
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse-dot" style={{ animationDelay: "0.2s" }} />
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse-dot" style={{ animationDelay: "0.4s" }} />
                </span>
                <span className="text-sm text-gray-500">{phaseLabel}</span>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 animate-fade-in-up">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Results */}
          {result && !loading && (
            <div className="space-y-6">
              <div className="animate-fade-in-up" style={{ animationDelay: "0ms" }}>
                <OpposingCounsel argument={result.opposingCounsel} />
              </div>
              <div className="animate-fade-in-up" style={{ animationDelay: "150ms" }}>
                <JudgeQuestions question={result.judgeQuestion} />
              </div>
              <div className="animate-fade-in-up" style={{ animationDelay: "300ms" }}>
                <SimulationFeedback feedback={result.feedback} />
              </div>
            </div>
          )}

          {/* Navigation */}
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
  );
}
