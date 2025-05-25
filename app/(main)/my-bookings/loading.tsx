"use client"

import { BookingSkeleton } from "./components/BookingSkeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 relative overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="text-center mb-8">
            <div className="w-64 h-12 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg mx-auto mb-4 animate-pulse" />
            <div className="w-96 h-6 bg-muted/20 rounded mx-auto animate-pulse" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="bg-background/50 backdrop-blur-sm border border-primary/20 rounded-lg p-4 animate-pulse"
              >
                <div className="w-8 h-8 bg-primary/20 rounded-full mx-auto mb-2" />
                <div className="w-12 h-8 bg-headline/20 rounded mx-auto mb-1" />
                <div className="w-16 h-4 bg-muted-foreground/20 rounded mx-auto" />
              </div>
            ))}
          </div>

          <div className="flex justify-end mb-6">
            <div className="w-32 h-10 bg-background/50 border border-primary/20 rounded-lg animate-pulse" />
          </div>
        </div>

        <BookingSkeleton viewMode="cards" />
      </div>
    </div>
  )
}
