"use client";

import React from 'react';

type Props = {
  evidenceItems?: string[] | null;
};

export default function EvidenceChecklist({ evidenceItems }: Props) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-900">Available Evidence</h3>
      <p className="text-sm text-gray-500 mb-3">Select the evidence types you currently have on hand.</p>
      <div className="space-y-2">
        {(evidenceItems && evidenceItems.length > 0) ? (
          evidenceItems.map((it) => (
            <label key={it} className="flex items-center" title={it}>
              <input type="checkbox" className="mr-2" />
              <span>{it}</span>
            </label>
          ))
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
}
