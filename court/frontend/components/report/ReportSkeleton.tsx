'use client';

import { motion } from 'framer-motion';
import { Skeleton, SkeletonLine } from '@/frontend/components/common/Skeleton';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function ReportSkeleton() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={stagger}
      className="min-h-screen bg-offwhite py-10 md:py-14"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        <motion.div variants={fadeUp}>
          <div className="border border-gray-200 rounded-xl bg-white overflow-hidden">
            <Skeleton variant="rect" height={64} className="rounded-none" />
            <div className="px-6 md:px-10 py-8 md:py-10 text-center space-y-4">
              <SkeletonLine width="180px" className="h-4 mx-auto" />
              <SkeletonLine width="260px" className="h-6 mx-auto" />
              <SkeletonLine width="120px" className="h-4 mx-auto" />
              <div className="w-12 h-0.5 bg-gray-200 rounded-full mx-auto" />
              <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="border border-gray-100 rounded-lg p-4 space-y-2">
                    <SkeletonLine width="60px" className="h-3 mx-auto" />
                    <SkeletonLine width="50px" className="h-6 mx-auto" />
                    <SkeletonLine width="70px" className="h-3 mx-auto" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={fadeUp}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 space-y-2">
                <SkeletonLine width="65%" className="h-3" />
                <SkeletonLine width="45%" className="h-6" />
                <SkeletonLine width="55%" className="h-3" />
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={fadeUp}>
          <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 space-y-4">
            <SkeletonLine width="150px" className="h-5" />
            <Skeleton lines={2} />
            <SkeletonLine width="80%" />
          </div>
        </motion.div>

        <motion.div variants={fadeUp}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
              <SkeletonLine width="120px" className="h-5" />
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-start gap-3">
                  <Skeleton variant="circular" width={14} height={14} />
                  <div className="flex-1 flex flex-col gap-1">
                    <SkeletonLine width="50%" />
                    <SkeletonLine width="70%" />
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-3">
                <SkeletonLine width="110px" className="h-5" />
                <SkeletonLine width="200px" />
                <Skeleton variant="rect" height={8} className="rounded-full" />
                <div className="flex justify-between">
                  <SkeletonLine width="30px" className="h-3" />
                  <SkeletonLine width="100px" className="h-3" />
                  <SkeletonLine width="30px" className="h-3" />
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-2">
                <SkeletonLine width="100px" className="h-5" />
                <div className="flex gap-2 flex-wrap">
                  <Skeleton variant="rect" width={100} height={24} className="rounded-full" />
                  <Skeleton variant="rect" width={80} height={24} className="rounded-full" />
                  <Skeleton variant="rect" width={120} height={24} className="rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={fadeUp}>
          <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-3">
            <SkeletonLine width="140px" className="h-5" />
            <Skeleton lines={2} />
            <SkeletonLine width="60%" />
          </div>
        </motion.div>

        <motion.div variants={fadeUp}>
          <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
            <SkeletonLine width="130px" className="h-5" />
            {[0, 1, 2].map((r) => (
              <div key={r} className="flex items-start gap-3">
                <Skeleton variant="rect" width={18} height={18} className="rounded" />
                <div className="flex-1">
                  <SkeletonLine width={`${50 + r * 20}%`} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={fadeUp}>
          <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
            <SkeletonLine width="150px" className="h-5" />
            {[0, 1].map((p) => (
              <div key={p} className="border border-gray-100 rounded-lg p-4 space-y-2">
                <SkeletonLine width="55%" />
                <Skeleton lines={1} />
                <SkeletonLine width="70%" />
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={fadeUp}>
          <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-3">
            <SkeletonLine width="160px" className="h-5" />
            <Skeleton lines={3} />
          </div>
        </motion.div>

        {[0, 1, 2].map((section) => (
          <motion.div key={section} variants={fadeUp}>
            <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-3">
              <SkeletonLine width={`${35 + section * 10}%`} className="h-5" />
              <Skeleton lines={2} />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
