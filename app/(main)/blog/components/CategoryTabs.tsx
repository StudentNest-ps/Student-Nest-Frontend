'use client';

import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

interface CategoryTabsProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function CategoryTabs({
  activeCategory,
  setActiveCategory,
  searchQuery,
  setSearchQuery,
}: CategoryTabsProps) {
  const categories = [
    'View all',
    'Destination guide',
    'Remote working',
    'Property investing',
    'Property insights',
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-background/55 backdrop-blur-2xl sticky top-[68px] z-40 border-b border-border"
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex overflow-x-auto space-x-6 py-4 scrollbar-hide">
          {categories.map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
              onClick={() => setActiveCategory(category)}
              className={`whitespace-nowrap px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 cursor-pointer ${
                activeCategory === category
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative w-full md:w-64 lg:w-80"
        >
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search articles..."
            className="pl-10 pr-4 py-2 rounded-full border-border"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
