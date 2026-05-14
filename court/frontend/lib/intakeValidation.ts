export interface ValidationIssue {
  field: string;
  severity: 'caution' | 'suggestion';
  message: string;
  suggestion: string;
}

export interface ValidationResult {
  isValid: boolean;
  issues: ValidationIssue[];
  suggestionCount: number;
}

const VAGUE_PATTERNS = [
  /\b(something|someone|somebody|sometime)\b/i,
  /\b(not fair|unfair|unjust)\b/i,
  /\b(they did|he did|she did)\b(?!\s+\w+)/i,
  /\b(help me|i need)\b/i,
  /\b(thing|stuff|issues?|problems?)\b/i,
];

const PARTY_SEPARATORS = /\b(vs\.?|versus|v\/s|and|\.com\/?)\b/i;

const MIN_DESCRIPTION_LENGTH = 100;
const MIN_ADEQUATE_LENGTH = 250;

export function validateIntakeInput(data: {
  disputeType: string;
  title: string;
  description: string;
  location: string;
  dateOfIncident: string;
}): ValidationResult {
  const issues: ValidationIssue[] = [];

  const desc = data.description?.trim() || '';

  if (desc.length < MIN_DESCRIPTION_LENGTH) {
    issues.push({
      field: 'description',
      severity: 'caution',
      message: 'Your case description is quite brief. A few more details will help the AI deliver a more accurate assessment.',
      suggestion: 'Include key facts: what happened, when, who was involved, and the outcome you are seeking.',
    });
  } else if (desc.length < MIN_ADEQUATE_LENGTH) {
    issues.push({
      field: 'description',
      severity: 'suggestion',
      message: 'Adding a bit more detail could improve the quality of your assessment.',
      suggestion: 'Consider including specific dates, amounts, and a timeline of events.',
    });
  }

  if (desc.length >= MIN_DESCRIPTION_LENGTH) {
    const hasVague = VAGUE_PATTERNS.some((p) => p.test(desc));
    if (hasVague) {
      issues.push({
        field: 'description',
        severity: 'suggestion',
        message: 'Your description contains some general terms that may make it harder to assess your case.',
        suggestion: 'Replace vague terms with specific facts. For example, instead of "they did something wrong," describe the exact action or breach.',
      });
    }
  }

  if (!PARTY_SEPARATORS.test(data.title) && desc.length >= MIN_DESCRIPTION_LENGTH) {
    issues.push({
      field: 'title',
      severity: 'suggestion',
      message: 'Your case title does not clearly identify the parties involved.',
      suggestion: 'Use a format like "Your Name vs. Other Party — Brief Description" to make your case easy to identify.',
    });
  }

  if (!data.dateOfIncident) {
    issues.push({
      field: 'dateOfIncident',
      severity: 'caution',
      message: 'No date of incident was provided. This may affect legal timeline calculations.',
      suggestion: 'Add the date when the incident occurred. This is important for determining applicable legal timelines and limitation periods.',
    });
  }

  if (!data.location) {
    issues.push({
      field: 'location',
      severity: 'suggestion',
      message: 'No jurisdiction or location was provided.',
      suggestion: 'Adding the location helps identify the correct court or forum for your case.',
    });
  }

  const suggestionCount = issues.filter((i) => i.severity === 'suggestion').length;

  return {
    isValid: issues.length === 0,
    issues,
    suggestionCount,
  };
}

export function hasCriticalIssues(issues: ValidationIssue[]): boolean {
  return issues.some((i) => i.severity === 'caution');
}
