"use client";

import { lazy, Suspense } from 'react';
import { LoadingSpinner } from './MicroInteractions';

// Lazy load dos componentes de gráficos (Recharts - ~150KB)
const LazyCostDistributionChart = lazy(() => 
  import('./simulators/base/ChartComponents').then(module => ({
    default: module.CostDistributionChart
  }))
);

const LazyViabilityIndicator = lazy(() => 
  import('./simulators/base/ChartComponents').then(module => ({
    default: module.ViabilityIndicator
  }))
);

const LazyCostBreakdownTable = lazy(() => 
  import('./simulators/base/ChartComponents').then(module => ({
    default: module.CostBreakdownTable
  }))
);

// Wrapper com Suspense para os gráficos
export const CostDistributionChart = (props: any) => (
  <Suspense fallback={
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg">
      <div className="flex items-center justify-center h-[300px]">
        <LoadingSpinner size="lg" />
      </div>
    </div>
  }>
    <LazyCostDistributionChart {...props} />
  </Suspense>
);

export const ViabilityIndicator = (props: any) => (
  <Suspense fallback={
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg">
      <div className="flex items-center justify-center h-[200px]">
        <LoadingSpinner size="md" />
      </div>
    </div>
  }>
    <LazyViabilityIndicator {...props} />
  </Suspense>
);

export const CostBreakdownTable = (props: any) => (
  <Suspense fallback={
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
        <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
      </div>
      <div className="p-6">
        <LoadingSpinner size="md" />
      </div>
    </div>
  }>
    <LazyCostBreakdownTable {...props} />
  </Suspense>
);
