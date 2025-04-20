"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Building, Briefcase, BarChart, Users } from "lucide-react"

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  delay: number
}

const FeatureCard = ({ icon, title, description, delay }: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="flex flex-col items-center text-center">
        <div className="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center mb-4">{icon}</div>
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </motion.div>
  )
}

export default function CorporatePartnershipsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  const features = [
    {
      icon: <Building className="text-primary" size={20} />,
      title: "Property Management",
      description:
        "We handle all aspects of property management, from tenant screening to maintenance, ensuring a hassle-free experience.",
      delay: 0.1,
    },
    {
      icon: <Briefcase className="text-primary" size={20} />,
      title: "Corporate Housing",
      description:
        "Specialized solutions for businesses needing temporary accommodations for employees, consultants, or clients.",
      delay: 0.2,
    },
    {
      icon: <BarChart className="text-primary" size={20} />,
      title: "Investment Opportunities",
      description:
        "Access exclusive property investment opportunities with competitive returns and professional management.",
      delay: 0.3,
    },
    {
      icon: <Users className="text-primary" size={20} />,
      title: "Dedicated Support",
      description:
        "A dedicated account manager to handle all your needs, ensuring personalized service and quick response times.",
      delay: 0.4,
    },
  ]

  return (
    <section ref={ref} className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Corporate Partnerships</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We work with CEOs, companies to meet accommodation needs in London. Offer a dedicated booking service that
            can help to find properties for your needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="rounded-xl overflow-hidden shadow-md">
              <Image
                src="/placeholder.svg?height=400&width=600&text=Before"
                alt="Before renovation"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
              <div className="absolute bottom-4 right-4 bg-background px-4 py-2 rounded-md font-semibold text-foreground">
                Before
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="rounded-xl overflow-hidden shadow-md">
              <Image
                src="/placeholder.svg?height=400&width=600&text=After"
                alt="After renovation"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
              <div className="absolute bottom-4 right-4 bg-background px-4 py-2 rounded-md font-semibold text-foreground">
                After
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={feature.delay}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
