'use client';

import type React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Search,
  Calendar,
  UserPlus,
  Wifi,
  Clock,
  ChevronLeft,
  ChevronRight,
  FileText,
  Home,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { useEffect, useState } from 'react';

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardHover = {
  rest: {
    scale: 1,
    boxShadow:
      '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  },
  hover: {
    scale: 1.03,
    boxShadow:
      '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

const buttonHover = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
};

const featureCards = [
  {
    icon: Home,
    title: 'Flexible Living',
    description:
      'Choose from a variety of rental periods to suit your needs, from a few days to several months.',
  },
  {
    icon: Calendar,
    title: 'Move-in Ready',
    description:
      'All our properties come fully furnished and equipped with everything you need to feel at home.',
  },
  {
    icon: Wifi,
    title: 'High-speed Wi-Fi',
    description:
      'Stay connected with complimentary high-speed internet access in all our properties.',
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description:
      'Our dedicated team is available around the clock to assist with any issues or questions.',
  },
];

const FloatingOrb = ({
  className,
  size,
  delay,
  duration,
  xMovement,
  yMovement,
}: {
  className: string;
  size: string;
  delay: number;
  duration: number;
  xMovement: number[];
  yMovement: number[];
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={`absolute rounded-full blur-3xl opacity-20 ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <motion.div
      className={`absolute rounded-full blur-3xl ${className}`}
      style={{ width: size, height: size }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0.1, 0.4, 0.1],
        x: xMovement,
        y: yMovement,
      }}
      transition={{
        duration: duration,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: 'reverse',
        ease: 'easeInOut',
        delay: delay,
      }}
    />
  );
};

const GlowingBackground = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-ring/5" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Main gradient background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-ring/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />

      {/* Animated gradient overlays */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-chart-1/5 via-transparent to-chart-2/5"
        animate={{
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute inset-0 bg-gradient-to-bl from-chart-3/5 via-transparent to-chart-4/5"
        animate={{
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: 'reverse',
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      {/* Large glowing orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-ring/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, -80, 0],
          y: [0, 60, 0],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: 'reverse',
          ease: 'easeInOut',
          delay: 3,
        }}
      />

      <motion.div
        className="absolute top-1/2 right-1/3 w-64 h-64 bg-chart-1/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.2, 0.6, 0.2],
          x: [0, -120, 0],
          y: [0, 80, 0],
        }}
        transition={{
          duration: 18,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: 'reverse',
          ease: 'easeInOut',
          delay: 1,
        }}
      />
    </div>
  );
};

const Particles = ({ count = 30 }: { count?: number }) => {
  const [particles, setParticles] = useState<React.ReactNode[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const newParticles = Array.from({ length: count }).map((_, i) => {
      const size = Math.random() * 3 + 1;
      const delay = Math.random() * 10;
      const duration = Math.random() * 15 + 10;
      const x = Math.random() * 100;
      const y = Math.random() * 100;

      return (
        <motion.div
          key={i}
          className="absolute rounded-full bg-primary/30"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${x}%`,
            top: `${y}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0, 1.5, 0],
            x: [0, Math.random() * 40 - 20],
            y: [0, Math.random() * 40 - 20],
          }}
          transition={{
            duration: duration,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: 'loop',
            ease: 'easeInOut',
            delay: delay,
          }}
        />
      );
    });
    setParticles(newParticles);
  }, [count, mounted]);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 pointer-events-none">{particles}</div>
  );
};

export default function Landing() {
  const router = useRouter();
  const { scrollYProgress } = useScroll();
  const [mounted, setMounted] = useState(false);

  const [heroRef, heroInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });
  const [featureRef, featureInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });
  const [cardsRef, cardsInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });
  const [locationRef, locationInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });
  const [bespokeRef, bespokeInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });
  const [corporateRef, corporateInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });
  const [testimonialRef, testimonialInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });
  const [blogRef, blogInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });
  const [linksRef, linksInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });
  const [ctaRef, ctaInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const heroImageY = useTransform(scrollYProgress, [0, 0.2], [0, 50]);
  const featureImageY = useTransform(scrollYProgress, [0.1, 0.3], [50, 0]);
  const bespokeScale = useTransform(scrollYProgress, [0.4, 0.6], [1, 1.1]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Enhanced glowing background */}
      <GlowingBackground />

      {/* Floating particles */}
      <Particles count={40} />

      {/* Global floating orbs */}
      <FloatingOrb
        className="bg-primary/20 left-[10%] top-[5%]"
        size="300px"
        delay={0}
        duration={15}
        xMovement={[0, 50, 0]}
        yMovement={[0, 30, 0]}
      />
      <FloatingOrb
        className="bg-ring/20 right-[15%] top-[20%]"
        size="250px"
        delay={2}
        duration={18}
        xMovement={[0, -40, 0]}
        yMovement={[0, 20, 0]}
      />
      <FloatingOrb
        className="bg-chart-1/20 left-[20%] bottom-[10%]"
        size="200px"
        delay={1}
        duration={20}
        xMovement={[0, 30, 0]}
        yMovement={[0, -40, 0]}
      />
      <FloatingOrb
        className="bg-chart-2/20 right-[5%] bottom-[30%]"
        size="350px"
        delay={3}
        duration={25}
        xMovement={[0, -20, 0]}
        yMovement={[0, -30, 0]}
      />

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        initial="hidden"
        animate={heroInView ? 'visible' : 'hidden'}
        variants={fadeIn}
        className="py-16 md:py-24 bg-background relative z-10"
      >
        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div
              variants={fadeInUp}
              className="md:w-1/2 mb-10 md:mb-0 md:pr-10 relative z-10"
            >
              {mounted && (
                <motion.div
                  className="absolute -left-10 -top-10 w-32 h-32 rounded-full bg-primary/20 blur-2xl"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: 'reverse',
                    ease: 'easeInOut',
                  }}
                />
              )}

              <motion.h1
                className="text-4xl md:text-5xl font-bold mb-6 text-primary relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="relative inline-block">
                  We rent your property
                  {mounted && (
                    <motion.span
                      className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-ring/50 rounded-full"
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: '100%', opacity: 1 }}
                      transition={{ delay: 0.8, duration: 1.2 }}
                    />
                  )}
                </span>
              </motion.h1>

              <motion.p
                className="text-muted-foreground mb-8 text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Find your perfect rental home with ease. We offer a wide range
                of properties to suit your needs and budget.
              </motion.p>

              <motion.div
                whileHover="hover"
                initial="rest"
                variants={buttonHover}
              >
                <Button
                  className="bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer relative overflow-hidden group shadow-lg shadow-primary/25"
                  onClick={() => router.push('/signin')}
                >
                  {mounted && (
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary-foreground/20 to-primary/0"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.8 }}
                    />
                  )}
                  <span className="relative z-10">Get Started</span>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="md:w-1/2 relative"
              style={mounted ? { y: heroImageY } : {}}
            >
              {mounted && (
                <motion.div
                  className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-ring/20 blur-2xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.4, 0.7, 0.4],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: 'reverse',
                    ease: 'easeInOut',
                    delay: 1,
                  }}
                />
              )}

              <motion.div
                className="rounded-xl overflow-hidden shadow-2xl relative group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
              >
                {mounted && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-ring/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                )}

                <Image
                  src="/Hero.jpg"
                  alt="Happy couple on sofa"
                  width={600}
                  height={500}
                  className="w-full h-auto object-cover"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Feature Highlight Section */}
      <motion.section
        ref={featureRef}
        initial="hidden"
        animate={featureInView ? 'visible' : 'hidden'}
        variants={fadeIn}
        className="py-16 md:py-24 bg-accent/50 relative"
      >
        {mounted && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-accent/80 via-accent/40 to-accent/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
        )}

        <FloatingOrb
          className="bg-chart-3/20 left-[5%] top-[30%]"
          size="200px"
          delay={1.5}
          duration={12}
          xMovement={[0, 40, 0]}
          yMovement={[0, -20, 0]}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div
              variants={fadeInUp}
              className="md:w-1/2 mb-10 md:mb-0 order-2 md:order-1"
              style={mounted ? { y: featureImageY } : {}}
            >
              <motion.div
                className="rounded-xl overflow-hidden relative group"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.5 }}
              >
                {mounted && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-bl from-ring/30 to-chart-1/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                )}

                <Image
                  src="/Flexible.jpg"
                  alt="Workspace"
                  width={500}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </motion.div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="md:w-1/2 md:pl-16 order-1 md:order-2 relative"
            >
              {mounted && (
                <motion.div
                  className="absolute right-10 top-20 w-24 h-24 rounded-full bg-ring/20 blur-xl"
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 7,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: 'reverse',
                    ease: 'easeInOut',
                    delay: 0.5,
                  }}
                />
              )}

              <motion.h2
                className="text-3xl md:text-4xl font-bold text-headline mb-6 text-primary relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="relative inline-block">
                  The future is flexible
                  {mounted && (
                    <motion.span
                      className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-ring/50 rounded-full"
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: '100%', opacity: 1 }}
                      transition={{ delay: 0.8, duration: 1.2 }}
                    />
                  )}
                </span>
              </motion.h2>

              <motion.p
                className="text-muted-foreground mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Our properties are designed to adapt to your lifestyle. Whether
                you&apos;re looking for a short-term stay or a long-term home,
                we have options that fit your needs.
              </motion.p>

              <motion.div
                whileHover="hover"
                initial="rest"
                variants={buttonHover}
              >
                <Button
                  className="bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer relative overflow-hidden group shadow-lg shadow-primary/25"
                  onClick={() => router.push('/blog')}
                >
                  {mounted && (
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary-foreground/20 to-primary/0"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.8 }}
                    />
                  )}
                  <span className="relative z-10">Learn More</span>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Feature Cards Grid */}
      <motion.section
        ref={cardsRef}
        initial="hidden"
        animate={cardsInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="py-16 md:py-24 bg-background relative"
      >
        {mounted && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
        )}

        <FloatingOrb
          className="bg-chart-4/20 right-[15%] top-[10%]"
          size="180px"
          delay={2}
          duration={14}
          xMovement={[0, -30, 0]}
          yMovement={[0, 40, 0]}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-headline mb-4 text-primary relative inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="relative inline-block">
                Our Features
                {mounted && (
                  <motion.span
                    className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-ring/50 rounded-full"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: '100%', opacity: 1 }}
                    transition={{ delay: 0.8, duration: 1.2 }}
                  />
                )}
              </span>
            </motion.h2>

            <motion.p
              className="text-muted-foreground max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Explore our range of features designed to make your rental
              experience seamless and enjoyable.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featureCards.map((card, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover="hover"
                initial="rest"
                custom={index}
                viewport={{ once: false, amount: 0.3 }}
              >
                <motion.div
                  variants={cardHover}
                  className="bg-accent/80 rounded-xl h-full relative overflow-hidden group backdrop-blur-sm border border-primary/10"
                >
                  {mounted && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-ring/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    />
                  )}

                  <CardContent className="p-6 relative z-10">
                    <motion.div
                      className="w-12 h-12 bg-background rounded-full flex items-center justify-center mb-4 relative overflow-hidden shadow-lg"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      {mounted && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-ring/20"
                          animate={{
                            x: ['-100%', '100%'],
                          }}
                          transition={{
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: 'loop',
                            duration: 3,
                            ease: 'linear',
                          }}
                        />
                      )}
                      <card.icon
                        className="text-primary relative z-10"
                        size={24}
                      />
                    </motion.div>

                    <CardTitle className="text-xl font-semibold text-headline mb-2">
                      {card.title}
                    </CardTitle>

                    <p className="text-muted-foreground">{card.description}</p>
                  </CardContent>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Location Picker */}
      <motion.section
        ref={locationRef}
        initial="hidden"
        animate={locationInView ? 'visible' : 'hidden'}
        variants={fadeIn}
        className="py-16 md:py-24 bg-background relative"
      >
        {mounted && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-ring/5 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
        )}

        <FloatingOrb
          className="bg-chart-5/20 left-[25%] bottom-[10%]"
          size="220px"
          delay={1}
          duration={16}
          xMovement={[0, 50, 0]}
          yMovement={[0, -30, 0]}
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.h2
            className="text-3xl font-bold text-headline text-center mb-12 text-primary relative inline-block mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="relative inline-block">
              Choose your location
              {mounted && (
                <motion.span
                  className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-ring/50 rounded-full"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: '100%', opacity: 1 }}
                  transition={{ delay: 0.8, duration: 1.2 }}
                />
              )}
            </span>
          </motion.h2>

          <div className="relative">
            <motion.div
              variants={fadeInUp}
              className="flex overflow-x-auto pb-8 space-x-6 scrollbar-hide"
            >
              {[
                'Shoreditch',
                'City of London',
                'The West End',
                'Kensington',
                'Kingston Upon Thames',
                'Hammersmith',
              ].map((location, index) => (
                <motion.div
                  key={index}
                  className="flex-shrink-0 w-48 md:w-64"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Card className="rounded-xl overflow-hidden shadow-lg mb-3 relative group border border-primary/10">
                    {mounted && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-ring/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                      />
                    )}

                    <Image
                      src={`/placeholder.svg?height=200&width=250&text=${location}`}
                      alt={location}
                      width={250}
                      height={200}
                      className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </Card>
                  <h3 className="text-headline font-medium text-center">
                    {location}
                  </h3>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="flex justify-center mt-8">
            <motion.div
              whileHover="hover"
              initial="rest"
              variants={buttonHover}
            >
              <Button
                variant="outline"
                className="cursor-pointer text-primary border-primary hover:bg-accent relative overflow-hidden group shadow-lg shadow-primary/10"
                onClick={() => router.push('/apartments')}
              >
                {mounted && (
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/50 to-accent/0"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.8 }}
                  />
                )}
                <span className="relative z-10">View all spaces</span>
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Bespoke Spaces Section */}
      <motion.section
        ref={bespokeRef}
        initial="hidden"
        animate={bespokeInView ? 'visible' : 'hidden'}
        variants={fadeIn}
        className="py-16 md:py-24 relative"
      >
        <motion.div
          className="absolute inset-0 bg-black/60 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />

        {mounted && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-ring/40 mix-blend-overlay z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          />
        )}

        <div className="relative z-20 container mx-auto px-4 text-center text-white">
          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold mb-8 relative inline-block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {mounted && (
              <>
                <motion.span
                  className="absolute -left-8 -top-8 w-16 h-16 rounded-full bg-white/20 blur-xl"
                  animate={{
                    opacity: [0.3, 0.8, 0.3],
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: 'reverse',
                    ease: 'easeInOut',
                  }}
                />

                <motion.span
                  className="absolute -right-8 -bottom-8 w-16 h-16 rounded-full bg-white/20 blur-xl"
                  animate={{
                    opacity: [0.3, 0.8, 0.3],
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: 'reverse',
                    ease: 'easeInOut',
                    delay: 1,
                  }}
                />
              </>
            )}

            <span className="relative inline-block">
              Bespoke spaces
              {mounted && (
                <motion.span
                  className="absolute -bottom-2 left-0 w-full h-1 bg-white/60 rounded-full"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: '100%', opacity: 1 }}
                  transition={{ delay: 0.8, duration: 1.2 }}
                />
              )}
            </span>
          </motion.h2>

          <motion.div variants={fadeInUp} whileHover="hover" initial="rest">
            <Button
              onClick={() => router.push('/apartments')}
              className="bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer relative overflow-hidden group shadow-2xl shadow-primary/30"
            >
              {mounted && (
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-primary-foreground/0 via-primary-foreground/30 to-primary-foreground/0"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.8 }}
                />
              )}
              <span className="relative z-10">Start booking</span>
            </Button>
          </motion.div>
        </div>

        <motion.div
          className="absolute inset-0 z-0"
          style={mounted ? { scale: bespokeScale } : {}}
        >
          <Image
            src="/couch.jpg"
            alt="Bespoke spaces"
            fill
            className="object-cover"
          />
        </motion.div>
      </motion.section>

      {/* Corporate Partnerships */}
      <motion.section
        ref={corporateRef}
        initial="hidden"
        animate={corporateInView ? 'visible' : 'hidden'}
        variants={fadeIn}
        className="py-16 md:py-24 bg-background relative"
      >
        {mounted && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-chart-1/5 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
        )}

        <FloatingOrb
          className="bg-chart-2/20 right-[10%] top-[20%]"
          size="250px"
          delay={2.5}
          duration={18}
          xMovement={[0, -40, 0]}
          yMovement={[0, 30, 0]}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-headline mb-4 text-primary relative inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="relative inline-block">
                Corporate Partnerships
                {mounted && (
                  <motion.span
                    className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-ring/50 rounded-full"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: '100%', opacity: 1 }}
                    transition={{ delay: 0.8, duration: 1.2 }}
                  />
                )}
              </span>
            </motion.h2>

            <motion.p
              className="text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              We work with businesses of all sizes to provide housing solutions
              that meet their needs.
            </motion.p>
          </div>

          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {[
              {
                icon: Search,
                title: 'Booking Manager',
                description:
                  'Dedicated booking manager to handle all your accommodation needs.',
              },
              {
                icon: UserPlus,
                title: 'Account Manager',
                description:
                  'Personal account manager to ensure your experience is seamless.',
              },
              {
                icon: FileText,
                title: 'Flexible Terms',
                description:
                  'Customizable rental terms to accommodate your business needs.',
              },
            ].map((card, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover="hover"
                initial="rest"
                custom={index}
              >
                <motion.div
                  variants={cardHover}
                  className="bg-accent/80 rounded-xl h-full relative overflow-hidden group backdrop-blur-sm border border-primary/10"
                >
                  {mounted && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-tr from-chart-1/20 to-ring/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    />
                  )}

                  <CardContent className="p-6 text-center relative z-10">
                    <motion.div
                      className="w-12 h-12 bg-background rounded-full flex items-center justify-center mx-auto mb-4 relative overflow-hidden shadow-lg"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      {mounted && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-chart-1/20 via-transparent to-ring/20"
                          animate={{
                            x: ['-100%', '100%'],
                          }}
                          transition={{
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: 'loop',
                            duration: 3,
                            ease: 'linear',
                          }}
                        />
                      )}
                      <card.icon
                        className="text-primary relative z-10"
                        size={24}
                      />
                    </motion.div>

                    <CardTitle className="text-xl font-semibold text-headline mb-2">
                      {card.title}
                    </CardTitle>

                    <p className="text-muted-foreground">{card.description}</p>
                  </CardContent>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        ref={testimonialRef}
        initial="hidden"
        animate={testimonialInView ? 'visible' : 'hidden'}
        variants={fadeIn}
        className="py-16 md:py-24 bg-accent/50 relative"
      >
        {mounted && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-accent/80 via-accent/40 to-accent/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
        )}

        <FloatingOrb
          className="bg-chart-3/20 left-[15%] top-[20%]"
          size="180px"
          delay={1}
          duration={15}
          xMovement={[0, 30, 0]}
          yMovement={[0, -20, 0]}
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-headline text-center mb-16 text-primary relative inline-block mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="relative inline-block">
              What our partners think
              {mounted && (
                <motion.span
                  className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-ring/50 rounded-full"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: '100%', opacity: 1 }}
                  transition={{ delay: 0.8, duration: 1.2 }}
                />
              )}
            </span>
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {[
              {
                name: 'Annie',
                role: 'Marketing Director',
                avatar: '/placeholder.svg?height=48&width=48&text=A',
                testimonial:
                  "The flexibility and quality of the properties have been perfect for our team's needs. The booking process is seamless and the support team is always responsive.",
              },
              {
                name: 'Gabriel',
                role: 'Business Owner',
                avatar: '/placeholder.svg?height=48&width=48&text=G',
                testimonial:
                  "We've been using RentEase for our corporate housing needs for over a year now. The properties are always clean, well-maintained, and in great locations.",
              },
              {
                name: 'Sarah',
                role: 'HR Manager',
                avatar: '/placeholder.svg?height=48&width=48&text=S',
                testimonial:
                  'Finding accommodation for our international employees used to be a challenge. RentEase has simplified the process and provided excellent options.',
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover="hover"
                initial="rest"
                custom={index}
                className={index === 2 ? 'hidden lg:block' : ''}
              >
                <motion.div
                  variants={cardHover}
                  className="rounded-xl p-8 shadow-lg h-full bg-background/80 backdrop-blur-sm relative overflow-hidden group border border-primary/10"
                >
                  {mounted && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-tr from-chart-2/20 to-ring/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    />
                  )}

                  <CardContent className="p-0 relative z-10">
                    <div className="flex items-center mb-6">
                      <motion.div
                        className="w-12 h-12 rounded-full bg-gray-200 mr-4 overflow-hidden shadow-lg"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Image
                          src={testimonial.avatar || '/placeholder.svg'}
                          alt={testimonial.name}
                          width={48}
                          height={48}
                        />
                      </motion.div>
                      <div>
                        <h4 className="font-semibold text-headline">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">
                      {testimonial.testimonial}
                    </p>
                  </CardContent>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          <div className="flex justify-center mt-8 space-x-2">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                variant="outline"
                size="icon"
                className="cursor-pointer rounded-full bg-white text-primary relative overflow-hidden shadow-lg"
              >
                {mounted && (
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: 'loop',
                      duration: 3,
                      ease: 'linear',
                    }}
                  />
                )}
                <ChevronLeft size={20} className="relative z-10" />
                <span className="sr-only">Previous testimonial</span>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                size="icon"
                className="cursor-pointer rounded-full bg-primary text-white relative overflow-hidden shadow-lg"
              >
                {mounted && (
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-primary-foreground/0 via-primary-foreground/30 to-primary-foreground/0"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: 'loop',
                      duration: 3,
                      ease: 'linear',
                    }}
                  />
                )}
                <ChevronRight size={20} className="relative z-10" />
                <span className="sr-only">Next testimonial</span>
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Blog Preview Section */}
      <motion.section
        ref={blogRef}
        initial="hidden"
        animate={blogInView ? 'visible' : 'hidden'}
        variants={fadeIn}
        className="py-16 md:py-24 bg-background relative"
      >
        {mounted && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-chart-4/5 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
        )}

        <FloatingOrb
          className="bg-chart-5/20 right-[20%] bottom-[15%]"
          size="200px"
          delay={2}
          duration={16}
          xMovement={[0, -40, 0]}
          yMovement={[0, 20, 0]}
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-headline text-center mb-16 text-primary relative inline-block mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="relative inline-block">
              Read our blog
              {mounted && (
                <motion.span
                  className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-ring/50 rounded-full"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: '100%', opacity: 1 }}
                  transition={{ delay: 0.8, duration: 1.2 }}
                />
              )}
            </span>
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                title: 'Turpis elit in dictum eget eget',
                image: '/placeholder.svg?height=200&width=400&text=Blog+1',
                readTime: '1 min read',
              },
              {
                title: 'Faucibus sagittis sit sit purus ultricies et',
                image: '/placeholder.svg?height=200&width=400&text=Blog+2',
                readTime: '2 min read',
              },
              {
                title: 'Risquis gravida sed sit lacus sagittis',
                image: '/placeholder.svg?height=200&width=400&text=Blog+3',
                readTime: '3 min read',
              },
            ].map((blog, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover="hover"
                initial="rest"
                custom={index}
              >
                <motion.div
                  variants={cardHover}
                  className="rounded-xl overflow-hidden shadow-lg h-full bg-background/80 backdrop-blur-sm relative group border border-primary/10"
                >
                  {mounted && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-tr from-chart-4/20 to-ring/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    />
                  )}

                  <div className="relative overflow-hidden">
                    <Image
                      src={blog.image || '/placeholder.svg'}
                      alt={blog.title}
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  <CardContent className="p-6 relative z-10">
                    <CardTitle className="text-xl font-semibold text-headline mb-2">
                      {blog.title}
                    </CardTitle>
                    <p className="text-muted-foreground mb-4">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed do eiusmod tempor incididunt ut labore.
                    </p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock size={16} className="mr-2" />
                      {blog.readTime}
                    </div>
                  </CardContent>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          <div className="flex justify-center mt-10">
            <motion.div
              whileHover="hover"
              initial="rest"
              variants={buttonHover}
            >
              <Button
                variant="outline"
                className="cursor-pointer text-primary border-primary hover:bg-accent relative overflow-hidden group shadow-lg shadow-primary/10"
                onClick={() => router.push('/blog')}
              >
                {mounted && (
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/50 to-accent/0"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.8 }}
                  />
                )}
                <span className="relative z-10">View all posts</span>
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Useful Links */}
      <motion.section
        ref={linksRef}
        initial="hidden"
        animate={linksInView ? 'visible' : 'hidden'}
        variants={fadeIn}
        className="py-16 md:py-24 bg-background relative"
      >
        {mounted && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-ring/5 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
        )}

        <div className="container mx-auto px-4 relative z-10">
          <motion.h2
            className="text-3xl font-bold text-headline mb-12 text-primary relative inline-block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="relative inline-block">
              Useful links
              {mounted && (
                <motion.span
                  className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-ring/50 rounded-full"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: '100%', opacity: 1 }}
                  transition={{ delay: 0.8, duration: 1.2 }}
                />
              )}
            </span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div variants={fadeInUp} className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-headline mb-4">
                  More London Apartments
                </h3>
                <ul className="space-y-2">
                  {[
                    'Apartments in Shoreditch',
                    'Apartments in City of London',
                    'Apartments in West End',
                    'Apartments in Kensington',
                  ].map((link, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <Link
                        href="#"
                        className="text-muted-foreground hover:text-primary transition-colors relative group"
                      >
                        {mounted && (
                          <motion.span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary/50 to-ring/50 group-hover:w-full transition-all duration-300" />
                        )}
                        {link}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-headline mb-4">
                  Suitable for Families
                </h3>
                <ul className="space-y-2">
                  {[
                    'Apartments with 2+ Bedrooms',
                    'Apartments near Schools',
                    'Apartments with Garden',
                  ].map((link, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <Link
                        href="#"
                        className="text-muted-foreground hover:text-primary transition-colors relative group"
                      >
                        {mounted && (
                          <motion.span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary/50 to-ring/50 group-hover:w-full transition-all duration-300" />
                        )}
                        {link}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-headline mb-4">
                  Apartments with Balcony
                </h3>
                <ul className="space-y-2">
                  {[
                    'Apartments with Balcony in Shoreditch',
                    'Apartments with Balcony in City',
                    'Apartments with Balcony in West End',
                  ].map((link, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <Link
                        href="#"
                        className="text-muted-foreground hover:text-primary transition-colors relative group"
                      >
                        {mounted && (
                          <motion.span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary/50 to-ring/50 group-hover:w-full transition-all duration-300" />
                        )}
                        {link}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-headline mb-4">
                  Apartments with Parking
                </h3>
                <ul className="space-y-2">
                  {[
                    'Apartments with Parking in Shoreditch',
                    'Apartments with Parking in City',
                    'Apartments with Parking in West End',
                  ].map((link, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <Link
                        href="#"
                        className="text-muted-foreground hover:text-primary transition-colors relative group"
                      >
                        {mounted && (
                          <motion.span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary/50 to-ring/50 group-hover:w-full transition-all duration-300" />
                        )}
                        {link}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Final CTA Section */}
      <motion.section
        ref={ctaRef}
        initial="hidden"
        animate={ctaInView ? 'visible' : 'hidden'}
        variants={fadeIn}
        className="py-16 md:py-24 bg-accent/50 relative"
      >
        {mounted && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-accent/80 via-accent/40 to-accent/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
        )}

        <FloatingOrb
          className="bg-chart-3/20 left-[10%] top-[30%]"
          size="220px"
          delay={1.5}
          duration={14}
          xMovement={[0, 40, 0]}
          yMovement={[0, -30, 0]}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div
              variants={fadeInUp}
              className="md:w-1/2 mb-10 md:mb-0 md:pr-10 relative"
            >
              {mounted && (
                <motion.div
                  className="absolute left-10 top-20 w-24 h-24 rounded-full bg-chart-5/20 blur-xl"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 7,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: 'reverse',
                    ease: 'easeInOut',
                    delay: 0.2,
                  }}
                />
              )}

              <motion.h2
                className="text-3xl md:text-4xl font-bold text-headline mb-6 text-primary relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="relative inline-block">
                  Dictum nunc
                  {mounted && (
                    <motion.span
                      className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-ring/50 rounded-full"
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: '100%', opacity: 1 }}
                      transition={{ delay: 0.8, duration: 1.2 }}
                    />
                  )}
                </span>
              </motion.h2>

              <motion.p
                className="text-muted-foreground mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                We make it easy to find your perfect rental property. Our team
                is dedicated to providing exceptional service and support
                throughout your rental journey.
              </motion.p>

              <motion.div
                whileHover="hover"
                initial="rest"
                variants={buttonHover}
              >
                <Button
                  className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 relative overflow-hidden group shadow-lg shadow-primary/25"
                  onClick={() => router.push('/contact-us')}
                >
                  {mounted && (
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary-foreground/20 to-primary/0"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.8 }}
                    />
                  )}
                  <span className="relative z-10">Contact Us</span>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div variants={fadeInUp} className="md:w-1/2 relative">
              {mounted && (
                <motion.div
                  className="absolute right-10 bottom-20 w-40 h-40 rounded-full bg-chart-2/20 blur-xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.4, 0.7, 0.4],
                  }}
                  transition={{
                    duration: 9,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: 'reverse',
                    ease: 'easeInOut',
                    delay: 0.3,
                  }}
                />
              )}

              <motion.div
                className="rounded-xl overflow-hidden shadow-2xl relative group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
              >
                {mounted && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-tr from-chart-2/30 to-ring/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                )}

                <Image
                  src="/placeholder.svg?height=400&width=500"
                  alt="Businesswoman smiling"
                  width={500}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
