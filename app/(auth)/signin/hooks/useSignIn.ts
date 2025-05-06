"use client"
import Cookies from "js-cookie"
import { useState } from "react"
import { useFormik } from "formik"
import { signInSchema } from "../../schema/authSchema"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import auth from "@/module/services/auth"
import { ILoginUser } from "@/module/@types"

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
      
        console.log("Sign in form submitted:", values)
        const user :ILoginUser ={
          email: values.email,
          password: values.password
        }
        const res = await auth.loginUser(user);
        if(res.status){
          console.log(res.data);
          Cookies.set('auth-token', res.data.token)
          localStorage.setItem('userData', JSON.stringify(res.data.user))
          localStorage.setItem('accessToken', res.data.token)
          toast.success("Sign in successful")
          router.push("/apartments")
        } else{
          toast.error("Invalid Email or Password")
        }
      } catch (error) {
        console.error("Sign in error:", error)
        toast.error("Sign in failed")
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
