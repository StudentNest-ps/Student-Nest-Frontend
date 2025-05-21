'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  MapPin,
  Wifi,
  Users,
  ChevronDown,
  X,
  Plus,
  Minus,
  Filter,
  SlidersHorizontal,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

import ListingCard from './components/ListingCard';
import admin from '@/module/services/Admin';
import { Property } from '@/module/types/Admin';

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function ApartmentsPage() {
  const searchParams = useSearchParams();
  const initialGuests = searchParams.get('guests') || '1';
  const [apartments, setApartments] = useState<Property[]>([]);
  const [city, setCity] = useState('');
  const [guests, setGuests] = useState(initialGuests);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('availability');
  const [visibleListings, setVisibleListings] = useState(6);

  const filteredListings = apartments.filter((listing) => {
    if (
      city &&
      city !== 'all' &&
      listing.city.toLowerCase() !== city.toLowerCase()
    ) {
      return false;
    }

    if (
      activeFilters.includes('parking') &&
      !listing.amenities.includes('Parking')
    ) {
      return false;
    }

    const guestsNum = Number.parseInt(guests);
    if (guestsNum > 1) {
      //TODO: listing.maxGuests
      return false;
    }

    return true;
  });

  const sortedListings = [...filteredListings].sort((a, b) => {
    if (sortBy === 'price-asc') {
      return a.price - b.price;
    } else if (sortBy === 'price-desc') {
      return b.price - a.price;
    } else if (sortBy === 'availability') {
      return (
        new Date(a.availableFrom).getTime() -
        new Date(b.availableFrom).getTime()
      );
    }
    return 0;
  });

  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter((f) => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  const loadMore = () => {
    setVisibleListings((prev) => Math.min(prev + 4, sortedListings.length));
  };

  const [listingsRef, listingsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const faqItems = [
    {
      question: 'What amenities are included in the apartments?',
      answer:
        'Our apartments come with a variety of amenities including WiFi, fully equipped kitchens, air conditioning, and more. Each listing specifies the exact amenities available.',
    },
    {
      question: 'How close are the apartments to Najah National University?',
      answer:
        'Most of our apartments in Nablus are within walking distance or a short drive from Najah National University. The map shows the exact location and distance from the university.',
    },
    {
      question: 'What is the booking process?',
      answer:
        "Select your preferred apartment, choose your move-in and move-out dates, and complete the booking form. You'll receive a confirmation email with all the details.",
    },
    {
      question: 'Is there a security deposit required?',
      answer:
        'Yes, most apartments require a security deposit which is fully refundable upon checkout, provided there are no damages to the property.',
    },
    {
      question: 'Can I book for a semester or academic year?',
      answer:
        'We offer flexible booking periods including semester-long and academic year options, perfect for students at Najah National University.',
    },
    {
      question: 'Are utilities included in the rent?',
      answer:
        'This varies by property. Most apartments include water and WiFi, while electricity might be billed separately. Check the specific listing for details.',
    },
    {
      question: 'Is parking available?',
      answer:
        "Many of our properties offer parking. You can use the 'Parking' filter to find apartments with dedicated parking spaces.",
    },
    {
      question: 'How can I contact the property manager?',
      answer:
        'Each listing includes contact information for the property manager. You can also reach out through our customer support for assistance.',
    },
    {
      question: 'Are the apartments furnished?',
      answer:
        'Yes, all our apartments come fully furnished with essential furniture and appliances to ensure a comfortable stay.',
    },
    {
      question: 'What payment methods are accepted?',
      answer:
        'We accept various payment methods including credit/debit cards, bank transfers, and PayPal. Payment details will be provided during the booking process.',
    },
  ];

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const response = await admin.getProperties();
        setApartments(response);
        console.log(response);
      } catch (error) {
        console.error('Error fetching apartments:', error);
      }
    };
    fetchApartments();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Search bar */}
      <div className="bg-background py-4 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-2 md:items-center">
            <div className="flex-1 flex flex-col md:flex-row gap-2">
              <div className="relative flex-1">
                <Select value={city} onValueChange={setCity}>
                  <SelectTrigger className="w-full border rounded-full pl-10">
                    <SelectValue placeholder="Select a city" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Cities</SelectItem>
                    <SelectItem value="nablus">Nablus</SelectItem>
                    <SelectItem value="ramallah">Ramallah</SelectItem>
                    <SelectItem value="jenin">Jenin</SelectItem>
                    <SelectItem value="hebron">Hebron</SelectItem>
                    <SelectItem value="bethlehem">Bethlehem</SelectItem>
                  </SelectContent>
                </Select>
                <MapPin
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                  size={18}
                />
              </div>

              <div className="relative flex-1">
                <Users
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                  size={18}
                />
                <div className="flex items-center border rounded-full pl-10 pr-2 h-10">
                  <span className="flex-1">Guests</span>
                  <div className="flex items-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 rounded-full"
                      onClick={() =>
                        setGuests(
                          Math.max(Number.parseInt(guests) - 1, 1).toString()
                        )
                      }
                    >
                      <Minus size={14} />
                    </Button>
                    <span className="w-6 text-center">{guests}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 rounded-full"
                      onClick={() =>
                        setGuests((Number.parseInt(guests) + 1).toString())
                      }
                    >
                      <Plus size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-background py-3 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="rounded-full cursor-pointer"
                  >
                    <Filter className="mr-2" size={16} />
                    More filters
                    <ChevronDown className="ml-2" size={16} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-4">
                    <h3 className="font-medium">Amenities</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant={
                          activeFilters.includes('parking')
                            ? 'default'
                            : 'outline'
                        }
                        className="justify-start rounded-full cursor-pointer"
                        onClick={() => toggleFilter('parking')}
                      >
                        <MapPin className="mr-2" size={16} />
                        Parking
                      </Button>
                      <Button
                        variant={
                          activeFilters.includes('wifi') ? 'default' : 'outline'
                        }
                        className="justify-start rounded-full cursor-pointer"
                        onClick={() => toggleFilter('wifi')}
                      >
                        <Wifi className="mr-2" size={16} />
                        WiFi
                      </Button>
                      <Button
                        variant={
                          activeFilters.includes('ac') ? 'default' : 'outline'
                        }
                        className="justify-start rounded-full cursor-pointer"
                        onClick={() => toggleFilter('ac')}
                      >
                        <SlidersHorizontal className="mr-2" size={16} />
                        AC
                      </Button>
                      <Button
                        variant={
                          activeFilters.includes('kitchen')
                            ? 'default'
                            : 'outline'
                        }
                        className="justify-start rounded-full cursor-pointer"
                        onClick={() => toggleFilter('kitchen')}
                      >
                        <SlidersHorizontal className="mr-2" size={16} />
                        Kitchen
                      </Button>
                    </div>

                    <Separator />

                    <h3 className="font-medium">Price Range</h3>
                    <div className="flex items-center space-x-2">
                      <Input
                        placeholder="Min"
                        type="number"
                        className="rounded-full"
                      />
                      <span>-</span>
                      <Input
                        placeholder="Max"
                        type="number"
                        className="rounded-full"
                      />
                      <Button size="sm" className="rounded-full cursor-pointer">
                        Apply
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              {activeFilters.map((filter) => (
                <Badge key={filter} variant="outline" className="rounded-full">
                  {filter === 'parking' && (
                    <MapPin className="mr-1" size={14} />
                  )}
                  {filter === 'wifi' && <Wifi className="mr-1" size={14} />}
                  {filter === 'ac' && (
                    <SlidersHorizontal className="mr-1" size={14} />
                  )}
                  {filter === 'kitchen' && (
                    <SlidersHorizontal className="mr-1" size={14} />
                  )}
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 ml-1 p-0 cursor-pointer"
                    onClick={() => toggleFilter(filter)}
                  >
                    <X size={12} />
                  </Button>
                </Badge>
              ))}
            </div>

            <div className="flex items-center">
              <span className="text-sm text-muted-foreground mr-2">
                Sort by:
              </span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40 h-8 text-sm cursor-pointer">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="availability">Availability</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="container mx-auto px-4 py-4">
        <p className="text-muted-foreground">
          <span className="font-medium text-foreground">
            {filteredListings.length} results
          </span>{' '}
          for
          {city !== 'all'
            ? ` apartments in ${city.charAt(0).toUpperCase() + city.slice(1)}`
            : ' all apartments'}
          {activeFilters.length > 0 && ` with ${activeFilters.join(', ')}`}
        </p>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Listings */}
          <motion.div
            ref={listingsRef}
            initial="hidden"
            animate={listingsInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="lg:col-span-2"
          >
            <div className="space-y-4">
              {sortedListings.slice(0, visibleListings).map((listing) => (
                <ListingCard key={listing._id} listing={listing} />
              ))}
            </div>

            {visibleListings < sortedListings.length && (
              <div className="flex justify-center mt-8">
                <Button
                  onClick={loadMore}
                  variant="outline"
                  className="rounded-full"
                >
                  Show more apartments
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* About section */}
      <section className="bg-background py-16 border-t border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Apartments for rent in Palestine
          </h2>
          <div className="prose max-w-none text-muted-foreground">
            <p className="mb-4">
              Finding the perfect apartment near Najah National University in
              Nablus has never been easier. Our platform offers a wide selection
              of quality accommodations tailored to students and professionals
              alike. Each neighborhood in Nablus has its own unique charm and
              character, providing diverse living experiences throughout the
              city.
            </p>
            <p className="mb-4">
              Whether you&apos;re looking for a cozy studio apartment or a
              spacious multi-bedroom unit, our listings cover a range of options
              to suit different needs and budgets. Many of our properties are
              within walking distance to Najah National University, making them
              ideal for students who want to minimize commute time.
            </p>
            <p>
              All our apartments come fully furnished with modern amenities,
              reliable WiFi, and essential appliances. We prioritize comfort,
              convenience, and security to ensure you have a pleasant living
              experience during your stay in Nablus. Browse our listings today
              and find your perfect home away from home.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ section */}
      <section className="bg-accent/10 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-foreground mb-8">
            Frequently Asked Questions
          </h2>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card rounded-xl border border-border/50"
              >
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}
