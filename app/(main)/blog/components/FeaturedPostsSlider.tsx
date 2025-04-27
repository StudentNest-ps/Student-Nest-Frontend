"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { ChevronLeft, ChevronRight, Clock, ArrowRight } from "lucide-react"

// Featured posts data
const featuredPosts = [
  {
    id: 1,
    title: "Turpis elit in dictum eget eget",
    excerpt: "Consequat eu vel fames feugiat et venenatis nulla.",
    category: "Relocation",
    readTime: "1 min read",
    image: "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Faucibus egestas ut sit purus ultricies at eu",
    excerpt: "Massa tellus risus, lacus commodo magna feugiat consequat.",
    category: "Guest experience",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1581287053822-fd7bf4f4bfec?q=80&w=2101&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Feugiat gravida sed sit lacus sagittis",
    excerpt: "Pellentesque ultrices hendrerit lacus lectus.",
    category: "Working remotely",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Modern apartment design trends for 2025",
    excerpt: "Discover the latest interior design trends for modern urban living.",
    category: "Property investing",
    readTime: "2 min read",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "The rise of co-living spaces in major cities",
    excerpt: "How co-living is transforming urban housing markets worldwide.",
    category: "Property insights",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Sustainable living: Eco-friendly rental properties",
    excerpt: "The growing demand for environmentally conscious living spaces.",
    category: "Property insights",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=2065&auto=format&fit=crop",
  },
]

export default function FeaturedPostsSlider() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })
  const sliderRef = useRef<HTMLDivElement>(null)

  const scrollSlider = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

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
            <Link href="/blog/featured" className="text-primary flex items-center group mr-4">
              <span>View all</span>
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <div className="flex space-x-2">
              <button
                onClick={() => scrollSlider("left")}
                className="bg-white rounded-full p-2 shadow-sm cursor-pointer hover:bg-accent transition-colors duration-300"
                aria-label="Scroll left"
              >
                <ChevronLeft size={20} className="text-primary" />
              </button>
              <button
                onClick={() => scrollSlider("right")}
                className="bg-white rounded-full p-2 shadow-sm cursor-pointer hover:bg-accent transition-colors duration-300"
                aria-label="Scroll right"
              >
                <ChevronRight size={20} className="text-primary" />
              </button>
            </div>
          </motion.div>
        </div>

        <div ref={sliderRef} className="flex overflow-x-auto pb-8 space-x-6 scrollbar-hide">
          {featuredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex-shrink-0 w-[300px] group"
            >
              <Link href={`/blog/${post.id}`} className="block">
                <div className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full border border-border/50">
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      width={300}
                      height={200}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-medium text-primary mb-2 block">{post.category}</span>
                    <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 text-xs line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center text-muted-foreground text-xs">
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
    </section>
  )
}
