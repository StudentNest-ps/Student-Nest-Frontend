'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Calendar,
  MapPin,
  CreditCard,
  X,
  AlertTriangle,
  Trash2,
  MessageCircle,
  Loader2,
} from 'lucide-react';
import Image from 'next/image';
import { ChatPopup } from './ChatPopup';
import { Booking } from '../types/booking';
import { toast } from 'sonner';
import payment from '@/module/services/Payment';
import ChatService from '@/module/services/Chat';

interface BookingCardProps {
  bookings: Booking[];
  onCancelBooking?: (bookingId: string) => void;
  onRemoveBooking?: (bookingId: string) => void;
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
    case 'confirmed':
      return 'bg-green-500/10 text-green-500 border-green-500/20';
    case 'already_booked':
      return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
    case 'cancelled':
      return 'bg-red-500/10 text-red-500 border-red-500/20';
    default:
      return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
  }
};

const getStatusLabel = (status: string) => {
  return status.charAt(0).toUpperCase() + status.slice(1);
};

async function fetchChatHistory(apartmentId: string) {
  try {
    await ChatService.getChatId(apartmentId);
  } catch {
    toast.error('Failed Fetching ChatId');
  }
}

export function BookingCard({
  bookings,
  onCancelBooking,
  onRemoveBooking,
}: BookingCardProps) {
  const router = useRouter();
  const [chatOpen, setChatOpen] = useState<string | null>(null);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [isPaying, setIsPaying] = useState<string | null>(null);
  const handlePayment = async (bookingId: string) => {
    // TODO: Handle payment via Lahza API
    try {
      setIsPaying(bookingId);
      const paymentDetails = await payment.initiatePayment(bookingId);
      router.replace(
        `${paymentDetails.checkout_url}?transaction_id=${paymentDetails.transaction_id}`
      );
    } catch {
      toast.error('Something went wrong. Please contact our Support!');
    } finally {
      setIsPaying(null);
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    onCancelBooking?.(bookingId);
  };

  const handleRemoveBooking = async (bookingId: string) => {
    setRemovingId(bookingId);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));
    onRemoveBooking?.(bookingId);
    setRemovingId(null);
  };

  const openChat = (bookingId: string, apartmentId: string) => {
    console.log(apartmentId);
    fetchChatHistory(apartmentId);

    setChatOpen(bookingId);
  };

  return (
    <>
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
            <Card className="bg-background/50 backdrop-blur-sm border-primary/20 shadow-lg shadow-primary/10 overflow-hidden group relative">
              {/* Message Button - Floating */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute top-4 left-4 z-10"
              >
                <Button
                  size="sm"
                  onClick={() => openChat(booking.id, booking.apartment.id)}
                  className="cursor-pointer h-8 w-8 p-0 rounded-full bg-primary/90 hover:bg-primary text-background shadow-lg shadow-primary/25 backdrop-blur-sm"
                >
                  <MessageCircle className="h-3 w-3" />
                </Button>
              </motion.div>

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
                    className={`${getStatusColor(booking.status)} backdrop-blur-sm font-medium`}
                  >
                    {getStatusLabel(booking.status)}
                  </Badge>
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
                {/* Booking Details */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">Check-in:</span>
                    <span className="font-medium text-headline">
                      {new Date(booking.checkIn).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">Check-out:</span>
                    <span className="font-medium text-headline">
                      {new Date(booking.checkOut).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Booking Info */}
                <div className="pt-2 border-t border-primary/10">
                  <div className="text-xs text-muted-foreground mb-2">
                    Booking ID: {booking.id}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Booked on:{' '}
                    {new Date(booking.bookingDate).toLocaleDateString()}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  {booking.status === 'confirmed' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                      className="flex-1"
                    >
                      <Button
                        onClick={() => handlePayment(booking.id)}
                        className="cursor-pointer w-full bg-primary hover:from-primary/90 hover:to-accent/90 text-background shadow-lg shadow-primary/25"
                      >
                        {isPaying === booking.id ? (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <CreditCard className="h-4 w-4 mr-2" />
                        )}
                        {isPaying === booking.id ? 'Processing...' : 'Pay Now'}
                      </Button>
                    </motion.div>
                  )}

                  {booking.status === 'pending' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                      className="w-full"
                    >
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="cursor-pointer w-full border-red-500/20 text-red-500 hover:bg-red-500/10 hover:border-red-500/40 transition-all duration-200"
                          >
                            <X className="h-4 w-4 mr-2" />
                            Cancel Booking
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-background/95 backdrop-blur-sm border-primary/20">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="flex items-center gap-2 text-headline">
                              <AlertTriangle className="h-5 w-5 text-yellow-500" />
                              Cancel Booking
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-muted-foreground">
                              Are you sure you want to cancel your booking for{' '}
                              <span className="font-medium text-headline">
                                {booking.apartment.name}
                              </span>
                              ? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="border-primary/40 cursor-pointer">
                              Keep Booking
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleCancelBooking(booking.id)}
                              className="cursor-pointer bg-red-400 hover:bg-red-700 text-white"
                            >
                              Cancel Booking
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </motion.div>
                  )}

                  {booking.status === 'already_booked' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                      className="w-full"
                    >
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            disabled={removingId === booking.id}
                            className="cursor-pointer w-full border-gray-500/20 text-gray-600 hover:bg-gray-500/10 hover:border-gray-500/40 transition-all duration-200"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            {removingId === booking.id
                              ? 'Removing...'
                              : 'Remove'}
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-background/95 backdrop-blur-sm border-primary/20">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="flex items-center gap-2 text-headline">
                              <Trash2 className="h-5 w-5 text-gray-500" />
                              Remove Booking
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-muted-foreground">
                              This booking for{' '}
                              <span className="font-medium text-headline">
                                {booking.apartment.name}
                              </span>{' '}
                              is already booked by someone else. Would you like
                              to remove it from your list?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="border-primary/20">
                              Keep in List
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleRemoveBooking(booking.id)}
                              className="bg-gray-500 hover:bg-gray-600 text-white"
                            >
                              Remove
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </motion.div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Chat Popup */}
      {chatOpen && (
        <ChatPopup
          isOpen={!!chatOpen}
          onClose={() => setChatOpen(null)}
          booking={bookings.find((b) => b.id === chatOpen)!}
        />
      )}
    </>
  );
}
