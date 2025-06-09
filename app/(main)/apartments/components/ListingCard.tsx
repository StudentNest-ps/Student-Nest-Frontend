'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Building, Users, Phone, CalendarDays } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Property } from '@/module/types/Admin';

// Enhanced animation variants
export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

// Hover animation for the button
const buttonAnimation = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
};

interface ListingCardProps {
  listing: Property;
}

export default function ListingCard({ listing }: ListingCardProps) {
  const [formattedFrom, setFormattedFrom] = useState<string>('');
  const [formattedTo, setFormattedTo] = useState<string>('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    };

    setFormattedFrom(formatDate(listing.availableFrom));
    setFormattedTo(formatDate(listing.availableTo));
  }, [listing.availableFrom, listing.availableTo]);

  const neighborhood = listing.address.split(',')[0]?.trim() || 'Unknown';

  // Only render animations on the client to prevent hydration errors
  if (!isClient) {
    return (
      <div className="bg-card rounded-xl overflow-hidden shadow-sm border border-border/50">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 relative aspect-[4/3]">
            <Image
              src={listing.image || '/placeholder.svg'}
              alt={listing.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="md:w-2/3 p-4 space-y-2">
            {/* Static content without animations */}
            {/* ... content similar to the animated version but without motion elements */}
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      variants={fadeInUp}
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="bg-card rounded-xl overflow-hidden shadow-sm border border-border/50 relative"
    >
      {/* Glowing effect container - positioned absolutely */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 via-primary/5 to-primary/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="flex flex-col md:flex-row relative">
        <div className="md:w-1/3 relative aspect-[4/3] overflow-hidden">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.25 }}
            className="h-full w-full"
          >
            <Image
              src={listing.image || '/placeholder.svg'}
              alt={listing.title}
              fill
              className="object-cover transition-transform duration-500"
            />
          </motion.div>
        </div>

        <div className="md:w-2/3 p-5 space-y-3 relative">
          {/* Subtle glow behind the title */}
          <div className="absolute top-4 left-4 w-20 h-20 bg-primary/10 rounded-full blur-xl -z-10"></div>

          <h3 className="text-lg font-semibold text-foreground">
            {listing.title}
          </h3>

          <div className="text-sm text-muted-foreground line-clamp-2">
            {listing.description}
          </div>

          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.05, color: 'var(--primary)' }}
              transition={{ duration: 0.2 }}
            >
              <Building className="mr-1" size={14} />
              <span>{listing.type}</span>
            </motion.div>

            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.05, color: 'var(--primary)' }}
              transition={{ duration: 0.2 }}
            >
              <MapPin className="mr-1" size={14} />
              <span>
                {neighborhood}, {listing.city}, {listing.country}
              </span>
            </motion.div>

            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.05, color: 'var(--primary)' }}
              transition={{ duration: 0.2 }}
            >
              <Users className="mr-1" size={14} />
              <span>{listing.maxGuests} guests</span>
            </motion.div>

            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.05, color: 'var(--primary)' }}
              transition={{ duration: 0.2 }}
            >
              <Phone className="mr-1" size={14} />
              <span>{listing.ownerPhoneNumber}</span>
            </motion.div>
          </div>

          <div className="flex flex-wrap gap-2 text-xs mt-2">
            {listing.amenities.slice(0, 4).map((a, index) => (
              <motion.span
                key={a}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className="bg-accent px-2 py-1 rounded-md text-accent-foreground"
              >
                {a}
              </motion.span>
            ))}
            {listing.amenities.length > 4 && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-muted-foreground"
              >
                +{listing.amenities.length - 4} more
              </motion.span>
            )}
          </div>

          <div className="flex justify-between items-end mt-4">
            <div className="text-sm text-muted-foreground flex flex-col gap-1">
              <motion.div
                className="flex items-center"
                whileHover={{ x: 3 }}
                transition={{ duration: 0.2 }}
              >
                <CalendarDays className="mr-1" size={14} />
                <span>From: {formattedFrom}</span>
              </motion.div>
              <motion.div
                className="flex items-center"
                whileHover={{ x: 3 }}
                transition={{ duration: 0.2 }}
              >
                <CalendarDays className="mr-1" size={14} />
                <span>To: {formattedTo}</span>
              </motion.div>
            </div>

            <div className="text-right">
              <div className="text-sm text-muted-foreground">From</div>
              <motion.div
                className="text-lg font-bold text-foreground"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                ${listing.price}/month
              </motion.div>

              <motion.div
                variants={buttonAnimation}
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
                className="relative mt-2 inline-block"
              >
                {/* Button glow effect */}
                <div className="absolute inset-0 bg-primary/20 rounded-md blur-sm"></div>

                <Link
                  href={`/apartments/${listing._id}`}
                  className="relative bg-primary text-primary-foreground px-4 py-1.5 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors block"
                >
                  Book Now
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
