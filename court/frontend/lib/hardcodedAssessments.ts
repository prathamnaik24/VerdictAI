export const HARDCODED_ASSESSMENTS = {
  'demo-security-deposit': {
    directionLabel: 'Strongly Favorable',
    directionScore: 86,
    confidenceLevel: 'High',
    confidenceScore: 85,
    laws: [
      {
        name: 'Section 43 of the Maharashtra Rent Control Act, 1999',
        explanation: 'Mandates that landlords must return security deposits within a reasonable time unless specific damages are proven.',
        doesItHelp: 'Yes, this directly supports your claim for a full refund.'
      },
      {
        name: 'Section 73 of the Indian Contract Act, 1872',
        explanation: 'Allows you to claim compensation for losses caused by someone breaking a contract.',
        doesItHelp: 'Yes, if the landlord breached the lease agreement, you can claim interest on the delayed refund.'
      }
    ],
    favorableFactors: [
      'You have timestamped move-out photographs proving the property condition.',
      'You have a clearly signed 24-month lease agreement.',
      'You have proof of regular rent payments with no defaults.'
    ],
    unfavorableFactors: [
      {
        factor: 'No joint inspection report signed by the landlord.',
        howToFix: 'You can compensate for this by providing a written statement from the building security or neighbours confirming you left the flat in good condition.'
      }
    ],
    missingEvidence: [], // Empty means not needed
    glossary: [
      { term: 'Security Deposit', definition: 'Money given to a landlord at the start of a lease to cover potential damages or unpaid rent.' },
      { term: 'Breach of Contract', definition: 'When someone fails to do what they promised in a legal agreement.' },
      { term: 'Quantum of Refund', definition: 'The exact amount of money that should be returned to you.' }
    ],
    knowYourRights: [
      'You are legally entitled to your full security deposit unless the landlord can prove specific damages.',
      'Normal wear and tear (like faded paint or minor scuffs) cannot be deducted from your deposit.',
      'The landlord must return the deposit within the time specified in your agreement (or a reasonable time, usually 30 days).'
    ],
    nextSteps: [
      'Send a final formal demand letter via registered post to establish a paper trail.',
      'Organise your move-out photos and your lease agreement into a single PDF.',
      'File a complaint in the Small Causes Court if the landlord does not respond within 15 days.'
    ],
    helplines: [
      { name: 'National Consumer Helpline', number: '1915' },
      { name: 'Maharashtra Tenant Support (Example)', number: '1800-11-4000' }
    ],
    weakFactors: [
      'You did not conduct a joint inspection with the landlord before handing over the keys.',
      'The exact quantum of refund might be contested if there is any minor damage.'
    ],
    howToMakeStronger: [
      'Obtain a written statement from the building society manager or a neighbour confirming the flat was in good condition.',
      'Print out all WhatsApp conversations with timestamps.'
    ],
    pastCases: [
      {
        title: 'Mohd. Ahmed vs. Nizamuddin (2021)',
        summary: 'Landlord withheld security deposit claiming damages without providing any inspection report.',
        howItEnded: 'Full deposit refund was ordered with 9% interest for wrongful withholding.',
        humanReadableReason: 'The court ruled that a landlord cannot just say "there are damages". They must provide actual receipts or photos. Since the tenant had their own photos showing the house was fine, the tenant won.'
      },
      {
        title: 'Kailash Sharma vs. Rameshwar Properties (2023)',
        summary: 'Consumer complaint against builder for wrongful withholding of security deposit after lease expiry.',
        howItEnded: 'Deposit refund ordered with compensation for mental harassment.',
        humanReadableReason: 'The law requires landlords to return the money within a reasonable time. Keeping it without proof of damage is considered harassment.'
      }
    ]
  },
  'demo-unpaid-loan': {
    directionLabel: 'Neutral',
    directionScore: 52,
    confidenceLevel: 'Moderate',
    confidenceScore: 50,
    laws: [
      {
        name: 'Section 4 of the Negotiable Instruments Act, 1881',
        explanation: 'Defines a promissory note and its enforceability.',
        doesItHelp: 'Yes, your signed promissory note falls under this and helps prove the debt.'
      },
      {
        name: 'Section 101 of the Indian Evidence Act',
        explanation: 'States that the person making a claim must prove it (Burden of Proof).',
        doesItHelp: 'No, this works against you because you must prove it was a loan and not a gift, which is difficult without witnesses.'
      }
    ],
    favorableFactors: [
      'You have bank transfer records proving the money was sent.',
      'The defendant made two partial repayments, which contradicts their "gift" claim.',
      'You have a signed promissory note.'
    ],
    unfavorableFactors: [
      {
        factor: 'The defendant claims the money was a "gift".',
        howToFix: 'Gather any WhatsApp messages where you both discuss "repayment" or where the defendant acknowledges owing you money.'
      },
      {
        factor: 'No independent witnesses to the transaction.',
        howToFix: 'Find a mutual friend who might have overheard conversations about the loan and get their written statement.'
      }
    ],
    missingEvidence: [
      { item: 'Independent Witness Statement', whyNeeded: 'To prove that the transaction was explicitly discussed as a loan and not a gift.' },
      { item: 'Unbroken WhatsApp Chat History', whyNeeded: 'To show the full context of the conversation and prevent the defendant from claiming you deleted messages.' }
    ],
    glossary: [
      { term: 'Promissory Note', definition: 'A written, signed promise to pay a specific amount of money to someone.' },
      { term: 'Burden of Proof', definition: 'The obligation to provide evidence to support your claim in court.' },
      { term: 'Civil Suit', definition: 'A lawsuit involving a private dispute, usually over money or property.' }
    ],
    knowYourRights: [
      'A loan between friends is legally recoverable, even without a formal bank contract, if you have proof of the transfer.',
      'A signed promissory note is strong evidence in court that a debt exists.',
      'The borrower cannot simply re-label a loan as a "gift" without proving that you intended it to be a gift.'
    ],
    nextSteps: [
      'Do not engage in angry messaging; keep all communication strictly professional.',
      'Send a legal notice drafted by an advocate giving a 15-day deadline to repay.',
      'File a civil suit for recovery under Order 37 of the Civil Procedure Code (a faster process for written agreements).'
    ],
    helplines: [
      { name: 'Free Legal Aid Council', number: '15100' }
    ],
    weakFactors: [
      'The promissory note is not registered, and there were no independent witnesses present.',
      'The defendant is claiming the money was a gift, which complicates the case and requires a trial to prove otherwise.',
      'Friendship dynamics make it harder to prove it was a strictly commercial loan.'
    ],
    howToMakeStronger: [
      'Gather any other friends or family members who heard the defendant acknowledge the loan and get their written statements.',
      'Find any WhatsApp messages where you both discuss the "repayment" or "loan" explicitly.'
    ],
    pastCases: [
      {
        title: 'Sundaram Finance vs. R. S. Iyer (2020)',
        summary: 'Dispute over personal loan where borrower claimed funds were an unconditional gift.',
        howItEnded: 'Court ruled in favour of the lender based on documentary evidence and borrower\'s conduct.',
        humanReadableReason: 'Because the borrower had made partial repayments earlier, the court decided it was clearly a loan. People don\'t usually pay back "gifts" in monthly installments.'
      },
      {
        title: 'Meenakshi vs. Rajesh Kumar (2022)',
        summary: 'Friend-to-friend loan dispute where lender had only bank transfer proof but no written agreement.',
        howItEnded: 'Claim dismissed as lender failed to prove the transfer was a loan rather than a gift.',
        humanReadableReason: 'Without a written note or messages confirming a loan, a simple bank transfer isn\'t enough to prove someone owes you money.'
      }
    ]
  },
  'demo-breach-contract': {
    directionLabel: 'Unfavorable',
    directionScore: 26,
    confidenceLevel: 'Low',
    confidenceScore: 35,
    laws: [
      {
        name: 'Section 10 of the Indian Contract Act, 1872',
        explanation: 'Defines what makes an agreement a legally binding contract (offer, acceptance, clear terms).',
        doesItHelp: 'No, this hurts your case because your oral agreement lacks clear terms, making it hard to enforce as a strict contract.'
      },
      {
        name: 'Principle of Quantum Meruit',
        explanation: 'Allows a person to recover the value of work actually performed, even if a contract isn\'t fully formalised.',
        doesItHelp: 'Yes, this is your best angle! You can claim payment for the designs you already delivered.'
      }
    ],
    favorableFactors: [
      'The client made an initial payment of ₹50,000, proving some agreement existed.',
      'WhatsApp messages show the client approved the initial designs.'
    ],
    unfavorableFactors: [
      {
        factor: 'No written contract means the scope of work is undefined.',
        howToFix: 'Rely on the "Quantum Meruit" principle to just get paid for the work you physically completed, rather than fighting for the whole project value.'
      },
      {
        factor: 'The client claims the work was substandard.',
        howToFix: 'Hire an independent valuer or architect to certify that your work meets industry standards.'
      }
    ],
    missingEvidence: [
      { item: 'Written Contract', whyNeeded: 'To legally define the deliverables, timeline, and payment terms.' },
      { item: 'Independent Quality Assessment', whyNeeded: 'To objectively disprove the client\'s claim that your work was substandard.' }
    ],
    glossary: [
      { term: 'Oral Contract', definition: 'An agreement made through spoken words rather than a written document. Very hard to prove.' },
      { term: 'Quantum Meruit', definition: 'A legal principle meaning "what one has earned". It allows you to get paid for work done even if the contract is disputed.' },
      { term: 'Mediation', definition: 'A process where an independent person helps both sides reach an agreement without going to court.' }
    ],
    knowYourRights: [
      'Oral contracts are valid in India, but they are very hard to prove.',
      'If you have done the work, you are entitled to be paid for the value of the work done, even if the main contract is disputed (this is called "Quantum Meruit").',
      'You have the right to hold onto any intellectual property (like designs) until you are paid in full.'
    ],
    nextSteps: [
      'Stop all work immediately until a written agreement is signed or payment is made.',
      'Send a formal invoice detailing exactly what work was completed for the ₹3,50,000.',
      'Consider offering a mediation session to settle the dispute out of court, as litigation will be costly.'
    ],
    helplines: [
      { name: 'MSME Samadhaan (If you are a registered MSME)', number: '1800-11-1915' },
      { name: 'National Consumer Helpline', number: '1915' }
    ],
    weakFactors: [
      'There is no written contract. The exact scope of work and quality standards are undefined.',
      'The client claims the work was substandard, and without a contract, it is hard to prove what standard was agreed upon.',
      'The cost of fighting this in court might be higher than the ₹3,00,000 you are trying to recover.'
    ],
    howToMakeStronger: [
      'Hire an independent valuer or architect to assess the work you completed and certify that it meets industry standards.',
      'Gather all WhatsApp messages where the client praised or approved the designs before they stopped paying.'
    ],
    pastCases: [
      {
        title: 'B. S. Patel vs. Gujarat Builders (2021)',
        summary: 'Service provider claimed payment based on oral contract for construction supervision services.',
        howItEnded: 'Claim partly allowed on quantum meruit basis at 30% of claimed amount.',
        humanReadableReason: 'Because there was no written contract, the court couldn\'t enforce the full amount. They only ordered payment for the physical work that was undeniably completed.'
      },
      {
        title: 'S. S. International vs. M/s Royal Constructions (2023)',
        summary: 'Dispute over professional consultancy services where terms were agreed via email and WhatsApp.',
        howItEnded: 'Claim dismissed for vagueness; court recommended parties to pursue settlement.',
        humanReadableReason: 'The WhatsApp messages were too vague. The court basically said "we can\'t figure out what you agreed to" and threw the case out.'
      }
    ]
  }
}
