'use client';

import { useState } from 'react';
import { useFormik } from 'formik';
import { propertySchema } from '../schema/propertySchema';
import { Property } from '@/module/types/Admin';

interface UsePropertyProps {
  initialValues?: Partial<Property>;
  onSubmit: (values: Partial<Property>) => void;
}

export const useProperty = ({ initialValues, onSubmit }: UsePropertyProps) => {
  const [images, setImages] = useState<string[]>(initialValues?.images || []);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

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
    images: [],
    ...initialValues,
  };

  const formik = useFormik({
    initialValues: defaultValues,
    validationSchema: propertySchema,
    onSubmit: async (values) => {
      // Process image files and create paths
      const imagePaths: string[] = [];
      console.log('Add Values');

      console.log(values);

      // Process existing images that are already saved
      images.forEach((img) => {
        if (img.startsWith('/images/') || img.startsWith('http')) {
          // This is already a processed image path
          imagePaths.push(img);
        }
      });

      try {
        // Upload new image files
        for (let i = 0; i < imageFiles.length; i++) {
          const file = imageFiles[i];

          // Create FormData for the file upload
          const formData = new FormData();
          formData.append('file', file);

          // Upload the file to our API route
          const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          });

          const result = await response.json();

          if (result.success) {
            // Add the file path to our array
            imagePaths.push(result.filePath);
          } else {
            console.error('Error uploading file:', result.error);
            throw new Error(`Failed to upload ${file.name}`);
          }
        }

        // Call the onSubmit callback with the complete data
        onSubmit({
          ...values,
          images: imagePaths,
        });
      } catch (error) {
        console.error('Error during form submission:', error);
        throw error;
      }
    },
  });

  const handleImageUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const newImageFiles = [...imageFiles];
    const newImagePreviews = [...images];

    // Process each selected file
    Array.from(files).forEach((file) => {
      // Only accept image files
      if (!file.type.startsWith('image/')) return;

      // Add file to the files array
      newImageFiles.push(file);

      // Create a preview URL
      const previewUrl = URL.createObjectURL(file);
      newImagePreviews.push(previewUrl);
    });

    setImageFiles(newImageFiles);
    setImages(newImagePreviews);
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);

    // If this was a file upload, also remove from imageFiles
    if (index < imageFiles.length) {
      const newImageFiles = [...imageFiles];
      newImageFiles.splice(index, 1);
      setImageFiles(newImageFiles);
    }

    // Update formik values
    formik.setFieldValue('images', newImages);
  };

  return {
    formik,
    images,
    imageFiles,
    handleImageUpload,
    removeImage,
  };
};
