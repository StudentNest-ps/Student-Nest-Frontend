'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Building, Users, Phone, CalendarDays } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Property } from '@/module/types/Admin';

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
  const [formattedFrom, setFormattedFrom] = useState<string>('');
  const [formattedTo, setFormattedTo] = useState<string>('');

  useEffect(() => {
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

  return (
    <motion.div
      variants={fadeInUp}
      className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-border/50"
    >
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
          <h3 className="text-lg font-semibold text-foreground">
            {listing.title}
          </h3>

          <div className="text-sm text-muted-foreground line-clamp-2">
            {listing.description}
          </div>

          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Building className="mr-1" size={14} />
              <span>{listing.type}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-1" size={14} />
              <span>
                {neighborhood}, {listing.city}, {listing.country}
              </span>
            </div>
            <div className="flex items-center">
              <Users className="mr-1" size={14} />
              <span>{listing.maxGuests} guests</span>
            </div>
            <div className="flex items-center">
              <Phone className="mr-1" size={14} />
              <span>{listing.ownerPhoneNumber}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 text-xs mt-2">
            {listing.amenities.slice(0, 4).map((a) => (
              <span
                key={a}
                className="bg-accent px-2 py-1 rounded-md text-accent-foreground"
              >
                {a}
              </span>
            ))}
            {listing.amenities.length > 4 && (
              <span className="text-muted-foreground">
                +{listing.amenities.length - 4} more
              </span>
            )}
          </div>

          <div className="flex justify-between items-end mt-4">
            <div className="text-sm text-muted-foreground flex flex-col gap-1">
              <div className="flex items-center">
                <CalendarDays className="mr-1" size={14} />
                <span>From: {formattedFrom}</span>
              </div>
              <div className="flex items-center">
                <CalendarDays className="mr-1" size={14} />
                <span>To: {formattedTo}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">From</div>
              <div className="text-lg font-bold text-foreground">
                ${listing.price}/month
              </div>
              <Link
                href={`/apartments/${listing._id}`}
                className="bg-primary text-primary-foreground px-4 py-1.5 rounded-md mt-2 text-sm font-medium hover:bg-primary/90 transition-colors"
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
