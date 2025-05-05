"use client"

import { motion } from "framer-motion"
import { useSignUp } from "../signup/hooks/useSignUp"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, User, Mail, Lock, Phone } from "lucide-react"

export default function SignUpForm() {
  const { formik, isSubmitting } = useSignUp()

  const formFields = [
    {
      id: "fullName",
      label: "Full Name",
      type: "text",
      placeholder: "Enter your full name",
      icon: <User className="h-4 w-4 text-muted-foreground" />,
    },
    {
      id: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
      icon: <Mail className="h-4 w-4 text-muted-foreground" />,
    },
    {
      id: "phone",
      label: "Phone Number",
      type: "tel",
      placeholder: "Enter your phone number",
      icon: <Phone className="h-4 w-4 text-muted-foreground" />,
    },
    {
      id: "password",
      label: "Password",
      type: "password",
      placeholder: "Create a password",
      icon: <Lock className="h-4 w-4 text-muted-foreground" />,
    },
    {
      id: "confirmPassword",
      label: "Confirm Password",
      type: "password",
      placeholder: "Confirm your password",
      icon: <Lock className="h-4 w-4 text-muted-foreground" />,
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-2xl md:text-3xl font-bold text-foreground"
        >
          Create an Account
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="text-muted-foreground mt-2"
        >
          Join our community to find your perfect home
        </motion.p>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <div className="space-y-4">
          {formFields.map((field, index) => (
            <motion.div
              key={field.id}
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
              className="space-y-2"
            >
              <Label htmlFor={field.id} className="text-sm font-medium">
                {field.label}
              </Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">{field.icon}</div>
                <Input
                  id={field.id}
                  name={field.id}
                  type={field.type}
                  placeholder={field.placeholder}
                  className={`pl-10 ${formik.touched[field.id as keyof typeof formik.touched] && formik.errors[field.id as keyof typeof formik.errors] ? "border-destructive" : ""}`}
                  value={String(formik.values[field.id as keyof typeof formik.values] || '')}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched[field.id as keyof typeof formik.touched] && formik.errors[field.id as keyof typeof formik.errors] ? (
                <div className="text-destructive text-sm mt-1 font-medium">{formik.errors[field.id as keyof typeof formik.errors]}</div>
              ) : null}
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.35 }}
            className="flex items-center space-x-2"
          >
            <Checkbox
              id="termsAccepted"
              checked={formik.values.termsAccepted}
              onCheckedChange={(checked) => formik.setFieldValue("termsAccepted", checked)}
            />
            <Label htmlFor="termsAccepted" className="text-sm font-medium cursor-pointer">
              I agree to the{" "}
              <a href="#" className="text-primary hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-primary hover:underline">
                Privacy Policy
              </a>
            </Label>
          </motion.div>
          {formik.touched.termsAccepted && formik.errors.termsAccepted && (
            <div className="text-destructive text-sm mt-1 font-medium">{formik.errors.termsAccepted}</div>
          )}

          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Button type="submit" className="w-full bg-primary text-white hover:bg-primary/90" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </motion.div>
        </div>
      </form>

      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.45 }}
        className="mt-6"
      >
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or sign up with</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <Button variant="outline" type="button" className="w-full">
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
              <path d="M1 1h22v22H1z" fill="none" />
            </svg>
            Google
          </Button>
          <Button variant="outline" type="button" className="w-full">
            <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
            </svg>
            Facebook
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
