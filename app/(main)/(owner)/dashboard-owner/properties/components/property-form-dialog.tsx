'use client';

import type React from 'react';

import { useEffect, useRef } from 'react';
import { FormikProvider } from 'formik';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  Upload,
  Loader2,
  Trash,
  ImageIcon,
  Wifi,
  Car,
  AirVent,
  Tv,
  Utensils,
  Dumbbell,
  Waves,
  ShieldCheck,
  BuildingIcon as Balcony,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Property } from '@/module/types/Admin';
import { useProperty } from './hooks/useProperty';
import DatePickerForm from './custom-popover';
import { ScrollArea } from '@/components/ui/scroll-area';

// Property types
const propertyTypes = [
  { id: 'apartment', label: 'Apartment' },
  { id: 'house', label: 'House' },
  { id: 'studio', label: 'Studio' },
  { id: 'condo', label: 'Condominium' },
  { id: 'room', label: 'Room' },
];

// List of amenities with icons
const amenitiesList = [
  { id: 'wifi', label: 'WiFi', icon: Wifi },
  { id: 'parking', label: 'Parking', icon: Car },
  { id: 'ac', label: 'Air Conditioning', icon: AirVent },
  { id: 'tv', label: 'TV', icon: Tv },
  { id: 'kitchen', label: 'Kitchen', icon: Utensils },
  { id: 'gym', label: 'Gym', icon: Dumbbell },
  { id: 'pool', label: 'Swimming Pool', icon: Waves },
  { id: 'security', label: 'Security System', icon: ShieldCheck },
  { id: 'balcony', label: 'Balcony', icon: Balcony },
  {
    id: 'furnished',
    label: 'Furnished',
    icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 10V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3" />
        <path d="M2 12h20" />
        <path d="M4 12v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-8" />
        <path d="M12 7v5" />
      </svg>
    ),
  },
  {
    id: 'washer',
    label: 'Washer',
    icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="18" height="18" x="3" y="3" rx="3" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1" />
        <path d="M6 6h.01" />
        <path d="M18 6h.01" />
      </svg>
    ),
  },
  {
    id: 'pets',
    label: 'Pet Friendly',
    icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .08.703 1.725 1.722 3.656 1 1.261-.472 1.96-1.45 2.344-2.5" />
        <path d="M14.5 5.172c0-1.39 1.577-2.493 3.5-2.172 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.96-1.45-2.344-2.5" />
        <path d="M8 14v.5" />
        <path d="M16 14v.5" />
        <path d="M11.25 16.25h1.5L12 17l-.75-.75Z" />
        <path d="M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444c0-1.061-.162-2.2-.493-3.309m-9.243-6.082A8.801 8.801 0 0 1 12 5c.78 0 1.5.108 2.161.306" />
      </svg>
    ),
  },
];

interface PropertyFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: Property;
  isEditing?: boolean;
  onSubmit: (data: Partial<Property>, isEditing: boolean) => void;
}

