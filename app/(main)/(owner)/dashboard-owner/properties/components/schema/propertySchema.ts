import * as Yup from 'yup';

export const propertySchema = Yup.object().shape({
  title: Yup.string()
    .required('Title is required')
    .min(5, 'Title must be at least 5 characters'),

  description: Yup.string()
    .required('Description is required')
    .min(20, 'Description must be at least 20 characters'),

  type: Yup.string()
    .required('Property type is required')
    .oneOf(
      ['apartment', 'house', 'studio', 'condo', 'room'],
      'Invalid property type'
    ),

  price: Yup.number()
    .required('Price is required')
    .positive('Price must be positive'),

  address: Yup.string()
    .required('Address is required')
    .min(5, 'Address must be at least 5 characters'),

  ownerName: Yup.string().required('Owner name is required'),

  ownerPhoneNumber: Yup.string()
    .required('Owner phone number is required')
    .matches(
      /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
      'Phone number is not valid'
    ),

  amenities: Yup.array()
    .of(Yup.string())
    .min(1, 'At least one amenity is required'),

  city: Yup.string().required('City is required'),
  country: Yup.string().required('Country is required'),

  availableFrom: Yup.date().required('Available from date is required'),
  availableTo: Yup.date().required('Available from date is required'),

  maxGuests: Yup.string().required('Maximum guests is required'),

  images: Yup.array().of(Yup.string()),
});
