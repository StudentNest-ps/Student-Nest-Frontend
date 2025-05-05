"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import SignInForm from "../components/SignInForm"

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 md:p-12 lg:p-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-md mx-auto w-full"
        >
          <SignInForm />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8 text-center"
          >
            <p className="text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-primary font-medium hover:underline">
                Sign up
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:block w-1/2 relative bg-primary/10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent z-10" />
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
          alt="Modern apartment interior"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 flex flex-col justify-center p-16 z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="bg-white/90 backdrop-blur-sm p-8 rounded-xl max-w-md"
          >
            <h2 className="text-2xl font-bold text-foreground mb-4">Welcome Back</h2>
            <p className="text-muted-foreground">
              Sign in to access your account and continue your journey to finding the perfect home in Palestine.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
