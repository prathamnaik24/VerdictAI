# VerdictAI - AI-Powered Legal Case Assessment Platform

An MVP legal-tech platform built with Next.js that provides AI-powered case assessment, precedent retrieval, and interactive courtroom simulation for Indian legal disputes.

## 🎯 Features

- **Case Assessment**: AI-powered evaluation of legal cases with success prediction
- **Risk Analysis**: Identify vulnerable points and favorable factors
- **Precedent Retrieval**: Automatic case law matching
- **Courtroom Simulator**: Practice cross-examination with AI judge
- **Report Generation**: Comprehensive legal assessment reports
- **Privacy-First**: All data encrypted and secure

### Supported Case Types
- Cheque Bounce
- Consumer Complaints
- Employment Disputes

## 🏗️ Architecture

See [docs/architecture.md](./docs/architecture.md) for detailed architecture documentation.

```
court/
├── app/                # Next.js app router (pages + API routes)
├── backend/           # Business logic (scoring, retrieval, simulation, AI)
├── frontend/          # Client-side (components, hooks, services, state)
├── shared/            # Shared types and constants
├── dataset/           # Precedents and demo cases
├── scripts/           # Utility scripts
└── docs/              # Documentation
```

## 📋 Prerequisites

- Node.js 18+ (or 20+)
- npm or yarn
- OpenAI API key

## 🚀 Setup Instructions

### 1. Install Dependencies
```bash
cd court
npm install
```

### 2. Set Environment Variables
Create a `.env.local` file in the `court/` directory:

```bash
OPENAI_API_KEY=sk-your-openai-api-key-here
```

Get your OpenAI API key from: https://platform.openai.com/api-keys

### 3. Build the Project
```bash
npm run build
```

Expected output: Exit code 0 with no TypeScript errors.

### 4. Start Development Server
```bash
npm run dev
```

The application will start at: **http://localhost:3000**

## 📖 Usage

### Home Page
Visit http://localhost:3000 to see the landing page with feature overview.

### Case Intake
1. Navigate to "Intake" or click "Get Started"
2. Select dispute type (Cheque Bounce, Consumer Complaint, or Employment Dispute)
3. Fill in case details
4. Submit form

### View Assessment
1. Case is automatically assessed using AI
2. View prediction score and confidence level
3. See risk factors and favorable factors
4. Check litigation readiness score

### Courtroom Simulation
1. Navigate to "Simulator"
2. Practice your opening statement
3. Receive opposing counsel responses
4. Answer judge's questions
5. Get real-time feedback

### Generate Report
1. After simulation, click "Generate Report"
2. View comprehensive assessment
3. Download report (placeholder - can be extended)

## 🔌 API Endpoints

### Core Endpoints
- `POST /api/extract` - Extract case information
- `POST /api/score` - Score a case
- `POST /api/retrieve` - Retrieve relevant precedents
- `POST /api/explain` - Explain assessment details
- `POST /api/simulate` - Run courtroom simulation round
- `POST /api/report` - Generate assessment report

### Request/Response Format
```bash
curl -X POST http://localhost:3000/api/score \
  -H "Content-Type: application/json" \
  -d '{
    "caseType": "cheque-bounce",
    "caseDetails": {
      "amount": 100000,
      "date": "2024-01-15",
      "partyName": "ABC Company"
    }
  }'
```

## 🛠️ Development

### Project Structure
```
frontend/
  ├── components/     # React components (layout, pages, common)
  ├── hooks/         # Custom React hooks (useAssessment, useSimulation, useTheme)
  ├── services/      # API client services
  ├── store/         # Zustand state management
  ├── lib/           # Utilities & helpers
  └── types/         # TypeScript interfaces

backend/
  ├── ai/            # OpenAI integration & prompts
  ├── scoring/       # Case scoring engine
  ├── retrieval/     # Precedent retrieval logic
  ├── simulation/    # Courtroom simulation
  ├── services/      # Service layer (called by API routes)
  └── utils/         # Utilities (logger, formatter, etc)

shared/
  ├── types/         # Shared TypeScript types
  └── constants/     # Shared constants
```

