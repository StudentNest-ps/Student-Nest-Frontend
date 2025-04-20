"use client";

import type React from "react";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent } from "@/components/ui/card";
import {
  Banknote,
  Clock,
  ShieldCheck,
  Sparkles,
  Wrench,
  Heart
} from "lucide-react";
import "../styles.css" // For the writing-mode-vertical class

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
  inView: boolean;
}

const BenefitCard = ({
  icon,
  title,
  description,
  index,
  inView
}: BenefitCardProps) => {
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={
        inView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -50 : 50 }
      }
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="h-full"
    >
      <Card className="h-full bg-card rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-border/50">
        <CardContent className="p-6">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            {icon}
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            {title}
          </h3>
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Timeline node component to avoid duplication
interface TimelineNodeProps {
  inView: boolean;
  delay?: number;
}

const TimelineNode = ({ inView, delay = 0.1 }: TimelineNodeProps) => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    animate={
      inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }
    }
    transition={{
      duration: 0.5,
      delay,
      ease: [0.34, 1.56, 0.64, 1]
    }}
    className="w-10 h-10 rounded-full bg-primary flex items-center justify-center z-10 relative"
  >
    <div className="w-4 h-4 rounded-full bg-background" />
  </motion.div>
);

export default function BenefitsSection() {
  const [sectionRef, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Use spring for smoother animations
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const lineHeight = useTransform(
    smoothProgress,
    [0, 0.1, 0.6, 1],
    ["0%", "2%", "65%", "110%"]
  );

  const benefits = [
    {
      icon: <Banknote className="text-primary" size={24} />,
      title: "Higher Rental Income",
      description:
        "Our platform helps you maximize your rental income with optimal pricing strategies and premium tenant matching."
    },
    {
      icon: <Clock className="text-primary" size={24} />,
      title: "Save Time",
      description:
        "We handle all aspects of property management, from tenant screening to maintenance, saving you valuable time."
    },
    {
      icon: <ShieldCheck className="text-primary" size={24} />,
      title: "Reduced Risk",
      description:
        "Our thorough tenant screening process and regular property inspections minimize risks and protect your investment."
    },
    {
      icon: <Sparkles className="text-primary" size={24} />,
      title: "Professional Marketing",
      description:
        "Your property is showcased with professional photography and listed on premium platforms for maximum exposure."
    },
    {
      icon: <Wrench className="text-primary" size={24} />,
      title: "Maintenance Management",
      description:
        "Our network of trusted contractors ensures prompt and quality repairs at competitive rates."
    },
    {
      icon: <Heart className="text-primary" size={24} />,
      title: "Peace of Mind",
      description:
        "Rest easy knowing your property is in good hands with our comprehensive management services."
    }
  ];

  return (
    <section
      ref={containerRef}
      className="py-10 md:py-20 bg-background relative"
    >
      <div ref={sectionRef} className="container mx-auto px-4">
        {/* Header section */}
        <div className="text-center mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl md:text-4xl font-bold text-primary mb-6"
          >
            Benefits of Our Platform
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Discover why property owners choose our platform to manage their
            rentals and maximize their returns.
          </motion.p>
        </div>

        <div className="flex justify-center">
            <div>
                {/* Timeline line with smooth animation */}
                <div className="absolute left-1/2 transform -translate-x-1/2 h-[calc(100%-20rem)] top-60 flex justify-center">
                  <div className="w-[4px] bg-muted/50 rounded-full relative overflow-hidden">
                    <motion.div
                      className="absolute top-0 left-0 w-full bg-primary rounded-full"
                      style={{ height: lineHeight }}
                    />
                  </div>
                </div>
                {/* Benefits grid with alternating layout */}
                <div className="relative z-10 max-w-5xl mx-auto">
                  {benefits.map((benefit, index) => {
                    const isLeft = index % 2 === 0;
                    // Individual card section in-view detection for better animations
                    const [cardRef, cardInView] = useInView({
                      triggerOnce: false,
                      threshold: 0.2,
                      rootMargin: "-50px 0px"
                    });
                    return (
                      <div key={index} ref={cardRef} className="mb-24 last:mb-0">
                        <div className="grid grid-cols-1 md:grid-cols-11 items-center">
                          {/* Left side content */}
                          <div className="flex justify-start items-center">
                              <div className={`md:col-span-5 min-w-[30vw] md:pr-6 ${isLeft ? "block" : "hidden md:hidden"}`}>
                                {isLeft && (
                                  <BenefitCard
                                    icon={benefit.icon}
                                    title={benefit.title}
                                    description={benefit.description}
                                    index={index}
                                    inView={cardInView}
                                  />
                                )}
                              </div>
                             {/* Timeline node - Single instance per row */}
                            <div className="md:col-span-1 flex justify-center items-center">
                                <TimelineNode inView={cardInView} delay={index * 0.1} />
                            </div>
                            {/* Right side content */}
                            <div className={`md:col-span-5 min-w-[30vw] md:pl-6 ${!isLeft ? "block" : "hidden md:hidden"}`}>
                                {!isLeft && (
                                  <BenefitCard
                                    icon={benefit.icon}
                                    title={benefit.title}
                                    description={benefit.description}
                                    index={index}
                                    inView={cardInView}
                                  />
                                )}
                              </div>
                          </div>
            
                        </div>
                      </div>
                    );
                  })}
                </div>
            </div>
            <div className="hidden lg:block relative -ml-15">
                <div className="sticky-wrapper">
                    <div className="sticky top-32">
                        <h3 className="text-[300px] font-bold text-primary/5 writing-mode-vertical transform rotate-180 leading-none tracking-tighter">
                            BENEFITS
                        </h3>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}