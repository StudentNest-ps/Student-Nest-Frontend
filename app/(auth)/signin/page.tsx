'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import SignInForm from '../components/SignInForm';

export default function SignInPage() {
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.1,
        duration: 0.6,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.4 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const floatingOrbs = [
    { size: 300, color: 'bg-primary/10', delay: 0, duration: 25 },
    { size: 200, color: 'bg-primary/5', delay: 5, duration: 30 },
    { size: 150, color: 'bg-accent/10', delay: 10, duration: 20 },
    { size: 100, color: 'bg-primary/10', delay: 15, duration: 35 },
  ];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        ref={containerRef}
        className="min-h-screen bg-background flex relative overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Animated background elements */}
        {mounted &&
          floatingOrbs.map((orb, index) => (
            <motion.div
              key={index}
              className={`absolute rounded-full ${orb.color} blur-3xl opacity-50`}
              style={{
                width: orb.size,
                height: orb.size,
                top: `calc(50% - ${orb.size / 2}px)`,
                left: `calc(50% - ${orb.size / 2}px)`,
              }}
              animate={{
                x: [0, 50, -50, 0],
                y: [0, -50, 50, 0],
              }}
              transition={{
                duration: orb.duration,
                delay: orb.delay,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: 'reverse',
                ease: 'easeInOut',
              }}
            />
          ))}

        {/* Interactive glow effect that follows mouse */}
        {mounted && (
          <motion.div
            className="absolute pointer-events-none rounded-full bg-primary/70 blur-3xl opacity-30"
            style={{
              width: 300,
              height: 300,
              top: mousePosition.y - 150,
              left: mousePosition.x - 150,
            }}
            animate={{
              top: mousePosition.y - 150,
              left: mousePosition.x - 150,
            }}
            transition={{
              type: 'spring',
              stiffness: 110,
              damping: 30,
              mass: 0.5,
            }}
          />
        )}

        {/* Left side - Form */}
        <motion.div
          className="w-full lg:w-1/2 flex flex-col justify-center p-8 md:p-12 lg:p-16 relative z-10"
          variants={itemVariants}
        >
          <motion.div
            variants={itemVariants}
            className="max-w-md mx-auto w-full relative"
          >
            {/* Card background with glass effect */}
            <motion.div
              className="absolute inset-0 bg-card/30 backdrop-blur-sm rounded-2xl border border-border/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            />

            {/* Glowing border effect */}
            <motion.div
              className="absolute inset-0 rounded-2xl opacity-0"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.5, 0],
                boxShadow: [
                  '0 0 0 0px rgba(var(--primary), 0)',
                  '0 0 0 2px rgba(var(--primary), 0.3)',
                  '0 0 0 0px rgba(var(--primary), 0)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: 'loop',
                ease: 'easeInOut',
              }}
            />

            <div className="relative p-8">
              <SignInForm />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-8 text-center">
            <p className="text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Link
                href="/signup"
                className="text-primary font-medium hover:underline relative inline-block group"
              >
                <span>Sign up</span>
                <motion.span
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary"
                  initial={{ width: '0%' }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </p>
          </motion.div>
        </motion.div>

        {/* Right side - Image */}
        <motion.div
          variants={itemVariants}
          className="hidden lg:block w-1/2 relative bg-primary/10"
          suppressHydrationWarning
        >
          {/* Gradient overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary/30 via-primary/20 to-transparent z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />

          {/* Background image */}
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
            alt="Modern apartment interior"
            fill
            className="object-cover"
            priority
          />

          {/* Floating elements */}
          <div className="absolute inset-0 z-20">
            {/* Top right decorative element */}
            <motion.div
              className="absolute top-10 right-10 w-20 h-20 rounded-full border border-white/20 backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            />

            {/* Bottom left decorative element */}
            <motion.div
              className="absolute bottom-20 left-20 w-16 h-16 rounded-full bg-primary/10 backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            />
          </div>

          {/* Content card */}
          <div className="absolute inset-0 flex flex-col justify-center p-16 z-30">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="bg-background/50 backdrop-blur-md p-8 rounded-2xl max-w-md border border-white/20 shadow-xl"
            >
              <motion.h2
                className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                Welcome Back
              </motion.h2>
              <motion.p
                className="text-foreground/80"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                Sign in to access your account and continue your journey to
                finding the perfect home in Palestine.
              </motion.p>

              {/* Decorative dots */}
              <div className="flex mt-6 space-x-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-primary"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.1 + i * 0.1, duration: 0.3 }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
