'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Clock,
  CheckCircle,
  Home,
  LayoutGrid,
  TableIcon,
  Calendar,
} from 'lucide-react';
import { BookingCard } from './components/BookingCard';
import { BookingTable } from './components/BookingTable';
import { BookingSkeleton } from './components/BookingSkeleton';

import { BookingStatus, type Booking } from './types/booking';
import student from '@/module/services/Student';
import { toast } from 'sonner';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -60 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const glowVariants = {
  initial: { scale: 1, opacity: 0.7 },
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 2,
      repeat: Number.POSITIVE_INFINITY,
      ease: 'easeInOut',
    },
  },
};

export default function MyBookingsPage() {
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setIsLoading(true);
        const data = await student.getMyBookings();
        console.log(data);
        setBookings(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const handleCancelBooking = async (bookingId: string) => {
    try {
      const res = await student.cancelBooking(bookingId);
      if (res) {
        setBookings((prev) =>
          prev.map((b) =>
            b.id == bookingId ? { ...b, status: BookingStatus.Cancelled } : b
          )
        );
        toast.success('Booking cancelled successfully');
      } else {
        toast.error('Failed to cancel booking');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveBooking = (bookingId: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== bookingId));
  };

  const getStatusStats = () => {
    const stats = bookings.reduce(
      (acc, booking) => {
        acc[booking.status] = (acc[booking.status] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    return {
      total: bookings.length,
      pending: stats.pending || 0,
      confirmed: stats.confirmed || 0,
      already_booked: stats.already_booked || 0,
    };
  };

  const stats = getStatusStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          variants={glowVariants}
          initial="initial"
          animate="animate"
          className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          variants={glowVariants}
          initial="initial"
          animate="animate"
          style={{ animationDelay: '1s' }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
        />
        <motion.div
          variants={glowVariants}
          initial="initial"
          animate="animate"
          style={{ animationDelay: '2s' }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-2xl"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header Section */}
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="initial"
          animate={isInView ? 'animate' : 'initial'}
          className="mb-8"
        >
          <motion.div variants={fadeInUp} className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-headline mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              My Bookings
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Track and manage all your property bookings in one place
            </p>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          >
            <Card className="bg-background/50 backdrop-blur-sm border-primary/20 shadow-lg shadow-primary/10">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Home className="h-5 w-5 text-primary" />
                </div>
                <div className="text-2xl font-bold text-headline">
                  {stats.total}
                </div>
                <div className="text-sm text-muted-foreground">
                  Total Bookings
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background/50 backdrop-blur-sm border-yellow-500/20 shadow-lg shadow-yellow-500/10">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Clock className="h-5 w-5 text-yellow-500" />
                </div>
                <div className="text-2xl font-bold text-headline">
                  {stats.pending}
                </div>
                <div className="text-sm text-muted-foreground">Pending</div>
              </CardContent>
            </Card>

            <Card className="bg-background/50 backdrop-blur-sm border-green-500/20 shadow-lg shadow-green-500/10">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
                <div className="text-2xl font-bold text-headline">
                  {stats.confirmed}
                </div>
                <div className="text-sm text-muted-foreground">Confirmed</div>
              </CardContent>
            </Card>

            <Card className="bg-background/50 backdrop-blur-sm border-blue-500/20 shadow-lg shadow-blue-500/10">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Calendar className="h-5 w-5 text-blue-500" />
                </div>
                <div className="text-2xl font-bold text-headline">
                  {stats.already_booked}
                </div>
                <div className="text-sm text-muted-foreground">
                  Already Booked
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* View Toggle */}
          <motion.div variants={fadeInUp} className="flex justify-end mb-6">
            <Tabs
              value={viewMode}
              onValueChange={(value) => setViewMode(value as 'cards' | 'table')}
            >
              <TabsList className="bg-background/50 backdrop-blur-sm border border-primary/20">
                <TabsTrigger
                  value="cards"
                  className="cursor-pointer flex items-center gap-2"
                >
                  <LayoutGrid className="h-4 w-4" />
                  Cards
                </TabsTrigger>
                <TabsTrigger
                  value="table"
                  className="cursor-pointer flex items-center gap-2"
                >
                  <TableIcon className="h-4 w-4" />
                  Table
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </motion.div>
        </motion.div>

        {/* Content Section */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <BookingSkeleton viewMode={viewMode} />
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {viewMode === 'cards' ? (
                <BookingCard
                  bookings={bookings}
                  onCancelBooking={handleCancelBooking}
                  onRemoveBooking={handleRemoveBooking}
                />
              ) : (
                <BookingTable
                  bookings={bookings}
                  onCancelBooking={handleCancelBooking}
                  onRemoveBooking={handleRemoveBooking}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
