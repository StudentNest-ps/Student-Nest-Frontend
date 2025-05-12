'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface PricingFeatureProps {
  text: string;
}

const PricingFeature = ({ text }: PricingFeatureProps) => {
  return (
    <div className="flex items-center mb-3">
      <Check className="text-primary mr-2 flex-shrink-0" size={18} />
      <span className="text-muted-foreground">{text}</span>
    </div>
  );
};

export default function PricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  return (
    <section ref={ref} className="py-20 md:py-32 bg-accent/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Pricing
          </h2>
          <p className="text-card-foreground max-w-2xl mx-auto">
            Compare our pricing model to high street agents
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row justify-center items-center lg:items-stretch gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-5/12"
          >
            <div className="h-full bg-accent border-2 rounded-xl">
              <div className="text-center mb-8 p-10">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  High Street Agents
                </h3>
                <div className="text-4xl font-bold text-primary mb-2">12%</div>
                <p className="text-muted-foreground text-sm">Management fee</p>
              </div>
              <div className="space-y-4 p-8 bg-background rounded-b-xl">
                <PricingFeature text="6 to 12 months" />
                <PricingFeature text="No maintenance" />
                <PricingFeature text="No weekly cleaning" />
                <PricingFeature text="No carpet change" />
                <PricingFeature text="No bills" />
                <PricingFeature text="£24,000" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex items-center"
          >
            <div className="text-2xl font-semibold text-primary">Vs</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-5/12"
          >
            <div className="h-full rounded-xl bg-accent border-2">
              <div className="text-center mb-8 py-10">
                <h3 className="text-xl font-semibold text-card-foreground mb-4">
                  Flex Living Guaranteed Rental
                </h3>
                <div className="text-4xl font-bold text-primary mb-2">
                  Fixed price
                </div>
                <p className="text-muted-foreground text-sm">Monthly</p>
              </div>
              <div className="space-y-4 p-8 bg-background rounded-b-xl">
                <PricingFeature text="3 to 5 years" />
                <PricingFeature text="Free maintenance" />
                <PricingFeature text="Weekly cleaning" />
                <PricingFeature text="Annual design" />
                <PricingFeature text="All bills included" />
                <PricingFeature text="£30,000" />
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center mt-12"
        >
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 cursor-pointer">
            Get started
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
