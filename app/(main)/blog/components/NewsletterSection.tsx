"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"

export default function NewsletterSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

  return (
    <section ref={ref} className="py-20 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="bg-card rounded-3xl p-10 shadow-sm border border-border/50"
          >
            <div className="flex justify-center mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Mail className="text-primary" size={24} />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-foreground mb-3">Stay up to date</h2>
            <p className="text-muted-foreground mb-6">
              Be the first to know about our newest apartments and exclusive offers.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input type="email" placeholder="Your email address" className="rounded-full" />
              <Button className="bg-primary text-white hover:bg-primary/90 rounded-full cursor-pointer">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
