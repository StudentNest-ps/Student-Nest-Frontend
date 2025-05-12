'use client';

import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Compass, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

export default function NotFound() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  // Only enable animations after client-side hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const floatingVariants: Variants = {
    initial: { y: 0 },
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: 'loop',
        ease: 'easeInOut',
      },
    },
  };

  const pulseVariants: Variants = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: 'loop',
        ease: 'easeInOut',
      },
    },
  };

  const pathVariants = {
    hidden: { pathLength: 0 },
    visible: {
      pathLength: 1,
      transition: { duration: 1.5, ease: 'easeInOut' },
    },
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="max-w-3xl w-full text-center">
        {isClient ? (
          <>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="max-w-3xl w-full text-center"
            >
              <motion.div
                className="relative w-64 h-64 mx-auto mb-8"
                variants={floatingVariants}
                initial="initial"
                animate="animate"
              >
                <motion.div
                  className="absolute inset-0 bg-primary/5 rounded-full"
                  variants={pulseVariants}
                  initial="initial"
                  animate="animate"
                />
                <motion.div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    width="180"
                    height="180"
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#103c39"
                      strokeWidth="2"
                      strokeLinecap="round"
                      variants={pathVariants}
                      initial="hidden"
                      animate="visible"
                    />
                    <motion.path
                      d="M50 20 L50 50 L70 60"
                      stroke="#103c39"
                      strokeWidth="2"
                      strokeLinecap="round"
                      variants={pathVariants}
                      initial="hidden"
                      animate="visible"
                    />
                    <motion.path
                      d="M30 30 L70 70"
                      stroke="#e3f1f0"
                      strokeWidth="8"
                      strokeLinecap="round"
                      variants={pathVariants}
                      initial="hidden"
                      animate="visible"
                    />
                    <motion.path
                      d="M70 30 L30 70"
                      stroke="#e3f1f0"
                      strokeWidth="8"
                      strokeLinecap="round"
                      variants={pathVariants}
                      initial="hidden"
                      animate="visible"
                    />
                  </svg>
                </motion.div>
              </motion.div>

              <motion.h1
                className="text-4xl md:text-5xl font-bold text-foreground mb-4"
                variants={itemVariants}
              >
                Page Not Found
              </motion.h1>

              <motion.p
                className="text-muted-foreground text-lg mb-8 max-w-md mx-auto"
                variants={itemVariants}
              >
                Oops! It seems like you&apos;ve ventured into uncharted
                territory. The page you&apos;re looking for doesn&apos;t exist
                or has been moved.
              </motion.p>

              <motion.div
                className="flex flex-col md:flex-row gap-4 justify-center"
                variants={itemVariants}
              >
                <Button
                  onClick={() => router.back()}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <ArrowLeft size={16} />
                  Go Back
                </Button>

                <Button
                  asChild
                  className="bg-primary text-white hover:bg-primary/90"
                >
                  <Link href="/" className="flex items-center gap-2">
                    <MapPin size={16} />
                    Return Home
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                className="mt-16 flex items-center justify-center gap-2 text-muted-foreground"
                variants={itemVariants}
              >
                <Compass size={16} />
                <span>Error Code: 404</span>
              </motion.div>
            </motion.div>
          </>
        ) : (
          <>
            <div className="relative w-64 h-64 mx-auto mb-8">
              <div className="absolute inset-0 bg-primary/5 rounded-full" />
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  width="180"
                  height="180"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#103c39"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M50 20 L50 50 L70 60"
                    stroke="#103c39"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M30 30 L70 70"
                    stroke="#e3f1f0"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                  <path
                    d="M70 30 L30 70"
                    stroke="#e3f1f0"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Page Not Found
            </h1>

            <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
              Oops! It seems like you&apos;ve ventured into uncharted territory.
              The page you&apos;re looking for doesn&apos;t exist or has been
              moved.
            </p>

            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button
                onClick={() => router.back()}
                variant="outline"
                className="flex items-center gap-2"
              >
                <ArrowLeft size={16} />
                Go Back
              </Button>

              <Button
                asChild
                className="bg-primary text-white hover:bg-primary/90"
              >
                <Link href="/" className="flex items-center gap-2">
                  <MapPin size={16} />
                  Return Home
                </Link>
              </Button>
            </div>

            <div className="mt-16 flex items-center justify-center gap-2 text-muted-foreground">
              <Compass size={16} />
              <span>Error Code: 404</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
