'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle, Home, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  left: string;
  top: string;
  duration: number;
  delay: number;
}

export default function AlreadySignInPage() {
  const router = useRouter();
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 4 + Math.random() * 2,
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);
  }, []);

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      {/* Animated Glowing Circle Background */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="w-[800px] h-[800px] rounded-full bg-gradient-to-r from-primary/30 via-primary/20 to-primary/10 dark:from-sidebar-primary/30 dark:via-sidebar-primary/20 dark:to-sidebar-primary/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
          }}
        />
      </motion.div>

      {/* Secondary Glowing Elements - Updated to use primary/accent/secondary */}
      <motion.div
        className="absolute top-20 left-20 w-32 h-32 rounded-full bg-gradient-to-r from-primary/15 via-accent/15 to-primary/10 dark:from-sidebar-primary/15 dark:via-sidebar-accent/15 dark:to-sidebar-primary/10 blur-2xl"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute bottom-32 right-32 w-24 h-24 rounded-full bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/5 dark:from-sidebar-primary/10 dark:via-sidebar-secondary/10 dark:to-sidebar-accent/5 blur-2xl"
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
          scale: [1, 1.4, 1],
        }}
        transition={{
          duration: 7,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'easeInOut',
          delay: 1,
        }}
      />

      {/* Main Content */}
      <motion.div
        className="relative z-10 text-center max-w-md mx-auto px-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {/* Success Icon */}
        <motion.div
          className="mb-8 flex justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 0.6,
            delay: 0.6,
            type: 'spring',
            stiffness: 200,
          }}
        >
          <div className="relative">
            <motion.div
              className="absolute inset-0 bg-primary/30 dark:bg-sidebar-primary/30 rounded-full blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: 'easeInOut',
              }}
            />
            <CheckCircle className="w-20 h-20 text-primary dark:text-primary" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-foreground mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          You&apos;re Already{' '}
          <span className="bg-gradient-to-r from-primary to-ring dark:from-sidebar-primary dark:to-sidebar-ring bg-clip-text text-transparent">
            Signed In
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg text-muted-foreground mb-8 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          Welcome back to{' '}
          <span className="font-semibold text-foreground">StudentNest</span>!
          You&apos;re all set and ready to explore amazing student housing
          options.
        </motion.p>

        {/* Go Home Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <Button
            onClick={handleGoHome}
            size="lg"
            className="cursor-pointer group relative bg-gradient-to-r from-primary to-ring dark:from-sidebar-primary dark:to-sidebar-ring text-primary-foreground dark:text-sidebar-primary-foreground px-8 py-6 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-primary/25 dark:hover:shadow-sidebar-primary/25 transition-all duration-300 transform hover:scale-105"
          >
            <motion.div className="absolute inset-0 bg-gradient-to-r from-primary-foreground/20 to-transparent dark:from-sidebar-primary-foreground/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="flex items-center space-x-3 relative z-10">
              <Home className="w-6 h-6" />
              <span>Go Home</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: 'easeInOut',
                }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </div>
          </Button>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          className="mt-12 flex justify-center space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-gradient-to-r from-primary to-ring dark:from-sidebar-primary dark:to-sidebar-ring rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.3,
                ease: 'easeInOut',
              }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Floating Particles - Updated to use state */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-primary/30 dark:bg-sidebar-primary/30 rounded-full"
          style={{
            left: particle.left,
            top: particle.top,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Number.POSITIVE_INFINITY,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
