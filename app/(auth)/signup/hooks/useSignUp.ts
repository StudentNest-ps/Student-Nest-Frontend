"use client";

import { useState } from "react";
import { useFormik } from "formik";
import { signUpSchema } from "../../schema/authSchema";
import { toast } from "sonner";
import auth from "@/module/services/auth";
import { IRegisterUser } from "@/module/@types";
import { useRouter } from "next/navigation";

interface SignUpValues {
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
}

export const useSignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const initialValues: SignUpValues = {
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false
  };

  const formik = useFormik({
    initialValues,
    validationSchema: signUpSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        
        const user: IRegisterUser = {
          email: values.email,
          username: values.username,
          phoneNumber: values.phoneNumber,
          password: values.password,
          confirmPassword: values.confirmPassword,
          role: "student"
        };

        console.log('signed up user: ', user);
        
        const res = await auth.registerUser(user);
        if (res) {
          toast.success("Account created successfully");
          router.push("/signin");
        } else {
          toast.error("Account creation failed");
        }
      } catch (error) {
        console.error("Sign up error:", error);

        toast.error("Account creation failed");
      } finally {
        setIsSubmitting(false);
      }
    }
  });

  return {
    formik,
    isSubmitting
  };
};
