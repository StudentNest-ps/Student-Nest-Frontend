'use client';
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

// Animation variants
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

// Enhanced animation variants
const glowPulse = {
  initial: { opacity: 0.5, scale: 1 },
  animate: {
    opacity: [0.5, 0.8, 0.5],
    scale: [1, 1.05, 1],
    transition: {
      duration: 8,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'easeInOut',
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

// Feature card data
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

// Floating Orb Component
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
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl ${className}`}
      style={{ width: size, height: size }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0.1, 0.3, 0.1],
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

// Particle Component
const Particles = ({
  count = 20,
  className,
}: {
  count?: number;
  className?: string;
}) => {
  const particles = Array.from({ length: count }).map((_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary/10 dark:bg-primary/20"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          initial={{ opacity: 0, y: 0 }}
          animate={{
            opacity: [0, 0.5, 0],
            y: -100,
          }}
          transition={{
            duration: particle.duration,
            repeat: Number.POSITIVE_INFINITY,
            delay: particle.delay,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
};

export default function Landing() {
  const router = useRouter();
  const { scrollYProgress } = useScroll();

  // Intersection observer hooks for different sections
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

  // Parallax effects
  const heroImageY = useTransform(scrollYProgress, [0, 0.2], [0, 50]);
  const featureImageY = useTransform(scrollYProgress, [0.1, 0.3], [50, 0]);
  const bespokeScale = useTransform(scrollYProgress, [0.4, 0.6], [1, 1.1]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Global floating orbs */}
      <FloatingOrb
        className="bg-primary/10 dark:bg-primary/20 left-[10%] top-[5%]"
        size="300px"
        delay={0}
        duration={15}
        xMovement={[0, 50, 0]}
        yMovement={[0, 30, 0]}
      />
      <FloatingOrb
        className="bg-ring/10 dark:bg-ring/20 right-[15%] top-[20%]"
        size="250px"
        delay={2}
        duration={18}
        xMovement={[0, -40, 0]}
        yMovement={[0, 20, 0]}
      />
      <FloatingOrb
        className="bg-chart-1/10 dark:bg-chart-1/20 left-[20%] bottom-[10%]"
        size="200px"
        delay={1}
        duration={20}
        xMovement={[0, 30, 0]}
        yMovement={[0, -40, 0]}
      />
      <FloatingOrb
        className="bg-chart-2/10 dark:bg-chart-2/20 right-[5%] bottom-[30%]"
        size="350px"
        delay={3}
        duration={25}
        xMovement={[0, -20, 0]}
        yMovement={[0, -30, 0]}
      />

      {/* Particles effect */}
      <Particles count={30} className="z-0" />

      {/* 2. Hero Section */}
      <motion.section
        ref={heroRef}
        initial="hidden"
        animate={heroInView ? 'visible' : 'hidden'}
        variants={fadeIn}
        className="py-16 md:py-24 bg-background relative z-10"
      >
        {/* Section-specific glowing effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent dark:from-primary/10 dark:via-transparent dark:to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />

        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div
              variants={fadeInUp}
              className="md:w-1/2 mb-10 md:mb-0 md:pr-10 relative z-10"
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="absolute -left-10 -top-10 w-20 h-20 rounded-full bg-primary/10 dark:bg-primary/20 blur-xl"
              />

              <motion.h1
                className="text-4xl md:text-5xl font-bold mb-6 text-primary relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="relative inline-block">
                  We rent your property
                  <motion.span
                    className="absolute -bottom-2 left-0 w-full h-1 bg-primary/30 dark:bg-primary/50 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                  />
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
                  className="bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer relative overflow-hidden group"
                  onClick={() => router.push('/signin')}
                >
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary-foreground/20 to-primary/0 dark:from-primary/0 dark:via-primary-foreground/10 dark:to-primary/0"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.8 }}
                  />
                  Get Started
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="md:w-1/2 relative"
              style={{ y: heroImageY }}
            >
              <motion.div
                className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-ring/10 dark:bg-ring/20 blur-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 1 }}
              />

              <motion.div
                className="rounded-xl overflow-hidden shadow-lg relative"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent dark:from-primary/30 dark:to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 z-10" />

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

      {/* 4. Feature Highlight Section */}
      <motion.section
        ref={featureRef}
        initial="hidden"
        animate={featureInView ? 'visible' : 'hidden'}
        variants={fadeIn}
        className="py-16 md:py-24 bg-accent relative"
      >
        {/* Section-specific glowing effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-accent via-accent/50 to-accent dark:from-accent/80 dark:via-accent dark:to-accent/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />

        <FloatingOrb
          className="bg-chart-3/10 dark:bg-chart-3/20 left-[5%] top-[30%]"
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
              style={{ y: featureImageY }}
            >
              <motion.div
                className="rounded-xl overflow-hidden relative"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div className="absolute inset-0 bg-gradient-to-bl from-ring/20 to-transparent dark:from-ring/30 dark:to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 z-10" />

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
              className="md:w-1/2 md:pl-16 order-1 md:order-2"
            >
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="absolute right-10 top-20 w-20 h-20 rounded-full bg-ring/10 dark:bg-ring/20 blur-xl"
              />

              <motion.h2
                className="text-3xl md:text-4xl font-bold text-headline mb-6 text-primary relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="relative inline-block">
                  The future is flexible
                  <motion.span
                    className="absolute -bottom-2 left-0 w-full h-1 bg-primary/30 dark:bg-primary/50 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                  />
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
                  className="bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer relative overflow-hidden group"
                  onClick={() => router.push('/blog')}
                >
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary-foreground/20 to-primary/0 dark:from-primary/0 dark:via-primary-foreground/10 dark:to-primary/0"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.8 }}
                  />
                  Learn More
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* 5. Feature Cards Grid */}
      <motion.section
        ref={cardsRef}
        initial="hidden"
        animate={cardsInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="py-16 md:py-24 bg-background relative"
      >
        {/* Section-specific glowing effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent dark:from-transparent dark:via-primary/10 dark:to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />

        <FloatingOrb
          className="bg-chart-4/10 dark:bg-chart-4/20 right-[15%] top-[10%]"
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
                <motion.span
                  className="absolute -bottom-2 left-0 w-full h-1 bg-primary/30 dark:bg-primary/50 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                />
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
                  className="bg-accent rounded-xl h-full relative overflow-hidden group"
                >
                  <motion.div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent dark:from-primary/20 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <CardContent className="p-6 relative z-10">
                    <motion.div
                      className="w-12 h-12 bg-background rounded-full flex items-center justify-center mb-4 relative overflow-hidden"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 dark:from-primary/20 dark:via-transparent dark:to-primary/20"
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

      {/* 6. Location Picker */}
      <motion.section
        ref={locationRef}
        initial="hidden"
        animate={locationInView ? 'visible' : 'hidden'}
        variants={fadeIn}
        className="py-16 md:py-24 bg-background relative"
      >
        {/* Section-specific glowing effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-ring/5 to-transparent dark:from-transparent dark:via-ring/10 dark:to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />

        <FloatingOrb
          className="bg-chart-5/10 dark:bg-chart-5/20 left-[25%] bottom-[10%]"
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
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-1 bg-primary/30 dark:bg-primary/50 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 0.8, duration: 0.8 }}
              />
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
                  <Card className="rounded-xl overflow-hidden shadow-md mb-3 relative group">
                    <motion.div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent dark:from-primary/30 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

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
                className="cursor-pointer text-primary border-primary hover:bg-accent relative overflow-hidden group"
                onClick={() => router.push('/apartments')}
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/50 to-accent/0 dark:from-accent/0 dark:via-accent/30 dark:to-accent/0"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.8 }}
                />
                View all spaces
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* 7. Bespoke Spaces Section */}
      <motion.section
        ref={bespokeRef}
        initial="hidden"
        animate={bespokeInView ? 'visible' : 'hidden'}
        variants={fadeIn}
        className="py-16 md:py-24 relative"
      >
        <motion.div
          className="absolute inset-0 bg-black/50 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />

        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent dark:from-primary/40 dark:to-transparent mix-blend-overlay z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        />

        <div className="relative z-20 container mx-auto px-4 text-center text-white">
          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold mb-8 relative inline-block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              className="absolute -left-8 -top-8 w-16 h-16 rounded-full bg-white/10 blur-xl"
              animate={{
                opacity: [0.5, 0.8, 0.5],
                scale: [1, 1.05, 1],
                transition: {
                  duration: 8,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                },
              }}
              initial={glowPulse.initial}
            />

            <span className="relative inline-block">
              Bespoke spaces
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-1 bg-white/50 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 0.8, duration: 0.8 }}
              />
            </span>

            <motion.span
              className="absolute -right-8 -bottom-8 w-16 h-16 rounded-full bg-white/10 blur-xl"
              animate={{
                opacity: [0.5, 0.8, 0.5],
                scale: [1, 1.05, 1],
                transition: {
                  duration: 8,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                },
              }}
              initial={glowPulse.initial}
              transition={{ delay: 0.5 }}
            />
          </motion.h2>

          <motion.div variants={fadeInUp} whileHover="hover" initial="rest">
            <Button
              onClick={() => router.push('/apartments')}
              className="bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer relative overflow-hidden group"
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-primary-foreground/0 via-primary-foreground/20 to-primary-foreground/0"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.8 }}
              />
              Start booking
            </Button>
          </motion.div>
        </div>

        <motion.div
          className="absolute inset-0 z-0"
          style={{ scale: bespokeScale }}
        >
          <Image
            src="/couch.jpg"
            alt="Bespoke spaces"
            fill
            className="object-cover"
          />
        </motion.div>
      </motion.section>

      {/* 8. Corporate Partnerships */}
      <motion.section
        ref={corporateRef}
        initial="hidden"
        animate={corporateInView ? 'visible' : 'hidden'}
        variants={fadeIn}
        className="py-16 md:py-24 bg-background relative"
      >
        {/* Section-specific glowing effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-chart-1/5 to-transparent dark:from-transparent dark:via-chart-1/10 dark:to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />

        <FloatingOrb
          className="bg-chart-2/10 dark:bg-chart-2/20 right-[10%] top-[20%]"
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
                <motion.span
                  className="absolute -bottom-2 left-0 w-full h-1 bg-primary/30 dark:bg-primary/50 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                />
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
                  className="bg-accent rounded-xl h-full relative overflow-hidden group"
                >
                  <motion.div className="absolute inset-0 bg-gradient-to-tr from-chart-1/10 to-transparent dark:from-chart-1/20 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <CardContent className="p-6 text-center relative z-10">
                    <motion.div
                      className="w-12 h-12 bg-background rounded-full flex items-center justify-center mx-auto mb-4 relative overflow-hidden"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-chart-1/10 via-transparent to-chart-1/10 dark:from-chart-1/20 dark:via-transparent dark:to-chart-1/20"
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

      {/* 9. Testimonials Section */}
      <motion.section
        ref={testimonialRef}
        initial="hidden"
        animate={testimonialInView ? 'visible' : 'hidden'}
        variants={fadeIn}
        className="py-16 md:py-24 bg-accent relative"
      >
        {/* Section-specific glowing effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-accent via-accent/50 to-accent dark:from-accent/80 dark:via-accent dark:to-accent/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />

        <FloatingOrb
          className="bg-chart-3/10 dark:bg-chart-3/20 left-[15%] top-[20%]"
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
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-1 bg-primary/30 dark:bg-primary/50 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 0.8, duration: 0.8 }}
              />
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
                  className="rounded-xl p-8 shadow-md h-full bg-background relative overflow-hidden group"
                >
                  <motion.div className="absolute inset-0 bg-gradient-to-tr from-chart-2/10 to-transparent dark:from-chart-2/20 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <CardContent className="p-0 relative z-10">
                    <div className="flex items-center mb-6">
                      <motion.div
                        className="w-12 h-12 rounded-full bg-gray-200 mr-4 overflow-hidden"
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
                className="cursor-pointer rounded-full bg-white text-primary relative overflow-hidden"
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 dark:from-primary/0 dark:via-primary/20 dark:to-primary/0"
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
                className="cursor-pointer rounded-full bg-primary text-white relative overflow-hidden"
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-primary-foreground/0 via-primary-foreground/20 to-primary-foreground/0"
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
                <ChevronRight size={20} className="relative z-10" />
                <span className="sr-only">Next testimonial</span>
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* 10. Blog Preview Section */}
      <motion.section
        ref={blogRef}
        initial="hidden"
        animate={blogInView ? 'visible' : 'hidden'}
        variants={fadeIn}
        className="py-16 md:py-24 bg-background relative"
      >
        {/* Section-specific glowing effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-chart-4/5 to-transparent dark:from-transparent dark:via-chart-4/10 dark:to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />

        <FloatingOrb
          className="bg-chart-5/10 dark:bg-chart-5/20 right-[20%] bottom-[15%]"
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
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-1 bg-primary/30 dark:bg-primary/50 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 0.8, duration: 0.8 }}
              />
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
                  className="rounded-xl overflow-hidden shadow-md h-full bg-background relative group"
                >
                  <motion.div className="absolute inset-0 bg-gradient-to-tr from-chart-4/10 to-transparent dark:from-chart-4/20 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

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
                className="cursor-pointer text-primary border-primary hover:bg-accent relative overflow-hidden group"
                onClick={() => router.push('/blog')}
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/50 to-accent/0 dark:from-accent/0 dark:via-accent/30 dark:to-accent/0"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.8 }}
                />
                View all posts
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* 11. Useful Links */}
      <motion.section
        ref={linksRef}
        initial="hidden"
        animate={linksInView ? 'visible' : 'hidden'}
        variants={fadeIn}
        className="py-16 md:py-24 bg-background relative"
      >
        {/* Section-specific glowing effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-ring/5 to-transparent dark:from-transparent dark:via-ring/10 dark:to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.h2
            className="text-3xl font-bold text-headline mb-12 text-primary relative inline-block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="relative inline-block">
              Useful links
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-1 bg-primary/30 dark:bg-primary/50 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 0.8, duration: 0.8 }}
              />
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
                        <motion.span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary/30 dark:bg-primary/50 group-hover:w-full transition-all duration-300" />
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
                        <motion.span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary/30 dark:bg-primary/50 group-hover:w-full transition-all duration-300" />
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
                        <motion.span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary/30 dark:bg-primary/50 group-hover:w-full transition-all duration-300" />
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
                        <motion.span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary/30 dark:bg-primary/50 group-hover:w-full transition-all duration-300" />
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

      {/* 12. Final CTA Section */}
      <motion.section
        ref={ctaRef}
        initial="hidden"
        animate={ctaInView ? 'visible' : 'hidden'}
        variants={fadeIn}
        className="py-16 md:py-24 bg-accent relative"
      >
        {/* Section-specific glowing effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-accent via-accent/50 to-accent dark:from-accent/80 dark:via-accent dark:to-accent/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />

        <FloatingOrb
          className="bg-chart-3/10 dark:bg-chart-3/20 left-[10%] top-[30%]"
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
              className="md:w-1/2 mb-10 md:mb-0 md:pr-10"
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="absolute left-10 top-20 w-20 h-20 rounded-full bg-chart-5/10 dark:bg-chart-5/20 blur-xl"
              />

              <motion.h2
                className="text-3xl md:text-4xl font-bold text-headline mb-6 text-primary relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="relative inline-block">
                  Dictum nunc
                  <motion.span
                    className="absolute -bottom-2 left-0 w-full h-1 bg-primary/30 dark:bg-primary/50 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                  />
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
                  className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 relative overflow-hidden group"
                  onClick={() => router.push('/contact-us')}
                >
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary-foreground/20 to-primary/0 dark:from-primary/0 dark:via-primary-foreground/10 dark:to-primary/0"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.8 }}
                  />
                  Contact Us
                </Button>
              </motion.div>
            </motion.div>

            <motion.div variants={fadeInUp} className="md:w-1/2">
              <motion.div
                className="absolute right-10 bottom-20 w-40 h-40 rounded-full bg-chart-2/10 dark:bg-chart-2/20 blur-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 1 }}
              />

              <motion.div
                className="rounded-xl overflow-hidden shadow-lg relative"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div className="absolute inset-0 bg-gradient-to-tr from-chart-2/20 to-transparent dark:from-chart-2/30 dark:to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 z-10" />

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

      {/* 13. Footer */}
    </div>
  );
}
