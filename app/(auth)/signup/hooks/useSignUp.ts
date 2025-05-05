"use client"

import { useState } from "react"
import { useFormik } from "formik"
import { signUpSchema } from "../../schema/authSchema"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface SignUpValues {
  fullName: string
  email: string
  phone: string
  password: string
  confirmPassword: string
  termsAccepted: boolean
}

export const useSignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const initialValues: SignUpValues = {
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  }

  const formik = useFormik({
    initialValues,
    validationSchema: signUpSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true)
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500))

        console.log("Sign up form submitted:", values)

        // Show success toast
        toast("Account created successfully")

        // Redirect to sign in or home page
        router.push("/auth/signin")
      } catch (error) {
        console.error("Sign up error:", error)

        toast("Account creation failed")
      } finally {
        setIsSubmitting(false)
      }
    },
  })

  return {
    formik,
    isSubmitting,
  }
}
