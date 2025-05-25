'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Calendar,
  MapPin,
  Users,
  CreditCard,
  Star,
  Bed,
  Bath,
  Square,
} from 'lucide-react';
import { Booking } from '../types/booking';
import Image from 'next/image';

interface BookingCardProps {
  bookings: Booking[];
}

const cardVariants = {
  initial: { opacity: 0, y: 50, scale: 0.9 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -50, scale: 0.9 },
  hover: {
    y: -5,
    scale: 1.02,
    transition: { duration: 0.2 },
  },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
    case 'accepted':
      return 'bg-green-500/10 text-green-500 border-green-500/20';
    case 'rejected':
      return 'bg-red-500/10 text-red-500 border-red-500/20';
    default:
      return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
  }
};

export function BookingCard({ bookings }: BookingCardProps) {
  const router = useRouter();

  const handlePayment = (bookingId: string) => {
    router.push(`/payment?booking=${bookingId}`);
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {bookings.map((booking) => (
        <motion.div
          key={booking.id}
          variants={cardVariants}
          whileHover="hover"
          layout
        >
          <Card className="bg-background/50 backdrop-blur-sm border-primary/20 shadow-lg shadow-primary/10 overflow-hidden group">
            <div className="relative">
              <Image
                src={booking.apartment.image || '/placeholder.svg'}
                alt={booking.apartment.name}
                height={600}
                width={600}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute top-4 right-4">
                <Badge
                  className={`${getStatusColor(booking.status)} backdrop-blur-sm`}
                >
                  {booking.status.charAt(0).toUpperCase() +
                    booking.status.slice(1)}
                </Badge>
              </div>
              <div className="absolute bottom-4 left-4">
                <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                  <span className="text-white text-xs font-medium">
                    {booking.apartment.rating}
                  </span>
                </div>
              </div>
            </div>

            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-headline text-lg">
                    {booking.apartment.name}
                  </h3>
                  <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
                    <MapPin className="h-3 w-3" />
                    {booking.apartment.location}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-primary">
                    ${booking.totalAmount}
                  </div>
                  <div className="text-xs text-muted-foreground">Total</div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Apartment Details */}
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Bed className="h-3 w-3" />
                    {booking.apartment.bedrooms}
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="h-3 w-3" />
                    {booking.apartment.bathrooms}
                  </div>
                  <div className="flex items-center gap-1">
                    <Square className="h-3 w-3" />
                    {booking.apartment.area}
                  </div>
                </div>
              </div>

              {/* Booking Details */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">Check-in:</span>
                  <span className="font-medium text-headline">
                    {booking.checkIn}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">Check-out:</span>
                  <span className="font-medium text-headline">
                    {booking.checkOut}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">Guests:</span>
                  <span className="font-medium text-headline">
                    {booking.guests}
                  </span>
                </div>
              </div>

              {/* Booking Info */}
              <div className="pt-2 border-t border-primary/10">
                <div className="text-xs text-muted-foreground mb-2">
                  Booking ID: {booking.id}
                </div>
                <div className="text-xs text-muted-foreground">
                  Booked on: {booking.bookingDate}
                </div>
              </div>

              {/* Action Button */}
              {booking.status === 'accepted' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Button
                    onClick={() => handlePayment(booking.id)}
                    className="cursor-pointer w-full bg-primary hover:from-primary/90 hover:to-accent/90 text-background shadow-lg shadow-primary/25"
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Pay Now
                  </Button>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
