'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  CreditCard,
  Star,
  MapPin,
  X,
  AlertTriangle,
  Trash2,
  MessageCircle,
} from 'lucide-react';
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
import type { Booking } from '../types/booking';
import { ChatPopup } from './ChatPopup';
import Image from 'next/image';

interface BookingTableProps {
  bookings: Booking[];
  onCancelBooking?: (bookingId: string) => void;
  onRemoveBooking?: (bookingId: string) => void;
}

const tableVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
  exit: { opacity: 0, y: -20 },
};

const rowVariants = {
  initial: { opacity: 0, x: -20 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 },
  },
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
    case 'accepted':
      return 'bg-green-500/10 text-green-500 border-green-500/20';
    case 'already_booked':
      return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
    default:
      return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'pending':
      return 'Pending';
    case 'accepted':
      return 'Accepted';
    case 'already_booked':
      return 'Already Booked';
    default:
      return status.charAt(0).toUpperCase() + status.slice(1);
  }
};

export function BookingTable({
  bookings,
  onCancelBooking,
  onRemoveBooking,
}: BookingTableProps) {
  const router = useRouter();
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [chatOpen, setChatOpen] = useState<string | null>(null);

  const handlePayment = (bookingId: string) => {
    router.push(`/payment?booking=${bookingId}`);
  };

  const handleCancelBooking = async (bookingId: string) => {
    setCancellingId(bookingId);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    onCancelBooking?.(bookingId);
    setCancellingId(null);
  };

  const handleRemoveBooking = async (bookingId: string) => {
    setRemovingId(bookingId);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));
    onRemoveBooking?.(bookingId);
    setRemovingId(null);
  };

  const openChat = (bookingId: string) => {
    setChatOpen(bookingId);
  };

  return (
    <>
      <motion.div
        variants={tableVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Card className="bg-background/50 backdrop-blur-sm border-primary/20 shadow-lg shadow-primary/10 overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-primary/10 bg-primary/5">
                    <TableHead className="text-headline font-semibold py-4">
                      Property
                    </TableHead>
                    <TableHead className="text-headline font-semibold">
                      Dates
                    </TableHead>
                    <TableHead className="text-headline font-semibold">
                      Guests
                    </TableHead>
                    <TableHead className="text-headline font-semibold">
                      Amount
                    </TableHead>
                    <TableHead className="text-headline font-semibold">
                      Status
                    </TableHead>
                    <TableHead className="text-headline font-semibold text-center">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map((booking) => (
                    <motion.tr
                      key={booking.id}
                      variants={rowVariants}
                      className="border-primary/10 hover:bg-primary/5 transition-colors duration-200"
                    >
                      <TableCell className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <Image
                              src={
                                booking.apartment.image || '/placeholder.svg'
                              }
                              alt={booking.apartment.name}
                              width={36}
                              height={36}
                              className="w-16 h-16 rounded-xl object-cover shadow-md"
                            />
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/20 to-transparent" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="font-semibold text-headline text-base truncate">
                              {booking.apartment.name}
                            </div>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                              <MapPin className="h-3 w-3 flex-shrink-0" />
                              <span className="truncate">
                                {booking.apartment.location}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 mt-1">
                              <Star className="h-3 w-3 text-yellow-400 fill-current" />
                              <span className="text-xs text-muted-foreground font-medium">
                                {booking.apartment.rating}
                              </span>
                              <span className="text-xs text-muted-foreground ml-2">
                                {booking.apartment.bedrooms}BR •{' '}
                                {booking.apartment.bathrooms}BA
                              </span>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm space-y-1">
                          <div className="font-medium text-headline">
                            {booking.checkIn}
                          </div>
                          <div className="text-muted-foreground">
                            to {booking.checkOut}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Booked: {booking.bookingDate}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm font-medium text-headline flex items-center gap-1">
                          <span className="text-lg">{booking.guests}</span>
                          <span className="text-muted-foreground">guests</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-base font-bold text-primary">
                          ${booking.totalAmount}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Total
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`${getStatusColor(booking.status)} text-xs font-medium`}
                        >
                          {getStatusLabel(booking.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-2">
                          {/* Message Button - Always visible */}
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.05 }}
                          >
                            <Button
                              size="sm"
                              onClick={() => openChat(booking.id)}
                              className="cursor-pointer h-8 w-8 p-0 bg-primary/90 hover:bg-primary text-background shadow-lg shadow-primary/25"
                            >
                              <MessageCircle className="h-3 w-3" />
                            </Button>
                          </motion.div>

                          {/* Status-specific actions */}
                          {booking.status === 'accepted' && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.1 }}
                            >
                              <Button
                                size="sm"
                                onClick={() => handlePayment(booking.id)}
                                className="bg-primary cursor-pointer hover:from-primary/90 hover:to-accent/90 text-background shadow-lg shadow-primary/25 transition-all duration-200"
                              >
                                <CreditCard className="h-3 w-3 mr-1" />
                                Pay Now
                              </Button>
                            </motion.div>
                          )}

                          {booking.status === 'pending' && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.1 }}
                            >
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="cursor-pointer border-red-500/20 text-red-500 hover:bg-red-500/10 hover:border-red-500/40 transition-all duration-200"
                                    disabled={cancellingId === booking.id}
                                  >
                                    <X className="h-3 w-3 mr-1" />
                                    {cancellingId === booking.id
                                      ? 'Cancelling...'
                                      : 'Cancel'}
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent className="bg-background/95 backdrop-blur-sm border-primary/20">
                                  <AlertDialogHeader>
                                    <AlertDialogTitle className="flex items-center gap-2 text-headline">
                                      <AlertTriangle className="h-5 w-5 text-yellow-500" />
                                      Cancel Booking
                                    </AlertDialogTitle>
                                    <AlertDialogDescription className="text-muted-foreground">
                                      Are you sure you want to cancel your
                                      booking for{' '}
                                      <span className="font-medium text-headline">
                                        {booking.apartment.name}
                                      </span>
                                      ? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel className="border-primary/20">
                                      Keep Booking
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() =>
                                        handleCancelBooking(booking.id)
                                      }
                                      className="bg-red-500 hover:bg-red-600 text-white"
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
                              transition={{ delay: 0.1 }}
                            >
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    disabled={removingId === booking.id}
                                    className="cursor-pointer border-gray-500/20 text-gray-600 hover:bg-gray-500/10 hover:border-gray-500/40 transition-all duration-200"
                                  >
                                    <Trash2 className="h-3 w-3 mr-1" />
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
                                      is already booked by someone else. Would
                                      you like to remove it from your list?
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel className="border-primary/20">
                                      Keep in List
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() =>
                                        handleRemoveBooking(booking.id)
                                      }
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
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
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
