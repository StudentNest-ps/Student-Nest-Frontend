"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import SignUpForm from "../components/SignUpForm"

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row">
      {/* Left side - Image */}
      <div className="hidden lg:block w-1/2 relative">
        <Image
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop"
          alt="Beautiful property exterior"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent z-10" />
        <div className="absolute inset-0 flex items-center p-16 z-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-white max-w-md"
          >
            <h2 className="text-3xl font-bold mb-4">Find Your Dream Home in Palestine</h2>
            <p className="text-white/80 mb-6">
              Join our community of homeowners and renters to discover beautiful properties near Najah National
              University and across Palestine.
            </p>
            <div className="flex space-x-4">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
                <div className="text-2xl font-bold">500+</div>
                <div className="text-white/70 text-sm">Properties</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
                <div className="text-2xl font-bold">1000+</div>
                <div className="text-white/70 text-sm">Happy Customers</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
                <div className="text-2xl font-bold">10+</div>
                <div className="text-white/70 text-sm">Cities</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 md:p-12 lg:p-16 bg-background">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-md mx-auto w-full"
        >
          <SignUpForm />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-8 flex justify-center"
        >
          <div className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/signin" className="text-primary font-medium hover:underline">
              Sign in
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
