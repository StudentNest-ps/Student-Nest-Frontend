"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/sonner"
import { landlordSchema } from "../schema/landlordSchema"

export interface LandlordFormValues {
  fullName: string
  email: string
  phone: string
  companyName: string
  monthlyRent: string
  propertyType: string
  bedrooms: string
  propertyAddress: string
}

export const useLandlordForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const initialValues: LandlordFormValues = {
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    monthlyRent: "",
    propertyType: "",
    bedrooms: "",
    propertyAddress: "",
  }

  const handleSubmit = async (values: LandlordFormValues) => {
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      console.log("Form submitted with values:", values)

      // Show success toast
      toast.success( "Form submitted successfully");

      // Optional: redirect to a thank you page
      // router.push("/landlords/thank-you")
    } catch (error) {
      console.error("Error submitting form:", error)

      toast.error("Error submitting form");
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    initialValues,
    validationSchema: landlordSchema,
    handleSubmit,
    isSubmitting,
  }
}
