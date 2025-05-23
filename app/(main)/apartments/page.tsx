'use client';

import { useEffect, useState } from 'react';
import { redirect, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
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
  Search,
  ArrowUpRight,
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
import type { Property } from '@/module/types/Admin';

// Enhanced animation variants
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
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
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  // Intersection observer hooks for different sections
  const [listingsRef, listingsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [aboutRef, aboutInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [faqRef, faqInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
    setIsClient(true);

    const fetchApartments = async () => {
      setIsLoading(true);
      try {
        const response = await admin.getProperties();
        setApartments(response);
      } catch (error) {
        console.error('Error fetching apartments:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApartments();
  }, []);

  // Prevent hydration errors by only rendering animations on client
  if (!isClient) {
    return (
      <div className="min-h-screen bg-background">
        {/* Static content without animations */}
        {/* ... */}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative">
      {/* Floating orbs background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl animate-float"></div>
        <div className="absolute top-2/3 left-1/3 w-48 h-48 rounded-full bg-accent/20 blur-3xl animate-float-reverse"></div>
      </div>

      {/* Search bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-background/80 backdrop-blur-sm py-6 border-b border-border sticky top-0 z-40"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-3 md:items-center">
            <div className="flex-1 flex flex-col md:flex-row gap-3">
              <motion.div
                className="relative flex-1"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Select value={city} onValueChange={setCity}>
                  <SelectTrigger className="w-full border rounded-full pl-10 bg-background/70 backdrop-blur-sm hover:border-primary transition-colors">
                    <SelectValue placeholder="Select a city" />
                  </SelectTrigger>
                  <SelectContent className="bg-background/90 backdrop-blur-md border border-border/50">
                    <SelectItem value="all">All Cities</SelectItem>
                    <SelectItem value="nablus">Nablus</SelectItem>
                    <SelectItem value="ramallah">Ramallah</SelectItem>
                    <SelectItem value="jenin">Jenin</SelectItem>
                    <SelectItem value="hebron">Hebron</SelectItem>
                    <SelectItem value="bethlehem">Bethlehem</SelectItem>
                  </SelectContent>
                </Select>
                <MapPin
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary"
                  size={18}
                />
              </motion.div>

              <motion.div
                className="relative flex-1"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Users
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary"
                  size={18}
                />
                <div className="flex items-center border rounded-full pl-10 pr-2 h-10 bg-background/70 backdrop-blur-sm hover:border-primary transition-colors">
                  <span className="flex-1">Guests</span>
                  <div className="flex items-center">
                    <motion.div whileTap={{ scale: 0.9 }}>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 rounded-full text-primary"
                        onClick={() =>
                          setGuests(
                            Math.max(Number.parseInt(guests) - 1, 1).toString()
                          )
                        }
                      >
                        <Minus size={14} />
                      </Button>
                    </motion.div>
                    <span className="w-6 text-center">{guests}</span>
                    <motion.div whileTap={{ scale: 0.9 }}>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 rounded-full text-primary"
                        onClick={() =>
                          setGuests((Number.parseInt(guests) + 1).toString())
                        }
                      >
                        <Plus size={14} />
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full w-full md:w-auto">
                  <Search className="mr-2" size={18} />
                  Search
                  <div className="absolute inset-0 rounded-full bg-primary/20 blur-sm -z-10 animate-pulse-slow"></div>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-background py-4 border-b border-border relative z-30"
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 flex-wrap gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="outline"
                      className="rounded-full relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <Filter className="mr-2 text-primary" size={16} />
                      More filters
                      <ChevronDown className="ml-2 text-primary" size={16} />
                    </Button>
                  </motion.div>
                </PopoverTrigger>
                <PopoverContent className="w-80 bg-background/90 backdrop-blur-md border border-border/50 rounded-xl p-4">
                  <div className="space-y-4">
                    <h3 className="font-medium text-primary">Amenities</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant={
                            activeFilters.includes('parking')
                              ? 'default'
                              : 'outline'
                          }
                          className="justify-start rounded-full w-full relative overflow-hidden group"
                          onClick={() => toggleFilter('parking')}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <MapPin className="mr-2" size={16} />
                          Parking
                        </Button>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant={
                            activeFilters.includes('wifi')
                              ? 'default'
                              : 'outline'
                          }
                          className="justify-start rounded-full w-full relative overflow-hidden group"
                          onClick={() => toggleFilter('wifi')}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <Wifi className="mr-2" size={16} />
                          WiFi
                        </Button>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant={
                            activeFilters.includes('ac') ? 'default' : 'outline'
                          }
                          className="justify-start rounded-full w-full relative overflow-hidden group"
                          onClick={() => toggleFilter('ac')}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <SlidersHorizontal className="mr-2" size={16} />
                          AC
                        </Button>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant={
                            activeFilters.includes('kitchen')
                              ? 'default'
                              : 'outline'
                          }
                          className="justify-start rounded-full w-full relative overflow-hidden group"
                          onClick={() => toggleFilter('kitchen')}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <SlidersHorizontal className="mr-2" size={16} />
                          Kitchen
                        </Button>
                      </motion.div>
                    </div>

                    <Separator className="bg-border/50" />

                    <h3 className="font-medium text-primary">Price Range</h3>
                    <div className="flex items-center space-x-2">
                      <Input
                        placeholder="Min"
                        type="number"
                        className="rounded-full bg-background/70"
                      />
                      <span>-</span>
                      <Input
                        placeholder="Max"
                        type="number"
                        className="rounded-full bg-background/70"
                      />
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          size="sm"
                          className="rounded-full bg-primary text-primary-foreground"
                        >
                          Apply
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              <AnimatePresence>
                {activeFilters.map((filter) => (
                  <motion.div
                    key={filter}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Badge
                      variant="outline"
                      className="rounded-full bg-background/70 backdrop-blur-sm border-primary/30 text-primary"
                    >
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
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 ml-1 p-0 text-primary"
                          onClick={() => toggleFilter(filter)}
                        >
                          <X size={12} />
                        </Button>
                      </motion.div>
                    </Badge>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="flex items-center">
              <span className="text-sm text-muted-foreground mr-2">
                Sort by:
              </span>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40 h-8 text-sm bg-background/70 backdrop-blur-sm rounded-full border-primary/30 hover:border-primary transition-colors">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="bg-background/90 backdrop-blur-md border border-border/50 rounded-lg">
                    <SelectItem value="availability">Availability</SelectItem>
                    <SelectItem value="price-asc">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-desc">
                      Price: High to Low
                    </SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Results count */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="container mx-auto px-4 py-4"
      >
        <p className="text-muted-foreground">
          <motion.span
            className="font-medium text-foreground"
            initial={{ color: 'var(--muted-foreground)' }}
            animate={{ color: 'var(--primary)' }}
            transition={{
              duration: 1,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: 'reverse',
            }}
          >
            {filteredListings.length} results
          </motion.span>{' '}
          for
          {city !== 'all'
            ? ` apartments in ${city.charAt(0).toUpperCase() + city.slice(1)}`
            : ' all apartments'}
          {activeFilters.length > 0 && ` with ${activeFilters.join(', ')}`}
        </p>
      </motion.div>

      {/* Main content */}
      <div className="container mx-auto px-4 pb-16 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Listings */}
          <motion.div
            ref={listingsRef}
            initial="hidden"
            animate={listingsInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="lg:col-span-2"
          >
            {isLoading ? (
              // Loading skeleton
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="bg-card rounded-xl overflow-hidden shadow-sm border border-border/50 h-48 animate-pulse"
                  >
                    <div className="flex flex-col md:flex-row h-full">
                      <div className="md:w-1/3 bg-accent/20"></div>
                      <div className="md:w-2/3 p-4 space-y-2">
                        <div className="h-6 bg-accent/20 rounded w-3/4"></div>
                        <div className="h-4 bg-accent/20 rounded w-full"></div>
                        <div className="h-4 bg-accent/20 rounded w-2/3"></div>
                        <div className="flex gap-2 mt-2">
                          <div className="h-6 bg-accent/20 rounded w-16"></div>
                          <div className="h-6 bg-accent/20 rounded w-16"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : sortedListings.length > 0 ? (
              <div className="space-y-4">
                {sortedListings.slice(0, visibleListings).map((listing) => (
                  <ListingCard key={listing._id} listing={listing} />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <p className="text-muted-foreground text-lg">
                  No apartments found matching your criteria.
                </p>
                <p className="text-muted-foreground mt-2">
                  Try adjusting your filters or search terms.
                </p>
              </motion.div>
            )}

            {visibleListings < sortedListings.length && (
              <motion.div
                className="flex justify-center mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  <Button
                    onClick={loadMore}
                    variant="outline"
                    className="rounded-full border-primary/30 hover:border-primary relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    Show more apartments
                    <ArrowUpRight className="ml-2 h-4 w-4 text-primary" />
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </motion.div>

          {/* Right column - could be used for map or filters */}
          <div className="hidden lg:block">
            <div className="sticky top-[180px]">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-card rounded-xl overflow-hidden shadow-sm border border-border/50 p-6 relative"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-xl -z-10"></div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Need Help?
                </h3>
                <p className="text-muted-foreground mb-4">
                  Our team is here to help you find the perfect apartment.
                  Contact us for personalized assistance.
                </p>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="relative"
                >
                  <Button
                    className="cursor-pointer w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full"
                    onClick={() => redirect('/contact-us')}
                  >
                    Contact Support
                    <div className="absolute inset-0 rounded-full bg-primary/20 blur-sm -z-10 animate-pulse-slow"></div>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* About section */}
      <motion.section
        ref={aboutRef}
        initial="hidden"
        animate={aboutInView ? 'visible' : 'hidden'}
        variants={fadeIn}
        className="bg-background py-16 border-t border-border relative"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-accent/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.h2
            variants={fadeInUp}
            className="text-3xl font-bold text-foreground mb-6 relative inline-block"
          >
            Apartments for rent in Palestine
            <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50 rounded-full"></div>
          </motion.h2>

          <div className="prose max-w-none text-muted-foreground">
            <motion.p variants={fadeInUp} className="mb-4">
              Finding the perfect apartment near Najah National University in
              Nablus has never been easier. Our platform offers a wide selection
              of quality accommodations tailored to students and professionals
              alike. Each neighborhood in Nablus has its own unique charm and
              character, providing diverse living experiences throughout the
              city.
            </motion.p>
            <motion.p variants={fadeInUp} className="mb-4">
              Whether you&apos;re looking for a cozy studio apartment or a
              spacious multi-bedroom unit, our listings cover a range of options
              to suit different needs and budgets. Many of our properties are
              within walking distance to Najah National University, making them
              ideal for students who want to minimize commute time.
            </motion.p>
            <motion.p variants={fadeInUp}>
              All our apartments come fully furnished with modern amenities,
              reliable WiFi, and essential appliances. We prioritize comfort,
              convenience, and security to ensure you have a pleasant living
              experience during your stay in Nablus. Browse our listings today
              and find your perfect home away from home.
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* FAQ section */}
      <motion.section
        ref={faqRef}
        initial="hidden"
        animate={faqInView ? 'visible' : 'hidden'}
        variants={fadeIn}
        className="bg-accent/10 py-16 relative"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 left-1/4 w-48 h-48 bg-accent/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.h2
            variants={fadeInUp}
            className="text-2xl font-bold text-foreground mb-8 relative inline-block"
          >
            Frequently Asked Questions
            <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50 rounded-full"></div>
          </motion.h2>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                custom={index}
                transition={{ delay: index * 0.05 }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="bg-card rounded-xl border border-border/50 overflow-hidden group transition-all duration-300 hover:shadow-md hover:border-primary/30"
                >
                  <AccordionTrigger className="px-6 py-4 hover:no-underline group-hover:text-primary transition-colors">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </motion.section>
    </div>
  );
}
