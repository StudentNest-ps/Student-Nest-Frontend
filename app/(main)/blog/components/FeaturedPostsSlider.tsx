'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight, Clock, ArrowRight } from 'lucide-react';
import ArticleDialog from './ArticleDialog'; // Make sure the path is correct

// Update this array with full data (content, author, date)
const featuredPosts = [
  {
    id: 1,
    title: 'Tips for Finding the Perfect Student Apartment',
    excerpt:
      'Learn how to search, compare, and secure the best housing option based on location, budget, and amenities.',
    content:
      'Finding a student apartment can be tricky. Always start early, compare options, and prioritize safety and proximity to campus.\n\nUse platforms like StudentNest to view verified listings and contact landlords directly.',
    author: 'StudentNest Team',
    date: 'June 10, 2025',
    category: 'Housing Advice',
    readTime: '4 min read',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2070&q=80',
  },
  {
    id: 2,
    title: 'How to Save Money on Rent as a Student',
    excerpt:
      'Explore smart budgeting tips and shared living strategies to lower your monthly expenses.',
    content:
      'Students often overlook budgeting when renting. Consider co-living, negotiate rent if possible, and avoid overpaying for unnecessary extras.\n\nTrack your spending monthly and use student discounts wherever possible.',
    author: 'StudentNest Editorial',
    date: 'June 5, 2025',
    category: 'Student Budgeting',
    readTime: '3 min read',
    image:
      'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=2070&q=80',
  },
  {
    id: 4,
    title: 'Is Co-Living Right for You? Pros and Cons',
    excerpt:
      'Co-living is growing in popularity among students. But is it the right fit for your lifestyle?',
    content:
      'Co-living can offer cost savings, social connection, and less responsibility over utilities and maintenance.\n\nHowever, privacy might be limited, and compatibility with roommates is crucial. Evaluate your priorities before committing.',
    author: 'Ahmed Nasser',
    date: 'May 20, 2025',
    category: 'Living Trends',
    readTime: '4 min read',
    image:
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=2070&q=80',
  },
  {
    id: 5,
    title: 'Sustainable Student Living: Go Green at Home',
    excerpt:
      'Discover eco-friendly habits and rental features that support sustainable living.',
    content:
      'More student housing providers are offering green-certified properties. Look for places with good insulation, energy-efficient appliances, and recycling programs.\n\nAlso, reduce waste by reusing furniture and switching to LED lighting.',
    author: 'StudentNest Editorial',
    date: 'May 12, 2025',
    category: 'Sustainable Living',
    readTime: '3 min read',
    image:
      'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=2070&q=80',
  },
  {
    id: 6,
    title: "Exploring London's hidden architectural gems",
    excerpt:
      'A journey through the lesser-known architectural wonders of London.',
    content:
      'Before signing any lease, ask about utility costs, maintenance responsibilities, subletting rules, and deposit return policies.\n\nClear communication up front helps avoid disputes and ensures you know what you’re committing to.',
    author: 'Layla Jaber',
    date: 'May 2, 2025',
    category: 'Rental Tips',
    readTime: '2 min read',
    image:
      'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2070&auto=format&fit=crop',
  },
];
export default function FeaturedPostsSlider() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const sliderRef = useRef<HTMLDivElement>(null);

  const [selectedPost, setSelectedPost] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = (post: any) => {
    setSelectedPost(post);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedPost(null);
  };

  const scrollSlider = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section ref={ref} className="py-16 bg-accent/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold text-foreground"
          >
            Featured posts
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <button className="text-primary flex items-center group mr-4">
              <span>View all</span>
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>

            <div className="flex space-x-2">
              <button
                onClick={() => scrollSlider('left')}
                className="bg-white rounded-full p-2 shadow-sm hover:bg-accent transition-colors duration-300"
              >
                <ChevronLeft size={20} className="text-primary" />
              </button>
              <button
                onClick={() => scrollSlider('right')}
                className="bg-white rounded-full p-2 shadow-sm hover:bg-accent transition-colors duration-300"
              >
                <ChevronRight size={20} className="text-primary" />
              </button>
            </div>
          </motion.div>
        </div>

        <div
          ref={sliderRef}
          className="flex overflow-x-auto pb-8 space-x-6 scrollbar-hide"
        >
          {featuredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex-shrink-0 w-[300px] group"
            >
              <div
                onClick={() => openDialog(post)}
                className="cursor-pointer block"
              >
                <div className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full border border-border/50">
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={post.image || '/placeholder.svg'}
                      alt={post.title}
                      width={300}
                      height={200}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-medium text-primary mb-2 block">
                      {post.category}
                    </span>
                    <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 text-xs line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center text-muted-foreground text-xs">
                      <Clock size={12} className="mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Popup Dialog */}
      <ArticleDialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        article={selectedPost}
      />
    </section>
  );
}
