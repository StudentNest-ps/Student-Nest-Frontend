"use client"

import { motion } from "framer-motion"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { useLandlordForm } from "../hooks/useLandlordForm"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"

export default function LandlordForm() {
  const { initialValues, validationSchema, handleSubmit, isSubmitting } = useLandlordForm()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="rounded-xl shadow-md">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-semibold text-primary">Property details</CardTitle>
        </CardHeader>
        <CardContent>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ errors, touched, setFieldValue, values }) => (
              <Form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Name *</Label>
                  <Field
                    as={Input}
                    id="fullName"
                    name="fullName"
                    placeholder="Your full name"
                    className={`w-full ${errors.fullName && touched.fullName ? "border-destructive" : ""}`}
                  />
                  <ErrorMessage name="fullName" component="div" className="text-sm text-destructive" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Field
                    as={Input}
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Your email address"
                    className={`w-full ${errors.email && touched.email ? "border-destructive" : ""}`}
                  />
                  <ErrorMessage name="email" component="div" className="text-sm text-destructive" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone *</Label>
                  <Field
                    as={Input}
                    id="phone"
                    name="phone"
                    placeholder="Your phone number"
                    className={`w-full ${errors.phone && touched.phone ? "border-destructive" : ""}`}
                  />
                  <ErrorMessage name="phone" component="div" className="text-sm text-destructive" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="monthlyRent">Monthly Rent *</Label>
                  <Field
                    as={Input}
                    id="monthlyRent"
                    name="monthlyRent"
                    type="number"
                    placeholder="Expected monthly rent"
                    className={`w-full ${errors.monthlyRent && touched.monthlyRent ? "border-destructive" : ""}`}
                  />
                  <ErrorMessage name="monthlyRent" component="div" className="text-sm text-destructive" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="propertyType">Property Type *</Label>
                  <Select
                    onValueChange={(value) => setFieldValue("propertyType", value)}
                    defaultValue={values.propertyType}
                  >
                    <SelectTrigger
                      className={`w-full ${errors.propertyType && touched.propertyType ? "border-destructive" : ""}`}
                    >
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="condo">Condo</SelectItem>
                      <SelectItem value="townhouse">Townhouse</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <ErrorMessage name="propertyType" component="div" className="text-sm text-destructive" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bedrooms">Bedrooms *</Label>
                  <Select onValueChange={(value) => setFieldValue("bedrooms", value)} defaultValue={values.bedrooms}>
                    <SelectTrigger
                      className={`w-full ${errors.bedrooms && touched.bedrooms ? "border-destructive" : ""}`}
                    >
                      <SelectValue placeholder="Select number of bedrooms" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="studio">Studio</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5+">5+</SelectItem>
                    </SelectContent>
                  </Select>
                  <ErrorMessage name="bedrooms" component="div" className="text-sm text-destructive" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="propertyAddress">Property Address *</Label>
                  <Field
                    as={Textarea}
                    id="propertyAddress"
                    name="propertyAddress"
                    placeholder="Full property address"
                    className={`w-full min-h-[100px] ${
                      errors.propertyAddress && touched.propertyAddress ? "border-destructive" : ""
                    }`}
                  />
                  <ErrorMessage name="propertyAddress" component="div" className="text-sm text-destructive" />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </motion.div>
  )
}
