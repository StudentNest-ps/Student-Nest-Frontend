"use client"

import Link from "next/link"
import { motion, Variants } from "framer-motion"
import { useEffect, useState } from "react"
import { AlertTriangle, ArrowLeft, Home, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
    setIsClient(true)
  }, [error])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  }

  const rotateVariants : Variants = {
    initial: { rotate: 0 },
    animate: {
      rotate: [0, 5, 0, -5, 0],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
        ease: "easeInOut",
      },
    },
  }

  const pulseVariants: Variants = {
    initial: { scale: 1, opacity: 0.8 },
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.8, 1, 0.8],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
        ease: "easeInOut",
      },
    },
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="max-w-3xl w-full text-center">
        {isClient ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-3xl w-full text-center"
          >
            <motion.div
              className="relative w-64 h-64 mx-auto mb-8"
              variants={rotateVariants}
              initial="initial"
              animate="animate"
            >
              <motion.div
                className="absolute inset-0 bg-red-100 rounded-full"
                variants={pulseVariants}
                initial="initial"
                animate="animate"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
                  <AlertTriangle size={80} className="text-red-500" />
                </motion.div>
              </div>
            </motion.div>

            <motion.h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4" variants={itemVariants}>
              Something Went Wrong
            </motion.h1>

            <motion.p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto" variants={itemVariants}>
              We apologize for the inconvenience. An unexpected error has occurred while processing your request.
            </motion.p>

            <motion.div className="flex flex-col md:flex-row gap-4 justify-center" variants={itemVariants}>
              <Button onClick={() => reset()} variant="outline" className="flex items-center gap-2">
                <RefreshCw size={16} />
                Try Again
              </Button>

              <Button onClick={() => window.history.back()} variant="outline" className="flex items-center gap-2">
                <ArrowLeft size={16} />
                Go Back
              </Button>

              <Button asChild className="bg-primary text-white hover:bg-primary/90">
                <Link href="/" className="flex items-center gap-2">
                  <Home size={16} />
                  Return Home
                </Link>
              </Button>
            </motion.div>

            <motion.div className="mt-16 text-sm text-muted-foreground" variants={itemVariants}>
              <p>Error ID: {error.digest}</p>
              <p className="mt-1">If this problem persists, please contact our support team.</p>
            </motion.div>
          </motion.div>
        ) : (
          <>
            <div className="relative w-64 h-64 mx-auto mb-8">
              <div className="absolute inset-0 bg-red-100 rounded-full" />
              <div className="absolute inset-0 flex items-center justify-center">
                <AlertTriangle size={80} className="text-red-500" />
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Something Went Wrong</h1>

            <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
              We apologize for the inconvenience. An unexpected error has occurred while processing your request.
            </p>

            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button onClick={() => reset()} variant="outline" className="flex items-center gap-2">
                <RefreshCw size={16} />
                Try Again
              </Button>

              <Button onClick={() => window.history.back()} variant="outline" className="flex items-center gap-2">
                <ArrowLeft size={16} />
                Go Back
              </Button>

              <Button asChild className="bg-primary text-white hover:bg-primary/90">
                <Link href="/" className="flex items-center gap-2">
                  <Home size={16} />
                  Return Home
                </Link>
              </Button>
            </div>

            <div className="mt-16 text-sm text-muted-foreground">
              <p>Error ID: {error.digest}</p>
              <p className="mt-1">If this problem persists, please contact our support team.</p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
