'use client'

import { useState, useEffect, useRef } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Gavel, User, AlertCircle, Info, CheckCircle2, XCircle, HelpCircle, BookOpen } from 'lucide-react'
import { HARDCODED_SIMULATIONS, SimulationTurn, SimulationChoice, ChoiceQuality, Actor } from '@/frontend/lib/hardcodedSimulations'

export default function SimulatorPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const demoId = searchParams.get('id') || 'demo-security-deposit'
  
  const simulationData = HARDCODED_SIMULATIONS[demoId as keyof typeof HARDCODED_SIMULATIONS]

  const [history, setHistory] = useState<SimulationTurn[]>([])
  const [currentTurn, setCurrentTurn] = useState<SimulationTurn | null>(null)
  const [isTyping, setIsTyping] = useState(false)
  const [typingActor, setTypingActor] = useState<Actor | null>(null)
  
  // Track the most recent choice the user made for feedback
  const [lastChoice, setLastChoice] = useState<SimulationChoice | null>(null)
  
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (simulationData) {
      const start = simulationData.turns[simulationData.startTurn]
      setHistory([start])
      setCurrentTurn(start)
    }
  }, [simulationData])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history, isTyping])

  useEffect(() => {
    if (currentTurn?.autoNext) {
      const nextTurn = simulationData.turns[currentTurn.autoNext!]
      setTypingActor(nextTurn.actor)
      setIsTyping(true)
      
      // Random delay between 1500ms and 2500ms to simulate AI generating response
      const delay = Math.floor(Math.random() * 1000) + 1500
      
      const timer = setTimeout(() => {
        setIsTyping(false)
        setHistory(prev => [...prev, nextTurn])
        setCurrentTurn(nextTurn)
      }, delay)
      return () => clearTimeout(timer)
    }
  }, [currentTurn, simulationData])

  if (!simulationData) {
    return (
      <div className="min-h-screen bg-offwhite flex items-center justify-center flex-col gap-4">
        <h1 className="text-xl font-semibold text-gray-800">Simulation not found</h1>
        <button onClick={() => router.push('/dashboard')} className="text-blue-600 hover:underline">
          Return to Dashboard
        </button>
      </div>
    )
  }

  const handleChoice = (choice: SimulationChoice) => {
    setLastChoice(choice)
    
    if (!choice.nextTurnId) {
      setCurrentTurn(null) // end simulation
      return
    }
    
    // Plaintiff's selected message appears instantly
    const nextTurn = simulationData.turns[choice.nextTurnId!]
    setHistory(prev => [...prev, nextTurn])
    setCurrentTurn(nextTurn)
  }

  const getQualityColor = (quality?: ChoiceQuality) => {
    if (quality === 'good') return 'text-green-600 bg-green-50 border-green-200'
    if (quality === 'bad') return 'text-red-600 bg-red-50 border-red-200'
    return 'text-amber-600 bg-amber-50 border-amber-200'
  }

  const getQualityIcon = (quality?: ChoiceQuality) => {
    if (quality === 'good') return <CheckCircle2 className="w-5 h-5 text-green-500" />
    if (quality === 'bad') return <XCircle className="w-5 h-5 text-red-500" />
    return <HelpCircle className="w-5 h-5 text-amber-500" />
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.push('/dashboard')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-navy font-serif">Courtroom Simulator</h1>
            <p className="text-xs text-gray-500">Interactive Case Walkthrough</p>
          </div>
        </div>
        <div className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full border border-indigo-100">
          Plaintiff View
        </div>
      </header>

      {/* Main Layout: 2 Columns on Desktop */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden max-w-7xl mx-auto w-full">
        
        {/* LEFT COLUMN: CHAT UI */}
        <main className="flex-1 flex flex-col relative border-r border-gray-200 bg-white">
          <div className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="space-y-6 pb-4">
              <AnimatePresence initial={false}>
                {history.map((turn, index) => {
                  const isJudge = turn.actor === 'judge'
                  const isPlaintiff = turn.actor === 'plaintiff'
                  const isDefendant = turn.actor === 'defendant'

                  return (
                    <motion.div
                      key={`${turn.id}-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex w-full ${
                        isJudge ? 'justify-center' : 
                        isPlaintiff ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div className={`flex flex-col max-w-[85%] ${isPlaintiff ? 'items-end' : 'items-start'}`}>
                        {/* Label */}
                        <div className="flex items-center gap-1.5 mb-1 px-1">
                          {isJudge && <Gavel className="w-3.5 h-3.5 text-gray-500" />}
                          {isPlaintiff && <User className="w-3.5 h-3.5 text-blue-500" />}
                          {isDefendant && <AlertCircle className="w-3.5 h-3.5 text-red-500" />}
                          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            {turn.actor}
                          </span>
                        </div>

                        {/* Bubble */}
                        <div className={`p-4 rounded-2xl shadow-sm text-sm md:text-base leading-relaxed ${
                          isJudge ? 'bg-gray-50 border border-gray-200 text-gray-800 text-center mx-auto shadow-md' :
                          isPlaintiff ? 'bg-blue-600 text-white rounded-tr-sm' :
                          'bg-red-50 border border-red-100 text-red-900 rounded-tl-sm'
                        }`}>
                          {turn.message}
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`flex w-full ${typingActor === 'judge' ? 'justify-center' : 'justify-start'}`}
                >
                  <div className={`flex flex-col ${typingActor === 'judge' ? 'items-center' : 'items-start'}`}>
                    <div className="flex items-center gap-1.5 mb-1 px-1">
                      {typingActor === 'judge' && <Gavel className="w-3.5 h-3.5 text-gray-500" />}
                      {typingActor === 'defendant' && <AlertCircle className="w-3.5 h-3.5 text-red-500" />}
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        {typingActor} generating...
                      </span>
                    </div>
                    <div className="bg-gray-100 rounded-2xl px-4 py-3 flex gap-1 items-center border border-gray-200">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area (Choices) - Fixed at bottom of left column */}
          <div className="bg-white border-t border-gray-200 p-4 shadow-[0_-4px_10px_-1px_rgba(0,0,0,0.05)] shrink-0 z-10">
            {!isTyping && currentTurn?.choices && currentTurn.choices.length > 0 ? (
              <div className="flex flex-col gap-2">
                <p className="text-xs font-semibold text-gray-500 uppercase mb-1 text-center tracking-wide">Choose Your Response</p>
                <div className="flex flex-col gap-2">
                  {currentTurn.choices.map((choice, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleChoice(choice)}
                      className="w-full bg-white border-2 border-indigo-50 hover:border-indigo-400 hover:bg-indigo-50 text-indigo-900 p-3 rounded-xl text-sm font-medium transition-all text-left shadow-sm flex items-center justify-between group"
                    >
                      <span>{choice.label}</span>
                      <ArrowLeft className="w-4 h-4 opacity-0 group-hover:opacity-100 rotate-180 transition-opacity" />
                    </button>
                  ))}
                </div>
              </div>
            ) : !isTyping && !currentTurn?.autoNext && !currentTurn?.choices?.length ? (
              <div className="text-center py-4">
                <p className="text-gray-500 font-medium mb-3">Simulation Complete</p>
                <button
                  onClick={() => router.push(`/report?id=${demoId}`)}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm"
                >
                  View Final Report
                </button>
              </div>
            ) : (
              <div className="h-10 flex items-center justify-center text-gray-400 text-sm italic">
                {isTyping ? 'Waiting for court response...' : ''}
              </div>
            )}
          </div>
        </main>

        {/* RIGHT COLUMN: EDUCATIONAL GUIDE */}
        <aside className="w-full md:w-96 bg-gray-50 p-6 overflow-y-auto border-t md:border-t-0 md:border-l border-gray-200">
          <div className="space-y-6 sticky top-6">
            <div className="flex items-center gap-2 mb-2">
              <Info className="w-5 h-5 text-indigo-600" />
              <h2 className="text-lg font-bold text-gray-900 font-serif">Simulation Guide</h2>
            </div>
            
            <p className="text-sm text-gray-600 leading-relaxed">
              This panel explains the legal strategy behind the simulation, simplifies jargon, and reviews your choices.
            </p>

            {/* Current Turn Insight */}
            <AnimatePresence mode="wait">
              {currentTurn?.insight && (
                <motion.div
                  key={currentTurn.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 shadow-sm"
                >
                  <h3 className="text-xs font-bold text-indigo-800 uppercase tracking-widest mb-2">Current Context</h3>
                  <p className="text-sm text-indigo-900">{currentTurn.insight}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Last Choice Feedback */}
            <AnimatePresence mode="wait">
              {lastChoice && lastChoice.explanation && (
                <motion.div
                  key={lastChoice.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`border rounded-xl p-4 shadow-sm ${getQualityColor(lastChoice.quality)}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">{getQualityIcon(lastChoice.quality)}</div>
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-wider mb-1">
                        {lastChoice.quality === 'good' ? 'Great Choice' : 
                         lastChoice.quality === 'bad' ? 'Poor Choice' : 'Moderate Choice'}
                      </h3>
                      <p className="text-xs opacity-80 italic mb-2">"{lastChoice.label}"</p>
                      <p className="text-sm font-medium leading-relaxed mb-3">{lastChoice.explanation}</p>
                      
                      {lastChoice.precedent && (
                        <div className="mt-3 bg-white/50 rounded-lg p-3 border border-black/5">
                          <div className="flex items-center gap-1.5 mb-1">
                            <BookOpen className="w-3.5 h-3.5 opacity-70" />
                            <span className="text-xs font-bold uppercase tracking-wider opacity-70">Precedent</span>
                          </div>
                          <p className="text-xs font-medium opacity-90">{lastChoice.precedent}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {!lastChoice && !currentTurn?.insight && (
              <div className="text-center py-10 opacity-50">
                <Info className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm">Make a choice on the left to see legal feedback here.</p>
              </div>
            )}
          </div>
        </aside>

      </div>
    </div>
  )
}
