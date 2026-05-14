'use client';

interface EvidenceItem {
  id?: string;
  name: string;
  description?: string;
  [key: string]: any;
}

interface EvidenceChecklistProps {
  evidenceItems?: EvidenceItem[];
}

export const EvidenceChecklist = ({ evidenceItems }: EvidenceChecklistProps) => {
  if (!evidenceItems || evidenceItems.length === 0) {
    return (
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900">Available Evidence</h3>
        <p className="text-sm text-gray-500 mb-3">Select the evidence types you currently have on hand.</p>
        <div className="space-y-2">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span>Documents &amp; Contracts</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span>Witness Statements</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span>Communications &amp; Correspondence</span>
          </label>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-900">Available Evidence</h3>
      <p className="text-sm text-gray-500 mb-3">Select the evidence types you currently have on hand.</p>
      <div className="space-y-2">
        {evidenceItems.map((item, index) => (
          <label key={item.id || index} className="flex items-center">
            <input type="checkbox" className="mr-2" defaultChecked />
            <span>{item.name} {item.description && <span className="text-gray-500 text-sm ml-1">- {item.description}</span>}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
