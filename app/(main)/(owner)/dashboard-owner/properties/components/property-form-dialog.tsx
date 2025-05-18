'use client';

import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { format } from 'date-fns';
import { CalendarIcon, X, Upload, Loader2, Plus, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
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
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

// Define the property schema based on the MongoDB structure
const propertyFormSchema = z.object({
  title: z.string().min(5, {
    message: 'Title must be at least 5 characters.',
  }),
  description: z.string().min(20, {
    message: 'Description must be at least 20 characters.',
  }),
  type: z.string({
    required_error: 'Please select a property type.',
  }),
  price: z.coerce.number().positive({
    message: 'Price must be a positive number.',
  }),
  address: z.string().min(10, {
    message: 'Address must be at least 10 characters.',
  }),
  location: z.object({
    city: z.string().min(2, { message: 'City is required' }),
    country: z.string().min(2, { message: 'Country is required' }),
  }),
  amenities: z.array(z.string()).min(1, {
    message: 'Select at least one amenity.',
  }),
  availability: z.object({
    availableFrom: z.date({
      required_error: 'Available from date is required.',
    }),
    availableTo: z.date({
      required_error: 'Available to date is required.',
    }),
  }),
});

type PropertyFormValues = z.infer<typeof propertyFormSchema>;

// List of amenities
const amenitiesList = [
  { id: 'wifi', label: 'WiFi' },
  { id: 'ac', label: 'Air Conditioning' },
  { id: 'heating', label: 'Heating' },
  { id: 'washer', label: 'Washer' },
  { id: 'dryer', label: 'Dryer' },
  { id: 'parking', label: 'Parking' },
  { id: 'furnished', label: 'Furnished' },
  { id: 'pets', label: 'Pet Friendly' },
  { id: 'gym', label: 'Gym' },
  { id: 'pool', label: 'Swimming Pool' },
  { id: 'security', label: 'Security System' },
  { id: 'balcony', label: 'Balcony' },
];

// Property types
const propertyTypes = [
  { id: 'apartment', label: 'Apartment' },
  { id: 'condo', label: 'Condominium' },
  { id: 'studio', label: 'Studio' },
  { id: 'house', label: 'House' },
  { id: 'room', label: 'Room' },
];

// Define a proper type for the property data
interface PropertyData extends PropertyFormValues {
  id?: string;
  _id?: string;
  images?: string[];
  blockedDates?: Date[] | string[];
}

interface PropertyFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: PropertyData;
  isEditing?: boolean;
  onSubmit: (data: PropertyData) => void;
}

