"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import { Shield, Ban, Clock, Building } from "lucide-react"
import LandlordForm from "./components/LandlordForm"
import BenefitsSection from "./components/BenefitsSection"
import CorporatePartnershipsSection from "./components/CorporatePartnershipsSection"
import PricingSection from "./components/PricingSection"
import FeaturesSection from "./components/FeaturesSection"
import FAQSection from "./components/FAQSection"

export default function LandlordsPage() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={fadeInUp}
        className="relative py-16 md:py-24 "
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-start px-5">
            <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-10 flex-1">
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
                Earn more from your property, do less
              </h1>
              <p className="text-muted-foreground text-lg mb-8">Maximize your property value, minimize hassle</p>
              <div className="hidden lg:block">
                <Image
                  src="/Landlord.jpg"
                  alt="Landlords discussing property"
                  width={1000}
                  height={1000}
                  className="rounded-xl"
                />
              </div>
            </div>
            <div className="w-full lg:w-[40%]">
              <LandlordForm />
            </div>
          </div>
        </div>
      </motion.section>

      {/* Benefits Section */}
      <BenefitsSection />

      {/* Features Section */}
        <FeaturesSection/>
    {/* Corporate Partnerships Section */}
    <CorporatePartnershipsSection />

    {/* Pricing Section */}
    <PricingSection />

    {/* FAQ Section */}
    <FAQSection/>
    </div>
  )
}
