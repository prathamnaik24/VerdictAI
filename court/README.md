# VerdictAI

> Know where your case stands before court begins.

VerdictAI is an AI-powered legal assessment platform built for everyday people navigating the Indian civil court system. It helps you understand the strength of your case, what evidence you need, and what to realistically expect — before you ever walk into a courtroom.

---

## What It Does

Most people facing a legal dispute have no idea whether their case is worth pursuing, how long it will take, or how much it will cost. They either give up or spend money on a lawyer just to find out their case is weak. VerdictAI bridges that gap.

### Case Intake

You describe your dispute in plain language — the type of case (cheque bounce, unpaid loan, security deposit, wrongful termination, etc.), what happened, when it happened, and where. No legal knowledge required.

### AI-Powered Assessment

Once you submit, the platform produces a structured assessment of your situation:

- **Direction** — whether the case leans in your favour, against you, or is uncertain
- **AI Confidence** — how certain the system is, based on the completeness of your information
- **Litigation Readiness** — how prepared you are to go to court right now

### Full Assessment Dashboard

Your results are broken down into plain-English sections:

- **Know Your Rights** — what the law actually says about your situation, in simple terms
- **Favorable Factors** — the specific facts in your case that work in your favour
- **Risk Factors / Why the Case Is Weak** — what's working against you, and how to fix each weakness
- **Evidence Assessment** — what evidence you still need to collect and why it matters
- **Applicable Laws** — the exact sections of Indian law that apply, explained simply
- **Estimated Legal Cost** — a realistic cost range for pursuing this case
- **Estimated Time to Resolution** — how long it is likely to take, with context
- **Past Cases** — real precedents showing how similar disputes ended in Indian courts
- **Glossary** — legal terms you will encounter, explained without jargon

### Courtroom Simulator

After seeing your assessment, you can enter an interactive courtroom simulation. You play the plaintiff. A judge opens proceedings, the opposing side presents arguments, and you choose your responses. A guide panel explains the legal strategy behind each choice — what you did right, what you did wrong, and what precedent supports it. This helps you understand what a real hearing might feel like before you are in one.

### PDF Report

The full assessment can be downloaded as a PDF to take to a lawyer, share with family, or keep for your records.

---

## Who It Is For

- Individuals who have been wronged and want to know if their case is worth pursuing
- Small business owners dealing with unpaid invoices or broken contracts
- Tenants fighting wrongful security deposit deductions
- Anyone who wants to understand their legal position before spending money on a lawyer

---

## How to Run

**Prerequisites:** Node.js v18 or later, npm

```bash
# 1. Navigate to the app folder
cd court

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open **http://localhost:3000** in your browser.

**Build for production:**

```bash
npm run build
npm run start
```

---

## Pages

| Route | Description |
|---|---|
| `/` | Landing page |
| `/intake` | Describe your dispute |
| `/dashboard` | Full case assessment |
| `/simulator` | Interactive courtroom walkthrough |

---

No account or sign-up is required. Use the **Try Demo Case** button on any page to explore the platform instantly with a pre-built scenario.
