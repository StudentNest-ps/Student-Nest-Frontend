"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface BookingSkeletonProps {
  viewMode: "cards" | "table"
}

const skeletonVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

const pulseVariants = {
  animate: {
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 1.5,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  },
}

export function BookingSkeleton({ viewMode }: BookingSkeletonProps) {
  if (viewMode === "cards") {
    return (
      <motion.div
        variants={skeletonVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <motion.div
            key={index}
            variants={pulseVariants}
            animate="animate"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <Card className="bg-background/50 backdrop-blur-sm border-primary/20 shadow-lg shadow-primary/10 overflow-hidden">
              <div className="relative">
                <Skeleton className="w-full h-48" />
                <div className="absolute top-4 right-4">
                  <Skeleton className="w-16 h-6 rounded-full" />
                </div>
                <div className="absolute bottom-4 left-4">
                  <Skeleton className="w-12 h-6 rounded-full" />
                </div>
              </div>

              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <Skeleton className="w-3/4 h-6 mb-2" />
                    <Skeleton className="w-1/2 h-4" />
                  </div>
                  <div className="text-right">
                    <Skeleton className="w-16 h-6 mb-1" />
                    <Skeleton className="w-10 h-3" />
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Skeleton className="w-20 h-4" />
                  <Skeleton className="w-20 h-4" />
                  <Skeleton className="w-20 h-4" />
                </div>

                <div className="space-y-2">
                  <Skeleton className="w-full h-4" />
                  <Skeleton className="w-full h-4" />
                  <Skeleton className="w-3/4 h-4" />
                </div>

                <div className="pt-2 border-t border-primary/10">
                  <Skeleton className="w-1/2 h-3 mb-2" />
                  <Skeleton className="w-1/3 h-3" />
                </div>

                <Skeleton className="w-full h-10 rounded-md" />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    )
  }

  return (
    <motion.div variants={skeletonVariants} initial="initial" animate="animate" exit="exit">
      <Card className="bg-background/50 backdrop-blur-sm border-primary/20 shadow-lg shadow-primary/10">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <div className="min-w-full">
              {/* Table Header */}
              <div className="border-b border-primary/10 p-4">
                <div className="flex items-center justify-between">
                  <Skeleton className="w-20 h-4" />
                  <Skeleton className="w-16 h-4" />
                  <Skeleton className="w-16 h-4" />
                  <Skeleton className="w-16 h-4" />
                  <Skeleton className="w-16 h-4" />
                  <Skeleton className="w-16 h-4" />
                </div>
              </div>

              {/* Table Rows */}
              {Array.from({ length: 5 }).map((_, index) => (
                <motion.div
                  key={index}
                  variants={pulseVariants}
                  animate="animate"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  className="border-b border-primary/10 p-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Skeleton className="w-12 h-12 rounded-lg" />
                      <div>
                        <Skeleton className="w-32 h-4 mb-2" />
                        <Skeleton className="w-24 h-3" />
                      </div>
                    </div>
                    <Skeleton className="w-20 h-4" />
                    <Skeleton className="w-8 h-4" />
                    <Skeleton className="w-16 h-4" />
                    <Skeleton className="w-16 h-6 rounded-full" />
                    <Skeleton className="w-20 h-8 rounded-md" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
