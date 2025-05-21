'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Calendar, Check, Users, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import admin from '@/module/services/Admin';
import { Property } from '@/module/types/Admin';
import { format } from 'date-fns';

export default function ApartmentDetails({ id }: { id: string }) {
  const [apartment, setApartment] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApartments = async () => {
      const response = await admin.getProperties();
      const desiredApartment = response.find(
        (apartment) => apartment._id === id
      );
      setApartment(desiredApartment || null);
      setLoading(false);
    };

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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="relative rounded-xl overflow-hidden h-[400px] shadow-md">
              <Image
                src={apartment.image || ''}
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

            <h1 className="text-3xl font-bold">{apartment.title}</h1>
            <div className="text-muted-foreground flex items-center">
              <MapPin className="mr-1" size={16} />
              {apartment.address}, {apartment.city}, {apartment.country}
            </div>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-2">About</h2>
                <p className="text-muted-foreground mb-4">
                  {apartment.description}
                </p>

                <Separator className="my-4" />

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="p-4 bg-accent/30 rounded-lg">
                    <Users size={24} className="mx-auto text-primary mb-2" />
                    <div className="text-sm">
                      Max {apartment.maxGuests} Guests
                    </div>
                  </div>
                  <div className="p-4 bg-accent/30 rounded-lg">
                    <Phone size={24} className="mx-auto text-primary mb-2" />
                    <div className="text-sm">{apartment.ownerPhoneNumber}</div>
                  </div>
                </div>

                <Separator className="my-6" />

                <h3 className="text-lg font-semibold mb-4">Amenities</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
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

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="text-sm text-muted-foreground mb-1">
                  Monthly Rent
                </div>
                <div className="text-3xl font-bold text-primary">
                  ${apartment.price}{' '}
                  <span className="text-sm text-muted-foreground font-normal">
                    /month
                  </span>
                </div>
                <Separator className="my-4" />
                <Button className="w-full bg-primary hover:bg-primary/90 mt-2">
                  Book Now
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Availability</h3>
                <div className="flex flex-col gap-2 text-sm">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-primary" />
                    From: {format(new Date(apartment.availableFrom), 'PPP')}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-primary" />
                    To: {format(new Date(apartment.availableTo), 'PPP')}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Owner Info</h3>
                <div className="text-sm">
                  <div>
                    <span className="font-medium">Name:</span>{' '}
                    {apartment.ownerName}
                  </div>
                  <div>
                    <span className="font-medium">Phone:</span>{' '}
                    {apartment.ownerPhoneNumber}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
