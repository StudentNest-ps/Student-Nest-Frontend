'use client';
import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Search,
  Calendar,
  Users,
  Home,
  Shield,
  Star,
  ArrowRight,
  CheckCircle,
  MessageCircle,
  Heart,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import DotGrid from '../reactbits/DotGrid';
import SplitText from '../reactbits/SplitText';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: 'easeOut' },
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
      '0 4px 6px -1px rgba(16, 60, 57, 0.1), 0 2px 4px -1px rgba(16, 60, 57, 0.06)',
  },
  hover: {
    scale: 1.05,
    boxShadow:
      '0 20px 25px -5px rgba(16, 60, 57, 0.2), 0 10px 10px -5px rgba(16, 60, 57, 0.1)',
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

const Landing2 = () => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const { scrollYProgress } = useScroll();

  // Intersection observer hooks
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [aboutRef, aboutInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [featuresRef, featuresInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [servicesRef, servicesInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [testimonialsRef, testimonialsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [ctaRef, ctaInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  // Parallax effects
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 50]);
  const aboutY = useTransform(scrollYProgress, [0.1, 0.3], [50, 0]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Hero Section with DotGrid */}
      <motion.section
        ref={heroRef}
        initial="hidden"
        animate={heroInView ? 'visible' : 'hidden'}
        variants={fadeIn}
        className="relative h-auto min-h-[90vh]"
      >
        {/* DotGrid Background */}
        <div className="absolute inset-0">
          <DotGrid
            dotSize={10}
            gap={15}
            baseColor="#103c39"
            activeColor="#103c39"
            proximity={120}
            shockRadius={250}
            shockStrength={5}
            resistance={750}
            returnDuration={1.5}
          />
        </div>

        {/* Floating background elements */}
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 bg-primary/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-32 right-20 w-40 h-40 bg-ring/15 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: 'reverse',
            ease: 'easeInOut',
            delay: 0.1,
          }}
        />

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.div style={{ y: heroY }} className="max-w-4xl mx-auto">
            {/* Main Title with SplitText */}
            <div className="mb-8">
              <SplitText
                text="Student Nest"
                className="text-6xl md:text-8xl font-bold text-primary mb-4"
                delay={30}
                duration={0.4}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 70 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="center"
              />
            </div>

            {/* Subtitle */}
            <motion.h2
              className="text-2xl md:text-3xl font-semibold text-foreground mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              Your Perfect Student Housing Solution
            </motion.h2>

            {/* Description */}
            <motion.p
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              Discover comfortable, affordable, and secure student
              accommodations near top universities. From shared apartments to
              private studios, find your ideal home away from home.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <motion.div
                whileHover="hover"
                initial="rest"
                variants={buttonHover}
              >
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-semibold shadow-lg shadow-primary/25 relative overflow-hidden group"
                  onClick={() => router.push('/signup')}
                >
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-primary-foreground/0 via-primary-foreground/20 to-primary-foreground/0"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.8 }}
                  />
                  <span className="relative z-10 flex items-center gap-2">
                    Find Your Home <Home size={20} />
                  </span>
                </Button>
              </motion.div>

              <motion.div
                whileHover="hover"
                initial="rest"
                variants={buttonHover}
                className="hidden md-block"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-accent px-8 py-3 text-lg font-semibold relative overflow-hidden group"
                  onClick={() =>
                    scrollTo({
                      top: 730,
                      left: 0,
                      behavior: 'smooth',
                    })
                  }
                >
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/50 to-accent/0"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.8 }}
                  />
                  <span className="relative z-10 flex items-center gap-2">
                    Dive In <ArrowRight size={20} />
                  </span>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute hidden md:block bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2"></div>
          </div>
        </motion.div>
      </motion.section>

      {/* About Section */}
      <motion.section
        ref={aboutRef}
        initial="hidden"
        animate={aboutInView ? 'visible' : 'hidden'}
        variants={fadeIn}
        className="py-20 bg-secondary relative"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              variants={fadeInUp}
              className="lg:w-1/2"
              style={{ y: aboutY }}
            >
              <div className="relative">
                <motion.div
                  className="absolute -top-4 -left-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: 'reverse',
                  }}
                />
                <Image
                  src="/placeholder.svg?height=500&width=600&text=Student+Living"
                  alt="Student living"
                  width={600}
                  height={500}
                  className="rounded-2xl shadow-2xl shadow-primary/10"
                />
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="lg:w-1/2">
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Why Choose <span className="text-primary">Student Nest?</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                We understand the unique challenges students face when searching
                for accommodation. That&apos;s why we&apos;ve created a platform
                that prioritizes safety, affordability, and convenience, making
                your transition to university life as smooth as possible.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  'Verified and safe properties near universities',
                  'Flexible lease terms to match academic schedules',
                  '24/7 student support and maintenance',
                  'Affordable pricing with transparent costs',
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <CheckCircle
                      className="text-primary flex-shrink-0"
                      size={20}
                    />
                    <span className="text-foreground">{feature}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                whileHover="hover"
                initial="rest"
                variants={buttonHover}
              >
                <Button
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 font-semibold shadow-lg shadow-primary/25"
                  onClick={() => router.push('/about')}
                >
                  Learn More About Us
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        ref={featuresRef}
        initial="hidden"
        animate={featuresInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="py-20 bg-background relative"
      >
        {/* Background decoration */}
        <motion.div
          className="absolute top-20 right-20 w-32 h-32 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: 'reverse',
          }}
        />

        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              variants={fadeInUp}
              className="text-4xl font-bold text-foreground mb-4"
            >
              Everything You Need for{' '}
              <span className="text-primary">Student Life</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Our comprehensive platform offers all the tools and services you
              need to find, secure, and enjoy your perfect student
              accommodation.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Search,
                title: 'Smart Search',
                description:
                  'Advanced filters to find properties that match your exact needs and budget.',
              },
              {
                icon: Shield,
                title: 'Verified Properties',
                description:
                  'All listings are verified for safety, quality, and legitimacy.',
              },
              {
                icon: Calendar,
                title: 'Flexible Booking',
                description:
                  'Book for semesters, academic years, or custom periods.',
              },
              {
                icon: MessageCircle,
                title: '24/7 Support',
                description:
                  'Round-the-clock assistance for all your housing needs.',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover="hover"
                initial="rest"
                custom={index}
              >
                <motion.div
                  variants={cardHover}
                  className="bg-card rounded-xl p-6 shadow-lg border border-border h-full relative overflow-hidden group"
                >
                  <motion.div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative z-10">
                    <motion.div
                      className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-4"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <feature.icon className="text-primary" size={24} />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-card-foreground mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Services Section */}
      <motion.section
        ref={servicesRef}
        initial="hidden"
        animate={servicesInView ? 'visible' : 'hidden'}
        variants={fadeIn}
        className="py-20 bg-secondary relative"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              variants={fadeInUp}
              className="text-4xl font-bold text-foreground mb-4"
            >
              Our <span className="text-primary">Services</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              From finding your perfect room to ongoing support throughout your
              stay, we&apos;re here to make your student housing experience
              exceptional.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Home,
                title: 'Property Matching',
                description:
                  'Our AI-powered system matches you with properties that fit your preferences, budget, and university location.',
                features: [
                  'Personalized recommendations',
                  'Budget optimization',
                  'Location scoring',
                ],
              },
              {
                icon: Users,
                title: 'Roommate Finder',
                description:
                  'Connect with compatible roommates through our secure matching system based on lifestyle and study habits.',
                features: [
                  'Compatibility matching',
                  'Secure messaging',
                  'Background verification',
                ],
              },
              {
                icon: Heart,
                title: 'Student Support',
                description:
                  'Comprehensive support services to help you settle in and succeed throughout your academic journey.',
                features: [
                  'Move-in assistance',
                  'Academic resources',
                  'Community events',
                ],
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover="hover"
                initial="rest"
                custom={index}
              >
                <motion.div
                  variants={cardHover}
                  className="bg-card rounded-xl p-8 shadow-lg h-full relative overflow-hidden group border border-border"
                >
                  <motion.div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative z-10">
                    <motion.div
                      className="w-16 h-16 bg-accent rounded-xl flex items-center justify-center mb-6"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <service.icon className="text-primary" size={32} />
                    </motion.div>

                    <h3 className="text-2xl font-semibold text-card-foreground mb-4">
                      {service.title}
                    </h3>

                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-center gap-2 text-card-foreground"
                        >
                          <CheckCircle
                            className="text-primary flex-shrink-0"
                            size={16}
                          />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        ref={testimonialsRef}
        initial="hidden"
        animate={testimonialsInView ? 'visible' : 'hidden'}
        variants={fadeIn}
        className="py-20 bg-background relative"
      >
        <motion.div
          className="absolute bottom-20 left-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: 'reverse',
          }}
        />

        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              variants={fadeInUp}
              className="text-4xl font-bold text-foreground mb-4"
            >
              What <span className="text-primary">Students Say</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Hear from thousands of students who found their perfect home
              through Student Nest.
            </motion.p>
          </div>

          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                name: 'Sarah Johnson',
                university: 'Oxford University',
                rating: 5,
                text: 'Student Nest made finding accommodation so easy! The verification process gave me confidence, and the support team was incredibly helpful throughout.',
                avatar: '/placeholder.svg?height=60&width=60&text=SJ',
              },
              {
                name: 'Michael Chen',
                university: 'Cambridge University',
                rating: 5,
                text: 'The roommate matching feature is brilliant. I found amazing flatmates who became my best friends. The whole experience exceeded my expectations.',
                avatar: '/placeholder.svg?height=60&width=60&text=MC',
              },
              {
                name: 'Emma Williams',
                university: 'Imperial College',
                rating: 5,
                text: 'As an international student, I was worried about finding safe housing. Student Nest provided exactly what I needed with transparent pricing and great support.',
                avatar: '/placeholder.svg?height=60&width=60&text=EW',
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover="hover"
                initial="rest"
                custom={index}
              >
                <motion.div
                  variants={cardHover}
                  className="bg-card rounded-xl p-6 shadow-lg border border-border h-full relative overflow-hidden group"
                >
                  <motion.div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative z-10">
                    <div className="flex items-center mb-4">
                      <Image
                        src={testimonial.avatar || '/placeholder.svg'}
                        alt={testimonial.name}
                        width={60}
                        height={60}
                        className="rounded-full mr-4"
                      />
                      <div>
                        <h4 className="font-semibold text-card-foreground">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.university}
                        </p>
                        <div className="flex gap-1 mt-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="text-yellow-400 fill-current"
                              size={16}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {testimonial.text}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        ref={ctaRef}
        initial="hidden"
        animate={ctaInView ? 'visible' : 'hidden'}
        variants={fadeIn}
        className="py-20 bg-background relative overflow-hidden"
      >
        {/* Background decorations */}
        <motion.div
          className="absolute top-10 left-10 w-32 h-32 bg-primary-foreground/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: 'reverse',
          }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-40 h-40 bg-primary-foreground/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: 'reverse',
            delay: 2,
          }}
        />

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold text-primary mb-6"
          >
            Ready to Find Your Perfect Student Home?
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-xl text-foreground/90 mb-8 max-w-2xl mx-auto"
          >
            Join thousands of students who have found their ideal accommodation
            through Student Nest. Start your journey today and discover your
            home away from home.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.div
              whileHover="hover"
              initial="rest"
              variants={buttonHover}
            >
              <Button
                size="lg"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-8 py-3 text-lg font-semibold shadow-lg relative overflow-hidden group"
                onClick={() => router.push('/apartments')}
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.8 }}
                />
                <span className="relative z-10 flex items-center gap-2">
                  Browse Properties <Search size={20} />
                </span>
              </Button>
            </motion.div>

            <motion.div
              whileHover="hover"
              initial="rest"
              variants={buttonHover}
            >
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground text-primary hover:bg-primary-foreground/10 px-8 py-3 text-lg font-semibold relative overflow-hidden group"
                onClick={() => router.push('/contact')}
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-primary-foreground/0 via-primary-foreground/10 to-primary-foreground/0"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.8 }}
                />
                <span className="relative z-10 flex items-center gap-2">
                  Contact Us <MessageCircle size={20} />
                </span>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Landing2;
