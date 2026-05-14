export function formatReportDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatShortDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function confidenceBadge(
  confidence: string
): { label: string; color: string } {
  const map: Record<string, { label: string; color: string }> = {
    'Very High': {
      label: 'Very High',
      color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    },
    High: {
      label: 'High',
      color: 'bg-green-100 text-green-800 border-green-200',
    },
    Moderate: {
      label: 'Moderate',
      color: 'bg-amber-100 text-amber-800 border-amber-200',
    },
    Low: {
      label: 'Low',
      color: 'bg-red-100 text-red-800 border-red-200',
    },
  };
  return (
    map[confidence] || {
      label: confidence,
      color: 'bg-gray-100 text-gray-800 border-gray-200',
    }
  );
}

export function riskBadge(
  risk: string
): { label: string; color: string } {
  const map: Record<string, { label: string; color: string }> = {
    Easy: {
      label: 'Low Risk',
      color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    },
    Moderate: {
      label: 'Moderate Risk',
      color: 'bg-amber-100 text-amber-800 border-amber-200',
    },
    Difficult: {
      label: 'High Risk',
      color: 'bg-orange-100 text-orange-800 border-orange-200',
    },
    'Very Difficult': {
      label: 'Very High Risk',
      color: 'bg-red-100 text-red-800 border-red-200',
    },
  };
  return (
    map[risk] || {
      label: risk,
      color: 'bg-gray-100 text-gray-800 border-gray-200',
    }
  );
}

export function readinessLevel(
  score: number
): { label: string; color: string } {
  if (score >= 80)
    return { label: 'Trial Ready', color: 'text-emerald-600' };
  if (score >= 60)
    return { label: 'Mostly Ready', color: 'text-green-600' };
  if (score >= 40)
    return { label: 'Partially Ready', color: 'text-amber-600' };
  if (score >= 20)
    return { label: 'Needs Work', color: 'text-orange-600' };
  return { label: 'Not Ready', color: 'text-red-600' };
}

export function outcomeColor(direction: string): string {
  switch (direction) {
    case 'favorable':
      return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    case 'unfavorable':
      return 'text-red-600 bg-red-50 border-red-200';
    case 'mixed':
      return 'text-amber-600 bg-amber-50 border-amber-200';
    default:
      return 'text-gray-600 bg-gray-50 border-gray-200';
  }
}
