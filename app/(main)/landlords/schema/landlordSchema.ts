import * as Yup from "yup"

export const landlordSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required").min(2, "Name must be at least 2 characters"),

  email: Yup.string().email("Invalid email address").required("Email is required"),

  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^(\+?\d{1,3}[- ]?)?\d{10,14}$/, "Please enter a valid phone number"),

  companyName: Yup.string(),

  monthlyRent: Yup.number()
    .typeError("Monthly rent must be a number")
    .required("Monthly rent is required")
    .positive("Monthly rent must be positive"),

  propertyType: Yup.string().required("Property type is required"),

  bedrooms: Yup.string().required("Number of bedrooms is required"),

  propertyAddress: Yup.string().required("Property address is required").min(10, "Please enter a complete address"),
})
