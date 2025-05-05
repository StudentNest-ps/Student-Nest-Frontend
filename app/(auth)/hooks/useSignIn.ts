"use client"

import { useState } from "react"
import { useFormik } from "formik"
import { signInSchema } from "../schema/authSchema"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface SignInValues {
  email: string
  password: string
  remember: boolean
}

export const useSignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const initialValues: SignInValues = {
    email: "",
    password: "",
    remember: false,
  }

  const formik = useFormik({
    initialValues,
    validationSchema: signInSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true)
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500))

        console.log("Sign in form submitted:", values)

        // Show success toast
        toast("Sign in successful")

        // Redirect to dashboard or home page
        router.push("/apartments")
      } catch (error) {
        console.error("Sign in error:", error)

        toast("Sign in failed")
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
