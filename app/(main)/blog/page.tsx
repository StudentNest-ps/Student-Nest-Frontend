'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Clock, ArrowRight, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BlogCarousel from './components/BlogCarousel';
import CategoryTabs from './components/CategoryTabs';
import FeaturedPostsSlider from './components/FeaturedPostsSlider';
import ArticleDialog from './components/ArticleDialog';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Blog post data
const blogPosts = [
  {
    id: 1,
    title: 'Guide to Student Housing Options',
    excerpt: 'Explore the best housing options for students on a budget.',
    content:
      'Finding affordable and comfortable housing as a student can be challenging. This guide will help you navigate the various options available to you.\n\nWhen looking for student housing, consider factors like proximity to campus, rental costs, utilities, transportation options, and neighborhood safety. Many universities offer on-campus dormitories which provide convenience and community, but they may come with restrictions and higher costs.\n\nOff-campus apartments or shared houses often provide more freedom and potentially lower costs when split between roommates. Co-op housing is another option where students share responsibilities and costs in a community living arrangement.\n\nSome students opt for homestays with local families, which can provide a supportive environment and sometimes include meals. Others look into purpose-built student accommodation managed by private companies.\n\nWhatever option you choose, start your search early, understand your lease terms completely, and consider your personal preferences and lifestyle needs. With careful planning, you can find housing that enhances your academic experience without breaking your budget.',
    author: 'Emma Rodriguez',
    date: 'June 12, 2023',
    category: 'Housing',
    readTime: '1 min read',
    image:
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    featured: true,
  },
  {
    id: 2,
    title: '5 Ways to Decorate Your Apartment on a Budget',
    excerpt:
      'Simple and affordable ideas to make your apartment feel like home.',
    content:
      'As a student tenant, understanding your legal rights can help you avoid exploitation and resolve conflicts with landlords effectively.\n\nFirst, familiarize yourself with tenant laws in your specific location, as they vary by country, state, and even city. However, some rights are generally universal:\n\n• Right to habitable housing: Your landlord must provide housing that meets basic structural, health, and safety standards, including functioning plumbing, heating, electricity, and clean common areas.\n\n• Right to privacy: Landlords typically must give advance notice (often 24-48 hours) before entering your apartment, except in emergencies.\n\n• Security deposit protections: Most regions have laws governing how much can be charged, where the deposit must be held, and when it must be returned.\n\n• Protection against discrimination: Fair housing laws prohibit discrimination based on race, color, national origin, religion, sex, familial status, or disability.\n\n• Right to repairs: Landlords are generally required to maintain the property and make timely repairs.\n\n• Eviction protection: Landlords must follow legal procedures for eviction and cannot engage in "self-help" evictions like changing locks or removing belongings.\n\nDocument everything in writing, including repair requests and communications with your landlord. Join or form a tenants\' association for collective advocacy if needed, and don\'t hesitate to seek legal aid if your rights are violated. Many universities offer free legal services for students facing housing issues.',
    author: 'Priya Sharma',
    date: 'August 5, 2023',
    category: 'Decor',
    readTime: '3 min read',
    image:
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    featured: false,
  },
  {
    id: 3,
    title: 'Understanding Your Tenant Rights',
    excerpt: 'What every student renter should know about their legal rights.',
    content:
      "Transforming your apartment into a comfortable and stylish home doesn't have to be expensive. Here are five budget-friendly ways to decorate your space.\n\n1. Thrift Store Finds: Second-hand stores, flea markets, and online marketplaces can be treasure troves for unique décor items, furniture, and artwork at fraction of retail prices. Don't be afraid to DIY and refinish or repurpose items to fit your style.\n\n2. Plants: Indoor plants add life, color, and improved air quality to your space. Many varieties are inexpensive and low-maintenance. If you don't have a green thumb, consider realistic artificial plants.\n\n3. Removable Wallpaper and Decals: These temporary solutions can dramatically transform walls without damaging them or losing your security deposit. They come in countless designs to match any aesthetic.\n\n4. Strategic Lighting: Lighting significantly impacts ambiance. Replace harsh overhead lighting with softer lamps, string lights, or candles to create a cozy atmosphere.\n\n5. Textiles: Affordable pillows, throws, curtains, and rugs can add color, pattern, and texture to your space while making it more comfortable.\n\nRemember, decorating doesn't have to happen all at once. Take your time to collect pieces you love, and your apartment will gradually become a reflection of your personality and style.",
    author: 'Marcus Chen',
    date: 'July 22, 2023',
    category: 'Legal',
    readTime: '2 min read',
    image:
      'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    featured: true,
  },
  // {
  //   id: 4,
  //   title: 'Placerat purus habitasse malesuada',
  //   excerpt:
  //     'Egestas viverra nunc vestibulum et placerat vitae tincidunt commodo sem.',
  //   category: 'Guest experience',
  //   readTime: '3 min read',
  //   image:
  //     'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2070&auto=format&fit=crop',
  //   featured: false,
  // },
  // {
  //   id: 5,
  //   title: 'Proin tristique ipsum nulla cursus',
  //   excerpt:
  //     'Ultrices lectus, purus praesent volutpat vitae et consequat tellus.',
  //   category: 'Apartment lifestyle',
  //   readTime: '2 min read',
  //   image:
  //     'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2158&auto=format&fit=crop',
  //   featured: true,
  // },
  // {
  //   id: 6,
  //   title: 'Vulputate id sem felis, at at eget nulla',
  //   excerpt: 'Vitae enim morbi vitae neque pellentesque faucibus.',
  //   category: 'Guest experience',
  //   readTime: '5 min read',
  //   image:
  //     'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2076&auto=format&fit=crop',
  //   featured: false,
  // },
  // {
  //   id: 7,
  //   title: 'Ultrices sodales a sit pretium ut amet',
  //   excerpt:
  //     'Egestas purus aliquet integer a elit sagittis nisi, arcu sagittis nisi.',
  //   category: 'Remote working',
  //   readTime: '5 min read',
  //   image:
  //     'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop',
  //   featured: false,
  // },
  // {
  //   id: 8,
  //   title: 'Turpis pellentesque mauris quis risus',
  //   excerpt: 'Vulputate pellentesque sed lectus ac dictum neque in consequat.',
  //   category: 'Guest experience',
  //   readTime: '1 min read',
  //   image:
  //     'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2149&auto=format&fit=crop',
  //   featured: false,
  // },
  // {
  //   id: 9,
  //   title: 'In pellentesque eget natoque vestibulum',
  //   excerpt: 'In amet ultrices porttitor cursus consequat netus consequat.',
  //   category: 'Relocation',
  //   readTime: '2 min read',
  //   image:
  //     'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop',
  //   featured: false,
  // },
  // {
  //   id: 10,
  //   title: 'Modern living spaces in urban environments',
  //   excerpt:
  //     'Discover how urban living is evolving with innovative design solutions.',
  //   category: 'Property insights',
  //   readTime: '4 min read',
  //   image:
  //     'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2080&auto=format&fit=crop',
  //   featured: true,
  // },
  // {
  //   id: 11,
  //   title: 'The future of remote work and flexible living',
  //   excerpt:
  //     'How the shift to remote work is changing where and how we choose to live.',
  //   category: 'Remote working',
  //   readTime: '6 min read',
  //   image:
  //     'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop',
  //   featured: true,
  // },
  // {
  //   id: 12,
  //   title: "Exploring London's hidden architectural gems",
  //   excerpt:
  //     'A journey through the lesser-known architectural wonders of London.',
  //   category: 'Destination guide',
  //   readTime: '7 min read',
  //   image:
  //     'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2070&auto=format&fit=crop',
  //   featured: false,
  // },
];

