"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function Loading() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        {isClient ? (
          <>
            <motion.div
              className="inline-block"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full" />
            </motion.div>

            <motion.p
              className="mt-4 text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Loading...
            </motion.p>
          </>
        ) : (
          <>
            <div className="inline-block">
              <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full" />
            </div>
            <p className="mt-4 text-muted-foreground">Loading...</p>
          </>
        )}
      </div>
    </div>
  )
}
