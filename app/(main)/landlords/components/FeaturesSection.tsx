import { motion } from 'framer-motion';
import { Shield, Ban, Building, Clock } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import React from 'react';

const FeaturesSection = () => {
  const [featuresRef, featuresInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
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
  return (
    <motion.section
      ref={featuresRef}
      initial="hidden"
      animate={featuresInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
      className="py-16 md:py-24 bg-accent/20"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-primary text-center mb-12">
          Better than Property Management
        </h2>
        <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-16">
          We take care of everything so you don&apos;t have to. From finding
          tenants to maintenance, we handle it all while ensuring you get the
          best return on your investment.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div
            variants={fadeInUp}
            className="bg-card rounded-xl p-6 shadow-sm"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Shield className="text-primary" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Guaranteed rent
            </h3>
            <p className="text-muted-foreground">
              Rent is paid on time, every time, even if your property is vacant.
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="bg-card rounded-xl p-6 shadow-sm"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Ban className="text-primary" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No fees
            </h3>
            <p className="text-muted-foreground">
              No hidden costs or fees. What we quote is what you get.
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="bg-card rounded-xl p-6 shadow-sm"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Building className="text-primary" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No voids
            </h3>
            <p className="text-muted-foreground">
              We ensure your property is always occupied with quality tenants.
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="bg-card rounded-xl p-6 shadow-sm"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Clock className="text-primary" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              24/7 maintenance
            </h3>
            <p className="text-muted-foreground">
              Round-the-clock support for any property issues or emergencies.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default FeaturesSection;
