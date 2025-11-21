// Dashboard Skeleton Loaders
// Loading states for dashboard components

import { Card } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

export function SensorCardSkeleton() {
  return (
    <Card className="p-5 glass-card dark:glass-card-dark border-2 border-white/40 dark:border-white/20 shadow-xl">
      <div className="flex items-start justify-between mb-4">
        <Skeleton className="w-12 h-12 rounded-xl" />
        <Skeleton className="w-16 h-6 rounded-full" />
      </div>
      <Skeleton className="w-24 h-4 mb-2" />
      <Skeleton className="w-32 h-10 mb-3" />
      <Skeleton className="w-full h-2 mb-3" />
      <div className="flex items-center justify-between">
        <Skeleton className="w-24 h-3" />
        <Skeleton className="w-4 h-4" />
      </div>
    </Card>
  );
}

export function QuickStatSkeleton() {
  return (
    <Card className="p-3 glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10">
      <div className="flex items-center gap-2">
        <Skeleton className="w-10 h-10 rounded-lg flex-shrink-0" />
        <div className="flex-1">
          <Skeleton className="w-16 h-3 mb-1" />
          <Skeleton className="w-12 h-4" />
        </div>
      </div>
    </Card>
  );
}

export function NotificationSkeleton() {
  return (
    <div className="flex items-start gap-3 p-3 glass-card dark:glass-card-dark rounded-lg border border-white/20 dark:border-white/10">
      <Skeleton className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="w-full h-3" />
        <Skeleton className="w-20 h-3" />
      </div>
    </div>
  );
}

export function TableRowSkeleton() {
  return (
    <tr className="border-b border-white/20 dark:border-white/10">
      <td className="p-3">
        <Skeleton className="w-20 h-4" />
      </td>
      <td className="p-3">
        <Skeleton className="w-32 h-4" />
      </td>
      <td className="p-3">
        <Skeleton className="w-40 h-4" />
      </td>
      <td className="p-3">
        <Skeleton className="w-16 h-4" />
      </td>
      <td className="p-3">
        <Skeleton className="w-12 h-6 rounded-full" />
      </td>
    </tr>
  );
}

export function AdminStatCardSkeleton() {
  return (
    <Card className="p-6 glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10">
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="w-12 h-12 rounded-xl" />
        <Skeleton className="w-5 h-5" />
      </div>
      <Skeleton className="w-24 h-4 mb-2" />
      <Skeleton className="w-16 h-8 mb-2" />
      <Skeleton className="w-20 h-3" />
    </Card>
  );
}

export function DeviceInfoSkeleton() {
  return (
    <Card className="p-4 md:p-5 glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10 shadow-lg">
      <Skeleton className="w-32 h-5 mb-3" />
      <div className="space-y-2.5">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex justify-between items-center gap-4">
            <Skeleton className="w-24 h-3" />
            <Skeleton className="w-32 h-3" />
          </div>
        ))}
      </div>
    </Card>
  );
}

export function StatisticsCardSkeleton() {
  return (
    <Card className="p-4 md:p-5 glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10 shadow-lg">
      <Skeleton className="w-40 h-5 mb-3" />
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i}>
            <div className="flex justify-between mb-1.5 gap-4">
              <Skeleton className="w-16 h-3" />
              <Skeleton className="w-12 h-3" />
            </div>
            <Skeleton className="w-full h-2" />
          </div>
        ))}
      </div>
    </Card>
  );
}
