'use client';

import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Lock, LogIn, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

export default function Unauthorized() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

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

  const shieldVariants: Variants = {
    initial: { y: 0 },
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: 'loop',
        ease: 'easeInOut',
      },
    },
  };

  const lockVariants: Variants = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 1.5,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: 'loop',
        ease: 'easeInOut',
      },
    },
  };

  const circleVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: [0, 1.2, 1],
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

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
              variants={shieldVariants}
              initial="initial"
              animate="animate"
            >
              <motion.div
                className="absolute inset-0 bg-primary/10 rounded-full"
                variants={circleVariants}
                initial="hidden"
                animate="visible"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="relative"
                  variants={lockVariants}
                  initial="initial"
                  animate="animate"
                >
                  <ShieldAlert size={60} className="text-primary" />
                  <motion.div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Lock size={24} className="text-primary" />
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl font-bold text-foreground mb-4"
              variants={itemVariants}
            >
              Access Denied
            </motion.h1>

            <motion.p
              className="text-muted-foreground text-lg mb-8 max-w-md mx-auto"
              variants={itemVariants}
            >
              You don&apos;t have permission to access this page. Please sign in
              with an authorized account or contact the administrator.
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
                <Link href="/auth/signin" className="flex items-center gap-2">
                  <LogIn size={16} />
                  Sign In
                </Link>
              </Button>
            </motion.div>

            <motion.div
              className="mt-16 flex items-center justify-center gap-2 text-muted-foreground"
              variants={itemVariants}
            >
              <Lock size={16} />
              <span>Error Code: 401 Unauthorized</span>
            </motion.div>
          </motion.div>
        ) : (
          <>
            <div className="relative w-64 h-64 mx-auto mb-8">
              <div className="absolute inset-0 bg-primary/10 rounded-full" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <ShieldAlert size={60} className="text-primary" />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Lock size={24} className="text-primary" />
                  </div>
                </div>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Access Denied
            </h1>

            <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
              You don&apos;t have permission to access this page. Please sign in
              with an authorized account or contact the administrator.
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
                <Link href="/auth/signin" className="flex items-center gap-2">
                  <LogIn size={16} />
                  Sign In
                </Link>
              </Button>
            </div>

            <div className="mt-16 flex items-center justify-center gap-2 text-muted-foreground">
              <Lock size={16} />
              <span>Error Code: 401 Unauthorized</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
