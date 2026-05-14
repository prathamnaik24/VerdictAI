// Seed demo cases for testing
// Usage: tsx scripts/seedDemoCases.ts

import fs from 'fs';
import path from 'path';

const demoCases = [
  {
    id: 'case-001',
    disputeType: 'cheque-bounce',
    title: 'Cheque Bounce Case',
    description: 'Cheque issued for goods supplied bounced due to insufficient funds',
    amount: 50000,
    dateOfIncident: '2024-01-15',
    location: 'Delhi',
  },
  {
    id: 'case-002',
    disputeType: 'consumer-complaint',
    title: 'Consumer Complaint Case',
    description: 'Defective electronics product not replaced despite warranty',
    amount: 30000,
    dateOfIncident: '2024-02-20',
    location: 'Mumbai',
  },
  {
    id: 'case-003',
    disputeType: 'employment-dispute',
    title: 'Employment Dispute Case',
    description: 'Wrongful termination without proper notice period',
    amount: 150000,
    dateOfIncident: '2024-03-10',
    location: 'Bangalore',
  },
];

const seedDemoCases = () => {
  const outputPath = path.join(process.cwd(), 'dataset', 'demoCases.json');
  fs.writeFileSync(outputPath, JSON.stringify(demoCases, null, 2));
  console.log('Demo cases seeded successfully');
};

seedDemoCases();
