import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';

export default function Loading() {
  return (
    <div className="p-6 w-full">
      {/* Page Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-10 w-40" />
      </div>

      {/* Filters Skeleton */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 w-full sm:w-[180px]" />
      </div>

      {/* Table Skeleton */}
      <Card className="mb-6">
        <div className="p-1">
          {/* Table Header */}
          <div className="flex border-b p-4">
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-6 w-1/4 mx-4 hidden md:block" />
            <Skeleton className="h-6 w-1/6 mx-4" />
            <Skeleton className="h-6 w-1/4 mx-4 hidden lg:block" />
            <Skeleton className="h-6 w-1/6 mx-4" />
            <Skeleton className="h-6 w-1/12 ml-auto" />
          </div>

          {/* Table Rows */}
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="flex items-center p-4 border-b">
                <div className="flex items-center gap-3 w-1/4">
                  <Skeleton className="h-12 w-12 rounded-md" />
                  <div>
                    <Skeleton className="h-5 w-32 mb-1" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
                <Skeleton className="h-4 w-1/4 mx-4 hidden md:block" />
                <Skeleton className="h-5 w-16 mx-4" />
                <Skeleton className="h-4 w-32 mx-4 hidden lg:block" />
                <Skeleton className="h-6 w-20 mx-4" />
                <div className="flex gap-2 ml-auto">
                  <Skeleton className="h-8 w-8 rounded-md" />
                  <Skeleton className="h-8 w-8 rounded-md" />
                  <Skeleton className="h-8 w-8 rounded-md" />
                </div>
              </div>
            ))}
        </div>
      </Card>

      {/* Pagination Skeleton */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-48" />
        <div className="flex items-center space-x-2">
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
      </div>
    </div>
  );
}