### Key Commands
```bash
# Development
npm run dev              # Start dev server

# Build
npm run build           # Build for production
npm run build --debug   # Build with debug info

# Linting
npm run lint            # Run ESLint

# Type Checking
tsc --noEmit           # Check types without emitting
```

### TypeScript Path Aliases
```typescript
// Instead of: import { assessmentService } from '../../../services/assessment.service'
// Use:
import { assessmentService } from '@/frontend/services/assessment.service'

// Available aliases:
@/frontend/*    # Frontend code
@/backend/*     # Backend code
@/shared/*      # Shared types/constants
@/dataset/*     # Dataset files
```

## 📚 Documentation

- [Architecture Overview](./docs/architecture.md) - Detailed system design
- [Demo Script](./docs/demo-script.md) - Walkthrough of features
- [Judging Pitch](./docs/judging-pitch.md) - Hackathon pitch
- [Feature Roadmap](./docs/feature-roadmap.md) - Future features & timeline

## 🧪 Testing the API

### Test Case Assessment
```bash
curl -X POST http://localhost:3000/api/score \
  -H "Content-Type: application/json" \
  -d '{
    "caseType": "cheque-bounce",
    "caseDetails": {
      "description": "Cheque bounced due to insufficient funds",
      "amount": 50000,
      "date": "2024-01-15"
    }
  }'
```

### Test Precedent Retrieval
```bash
curl -X POST http://localhost:3000/api/retrieve \
  -H "Content-Type: application/json" \
  -d '{
    "caseType": "cheque-bounce",
    "description": "Cheque bounce case"
  }'
```

## ⚡ Performance

- Case assessment: ~2-5 seconds (depends on OpenAI API)
- Page load: <1 second
- Simulation response: ~3-8 seconds

## 🔒 Security & Privacy

- All API communication over HTTPS
- OpenAI API key not exposed to client
- Case data not persisted without user consent
- Compliance with Indian data privacy standards

## 📝 Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `OPENAI_API_KEY` | OpenAI API key for AI features | `sk-...` |

## 🚀 Deployment

### Deploy to Vercel (Recommended)
```bash
# Push to GitHub repo
git push origin main

# Connect repo to Vercel dashboard
# Set OPENAI_API_KEY in Vercel environment variables
# Deploy automatically on push
```

### Deploy to Other Platforms
The app is a standard Next.js application compatible with:
- Vercel (native)
- Railway
- Render
- AWS Amplify
- Digital Ocean App Platform

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📋 Roadmap

See [docs/feature-roadmap.md](./docs/feature-roadmap.md) for:
- Q2 2024: Scale to 10+ case types
- Q3 2024: Multi-language support
- Q4 2024: Professional tools for lawyers
- Q1 2025+: Marketplace & scale

## 🐛 Troubleshooting

### Build fails with TypeScript errors
- Run `npm install` to ensure all dependencies are installed
- Check that `tsconfig.json` path aliases are correct
- Verify all imports use new path aliases (@/frontend/*, @/backend/*, etc)

### "OPENAI_API_KEY is not set"
- Create `.env.local` file in `court/` directory
- Add: `OPENAI_API_KEY=sk-your-key-here`
- Restart development server

### API returns 500 error
- Check OpenAI API key is valid
- Check API rate limits haven't been exceeded
- Review server logs in terminal

### Pages don't load
- Ensure `npm run dev` is running
- Clear browser cache (Cmd+Shift+R or Ctrl+Shift+R)
- Check browser console for errors (F12)

## 📞 Support

- **Issue Tracker**: GitHub Issues
- **Email**: [your-email]
- **Demo Video**: See [docs/demo-script.md](./docs/demo-script.md)

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org)
- AI powered by [OpenAI](https://openai.com)
- State management with [Zustand](https://zustand.docs.pmnd.rs)
- Styling with [Tailwind CSS](https://tailwindcss.com)

---

**Last Updated**: 2024
**Status**: Active Development (MVP)
