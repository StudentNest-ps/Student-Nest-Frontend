"use client"

import { motion } from "framer-motion"

interface BlogCategoriesProps {
  activeCategory: string
  setActiveCategory: (category: string) => void
}

export default function BlogCategories({ activeCategory, setActiveCategory }: BlogCategoriesProps) {
  const categories = ["View all", "Destination guide", "Remote working", "Property investing", "Property insights"]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white py-4 border-b border-gray-200"
    >
      <div className="container mx-auto px-4">
        <div className="flex overflow-x-auto space-x-6 pb-2 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`whitespace-nowrap px-2 py-1 text-sm font-medium transition-colors cursor-pointer ${
                activeCategory === category
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
