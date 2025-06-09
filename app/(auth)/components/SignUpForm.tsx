'use client';

import { motion } from 'framer-motion';
import { useSignUp } from '../signup/hooks/useSignUp';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, User, Mail, Lock, Phone, Eye } from 'lucide-react';
import { useState } from 'react';

export default function SignUpForm() {
  const { formik, isSubmitting } = useSignUp();
  const [showPassword, setShowPassword] = useState(false);

  const formFields = [
    {
      id: 'username',
      label: 'Full Name',
      type: 'text',
      placeholder: 'Enter your full name',
      icon: <User className="h-4 w-4 text-muted-foreground" />,
    },
    {
      id: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Enter your email',
      icon: <Mail className="h-4 w-4 text-muted-foreground" />,
    },
    {
      id: 'phoneNumber',
      label: 'Phone Number',
      type: 'tel',
      placeholder: 'Enter your phone number',
      icon: <Phone className="h-4 w-4 text-muted-foreground" />,
    },
    {
      id: 'password',
      label: 'Password',
      type: 'password',
      placeholder: 'Create a password',
      icon: <Lock className="h-4 w-4 text-muted-foreground" />,
    },
    {
      id: 'confirmPassword',
      label: 'Confirm Password',
      type: 'password',
      placeholder: 'Confirm your password',
      icon: <Lock className="h-4 w-4 text-muted-foreground" />,
    },
  ];

  return (
    <div className="overflow-auto">
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
        <div className="space-y-4 ">
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
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  {field.icon}
                </div>
                <div className="relative">
                  <Input
                    id={field.id}
                    name={field.id}
                    type={
                      field.type === 'password' && !showPassword
                        ? 'password'
                        : field.type === 'password' && showPassword
                          ? 'text'
                          : field.type
                    }
                    placeholder={field.placeholder}
                    className={`pl-10 ${formik.touched[field.id as keyof typeof formik.touched] && formik.errors[field.id as keyof typeof formik.errors] ? 'border-destructive' : ''}`}
                    value={String(
                      formik.values[field.id as keyof typeof formik.values] ||
                        ''
                    )}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {field.type === 'password' && (
                    <Eye
                      className="cursor-pointer absolute top-1/2 -translate-y-1/2 right-3 h-5 w-5 transition duration-200 text-muted-foreground hover:text-foreground"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowPassword(!showPassword);
                      }}
                    />
                  )}
                </div>
              </div>
              {formik.touched[field.id as keyof typeof formik.touched] &&
              formik.errors[field.id as keyof typeof formik.errors] ? (
                <div className="text-destructive font-medium -mb-2 -mt-1 text-xs">
                  {formik.errors[field.id as keyof typeof formik.errors]}
                </div>
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
              onCheckedChange={(checked) =>
                formik.setFieldValue('termsAccepted', checked)
              }
            />
            <Label
              htmlFor="termsAccepted"
              className="text-sm font-medium cursor-pointer"
            >
              I agree to the{' '}
              <a href="#" className="text-primary hover:underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-primary hover:underline">
                Privacy Policy
              </a>
            </Label>
          </motion.div>
          {formik.touched.termsAccepted && formik.errors.termsAccepted && (
            <div className="text-destructive text-sm mt-1 font-medium">
              {formik.errors.termsAccepted}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Button
              type="submit"
              className="cursor-pointer w-full bg-primary text-background hover:bg-primary/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                'Sign Up'
              )}
            </Button>
          </motion.div>
        </div>
      </form>
    </div>
  );
}
