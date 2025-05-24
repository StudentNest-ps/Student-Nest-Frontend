'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Check,
  Users,
  Phone,
  Star,
  Heart,
  Share2,
  Wifi,
  Car,
  Coffee,
  Tv,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import type { Property } from '@/module/types/Admin';
import { format } from 'date-fns';
import { toast } from 'sonner';
import property from '@/module/services/Property';

// Animation variants
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.98,
    transition: {
      duration: 0.4,
      ease: 'easeIn',
    },
  },
};

const cardVariants = {
  initial: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const imageVariants = {
  initial: {
    opacity: 0,
    scale: 1.1,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

const amenityVariants = {
  initial: {
    opacity: 0,
    x: -20,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Floating orb component
const FloatingOrb = ({
  delay = 0,
  size = 'w-32 h-32',
  color = 'bg-primary/10',
}) => (
  <motion.div
    className={`absolute ${size} ${color} rounded-full blur-xl`}
    animate={{
      x: [0, 30, -30, 0],
      y: [0, -30, 30, 0],
      scale: [1, 1.1, 0.9, 1],
    }}
    transition={{
      duration: 20 + delay * 2,
      repeat: Number.POSITIVE_INFINITY,
      ease: 'easeInOut',
      delay: delay,
    }}
  />
);

// Loading skeleton component
const LoadingSkeleton = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="container mx-auto px-4 py-16"
  >
    <div className="mb-6">
      <div className="h-10 w-40 bg-muted rounded-lg animate-pulse"></div>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="h-[400px] bg-muted rounded-xl animate-pulse"></div>
        <div className="h-8 w-3/4 bg-muted rounded animate-pulse"></div>
        <div className="h-4 w-1/2 bg-muted rounded animate-pulse"></div>
        <div className="h-64 bg-muted rounded-xl animate-pulse"></div>
      </div>
      <div className="space-y-6">
        <div className="h-48 bg-muted rounded-xl animate-pulse"></div>
        <div className="h-32 bg-muted rounded-xl animate-pulse"></div>
        <div className="h-32 bg-muted rounded-xl animate-pulse"></div>
      </div>
    </div>
  </motion.div>
);

// Amenity icon mapping
const amenityIcons: {
  [key: string]: React.ComponentType<{ className?: string; size?: number }>;
} = {
  WiFi: Wifi,
  Parking: Car,
  Kitchen: Coffee,
  TV: Tv,
  'Air Conditioning': Star,
};

export default function ApartmentDetails({ id }: { id: string }) {
  const [apartment, setApartment] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setImageLoaded] = useState(false);

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        // const response = await admin.getProperties();
        const response = await property.getPropertyById(id);

        setApartment(response || null);
      } catch (error) {
        console.error('Error fetching apartment:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApartments();
  }, [id]);

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (!apartment) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 py-16 flex flex-col items-center min-h-[70vh] relative overflow-hidden"
      >
        {/* Background orbs */}
        <FloatingOrb delay={0} size="w-64 h-64" color="bg-primary/5" />
        <FloatingOrb delay={2} size="w-48 h-48" color="bg-accent/10" />

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center relative z-10"
        >
          <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Apartment Not Found
          </h1>
          <p className="text-muted-foreground mb-8 text-lg">
            The apartment you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link href="/apartments">
            <Button
              variant="outline"
              className="cursor-pointer group relative overflow-hidden border-primary/20 hover:border-primary/40 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" />
              Back to Apartments
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={apartment._id}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="min-h-screen bg-background relative overflow-hidden"
      >
        {/* Animated background orbs */}
        <FloatingOrb delay={0} size="w-96 h-96" color="bg-primary/5" />
        <FloatingOrb delay={3} size="w-64 h-64" color="bg-accent/10" />
        <FloatingOrb delay={6} size="w-48 h-48" color="bg-primary/8" />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none"></div>

        <div className="container mx-auto px-4 py-8 relative z-10">
          <motion.div variants={cardVariants} className="mb-6">
            <Link href="/apartments">
              <Button
                variant="outline"
                size="sm"
                className="cursor-pointer group relative overflow-hidden backdrop-blur-sm bg-background/80 border-primary/20 hover:border-primary/40 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" />
                Back to Apartments
              </Button>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <motion.div
              variants={staggerContainer}
              className="lg:col-span-2 space-y-6"
            >
              {/* Image section */}
              <motion.div
                variants={imageVariants}
                className="relative rounded-2xl overflow-hidden h-[400px] shadow-2xl group"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
                <Image
                  src={apartment.image || '/placeholder.svg'}
                  alt={apartment.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  onLoad={() => setImageLoaded(true)}
                />

                {/* Floating badges */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="absolute top-4 left-4 z-20"
                >
                  <Badge className="bg-primary/50 text-background backdrop-blur-md border-0 p-2 shadow-lg text-sm font-bold rounded-2xl">
                    Featured
                  </Badge>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="absolute top-4 right-4 z-20 flex gap-2"
                >
                  <Button
                    size="icon"
                    variant="secondary"
                    className="cursor-pointer rounded-full backdrop-blur-sm bg-background/80 hover:bg-background/90 transition-all duration-300"
                    onClick={() => {
                      //TODO: Add Favorite Functionality
                      console.log(`liked apartments: ${apartment._id}`);
                      setIsLiked(!isLiked);
                      if (!isLiked) {
                        toast.success('Apartment added to favorites!');
                      } else {
                        toast.success('Apartment removed from favorites!');
                      }
                    }}
                  >
                    <Heart
                      className={` h-4 w-4 transition-all duration-300 ${
                        isLiked
                          ? 'fill-red-500 text-red-500 scale-110'
                          : 'text-muted-foreground'
                      }`}
                    />
                  </Button>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="cursor-pointer rounded-full backdrop-blur-sm bg-background/80 hover:bg-background/90 transition-all duration-300"
                    onClick={() => {
                      navigator.clipboard
                        .writeText(window.location.href)
                        .then(() => {
                          // You could add a toast notification here if you have a toast library

                          toast.success('URL copied to clipboard!');
                          // If you have a toast library like react-hot-toast or react-toastify, use that instead of alert
                        })
                        .catch((err) => {
                          console.error('Failed to copy URL: ', err);
                          toast.error('Failed to copy URL. Please try again.');
                        });
                    }}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </motion.div>
              </motion.div>

              {/* Title and location */}
              <motion.div variants={cardVariants}>
                <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
                  {apartment.title}
                </h1>
                <div className="text-muted-foreground flex items-center text-lg">
                  <MapPin className="mr-2 text-primary" size={18} />
                  {apartment.address}, {apartment.city}, {apartment.country}
                </div>
              </motion.div>

              {/* About section */}
              <motion.div variants={cardVariants}>
                <Card className="backdrop-blur-sm bg-card/80 border-border/50 shadow-xl hover:shadow-2xl transition-all duration-500 group">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-semibold mb-4 flex items-center">
                      <div className="w-1 h-6 bg-gradient-to-b from-primary to-primary/50 rounded-full mr-3"></div>
                      About this place
                    </h2>
                    <p className="text-muted-foreground mb-6 leading-relaxed text-lg">
                      {apartment.description}
                    </p>

                    <Separator className="my-6 bg-gradient-to-r from-transparent via-border to-transparent" />

                    {/* Stats grid */}
                    <motion.div
                      variants={staggerContainer}
                      className="grid grid-cols-2 gap-4 mb-6"
                    >
                      <motion.div
                        variants={amenityVariants}
                        className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border border-primary/20 hover:border-primary/30 transition-all duration-300 group"
                      >
                        <Users
                          size={28}
                          className="mx-auto text-primary mb-3 group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="text-center">
                          <div className="text-2xl font-bold text-foreground">
                            {apartment.maxGuests}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Max Guests
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        variants={amenityVariants}
                        className="p-6 bg-gradient-to-br from-accent/20 to-accent/10 rounded-xl border border-accent/30 hover:border-accent/40 transition-all duration-300 group"
                      >
                        <Phone
                          size={28}
                          className="mx-auto text-primary mb-3 group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="text-center">
                          <div className="text-lg font-semibold text-foreground">
                            {apartment.ownerPhoneNumber}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Contact
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>

                    <Separator className="my-6 bg-gradient-to-r from-transparent via-border to-transparent" />

                    {/* Amenities */}
                    <h3 className="text-xl font-semibold mb-6 flex items-center">
                      <div className="w-1 h-5 bg-gradient-to-b from-accent to-accent/50 rounded-full mr-3"></div>
                      What this place offers
                    </h3>
                    <motion.div
                      variants={staggerContainer}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                    >
                      {apartment.amenities.map((amenity) => {
                        const IconComponent = amenityIcons[amenity] || Check;
                        return (
                          <motion.div
                            key={amenity}
                            variants={amenityVariants}
                            className="flex items-center p-3 rounded-lg bg-gradient-to-r from-accent/10 to-transparent hover:from-accent/20 hover:to-accent/5 transition-all duration-300 group"
                          >
                            <IconComponent className="mr-3 h-5 w-5 text-primary group-hover:scale-110 transition-transform duration-300" />
                            <span className="font-medium">{amenity}</span>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            {/* Sidebar */}
            <motion.div variants={staggerContainer} className="space-y-6">
              {/* Pricing card */}
              <motion.div variants={cardVariants}>
                <Card className="backdrop-blur-sm bg-card/80 border-border/50 shadow-xl hover:shadow-2xl transition-all duration-500 sticky top-8">
                  <CardContent className="p-8">
                    <div className="text-center mb-6">
                      <div className="text-sm text-muted-foreground mb-2">
                        Monthly Rent
                      </div>
                      <div className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                        ${apartment.price}
                        <span className="text-lg text-muted-foreground font-normal ml-2">
                          /month
                        </span>
                      </div>
                    </div>

                    <Separator className="my-6 bg-gradient-to-r from-transparent via-border to-transparent" />

                    <Button className="cursor-pointer w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-background font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <span className="relative z-10">Book Now</span>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Availability card */}
              <motion.div variants={cardVariants}>
                <Card className="backdrop-blur-sm bg-card/80 border-border/50 shadow-xl hover:shadow-2xl transition-all duration-500">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <div className="w-1 h-5 bg-gradient-to-b from-primary to-primary/50 rounded-full mr-3"></div>
                      Availability
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center p-3 rounded-lg bg-gradient-to-r from-green-500/10 to-transparent">
                        <Calendar className="h-5 w-5 mr-3 text-green-600" />
                        <div>
                          <div className="text-sm text-muted-foreground">
                            Available from
                          </div>
                          <div className="font-medium">
                            {format(new Date(apartment.availableFrom), 'PPP')}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center p-3 rounded-lg bg-gradient-to-r from-orange-500/10 to-transparent">
                        <Calendar className="h-5 w-5 mr-3 text-orange-600" />
                        <div>
                          <div className="text-sm text-muted-foreground">
                            Available until
                          </div>
                          <div className="font-medium">
                            {format(new Date(apartment.availableTo), 'PPP')}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Owner info card */}
              <motion.div variants={cardVariants}>
                <Card className="backdrop-blur-sm bg-card/80 border-border/50 shadow-xl hover:shadow-2xl transition-all duration-500">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <div className="w-1 h-5 bg-gradient-to-b from-accent to-accent/50 rounded-full mr-3"></div>
                      Owner Information
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center p-3 rounded-lg bg-gradient-to-r from-accent/10 to-transparent">
                        <Users className="h-5 w-5 mr-3 text-primary" />
                        <div>
                          <div className="text-sm text-muted-foreground">
                            Owner
                          </div>
                          <div className="font-medium">
                            {apartment.ownerName}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center p-3 rounded-lg bg-gradient-to-r from-primary/10 to-transparent">
                        <Phone className="h-5 w-5 mr-3 text-primary" />
                        <div>
                          <div className="text-sm text-muted-foreground">
                            Contact
                          </div>
                          <div className="font-medium">
                            {apartment.ownerPhoneNumber}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
