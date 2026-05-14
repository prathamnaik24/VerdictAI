'use client';

import { BookOpen, TrendingUp } from 'lucide-react';

interface Precedent {
  id?: string;
  title: string;
  court?: string;
  year?: number;
  similarity?: number; // 0-100
  summary?: string;
  relevance?: string;
}

interface PrecedentListProps {
  precedents: Precedent[];
  maxItems?: number;
}

export const PrecedentList = ({ 
  precedents = [],
  maxItems = 3
}: PrecedentListProps) => {
  // Sort by similarity descending and take top N
  const topPrecedents = [...(precedents || [])]
    .sort((a, b) => (b.similarity || 0) - (a.similarity || 0))
    .slice(0, maxItems);

  if (!topPrecedents || topPrecedents.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-600" />
          Relevant Precedents
        </h3>
        <div className="py-8 text-center">
          <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-600">No similar precedents found in database.</p>
          <p className="text-sm text-gray-500 mt-2">More precedents will be added as cases accumulate.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-1 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-600" />
          Relevant Precedents
        </h3>
        <p className="text-sm text-gray-600">
          {topPrecedents.length} of {precedents.length} similar cases shown
        </p>
      </div>

      <div className="space-y-4">
        {topPrecedents.map((precedent, idx) => {
          const similarity = precedent.similarity || 0;
          const getSimilarityColor = (s: number) => {
            if (s >= 80) return 'bg-green-50 border-green-200';
            if (s >= 60) return 'bg-blue-50 border-blue-200';
            return 'bg-gray-50 border-gray-200';
          };

          const getSimilarityBadgeColor = (s: number) => {
            if (s >= 80) return 'bg-green-100 text-green-800';
            if (s >= 60) return 'bg-blue-100 text-blue-800';
            return 'bg-gray-100 text-gray-800';
          };

          return (
            <div
              key={precedent.id || idx}
              className={`border rounded-lg p-4 transition-all hover:shadow-md ${getSimilarityColor(similarity)}`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{precedent.title}</h4>
                  <p className="text-sm text-gray-600">
                    {precedent.court && `${precedent.court} `}
                    {precedent.year && `(${precedent.year})`}
                  </p>
                </div>
                <span className={`ml-3 px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap ${getSimilarityBadgeColor(similarity)}`}>
                  <TrendingUp className="w-3 h-3 inline mr-1" />
                  {similarity}%
                </span>
              </div>

              {precedent.summary && (
                <p className="text-sm text-gray-700 mb-3">{precedent.summary}</p>
              )}

              {precedent.relevance && (
                <p className="text-xs text-gray-600 italic">
                  <strong>Relevance:</strong> {precedent.relevance}
                </p>
              )}

              {/* Similarity breakdown */}
              <div className="mt-3 pt-3 border-t border-gray-200 border-opacity-50">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Relevance Match</span>
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        similarity >= 80 ? 'bg-green-500' :
                        similarity >= 60 ? 'bg-blue-500' :
                        'bg-gray-500'
                      }`}
                      style={{ width: `${similarity}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {precedents.length > maxItems && (
        <div className="mt-4 pt-4 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600">
            +{precedents.length - maxItems} more precedents available
          </p>
        </div>
      )}
    </div>
  );
};
