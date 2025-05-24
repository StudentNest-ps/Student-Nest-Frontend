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
    title: 'Turpis elit in dictum eget eget',
    excerpt:
      'Egestas viverra nunc vestibulum et placerat condimentum tincidunt commodo sem.',
    category: 'Relocation',
    readTime: '1 min read',
    image:
      'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop',
    featured: true,
  },
  {
    id: 2,
    title: 'Feugiat gravida sed sit lacus sagittis',
    excerpt:
      'Ultrices lectus, purus praesent volutpat vitae et consequat tellus commodo magna.',
    category: 'Remote working',
    readTime: '3 min read',
    image:
      'https://images.unsplash.com/photo-1593062096033-9a26b09da705?q=80&w=2070&auto=format&fit=crop',
    featured: false,
  },
  {
    id: 3,
    title: 'Aliquam id ullamcorper eu',
    excerpt:
      'Egestas viverra nunc vestibulum et placerat tincidunt commodo sem. Risus, tincidunt ultrices in dictum vitae.',
    category: 'Guest experience',
    readTime: '2 min read',
    image:
      'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?q=80&w=2070&auto=format&fit=crop',
    featured: true,
  },
  {
    id: 4,
    title: 'Placerat purus habitasse malesuada',
    excerpt:
      'Egestas viverra nunc vestibulum et placerat vitae tincidunt commodo sem.',
    category: 'Guest experience',
    readTime: '3 min read',
    image:
      'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2070&auto=format&fit=crop',
    featured: false,
  },
  {
    id: 5,
    title: 'Proin tristique ipsum nulla cursus',
    excerpt:
      'Ultrices lectus, purus praesent volutpat vitae et consequat tellus.',
    category: 'Apartment lifestyle',
    readTime: '2 min read',
    image:
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2158&auto=format&fit=crop',
    featured: true,
  },
  {
    id: 6,
    title: 'Vulputate id sem felis, at at eget nulla',
    excerpt: 'Vitae enim morbi vitae neque pellentesque faucibus.',
    category: 'Guest experience',
    readTime: '5 min read',
    image:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2076&auto=format&fit=crop',
    featured: false,
  },
  {
    id: 7,
    title: 'Ultrices sodales a sit pretium ut amet',
    excerpt:
      'Egestas purus aliquet integer a elit sagittis nisi, arcu sagittis nisi.',
    category: 'Remote working',
    readTime: '5 min read',
    image:
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop',
    featured: false,
  },
  {
    id: 8,
    title: 'Turpis pellentesque mauris quis risus',
    excerpt: 'Vulputate pellentesque sed lectus ac dictum neque in consequat.',
    category: 'Guest experience',
    readTime: '1 min read',
    image:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2149&auto=format&fit=crop',
    featured: false,
  },
  {
    id: 9,
    title: 'In pellentesque eget natoque vestibulum',
    excerpt: 'In amet ultrices porttitor cursus consequat netus consequat.',
    category: 'Relocation',
    readTime: '2 min read',
    image:
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop',
    featured: false,
  },
  {
    id: 10,
    title: 'Modern living spaces in urban environments',
    excerpt:
      'Discover how urban living is evolving with innovative design solutions.',
    category: 'Property insights',
    readTime: '4 min read',
    image:
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2080&auto=format&fit=crop',
    featured: true,
  },
  {
    id: 11,
    title: 'The future of remote work and flexible living',
    excerpt:
      'How the shift to remote work is changing where and how we choose to live.',
    category: 'Remote working',
    readTime: '6 min read',
    image:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop',
    featured: true,
  },
  {
    id: 12,
    title: "Exploring London's hidden architectural gems",
    excerpt:
      'A journey through the lesser-known architectural wonders of London.',
    category: 'Destination guide',
    readTime: '7 min read',
    image:
      'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2070&auto=format&fit=crop',
    featured: false,
  },
];

// Featured carousel items
const carouselItems = [
  {
    id: 1,
    title: 'We rent your property',
    subtitle:
      'Vel morbi integer pulvinar morbi quis amet eu. In nunc facilisi potion interdum, consectetur cursus.',
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
    <div className="min-h-screen bg-background">
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
                className="group"
              >
                <Link href={`/blog/${post.id}`} className="block">
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
                </Link>
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
                    className="group"
                  >
                    <Link href={`/blog/${post.id}`} className="block">
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
                    </Link>
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
                className="bg-primary text-background hover:bg-primary/90 rounded-full px-8 cursor-pointer"
              >
                Load more
              </Button>
            </div>
          )}
        </div>
      </motion.section>

      {/* Featured Posts Slider */}
      <FeaturedPostsSlider />

    </div>
  );
}
