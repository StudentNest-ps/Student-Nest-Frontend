'use client';

import { useState } from 'react';
import { useFormik } from 'formik';
import { propertySchema } from '../schema/propertySchema';
import { Property } from '@/module/types/Admin';
import owner from '@/module/services/Owner';
import { toast } from 'sonner';

interface UsePropertyProps {
  initialValues?: Partial<Property>;
  onSubmit: (values: Partial<Property>, isEditing: boolean) => void;
  isEditing: boolean;
}

export const useProperty = ({
  initialValues,
  onSubmit,
  isEditing,
}: UsePropertyProps) => {
  const [image, setImage] = useState<string>(initialValues?.image || '');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const defaultValues: Partial<Property> = {
    title: '',
    description: '',
    type: 'apartment',
    price: 0,
    address: '',
    ownerName: '',
    ownerPhoneNumber: '',
    amenities: [],
    country: '',
    city: '',
    availableFrom: new Date().toISOString().split('T')[0],
    availableTo: new Date().toISOString().split('T')[0],
    maxGuests: '1',
    image: '',
    ...initialValues,
  };

  const formik = useFormik({
    initialValues: defaultValues,
    enableReinitialize: true, // Enable updates to initialValues
    validationSchema: propertySchema,
    onSubmit: async (values) => {
      try {
        let finalImagePath = image;

        if (imageFile) {
          const formData = new FormData();
          formData.append('file', imageFile);

          const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          });

          const result = await response.json();

          if (result.success && result.filePath) {
            finalImagePath = result.filePath;
            setImage(finalImagePath);
          } else {
            console.error('Upload failed:', result.error);
            throw new Error(`Upload failed: ${result.error}`);
          }
        }

        const fullValues = {
          ...values,
          image: finalImagePath,
        };

        const res = await owner.addProperty(fullValues as Property);

        if (res) {
          toast.success(
            isEditing
              ? 'Property modified successfully'
              : 'Property added successfully'
          );
          onSubmit(fullValues, isEditing);
        } else {
          toast.error(`Failed ${isEditing ? 'editing' : 'adding'} property`);
        }

        console.log('Final Values Submitted:', fullValues);
      } catch (error) {
        console.error('Error during form submission:', error);
        throw error;
      }
    },
  });

  const handleImageUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    if (!file.type.startsWith('image/')) return;

    setImageFile(file);
    setImage(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImage('');
    setImageFile(null);
    formik.setFieldValue('image', '');
  };

  // Exposed function to update form values externally
  const setFormValues = (newValues: Property) => {
    formik.setValues({
      ...defaultValues, // start from default to avoid missing keys
      ...newValues,
    });

    // Update image preview if provided
    if (newValues.image) {
      setImage(newValues.image);
    }
  };

  return {
    formik,
    image,
    imageFile,
    handleImageUpload,
    removeImage,
    setFormValues, // ✅ Expose this to use externally
  };
};
