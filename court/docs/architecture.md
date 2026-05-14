# VerdictAI Architecture

## Overview
VerdictAI is an AI-powered courtroom simulation and legal case assessment platform for Indian disputes.

## Tech Stack
- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- OpenAI API

## Key Components

### Pages
- **Home** - Landing page with product overview
- **Intake** - Case information collection
- **Dashboard** - Assessment results and precedents
- **Simulator** - Courtroom practice simulation
- **Report** - Final assessment document

### Core Modules
- **Scoring Engine** - Deterministic case assessment
- **Retrieval** - Precedent retrieval via embeddings
- **Simulation** - Courtroom scenario generation
- **AI** - OpenAI integration for explanations

## Data Flow
1. User submits case details (Intake)
2. System extracts and scores case (Scoring)
3. Retrieves relevant precedents (Retrieval)
4. Generates assessment (Dashboard)
5. Runs courtroom simulation (Simulator)
6. Generates report (Report)

## Important Notes
- Does NOT replace lawyers or judges
- Does NOT use caste/religion/gender/political influence
- Separates legal prediction from litigation risk
- AI used only where visible and useful
