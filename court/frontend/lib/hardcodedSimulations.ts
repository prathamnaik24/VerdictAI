export type Actor = 'judge' | 'plaintiff' | 'defendant' | 'system';

export type ChoiceQuality = 'good' | 'moderate' | 'bad';

export interface SimulationChoice {
  label: string;
  nextTurnId: string | null; // null ends simulation
  quality?: ChoiceQuality;
  explanation?: string;
  precedent?: string; // Past case reference
}

export interface SimulationTurn {
  id: string;
  actor: Actor;
  message: string;
  choices?: SimulationChoice[]; 
  autoNext?: string | null;     
  insight?: string;             
}

export const HARDCODED_SIMULATIONS: Record<string, { startTurn: string, turns: Record<string, SimulationTurn> }> = {
  'demo-security-deposit': {
    startTurn: 'turn_1',
    turns: {
      'turn_1': {
        id: 'turn_1',
        actor: 'judge',
        message: 'Order, please. We are here to discuss the matter of a withheld security deposit of ₹1,20,000. Mr. Mehta (Plaintiff), please state your primary claim for the court.',
        insight: 'The judge is initiating the proceedings and asking for your Opening Statement. In civil disputes, the plaintiff must clearly establish the "Cause of Action"—the specific legal right that was violated. Keep your statement strictly factual, avoiding emotional language.',
        choices: [
          { 
            label: 'State the lease naturally expired, you vacated the property in excellent condition, and the landlord wrongfully withheld the deposit.', 
            nextTurnId: 'turn_2a',
            quality: 'good',
            explanation: 'This is the perfect opening. You cleanly established the contract timeline, your compliance with it, and the defendant\'s specific breach of duty.',
            precedent: 'Reference: K.K. Ahuja v. V.K. Vora (2009) - Emphasizes that pleadings must explicitly state the core facts constituting the breach without unnecessary narrative.'
          },
          { 
            label: 'Mention the deposit is withheld, but admit upfront that you did accidentally crack a small bathroom tile.', 
            nextTurnId: 'turn_2b',
            quality: 'moderate',
            explanation: 'While honesty is important in court, offering unprompted admissions of fault during your opening statement immediately puts you on the defensive. It is the landlord\'s burden to bring up damages first.',
          },
          { 
            label: 'Complain angrily about how the landlord is a fraud, ignored your calls for weeks, and stole your hard-earned money.', 
            nextTurnId: 'turn_2c',
            quality: 'bad',
            explanation: 'Courts have zero tolerance for emotional outbursts or name-calling. Using words like "fraud" or "stole" without criminal proof makes you look highly unprofessional and damages your credibility.',
            precedent: 'Reference: Standard Court Etiquette - Ad hominem attacks (attacking the person rather than the argument) are routinely struck from the record by judges.'
          }
        ]
      },
      'turn_2a': {
        id: 'turn_2a',
        actor: 'plaintiff',
        message: 'Your Honor, my 24-month lease naturally expired in July. I vacated the property in excellent condition, but the landlord has wrongfully withheld my ₹1,20,000 deposit citing vague damages without providing any formal proof.',
        autoNext: 'turn_3'
      },
      'turn_2b': {
        id: 'turn_2b',
        actor: 'plaintiff',
        message: 'Your Honor, he kept my ₹1,20,000. I mean, yes I cracked a small bathroom tile, but I otherwise left the place clean. That tile doesn\'t cost a lakh to fix!',
        autoNext: 'turn_3'
      },
      'turn_2c': {
        id: 'turn_2c',
        actor: 'plaintiff',
        message: 'Your Honor, this landlord is an absolute fraud! He ignored all my calls for weeks and essentially stole my ₹1,20,000. I demand my money back immediately!',
        autoNext: 'turn_3'
      },
      'turn_3': {
        id: 'turn_3',
        actor: 'defendant',
        message: 'Objection, Your Honor. The property was severely damaged. There were deep gouges on the imported wooden flooring, and the walls were ruined. That costs a significant amount of money to fix.',
        insight: 'The defense has introduced an affirmative defense: property damage. Under property law, tenants are protected from paying for "Normal Wear and Tear" (aging of the property). The landlord must prove the damage was due to "Negligence".',
        autoNext: 'turn_4'
      },
      'turn_4': {
        id: 'turn_4',
        actor: 'judge',
        message: 'I see. Defendant, do you have a signed joint inspection report or photographs proving this severe damage at the exact time the keys were handed over?',
        autoNext: 'turn_5'
      },
      'turn_5': {
        id: 'turn_5',
        actor: 'defendant',
        message: 'Well... we didn\'t do a written report, Your Honor. But my contractor visited the next week and estimated the repairs at ₹1,00,000. I have his written estimate right here.',
        insight: 'The defense has failed to produce contemporaneous evidence (evidence created at the time of the event). An estimate from a contractor a week later is considered "Hearsay" unless backed by photographs of the actual damage.',
        autoNext: 'turn_6'
      },
      'turn_6': {
        id: 'turn_6',
        actor: 'judge',
        message: 'Plaintiff, how do you respond to the claim that you severely damaged the wooden flooring and walls, requiring ₹1,00,000 in repairs?',
        choices: [
          { 
            label: 'Present your timestamped move-out photographs as Exhibit A, proving the condition of the property.', 
            nextTurnId: 'turn_7a',
            quality: 'good',
            explanation: 'Perfect. "Documentary Evidence" (like timestamped photos) almost always supersedes verbal claims. By presenting undeniable visual proof of the property\'s condition, you instantly neutralize their core argument.',
            precedent: 'Reference: Section 62, Indian Evidence Act - Primary documentary evidence is considered the highest class of proof in courts.'
          },
          { 
            label: 'Ask the judge to throw out the contractor\'s estimate since there is no joint inspection report.', 
            nextTurnId: 'turn_7b',
            quality: 'moderate',
            explanation: 'This is a solid legal maneuver. Attacking the admissibility of their evidence is smart. However, simply playing defense is riskier than proactively presenting your own concrete evidence.',
          },
          { 
            label: 'Just say he is lying and the floors were already scratched when you moved in two years ago.', 
            nextTurnId: 'turn_7c',
            quality: 'bad',
            explanation: 'Claiming "it was already like that" without a move-in inspection report creates a classic "He Said, She Said" scenario. Judges hate these because they have to guess who is telling the truth.',
            precedent: 'Reference: Standard Evidentiary Rulings - Verbal assertions without corroborating evidence carry minimal weight.'
          }
        ]
      },
      'turn_7a': {
        id: 'turn_7a',
        actor: 'plaintiff',
        message: 'Your Honor, I submit Exhibit A: timestamped photographs taken on the exact day I vacated, clearly showing the wooden floors and walls in perfect, broom-clean condition.',
        autoNext: 'turn_8'
      },
      'turn_7b': {
        id: 'turn_7b',
        actor: 'plaintiff',
        message: 'Your Honor, the contractor\'s estimate means nothing. He doesn\'t have an inspection report signed by me, so he cannot prove when or how that damage occurred.',
        autoNext: 'turn_8'
      },
      'turn_7c': {
        id: 'turn_7c',
        actor: 'plaintiff',
        message: 'He is lying, Your Honor. I didn\'t touch those floors. In fact, they were already heavily scratched when I moved in two years ago!',
        autoNext: 'turn_8'
      },
      'turn_8': {
        id: 'turn_8',
        actor: 'defendant',
        message: 'Your Honor, those photographs could easily be old! Or they could have been taken before he moved his heavy furniture out and caused the scratches.',
        insight: 'The defense is attacking the "Authenticity" and "Timeline" of your evidence. They are trying to create "Reasonable Doubt" about whether your photos accurately represent the final state of the apartment.',
        autoNext: 'turn_9'
      },
      'turn_9': {
        id: 'turn_9',
        actor: 'judge',
        message: 'The defendant raises a point about the timeline. Plaintiff, how can the court be certain these photographs represent the exact condition of the property at the moment of handover?',
        choices: [
          {
            label: 'Point out the digital EXIF data on the photos matching the exact time you handed the keys to the building manager.',
            nextTurnId: 'turn_10a',
            quality: 'good',
            explanation: 'Brilliant. "Electronic Metadata" (EXIF data) is highly respected in modern courts. Tying the timestamp to a verifiable external event (giving keys to a manager) creates an airtight timeline.',
            precedent: 'Reference: Section 65B, Indian Evidence Act - Electronic records, including metadata, are fully admissible if properly verified.'
          },
          {
            label: 'Swear under oath that you took them right before walking out.',
            nextTurnId: 'turn_10b',
            quality: 'moderate',
            explanation: 'While testifying under oath is a serious legal action, it still relies entirely on your personal credibility. It is weaker than objective metadata, but better than nothing.',
          },
          {
            label: 'Tell the judge the defendant is just making up excuses because he is broke.',
            nextTurnId: 'turn_10c',
            quality: 'bad',
            explanation: 'This is another irrelevant ad hominem attack. Speculating on the defendant\'s financial status does not answer the judge\'s direct question about the timeline of your photos.',
          }
        ]
      },
      'turn_10a': {
        id: 'turn_10a',
        actor: 'plaintiff',
        message: 'Your Honor, the digital EXIF data on these files shows they were captured at 4:15 PM. The building ledger shows I handed the physical keys to the building manager at 4:20 PM.',
        autoNext: 'turn_11'
      },
      'turn_10b': {
        id: 'turn_10b',
        actor: 'plaintiff',
        message: 'Your Honor, I swear under oath that I took those photos minutes before walking out the door. I have no reason to lie to this court.',
        autoNext: 'turn_11'
      },
      'turn_10c': {
        id: 'turn_10c',
        actor: 'plaintiff',
        message: 'Your Honor, he is just making up ridiculous excuses because he doesn\'t have the money to pay me back!',
        autoNext: 'turn_11'
      },
      'turn_11': {
        id: 'turn_11',
        actor: 'defendant',
        message: 'Well, even if the floors were fine, he didn\'t give me the required 30 days notice before leaving! The lease says I can keep the deposit for improper notice.',
        insight: 'Desperation tactic. The defense is "Pivoting" to a completely new argument (breach of notice period) because their property damage argument is failing. You must shut this down quickly.',
        autoNext: 'turn_12'
      },
      'turn_12': {
        id: 'turn_12',
        actor: 'judge',
        message: 'A new claim regarding notice period. Plaintiff, did you provide the required 30 days written notice before vacating the premises?',
        choices: [
          {
            label: 'Produce the email sent 35 days prior, highlighting his reply acknowledging it.',
            nextTurnId: 'turn_13_win',
            quality: 'good',
            explanation: 'The ultimate checkmate. You provided written proof of notice AND proof of their acknowledgment. The defendant has completely run out of legal defenses.',
            precedent: 'Reference: Central Inland Water Transport Corp v. Brojo Nath (1986) - Courts look extremely unfavorably upon parties who change their defense midway through proceedings in bad faith.'
          },
          {
            label: 'Argue that since the 24-month lease expired naturally, notice isn\'t legally required.',
            nextTurnId: 'turn_13_med',
            quality: 'moderate',
            explanation: 'This is a technical legal argument. While often true (a fixed-term lease ending doesn\'t always require notice), leases can have specific holdover clauses. Proving you actually sent notice is always safer.',
          },
          {
            label: 'Admit you only gave 15 days notice because you had to move for a new job quickly.',
            nextTurnId: 'turn_13_lose',
            quality: 'bad',
            explanation: 'You just admitted to breaching the contract! Even if you have a sympathetic reason (a new job), contracts are legally binding. The landlord is legally allowed to deduct rent for the missing notice days.',
          }
        ]
      },
      'turn_13_win': {
        id: 'turn_13_win',
        actor: 'judge',
        message: 'The plaintiff has thoroughly dismantled every defense presented. The evidence clearly shows compliance with the lease, proper notice, and no property damage. The landlord\'s withholding of funds is entirely arbitrary.\n\nProceed to the Final Report to view the official case outcome.',
        insight: 'Flawless victory! You used a combination of primary documents, metadata, and written correspondence to completely destroy the defense.',
        autoNext: null
      },
      'turn_13_med': {
        id: 'turn_13_med',
        actor: 'judge',
        message: 'The plaintiff\'s legal argument regarding the natural expiration of the lease has merit, though producing actual notice would have been preferred. The damage claims are dismissed.\n\nProceed to the Final Report to view the official case outcome.',
        insight: 'A solid win. You avoided paying for damages, but relying on legal technicalities instead of hard evidence made the case slightly riskier.',
        autoNext: null
      },
      'turn_13_lose': {
        id: 'turn_13_lose',
        actor: 'judge',
        message: 'While the damage claims are dismissed due to lack of proof, the plaintiff has openly admitted to breaching the 30-day notice clause. Contracts are binding regardless of personal circumstances.\n\nProceed to the Final Report to view the official case outcome.',
        insight: 'A devastating mistake at the finish line. Because you admitted to short notice, the landlord is legally entitled to deduct 15 days of rent from your deposit.',
        autoNext: null
      }
    }
  },
  'demo-unpaid-loan': {
    startTurn: 'turn_1',
    turns: {
      'turn_1': {
        id: 'turn_1',
        actor: 'judge',
        message: 'This is a civil suit for recovery of ₹5,00,000. Plaintiff, you claim you lent this money to the defendant. Please proceed.',
        insight: 'Civil suits for recovery require you to prove the existence of a debt. The "Burden of Proof" rests entirely on the plaintiff to show money exchanged hands AND that it was expected to be returned.',
        choices: [
          { 
            label: 'Present the bank transfer records and the signed promissory note.', 
            nextTurnId: 'turn_2a',
            quality: 'good',
            explanation: 'A Promissory Note is a legally binding document. Combining it with bank records establishes both the agreement and the execution. This is the strongest way to start.',
            precedent: 'Reference: Section 118, Negotiable Instruments Act - Courts presume that every promissory note was made for "consideration" (meaning it is a valid debt).'
          },
          { 
            label: 'Show the bank transfer records and say he verbally promised to pay it back.', 
            nextTurnId: 'turn_2b',
            quality: 'moderate',
            explanation: 'Bank records prove the money moved, but they don\'t prove WHY it moved. A verbal promise is notoriously hard to prove in court without neutral witnesses.'
          },
          { 
            label: 'Tell the judge that he used the money to buy a luxury car instead of expanding his business.', 
            nextTurnId: 'turn_2c',
            quality: 'bad',
            explanation: 'What the defendant did with the money is completely irrelevant to whether he owes you a debt. Stay focused on the debt itself, not his spending habits.'
          }
        ]
      },
      'turn_2a': {
        id: 'turn_2a',
        actor: 'plaintiff',
        message: 'Your Honor, I transferred ₹5,00,000 to the defendant on January 20th. I also submit Exhibit A, a formal promissory note signed by him acknowledging the loan.',
        autoNext: 'turn_3'
      },
      'turn_2b': {
        id: 'turn_2b',
        actor: 'plaintiff',
        message: 'Your Honor, here are my bank statements showing the ₹5,00,000 transfer. He promised me verbally that he would return it in six months.',
        autoNext: 'turn_3'
      },
      'turn_2c': {
        id: 'turn_2c',
        actor: 'plaintiff',
        message: 'Your Honor, I gave him ₹5 Lakhs for his business, but he went and bought a luxury car with it! He is completely untrustworthy.',
        autoNext: 'turn_3'
      },
      'turn_3': {
        id: 'turn_3',
        actor: 'defendant',
        message: 'Your Honor, that money was a gift to help me out! We are extremely close friends. Any paper I signed was just a formality to make her family comfortable. Gifts don\'t need to be repaid.',
        insight: 'The defense is attempting to reclassify the transaction as a "Gift". Under the Indian Transfer of Property Act, a valid gift is voluntary and without consideration (no expectation of return). You must aggressively disprove this.',
        autoNext: 'turn_4'
      },
      'turn_4': {
        id: 'turn_4',
        actor: 'judge',
        message: 'The defense claims this was a gift based on your close personal relationship. Plaintiff, what evidence do you have to counter this claim?',
        choices: [
          { 
            label: 'Point out the two partial repayments of ₹20,000 and ₹15,000 he made in March and May.', 
            nextTurnId: 'turn_5a',
            quality: 'good',
            explanation: 'Exceptional strategy. People do not pay "installments" on gifts. His physical conduct (transferring money back) completely contradicts his verbal claim that it was a gift.',
            precedent: 'Reference: Sundaram Finance Ltd v. State of Kerala (1966) - The true nature of a transaction is determined by the conduct of the parties, not just what they call it.'
          },
          { 
            label: 'Submit WhatsApp screenshots where he says "I will repay you soon".', 
            nextTurnId: 'turn_5b',
            quality: 'moderate',
            explanation: 'WhatsApp messages are good, but under the Evidence Act, electronic records require a Section 65B certificate to be fully admissible. They are good supplemental evidence, but physical conduct (bank repayments) is stronger.'
          },
          { 
            label: 'Argue that nobody gifts ₹5 Lakhs and he is maliciously exploiting your friendship.', 
            nextTurnId: 'turn_5c',
            quality: 'bad',
            explanation: 'This is an emotional appeal. Judges base decisions on facts, not your assumptions about what "nobody" would do. Rich people gift large amounts of money frequently; you must prove THIS was not a gift.'
          }
        ]
      },
      'turn_5a': {
        id: 'turn_5a',
        actor: 'plaintiff',
        message: 'Your Honor, if it was an unconditional gift, why did he transfer ₹20,000 back to my account in March, and another ₹15,000 in May? I have the bank statements showing these EMI repayments.',
        autoNext: 'turn_6'
      },
      'turn_5b': {
        id: 'turn_5b',
        actor: 'plaintiff',
        message: 'Your Honor, I have WhatsApp messages here where he explicitly says "I will repay you soon". Why would he say that if it was a gift?',
        autoNext: 'turn_6'
      },
      'turn_5c': {
        id: 'turn_5c',
        actor: 'plaintiff',
        message: 'Your Honor, who just gives away ₹5 Lakhs? We are friends, yes, but he is exploiting my kindness. It was obviously a loan.',
        autoNext: 'turn_6'
      },
      'turn_6': {
        id: 'turn_6',
        actor: 'defendant',
        message: 'Those small transfers weren\'t loan repayments! They were me paying her back for a shared vacation we took to Goa. They have nothing to do with the ₹5 Lakhs.',
        insight: 'The defense is using "Deflection". They are trying to disconnect the repayments from the core loan. If they succeed, your strongest piece of evidence is neutralized.',
        autoNext: 'turn_7'
      },
      'turn_7': {
        id: 'turn_7',
        actor: 'judge',
        message: 'The defendant claims the recent transfers were for a vacation, not loan repayments. Plaintiff, how do you respond?',
        choices: [
          {
            label: 'Show the bank transfer memos where he explicitly typed "Loan EMI 1" in the transaction remarks.',
            nextTurnId: 'turn_8_win',
            quality: 'good',
            explanation: 'An airtight counter. Transaction remarks are contemporaneous, written declarations made by the defendant himself. He cannot argue against his own written words.',
            precedent: 'Reference: Admissions under Section 17, Indian Evidence Act - A statement made by a party to the proceeding that suggests an inference regarding a fact in issue is highly persuasive.'
          },
          {
            label: 'Show that you never went to Goa by offering to show your passport/travel history.',
            nextTurnId: 'turn_8_med',
            quality: 'moderate',
            explanation: 'This effectively proves he is lying about the vacation, which destroys his credibility. However, it takes the court\'s focus away from the loan and turns the trial into an investigation about a vacation.',
          },
          {
            label: 'Yell that he is lying and you always pay for your own vacations.',
            nextTurnId: 'turn_8_lose',
            quality: 'bad',
            explanation: 'Simply yelling "he is lying" without proof offers nothing to the judge. It makes you look flustered and unprepared.',
          }
        ]
      },
      'turn_8_win': {
        id: 'turn_8_win',
        actor: 'judge',
        message: 'The transaction remarks written by the defendant himself explicitly state "Loan EMI". This entirely destroys the defense\'s claim of a gift or a vacation expense.\n\nProceed to the Final Report to view the official case outcome.',
        insight: 'A brilliant legal trap. You let him lie about the vacation, and then crushed his lie with his own banking metadata.',
        autoNext: null
      },
      'turn_8_med': {
        id: 'turn_8_med',
        actor: 'judge',
        message: 'While the plaintiff has cast serious doubt on the defendant\'s vacation story, the lack of explicit connection between the repayments and the primary loan makes this slightly ambiguous.\n\nProceed to the Final Report to view the official case outcome.',
        insight: 'You won the argument, but the judge had to connect the dots themselves. Always aim for direct, indisputable proof when possible.',
        autoNext: null
      },
      'turn_8_lose': {
        id: 'turn_8_lose',
        actor: 'judge',
        message: 'This courtroom is not a place for shouting matches. Without concrete proof connecting those specific small transfers to the larger sum, the nature of the transaction remains murky.\n\nProceed to the Final Report to view the official case outcome.',
        insight: 'A massive failure. By resorting to shouting instead of presenting evidence, you allowed the defendant to successfully muddy the waters.',
        autoNext: null
      }
    }
  },
  'demo-breach-contract': {
    startTurn: 'turn_1',
    turns: {
      'turn_1': {
        id: 'turn_1',
        actor: 'judge',
        message: 'This is a commercial dispute for unpaid design fees of ₹3,00,000. Plaintiff, state your case.',
        insight: 'Commercial disputes without signed, written contracts are notoriously difficult to prosecute. You must rely heavily on implied contracts and the work you actually delivered.',
        choices: [
          { 
            label: 'Invoke the principle of "Quantum Meruit" and ask to be paid for the work physically completed and accepted.', 
            nextTurnId: 'turn_2a',
            quality: 'good',
            explanation: 'Quantum Meruit translates to "what one has earned". It is the premier legal doctrine used when a formal contract fails or doesn\'t exist, but goods/services were undeniably provided and accepted.',
            precedent: 'Reference: Section 70, Indian Contract Act - Obligation of a person enjoying benefit of non-gratuitous act.'
          },
          { 
            label: 'State that you delivered the designs but were never paid the remaining balance of ₹3,00,000.', 
            nextTurnId: 'turn_2b',
            quality: 'moderate',
            explanation: 'This is a standard factual claim. However, because you lack a signed contract, the exact "remaining balance" is highly debatable and easily attacked by the defense.'
          },
          { 
            label: 'Demand the ₹3,00,000 plus an additional ₹1,00,000 for the severe mental agony they caused you.', 
            nextTurnId: 'turn_2c',
            quality: 'bad',
            explanation: 'Commercial courts look at numbers, not feelings. They almost never award damages for "mental agony" in B2B (business-to-business) transactions. Asking for it makes you look like an amateur.'
          }
        ]
      },
      'turn_2a': {
        id: 'turn_2a',
        actor: 'plaintiff',
        message: 'Your Honor, under the principle of Quantum Meruit, I am entitled to be paid for the complex design work physically completed and accepted by them in communications before they went silent.',
        autoNext: 'turn_3'
      },
      'turn_2b': {
        id: 'turn_2b',
        actor: 'plaintiff',
        message: 'Your Honor, we agreed on a total fee. I received an advance, delivered the final files, but the client stopped communicating and didn\'t pay the remaining balance.',
        autoNext: 'turn_3'
      },
      'turn_2c': {
        id: 'turn_2c',
        actor: 'plaintiff',
        message: 'Your Honor, they owe me ₹3,00,000. But more importantly, the stress they put me through was horrible. I demand ₹1,00,000 extra for mental agony!',
        autoNext: 'turn_3'
      },
      'turn_3': {
        id: 'turn_3',
        actor: 'defendant',
        message: 'Your Honor, we never signed a formal contract! And frankly, the designs they sent were terrible. They didn\'t meet our corporate standard at all, which is why we withheld payment.',
        insight: 'The defense is using a two-pronged attack: "Lack of Contract" to deny the agreed amount, and "Substandard Quality" to justify non-payment. You must disprove the quality issue.',
        autoNext: 'turn_4'
      },
      'turn_4': {
        id: 'turn_4',
        actor: 'judge',
        message: 'Plaintiff, the defendant claims your work was substandard. Without a contract specifying quality metrics, how can you prove your work was adequate and deserving of payment?',
        choices: [
          { 
            label: 'Provide a sworn affidavit from an independent, senior industry expert validating the high quality of your deliverables.', 
            nextTurnId: 'turn_5a',
            quality: 'good',
            explanation: 'Expert testimony is the gold standard for resolving disputes over "subjective quality" when there is no written SLA (Service Level Agreement). It replaces your biased opinion with an objective fact.',
            precedent: 'Reference: Section 45, Indian Evidence Act - Opinions of experts are highly relevant upon points of science or art.'
          },
          { 
            label: 'Show WhatsApp messages where the client initially said "These wireframes look good!".', 
            nextTurnId: 'turn_5b',
            quality: 'moderate',
            explanation: 'Messages showing approval are decent evidence. However, clients can easily argue they meant "looks good so far, but needs changes" rather than final approval.'
          },
          { 
            label: 'Argue that you have 10 years of experience and a great portfolio, so your work is obviously good.', 
            nextTurnId: 'turn_5c',
            quality: 'bad',
            explanation: 'Your past experience does not prove that THIS specific deliverable was good. It is an arrogant and legally worthless argument in this specific context.'
          }
        ]
      },
      'turn_5a': {
        id: 'turn_5a',
        actor: 'plaintiff',
        message: 'Your Honor, I have submitted an affidavit from an independent Senior Architect who reviewed the deliverables and certified they meet and exceed standard industry requirements.',
        autoNext: 'turn_6'
      },
      'turn_5b': {
        id: 'turn_5b',
        actor: 'plaintiff',
        message: 'Your Honor, here are WhatsApp messages from their CEO stating "The wireframes look good!". They clearly approved it before changing their minds.',
        autoNext: 'turn_6'
      },
      'turn_5c': {
        id: 'turn_5c',
        actor: 'plaintiff',
        message: 'Your Honor, I have been a designer for 10 years and worked with top companies. My work is never substandard, they just don\'t want to pay.',
        autoNext: 'turn_6'
      },
      'turn_6': {
        id: 'turn_6',
        actor: 'defendant',
        message: 'Even if the quality was acceptable, they delivered the project three weeks late! The delay caused us to miss our product launch window. We shouldn\'t have to pay for late work.',
        insight: 'Another pivot. They abandoned the "quality" argument and are now claiming "Breach of Timeline". In contract law, "Time is of the Essence" is a critical concept.',
        autoNext: 'turn_7'
      },
      'turn_7': {
        id: 'turn_7',
        actor: 'judge',
        message: 'A claim of delayed delivery. Plaintiff, was the project delivered three weeks late, and was a strict timeline established?',
        choices: [
          {
            label: 'Show emails proving the delay was entirely caused by the defendant taking weeks to provide the necessary brand assets.',
            nextTurnId: 'turn_8_win',
            quality: 'good',
            explanation: 'This is a perfect "Contributory Negligence" defense. You cannot be penalized for a delay that the defendant themselves caused.',
            precedent: 'Reference: Section 54, Indian Contract Act - If the promisor cannot perform because the promisee neglects to afford reasonable facilities, the promisor is excused.'
          },
          {
            label: 'Argue that since there was no formal contract, there was no legally binding deadline anyway.',
            nextTurnId: 'turn_8_med',
            quality: 'moderate',
            explanation: 'Technically true, but courts expect "reasonable timelines" in commercial dealings. Relying purely on the absence of a contract makes you look unprofessional, even if it is a valid defense.',
          },
          {
            label: 'Admit you were late, but complain that three weeks isn\'t a big deal in the software industry.',
            nextTurnId: 'turn_8_lose',
            quality: 'bad',
            explanation: 'Never tell a judge that a commercial delay "isn\'t a big deal". Time is money in business, and admitting unilateral fault opens you up to counter-sued for damages.',
          }
        ]
      },
      'turn_8_win': {
        id: 'turn_8_win',
        actor: 'judge',
        message: 'The email chain clearly demonstrates that the defendant\'s own administrative failures caused the timeline delay. The plaintiff\'s work is of proven quality and was delivered as efficiently as the defendant allowed.\n\nProceed to the Final Report to view the official case outcome.',
        insight: 'A total dismantling of their case. You proved your work was excellent and that their own incompetence caused the delays.',
        autoNext: null
      },
      'turn_8_med': {
        id: 'turn_8_med',
        actor: 'judge',
        message: 'While the lack of a formal deadline protects the plaintiff from strict breach claims, the informal nature of this arrangement complicates the damages. \n\nProceed to the Final Report to view the official case outcome.',
        insight: 'A victory, but a messy one. Proceeding without clear timelines makes judges hesitant to award maximum damages.',
        autoNext: null
      },
      'turn_8_lose': {
        id: 'turn_8_lose',
        actor: 'judge',
        message: 'The plaintiff admits to unilaterally delaying the project. In commercial disputes, unexcused delays severely impact the value of the delivered goods.\n\nProceed to the Final Report to view the official case outcome.',
        insight: 'A self-inflicted wound. By casually admitting to a delay, you severely reduced the amount of money you can recover under Quantum Meruit.',
        autoNext: null
      }
    }
  }
};
