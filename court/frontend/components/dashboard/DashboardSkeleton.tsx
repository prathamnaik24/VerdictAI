'use client';

import { motion } from 'framer-motion';
import DashboardLayout from './DashboardLayout';
import { Skeleton, SkeletonLine } from '@/frontend/components/common/Skeleton';
import { cardIn, staggerChildren } from '@/frontend/lib/animations';

export function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-offwhite py-10">
      <DashboardLayout>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerChildren(0.06)}
          className="space-y-6"
        >
          <motion.div variants={cardIn} className="flex items-center justify-between mb-2">
            <SkeletonLine width="220px" className="h-6" />
            <SkeletonLine width="140px" className="h-8 rounded-lg" />
          </motion.div>

          <motion.div variants={cardIn} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[0, 1, 2].map((i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl p-5 space-y-3">
                <SkeletonLine width="50%" />
                <Skeleton variant="rect" height={32} width="80%" />
                <SkeletonLine width="60%" />
              </div>
            ))}
          </motion.div>

          <motion.div variants={cardIn} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[0, 1].map((col) => (
              <div key={col} className="bg-white border border-gray-200 rounded-xl p-5 space-y-3">
                <SkeletonLine width="35%" className="h-5" />
                {[0, 1, 2, 3].map((row) => (
                  <div key={row} className="flex items-start gap-3">
                    <Skeleton variant="circular" width={14} height={14} />
                    <div className="flex-1 space-y-1.5">
                      <SkeletonLine width="55%" />
                      <SkeletonLine width="75%" />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </motion.div>

          <motion.div variants={cardIn}>
            <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-3">
              <SkeletonLine width="30%" className="h-5" />
              {[0, 1, 2].map((row) => (
                <div key={row} className="flex items-start gap-3">
                  <Skeleton variant="rect" width={16} height={16} className="rounded" />
                  <SkeletonLine width={row === 0 ? '60%' : row === 1 ? '45%' : '55%'} />
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={cardIn}>
            <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-3">
              <SkeletonLine width="25%" className="h-5" />
              <div className="flex flex-wrap gap-2">
                {[0, 1, 2].map((tag) => (
                  <Skeleton key={tag} variant="rect" width={120 + tag * 30} height={28} className="rounded-full" />
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div variants={cardIn}>
            <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
              <SkeletonLine width="28%" className="h-5" />
              {[0, 1].map((p) => (
                <div key={p} className="border border-gray-100 rounded-lg p-4 space-y-2">
                  <SkeletonLine width="45%" />
                  <Skeleton lines={2} />
                  <SkeletonLine width="60%" />
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </DashboardLayout>
    </div>
  );
}
