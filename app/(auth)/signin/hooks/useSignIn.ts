'use client';
import { useState } from 'react';
import { useFormik } from 'formik';
import { signInSchema } from '../../schema/authSchema';
import { useAuth } from '@/context/Auth';
import { toast } from 'sonner';

interface SignInValues {
  email: string;
  password: string;
  remember: boolean;
}

export const useSignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();

  const initialValues: SignInValues = {
    email: '',
    password: '',
    remember: false,
  };

  const formik = useFormik({
    initialValues,
    validationSchema: signInSchema,
    onSubmit: async (values) => {
      try {
        setIsSubmitting(true);
        login({ email: values.email, password: values.password }, () =>
          setIsSubmitting(false)
        );
      } catch (error) {
        console.error(error);
        toast.error('Invalid Email or Password');
        setIsSubmitting(false);
      }
    },
  });

  return {
    formik,
    isSubmitting,
  };
};
