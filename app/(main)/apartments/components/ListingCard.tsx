'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Bed, Bath, Wifi, MapPin, Building } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Property } from '@/module/types/Admin';

// Animation variant
export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

interface ListingCardProps {
  listing: Property;
}

export default function ListingCard({ listing }: ListingCardProps) {
  // Use state to store formatted date
  const [formattedDate, setFormattedDate] = useState<string>('');

  // Format date on client-side only
  useEffect(() => {
    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    };

    setFormattedDate(formatDate(listing.availableFrom));
  }, [listing.availableFrom]);

  // Extract neighborhood from address
  const neighborhood = listing.address.split(',')[0]?.trim() || 'Unknown';

  return (
    <motion.div
      variants={fadeInUp}
      className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-border/50"
    >
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 relative">
          <Image
            src="/placeholder.svg" // Default placeholder since we don't have image in the new interface
            alt={listing.title}
            width={300}
            height={200}
            className="w-full h-full object-cover aspect-[4/3]"
          />
        </div>
        <div className="md:w-2/3 p-4">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {listing.title}
          </h3>

          <div className="flex flex-wrap gap-3 mb-3">
            <div className="flex items-center text-sm text-muted-foreground">
              <Bed className="mr-1" size={16} />
              <span>{listing.type === 'studio' ? 'Studio' : '2 bedrooms'}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Bath className="mr-1" size={16} />
              <span>1 bath</span>
            </div>
            {listing.amenities.includes('WiFi') && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Wifi className="mr-1" size={16} />
                <span>WiFi</span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-3 mb-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <MapPin className="mr-1" size={14} />
              <span>
                {neighborhood}, {listing.city}
              </span>
            </div>
            <div className="flex items-center">
              <Building className="mr-1" size={14} />
              <span>{listing.type}</span>
            </div>
            {listing.amenities.includes('Parking') && (
              <div className="flex items-center">
                <MapPin className="mr-1" size={14} />
                <span>Parking</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mt-auto">
            <div className="bg-accent/50 text-accent-foreground text-sm px-3 py-1 rounded-full">
              Available: {formattedDate}
            </div>
            <div className="flex flex-col items-end">
              <div className="text-sm text-muted-foreground">from</div>
              <div className="text-lg font-semibold text-foreground">
                ${listing.price}/month
              </div>
              <Link
                href={`/apartments/${listing._id}`}
                className="bg-primary text-primary-foreground px-5 py-2 rounded-md mt-2 text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
