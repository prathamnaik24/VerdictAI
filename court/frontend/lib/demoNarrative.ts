export const DEMO_NARRATIVE = {
  title: 'VerdictAI Demo Script — Hackathon Presentation',

  opening: {
    hook: 'Most people cannot afford a lawyer to evaluate their case before court. VerdictAI changes that.',
    problem: 'Legal uncertainty is paralyzing. You don\'t know if your case is strong, if you should settle, or if litigation is worth the cost.',
    solution: 'VerdictAI uses AI to analyze legal disputes, retrieve relevant precedents, simulate courtroom arguments, and generate a comprehensive readiness report.',
  },

  sections: [
    {
      name: 'Hero / First Impression',
      duration: '10 seconds',
      talkingPoints: [
        '"Know where your case stands before court begins."',
        'AI-powered legal case assessment and courtroom preparation.',
        'Three clicks to a complete litigation readiness report.',
      ],
    },
    {
      name: 'Problem Statement',
      duration: '15 seconds',
      talkingPoints: [
        'Legal services are expensive and inaccessible.',
        'Most people have no way to evaluate case strength before spending money.',
        'VerdictAI fills this gap with AI-driven legal intelligence.',
      ],
    },
    {
      name: 'How It Works',
      duration: '20 seconds',
      talkingPoints: [
        'Submit your case facts through a simple intake form.',
        'AI extracts key legal details and identifies the dispute type.',
        'The system retrieves similar precedents from Indian courts.',
        'A courtroom simulation tests your arguments against AI counsel.',
        'A final report shows readiness score, risks, and next steps.',
      ],
    },
    {
      name: 'Demo Walkthrough',
      duration: '60 seconds',
      talkingPoints: [
        'Click "Try Demo Case" to skip the intake form.',
        'Watch the AI process: extracting facts → matching precedents → scoring readiness.',
        'The assessment dashboard shows: confidence score, favorable factors, risk factors.',
        'Run a courtroom simulation to see AI judge and opposing counsel in action.',
        'Generate the final report — a complete litigation readiness document.',
        'All in under 60 seconds.',
      ],
    },
    {
      name: 'Key Differentiators',
      duration: '15 seconds',
      talkingPoints: [
        'Semantic precedent retrieval — not keyword search, but meaning-based matching.',
        'Interactive courtroom simulation — practice arguments before the real hearing.',
        'Comprehensive readiness scoring — know your odds before spending on litigation.',
        'India-specific legal framework — trained on Indian case law and statutes.',
      ],
    },
    {
      name: 'Closing',
      duration: '10 seconds',
      talkingPoints: [
        'VerdictAI makes legal assessment accessible, affordable, and instant.',
        'For advocates, for litigants, for anyone who needs to know where they stand.',
        'Try it yourself — select a demo case and see your report in seconds.',
      ],
    },
  ],

  recommendedClickOrder: [
    'Land on homepage',
    'Click "Try Demo Case" button',
    'Select "Cheque Bounce Dispute" from dropdown',
    'View auto-generated assessment dashboard',
    'Navigate to Courtroom Simulator',
    'Run simulation or load demo simulation',
    'View final report with all sections',
  ],

  fallbackTalkingPoints: [
    'If API fails: "Our AI is processing live — let me show you a fully loaded demo report."',
    'If simulation is slow: "The AI is analyzing your argument against thousands of precedents."',
    'If report is empty: "Some sections require additional case data. The demo includes everything pre-populated."',
    'General: "This is an MVP demonstrating core AI capabilities. The system is designed to scale."',
  ],

  innovationHighlights: [
    'AI-powered semantic precedent retrieval (not keyword-based)',
    'Explainable legal scoring with transparent factor breakdown',
    'Interactive courtroom simulation with AI judge and opposing counsel',
    'Comprehensive litigation readiness report with actionable next steps',
    'India-focused legal framework with NI Act, Consumer Protection Act, and ID Act support',
    'Fully offline-capable demo mode with pre-built case data',
  ],
};
