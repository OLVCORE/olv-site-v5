"use client";

import React from 'react';

interface SkeletonProps {
  className?: string;
  height?: string;
  width?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ 
  className = "", 
  height = "h-4", 
  width = "w-full" 
}) => (
  <div 
    className={`${width} ${height} bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-pulse ${className}`}
  />
);

export const InputSkeleton: React.FC = () => (
  <div className="space-y-2">
    <Skeleton height="h-4" width="w-24" />
    <Skeleton height="h-10" />
  </div>
);

export const ChartSkeleton: React.FC = () => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg">
    <Skeleton height="h-6" width="w-48" className="mb-4" />
    <div className="flex items-center justify-center h-64">
      <div className="relative">
        <div className="w-32 h-32 rounded-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <Skeleton height="h-4" width="w-16" className="mb-2" />
            <Skeleton height="h-6" width="w-20" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const TableSkeleton: React.FC = () => (
  <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden">
    <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
      <Skeleton height="h-6" width="w-48" />
    </div>
    <div className="p-6 space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center space-x-4">
          <Skeleton height="h-4" width="w-32" />
          <Skeleton height="h-4" width="w-24" />
          <Skeleton height="h-4" width="w-16" />
          <Skeleton height="h-4" width="w-20" />
        </div>
      ))}
    </div>
  </div>
);

export const CardSkeleton: React.FC = () => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg">
    <Skeleton height="h-6" width="w-48" className="mb-4" />
    <div className="space-y-3">
      <Skeleton height="h-4" width="w-full" />
      <Skeleton height="h-4" width="w-3/4" />
      <Skeleton height="h-4" width="w-1/2" />
    </div>
  </div>
);

export const SimulatorSkeleton: React.FC = () => (
  <div className="space-y-6">
    {/* Header */}
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <Skeleton height="h-8" width="w-8" className="rounded" />
        <Skeleton height="h-8" width="w-64" />
      </div>
      <Skeleton height="h-10" width="w-32" className="rounded-lg" />
    </div>

    {/* Form Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <InputSkeleton key={i} />
      ))}
    </div>

    {/* Action Buttons */}
    <div className="flex space-x-4">
      <Skeleton height="h-12" width="w-32" className="rounded-lg" />
      <Skeleton height="h-12" width="w-32" className="rounded-lg" />
    </div>
  </div>
);

export const ReportSkeleton: React.FC = () => (
  <div className="space-y-6">
    {/* Header */}
    <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-6">
      <Skeleton height="h-8" width="w-64" className="mb-2" />
      <Skeleton height="h-4" width="w-96" />
    </div>

    {/* Charts Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <ChartSkeleton />
      <div className="space-y-4">
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </div>

    {/* Table */}
    <TableSkeleton />

    {/* Action Buttons */}
    <div className="flex space-x-4">
      <Skeleton height="h-12" width="w-40" className="rounded-lg" />
      <Skeleton height="h-12" width="w-40" className="rounded-lg" />
    </div>
  </div>
);

export const ShimmerEffect: React.FC = () => (
  <div className="relative overflow-hidden">
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
  </div>
);

// Adicionar keyframes para shimmer no CSS global
const shimmerKeyframes = `
@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
`;

// Injetar CSS se necessário
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = shimmerKeyframes;
  document.head.appendChild(style);
} 