// Featured carousel items
const carouselItems = [
  {
    id: 1,
    title: 'We rent your property',
    subtitle:
      'Tips, updates, and guides to help you find and enjoy your perfect student home.',
    image:
      'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2071&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Maximize your rental income',
    subtitle:
      'Professional property management services to help you earn more with less hassle.',
    image:
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format&fit=crop',
  },
  {
    id: 3,
    title: "Discover London's best neighborhoods",
    subtitle:
      'Explore the most sought-after areas for property investment and living in London.',
    image:
      'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2070&auto=format&fit=crop',
  },
];

export default function BlogPage() {
  const [visiblePosts, setVisiblePosts] = useState(9);
  const [activeCategory, setActiveCategory] = useState('View all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.9]);
  const headerY = useTransform(scrollY, [0, 100], [0, -10]);

  const [postsRef, postsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [trendingRef, trendingInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleLoadMore = () => {
    setVisiblePosts((prev) => prev + 6);
  };

  const handleArticleClick = (post) => {
    setSelectedArticle(post);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const filteredPosts = blogPosts.filter((post) => {
    // Filter by category
    if (
      activeCategory !== 'View all' &&
      post.category.toLowerCase() !== activeCategory.toLowerCase()
    ) {
      return false;
    }

    // Filter by search query
    if (
      searchQuery &&
      !post.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  const trendingPosts = blogPosts.filter((post) => post.featured).slice(0, 4);

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Fixed header with search and title */}
      <motion.div
        className="sticky top-0 z-50"
        style={{ opacity: headerOpacity, y: headerY }}
      >
        <div className="container mx-auto px-4 py-6 bg-transparent"></div>
      </motion.div>

      {/* Category Tabs */}
      <CategoryTabs
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Carousel */}
      <BlogCarousel items={carouselItems} />

      {/* Trending Posts Section */}
      <motion.section
        ref={trendingRef}
        initial="hidden"
        animate={trendingInView ? 'visible' : 'hidden'}
        variants={fadeInUp}
        className="py-16 bg-accent/20"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center">
              <TrendingUp className="text-primary mr-2" size={24} />
              <h2 className="text-2xl font-bold text-foreground">
                Trending Now
              </h2>
            </div>
            <Link
              href="/blog/trending"
              className="text-primary flex items-center group"
            >
              <span>View all</span>
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingPosts.map((post, index) => (
              <motion.div
                key={post.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.5,
                      delay: index * 0.1,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  },
                }}
                className="group cursor-pointer"
                onClick={() => handleArticleClick(post)}
              >
                <div className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.image || '/placeholder.svg'}
                      alt={post.title}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-foreground">
                      {post.category}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                      {post.title}
                    </h3>
                    <div className="flex items-center text-muted-foreground text-xs mt-3">
                      <Clock size={12} className="mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Blog Posts Grid */}
      <motion.section
        ref={postsRef}
        initial="hidden"
        animate={postsInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="py-16"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-foreground mb-10">
            Latest Articles
          </h2>

          <AnimatePresence mode="wait">
            {filteredPosts.length > 0 ? (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredPosts.slice(0, visiblePosts).map((post, index) => (
                  <motion.div
                    key={post.id}
                    variants={fadeInUp}
                    custom={index}
                    className="group cursor-pointer"
                    onClick={() => handleArticleClick(post)}
                  >
                    <div className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full border border-border/50">
                      <div className="relative h-56 overflow-hidden">
                        <Image
                          src={post.image || '/placeholder.svg'}
                          alt={post.title}
                          width={600}
                          height={400}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-foreground">
                          {post.category}
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground mb-4 text-sm line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center text-muted-foreground text-sm">
                          <Clock size={14} className="mr-1" />
                          {post.readTime}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="no-results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center py-16"
              >
                <h3 className="text-xl font-medium text-foreground mb-2">
                  No articles found
                </h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {visiblePosts < filteredPosts.length && (
            <div className="flex justify-center mt-12">
              <Button
                onClick={handleLoadMore}
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 cursor-pointer"
              >
                Load more
              </Button>
            </div>
          )}
        </div>
      </motion.section>

      {/* Featured Posts Slider */}
      <FeaturedPostsSlider />

      {/* Article Dialog */}
      <ArticleDialog 
        isOpen={isDialogOpen} 
        onClose={handleCloseDialog} 
        article={selectedArticle} 
      />
    </div>
  );
}
