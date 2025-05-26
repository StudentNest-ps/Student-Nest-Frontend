import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const Loading = () => {
  // Create an array of 4 items for skeleton rows
  const skeletonRows = Array.from({ length: 4 }, (_, i) => i);

  return (
    <div>
      <div>
        <Card className="border-none shadow-md">
          <CardHeader className="pb-2 flex justify-between items-center">
            <div className="flex flex-col gap-2">
              <CardTitle>
                <Skeleton className="h-6 w-24" />
              </CardTitle>
              <CardDescription>
                <Skeleton className="h-4 w-40" />
              </CardDescription>
              <Skeleton className="h-4 w-48" />
            </div>
            <div>
              <Skeleton className="h-10 w-48" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex items-center gap-2 rounded-md border px-3 py-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-9 w-full" />
            </div>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      <Skeleton className="h-4 w-20" />
                    </TableHead>
                    <TableHead>
                      <Skeleton className="h-4 w-16" />
                    </TableHead>
                    <TableHead>
                      <Skeleton className="h-4 w-16" />
                    </TableHead>
                    <TableHead>
                      <Skeleton className="h-4 w-20" />
                    </TableHead>
                    <TableHead>
                      <Skeleton className="h-4 w-16" />
                    </TableHead>
                    <TableHead className="text-right">
                      <Skeleton className="h-4 w-16 ml-auto" />
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {skeletonRows.map((index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="max-w-[250px]">
                          <Skeleton className="h-5 w-40 mb-1" />
                          <Skeleton className="h-3 w-32" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 w-24 rounded-full" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-24" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-36" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-24 mb-1" />
                        <Skeleton className="h-3 w-20" />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Skeleton className="h-8 w-8 rounded-full" />
                          <Skeleton className="h-8 w-8 rounded-full" />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Loading;