export function PropertyFormDialog({
  open,
  onOpenChange,
  initialData,
  isEditing = false,
  onSubmit,
}: PropertyFormDialogProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { formik, image, handleImageUpload, removeImage, setFormValues } =
    useProperty({
      initialValues: initialData,
      isEditing,
      onSubmit: (values) => {
        onSubmit(values, isEditing);
      },
    });

  useEffect(() => {
    if (isEditing) {
      if (initialData) {
        setFormValues(initialData);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditing, initialData]);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleImageUpload(e.target.files);
    // Reset the input value so the same file can be selected again
    e.target.value = '';
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Animation variants
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 20,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Edit Property' : 'Add New Property'}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? 'Update your property details below.'
              : 'Fill in the details below to add a new property listing.'}
          </DialogDescription>
        </DialogHeader>
        <FormikProvider value={formik}>
          <ScrollArea className="max-h-[65vh] pr-4">
            <motion.form
              initial="hidden"
              animate="visible"
              variants={formVariants}
              onSubmit={formik.handleSubmit}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="title" className="text-sm font-medium">
                      Property Title
                    </label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="Cozy Apartment near University"
                      value={formik.values.title}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={
                        formik.touched.title && formik.errors.title
                          ? 'border-destructive'
                          : ''
                      }
                    />
                    {formik.touched.title && formik.errors.title && (
                      <p className="text-sm text-destructive">
                        {formik.errors.title}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="type" className="text-sm font-medium">
                      Property Type
                    </label>
                    <Select
                      value={formik.values.type}
                      onValueChange={(value) =>
                        formik.setFieldValue('type', value)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                      <SelectContent>
                        {propertyTypes.map((type) => (
                          <SelectItem key={type.id} value={type.id}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {formik.touched.type && formik.errors.type && (
                      <p className="text-sm text-destructive">
                        {formik.errors.type}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="price" className="text-sm font-medium">
                      Monthly Rent (USD)
                    </label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      min="0"
                      value={formik.values.price}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={
                        formik.touched.price && formik.errors.price
                          ? 'border-destructive'
                          : ''
                      }
                    />
                    {formik.touched.price && formik.errors.price && (
                      <p className="text-sm text-destructive">
                        {formik.errors.price}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="address" className="text-sm font-medium">
                      Address
                    </label>
                    <Input
                      id="address"
                      name="address"
                      placeholder="123 University St, Ramallah"
                      value={formik.values.address}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={
                        formik.touched.address && formik.errors.address
                          ? 'border-destructive'
                          : ''
                      }
                    />
                    {formik.touched.address && formik.errors.address && (
                      <p className="text-sm text-destructive">
                        {formik.errors.address}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="location.city"
                        className="text-sm font-medium"
                      >
                        City
                      </label>
                      <Input
                        id="city"
                        name="city"
                        type="text"
                        value={formik.values.city}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={
                          formik.touched.city && formik.errors.city
                            ? 'border-destructive'
                            : ''
                        }
                      />
                      {formik.touched.city && formik.errors.city && (
                        <p className="text-sm text-destructive">
                          {formik.errors.city}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="location.country"
                        className="text-sm font-medium"
                      >
                        Country
                      </label>
                      <Input
                        id="country"
                        name="country"
                        type="text"
                        value={formik.values.country}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={
                          formik.touched.country && formik.errors.country
                            ? 'border-destructive'
                            : ''
                        }
                      />
                      {formik.touched.country && formik.errors.country && (
                        <p className="text-sm text-destructive">
                          {formik.errors.country}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="description"
                      className="text-sm font-medium"
                    >
                      Description
                    </label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="A cozy and modern apartment, ideal for students..."
                      rows={4}
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={
                        formik.touched.description && formik.errors.description
                          ? 'border-destructive'
                          : ''
                      }
                    />
                    {formik.touched.description &&
                      formik.errors.description && (
                        <p className="text-sm text-destructive">
                          {formik.errors.description}
                        </p>
                      )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="ownerName"
                        className="text-sm font-medium"
                      >
                        Owner Name
                      </label>
                      <Input
                        id="ownerName"
                        name="ownerName"
                        placeholder="Ahmad Khalid"
                        value={formik.values.ownerName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={
                          formik.touched.ownerName && formik.errors.ownerName
                            ? 'border-destructive'
                            : ''
                        }
                      />
                      {formik.touched.ownerName && formik.errors.ownerName && (
                        <p className="text-sm text-destructive">
                          {formik.errors.ownerName}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="ownerPhoneNumber"
                        className="text-sm font-medium"
                      >
                        Owner Phone
                      </label>
                      <Input
                        id="ownerPhoneNumber"
                        name="ownerPhoneNumber"
                        placeholder="+970 59 123 4567"
                        value={formik.values.ownerPhoneNumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={
                          formik.touched.ownerPhoneNumber &&
                          formik.errors.ownerPhoneNumber
                            ? 'border-destructive'
                            : ''
                        }
                      />
                      {formik.touched.ownerPhoneNumber &&
                        formik.errors.ownerPhoneNumber && (
                          <p className="text-sm text-destructive">
                            {formik.errors.ownerPhoneNumber}
                          </p>
                        )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <DatePickerForm formik={formik} />

                    <div className="space-y-2">
                      <label
                        htmlFor="maxGuests"
                        className="text-sm font-medium"
                      >
                        Maximum Guests
                      </label>
                      <Input
                        id="maxGuests"
                        name="maxGuests"
                        type="number"
                        min="1"
                        value={formik.values.maxGuests}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={
                          formik.touched.maxGuests && formik.errors.maxGuests
                            ? 'border-destructive'
                            : ''
                        }
                      />
                      {formik.touched.maxGuests && formik.errors.maxGuests && (
                        <p className="text-sm text-destructive">
                          {formik.errors.maxGuests}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium">Amenities</label>
                    <div className="grid grid-cols-2 gap-3">
                      {amenitiesList.map((amenity) => {
                        const Icon = amenity.icon;
                        return (
                          <div
                            key={amenity.id}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`amenity-${amenity.id}`}
                              checked={formik.values.amenities?.includes(
                                amenity.id
                              )}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  formik.setFieldValue('amenities', [
                                    ...(formik.values.amenities || []),
                                    amenity.id,
                                  ]);
                                } else {
                                  formik.setFieldValue(
                                    'amenities',
                                    formik.values.amenities?.filter(
                                      (id: string) => id !== amenity.id
                                    ) || []
                                  );
                                }
                              }}
                            />
                            <label
                              htmlFor={`amenity-${amenity.id}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
                            >
                              <Icon className="h-4 w-4 mr-1.5 text-muted-foreground" />
                              {amenity.label}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                    {formik.touched.amenities && formik.errors.amenities && (
                      <p className="text-sm text-destructive">
                        {formik.errors.amenities}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Images Section */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Property Images</label>

                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileInputChange}
                    accept="image/*"
                    multiple
                    className="hidden"
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  <AnimatePresence>
                    {image ? (
                      <motion.div
                        key={image}
                        variants={imageVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        layout
                        className="relative aspect-[4/3] rounded-md overflow-hidden border"
                      >
                        <Image
                          src={image || '/placeholder.svg?height=150&width=200'}
                          alt="Property image"
                          fill
                          className="w-full h-full object-cover"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="cursor-pointer absolute top-2 right-2 h-6 w-6"
                          onClick={removeImage}
                        >
                          <Trash className="h-3 w-3" />
                        </Button>
                      </motion.div>
                    ) : (
                      <div className="col-span-full text-center p-8 border border-dashed rounded-md">
                        <div className="flex flex-col items-center">
                          <ImageIcon className="h-10 w-10 text-muted-foreground mb-2" />
                          <p className="text-muted-foreground mb-2">
                            No image added yet
                          </p>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={triggerFileInput}
                            className="cursor-pointer"
                          >
                            <Upload className="mr-2 h-4 w-4" />
                            Upload Image
                          </Button>
                        </div>
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  disabled={formik.isSubmitting}
                  className="cursor-pointer "
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={formik.isSubmitting}
                  className="cursor-pointer"
                >
                  {formik.isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {isEditing ? 'Updating...' : 'Creating...'}
                    </>
                  ) : isEditing ? (
                    'Update Property'
                  ) : (
                    'Create Property'
                  )}
                </Button>
              </DialogFooter>
            </motion.form>
          </ScrollArea>
        </FormikProvider>
      </DialogContent>
    </Dialog>
  );
}