export function PropertyFormDialog({
  open,
  onOpenChange,
  initialData,
  isEditing = false,
  onSubmit,
}: PropertyFormDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [blockedDates, setBlockedDates] = useState<Date[]>([]);

  // Initialize form with default values or initial data
  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          availability: {
            availableFrom: new Date(
              initialData.availability?.availableFrom || new Date()
            ),
            availableTo: new Date(
              initialData.availability?.availableTo || new Date()
            ),
          },
        }
      : {
          title: '',
          description: '',
          type: 'apartment',
          price: 0,
          address: '',
          location: {
            city: '',
            country: '',
          },
          amenities: [],
          availability: {
            availableFrom: new Date(),
            availableTo: new Date(
              new Date().setMonth(new Date().getMonth() + 12)
            ),
          },
        },
  });

  // Update form when initialData changes
  useEffect(() => {
    if (initialData) {
      // Set images if available
      if (initialData.images && initialData.images.length > 0) {
        setImages(initialData.images);
      }

      // Set blocked dates if available
      if (initialData.blockedDates && initialData.blockedDates.length > 0) {
        setBlockedDates(
          initialData.blockedDates.map((date) =>
            date instanceof Date ? date : new Date(date)
          )
        );
      }

      // Reset form with initial data
      form.reset({
        ...initialData,
        availability: {
          availableFrom: new Date(
            initialData.availability?.availableFrom || new Date()
          ),
          availableTo: new Date(
            initialData.availability?.availableTo || new Date()
          ),
        },
      });
    } else {
      // Reset form to default values
      form.reset({
        title: '',
        description: '',
        type: 'apartment',
        price: 0,
        address: '',
        location: {
          city: '',
          country: '',
        },
        amenities: [],
        availability: {
          availableFrom: new Date(),
          availableTo: new Date(
            new Date().setMonth(new Date().getMonth() + 12)
          ),
        },
      });
      setImages([]);
      setBlockedDates([]);
    }
  }, [initialData, form, open]);

  const handleFormSubmit = (data: PropertyFormValues) => {
    setIsSubmitting(true);

    // Prepare the complete data object including images and blocked dates
    const completeData: PropertyData = {
      ...data,
      images,
      blockedDates,
      ...(initialData?.id ? { id: initialData.id } : {}),
      ...(initialData?._id ? { _id: initialData._id } : {}),
    };

    // Log the data for debugging
    console.log('Form submitted:', completeData);

    // Call the onSubmit callback
    onSubmit(completeData);

    // Simulate API call delay
    setTimeout(() => {
      setIsSubmitting(false);
      onOpenChange(false);
    }, 1000);
  };

  const handleImageUpload = () => {
    // Simulate image upload
    const newImage = `/placeholder.svg?height=300&width=400&text=Property+Image+${images.length + 1}`;
    setImages([...images, newImage]);
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const addBlockedDate = (date: Date) => {
    // Check if date already exists
    const exists = blockedDates.some(
      (blockedDate) => blockedDate.toDateString() === date.toDateString()
    );

    if (!exists) {
      setBlockedDates([...blockedDates, date]);
    }
  };

  const removeBlockedDate = (index: number) => {
    const newBlockedDates = [...blockedDates];
    newBlockedDates.splice(index, 1);
    setBlockedDates(newBlockedDates);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
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

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  render={({ field }: { field: any }) => (
                    <FormItem>
                      <FormLabel>Property Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Cozy Apartment near City Center"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select property type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {propertyTypes.map((type) => (
                            <SelectItem key={type.id} value={type.id}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Monthly Rent (USD)</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="123 Main Street, Beirut"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="location.city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="Beirut" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location.country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <Input placeholder="Lebanon" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <FormLabel>Availability Period</FormLabel>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="availability.availableFrom"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="text-xs">From</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={'outline'}
                                  className={cn(
                                    'pl-3 text-left font-normal',
                                    !field.value && 'text-muted-foreground'
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, 'PPP')
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date <
                                  new Date(new Date().setHours(0, 0, 0, 0))
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="availability.availableTo"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="text-xs">To</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={'outline'}
                                  className={cn(
                                    'pl-3 text-left font-normal',
                                    !field.value && 'text-muted-foreground'
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, 'PPP')
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date <
                                  new Date(
                                    form.getValues(
                                      'availability.availableFrom'
                                    ) || new Date().setHours(0, 0, 0, 0)
                                  )
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="A cozy and modern 2-bedroom apartment, ideal for students or young professionals..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="amenities"
                  render={({ field }) => (
                    <FormItem>
                      <div className="mb-2">
                        <FormLabel>Amenities</FormLabel>
                        <FormDescription>
                          Select all amenities available at your property.
                        </FormDescription>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {amenitiesList.map((amenity) => (
                          <FormItem
                            key={amenity.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(amenity.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([
                                        ...(field.value || []),
                                        amenity.id,
                                      ])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== amenity.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {amenity.label}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <FormLabel>Blocked Dates</FormLabel>
                  <FormDescription>
                    Select dates when the property is not available for booking.
                  </FormDescription>
                  <div className="flex flex-col space-y-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          <span>Add Blocked Dates</span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          onSelect={(date) => date && addBlockedDate(date)}
                          disabled={(date) =>
                            date < new Date(new Date().setHours(0, 0, 0, 0))
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>

                    {blockedDates.length > 0 && (
                      <div className="mt-2 space-y-2">
                        <div className="text-sm font-medium">
                          Selected Blocked Dates:
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {blockedDates.map((date, index) => (
                            <div
                              key={index}
                              className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-md px-2 py-1 text-sm"
                            >
                              {format(date, 'MMM d, yyyy')}
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-5 w-5 ml-1 text-gray-500"
                                onClick={() => removeBlockedDate(index)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Images Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <FormLabel>Property Images</FormLabel>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleImageUpload}
                  className="flex items-center"
                >
                  <Plus className="mr-1 h-4 w-4" />
                  Add Image
                </Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-[4/3] rounded-md overflow-hidden border"
                  >
                    <img
                      src={image || '/placeholder.svg'}
                      alt={`Property image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-6 w-6"
                      onClick={() => removeImage(index)}
                    >
                      <Trash className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
                {images.length === 0 && (
                  <div className="col-span-full text-center p-8 border border-dashed rounded-md">
                    <p className="text-gray-500 dark:text-gray-400 mb-2">
                      No images added yet
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleImageUpload}
                      className="mx-auto"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Image
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                {isSubmitting ? (
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
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
