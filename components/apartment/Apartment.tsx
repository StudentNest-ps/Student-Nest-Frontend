'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Bed,
  Bath,
  MapPin,
  Building,
  Calendar,
  Check,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { Separator } from '@/components/ui/separator';
import admin from '@/module/services/Admin';
import { Property } from '@/module/types/Admin';

export default function ApartmentDetails({ id }: { id: string }) {
  const [apartment, setApartment] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApartments = async () => {
      const response = await admin.getProperties();
      console.log(response);
      const desiredApartment = response.find(
        (apartment) => apartment._id === id
      );
      setApartment(desiredApartment || null);
    };

    setLoading(false);
    fetchApartments();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center items-center min-h-[70vh]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-64 bg-muted rounded mb-4"></div>
          <div className="h-4 w-32 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  if (!apartment) {
    return (
      <div className="container mx-auto px-4 py-16 flex flex-col items-center min-h-[70vh]">
        <h1 className="text-2xl font-bold mb-4">Apartment Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The apartment you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link href="/apartments">
          <Button variant="outline" className="cursor-pointer">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Apartments
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back button */}
      <div className="mb-6">
        <Link href="/apartments">
          <Button variant="outline" size="sm" className="cursor-pointer">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Apartments
          </Button>
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">{apartment.title}</h1>
            <div className="flex items-center mt-2 text-muted-foreground">
              <MapPin className="mr-1" size={16} />
              <span>
                {apartment.country}, {apartment.city}
              </span>
            </div>
          </div>
          <div className="bg-card p-4 rounded-lg shadow-sm border border-border w-full md:w-full lg:w-full xl:w-[32%]">
            <div className="text-sm text-muted-foreground">Price</div>
            <div className="text-3xl font-bold text-primary">
              ${apartment.price}
              <span className="text-sm font-normal text-muted-foreground">
                /month
              </span>
            </div>
            <Button className="w-full mt-4 bg-primary hover:bg-primary/90 cursor-pointer">
              Book Now
            </Button>
          </div>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Images and details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Main image */}
            <div className="relative rounded-xl overflow-hidden h-[400px] shadow-md">
              <Image
                src={'/placeholder.svg'}
                alt={apartment.title}
                fill
                className="object-cover"
              />
              {apartment.city && (
                <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                  Featured
                </div>
              )}
            </div>

            {/* Details */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  About this apartment
                </h2>
                <p className="text-muted-foreground mb-6">
                  {apartment.description}
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="flex flex-col items-center justify-center p-4 bg-accent/30 rounded-lg">
                    <Bed size={24} className="mb-2 text-primary" />
                    <span className="text-sm text-muted-foreground">
                      Bedrooms
                    </span>
                    {/* <span className="font-medium">{apartment.bedrooms}</span> */}
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 bg-accent/30 rounded-lg">
                    <Bath size={24} className="mb-2 text-primary" />
                    <span className="text-sm text-muted-foreground">
                      Bathrooms
                    </span>
                    {/* <span className="font-medium">{apartment.bathrooms}</span> */}
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 bg-accent/30 rounded-lg">
                    <Users size={24} className="mb-2 text-primary" />
                    <span className="text-sm text-muted-foreground">
                      Max Guests
                    </span>
                    <span className="font-medium">{apartment.maxGuests}</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 bg-accent/30 rounded-lg">
                    <Building size={24} className="mb-2 text-primary" />
                    <span className="text-sm text-muted-foreground">Floor</span>
                    {/* <span className="font-medium">{apartment.floor}</span> */}
                  </div>
                </div>

                <Separator className="my-6" />

                <h3 className="text-lg font-semibold mb-4">Amenities</h3>
                <div className="grid grid-cols-2 gap-3">
                  {apartment.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right column - Availability and booking */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Availability</h3>
                <div className="flex items-center mb-4">
                  <Calendar className="mr-2 h-5 w-5 text-primary" />
                  <span>
                    Available from: <strong>{apartment.availableFrom}</strong>
                  </span>
                </div>
                <Separator className="my-4" />
                <h3 className="text-lg font-semibold mb-4">Location</h3>
                <div className="aspect-video relative rounded-md overflow-hidden bg-muted">
                  {/* Map placeholder - in a real app, you would integrate with a map service */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <MapPin className="h-8 w-8 text-primary" />
                    <span className="ml-2">{apartment.city}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Book this apartment
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Perfect for students at Najah National University. Secure your
                  housing today!
                </p>
                <Button className="w-full bg-primary hover:bg-primary/90 cursor-pointer">
                  Book Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
