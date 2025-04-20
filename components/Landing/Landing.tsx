"use client"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import {
  Users,
  Search,
  Calendar,
  UserPlus,
  Wifi,
  Clock,
  ChevronLeft,
  ChevronRight,
  FileText,
  Phone,
  Home,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function Landing() {
  // Intersection observer hooks for different sections
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [searchRef, searchInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [featureRef, featureInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [cardsRef, cardsInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [locationRef, locationInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [bespokeRef, bespokeInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [corporateRef, corporateInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [testimonialRef, testimonialInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [blogRef, blogInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [linksRef, linksInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [ctaRef, ctaInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Navbar */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
              <div className="flex items-center cursor-pointer">
                <div className="w-8 h-8 bg-primary rounded-md mr-2"></div>
                <span className="text-lg font-semibold text-primary"
                  onClick={()=>scrollTo({
                  top: 0,
                  left: 0,
                  behavior: "smooth",
                  })}
                >
                  RentEase
                </span>
              </div>
            <div className="hidden md:flex ml-10 space-x-8">
              <Link href="/" className="text-headline hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/landlords" className="text-headline hover:text-primary transition-colors">
                Landlords
              </Link>
              <Link href="/blog" className="text-headline hover:text-primary transition-colors">
                Blog
              </Link>
              <Link href="/contacts" className="text-headline hover:text-primary transition-colors">
                Contacts
              </Link>
            </div>
          </div>
          <Button variant="outline" className="text-primary border-primary hover:bg-accent cursor-pointer">
            <Link href="/signin">Sign in</Link>
          </Button>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <motion.section
        ref={heroRef}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={fadeIn}
        className="py-16 md:py-24 bg-white"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div variants={fadeInUp} className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
              <h1 className="text-4xl md:text-5xl font-bold text-headline mb-6 text-primary">We rent your property</h1>
              <p className="text-muted-foreground mb-8 text-lg">
                Find your perfect rental home with ease. We offer a wide range of properties to suit your needs and
                budget.
              </p>
              <Button className="bg-primary text-white hover:bg-primary/90 cursor-pointer">Get Started</Button>
            </motion.div>
            <motion.div variants={fadeInUp} className="md:w-1/2">
              <div className="rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/Hero.jpg"
                  alt="Happy couple on sofa"
                  width={600}
                  height={500}
                  className="w-full h-auto object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* 3. Search Filter Bar */}
      <motion.section
        ref={searchRef}
        initial="hidden"
        animate={searchInView ? "visible" : "hidden"}
        variants={fadeInUp}
        className="py-8 bg-white"
      >
        <div className="container mx-auto px-8">
          <Card className="rounded-4xl shadow-md">
            <CardContent className="py-2">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="flex items-center space-x-3 border-b md:border-b-0 md:border-r border-gray-200 pb-4 md:pb-0 md:pr-4">
                  <Search className="text-primary mt-6" size={20} />
                  <div className="w-full">
                    <label className="block text-sm text-muted-foreground">City</label>
                    <Select defaultValue="london">
                      <SelectTrigger className="w-full border-0 focus:ring-0 p-2 h-auto">
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="london">London</SelectItem>
                        <SelectItem value="manchester">Manchester</SelectItem>
                        <SelectItem value="birmingham">Birmingham</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center space-x-3 border-b md:border-b-0 md:border-r border-gray-200 pb-4 md:pb-0 md:pr-4">
                  <Calendar className="text-primary mt-6" size={20} />
                  <div className="w-full">
                    <label className="block text-sm text-muted-foreground">Move-in</label>
                    <Select>
                      <SelectTrigger className="w-full border-0 focus:ring-0 p-2 h-auto">
                        <SelectValue placeholder="Select date" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="date1">May 1, 2025</SelectItem>
                        <SelectItem value="date2">May 15, 2025</SelectItem>
                        <SelectItem value="date3">June 1, 2025</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center space-x-3 border-b md:border-b-0 md:border-r border-gray-200 pb-4 md:pb-0 md:pr-4">
                  <Calendar className="text-primary mt-6" size={20} />
                  <div className="w-full">
                    <label className="block text-sm text-muted-foreground">Move-out</label>
                    <Select>
                      <SelectTrigger className="w-full border-0 focus:ring-0 p-2 h-auto">
                        <SelectValue placeholder="Select date" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="date1">June 1, 2025</SelectItem>
                        <SelectItem value="date2">June 15, 2025</SelectItem>
                        <SelectItem value="date3">July 1, 2025</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Users className="text-primary mt-6" size={20} />
                  <div className="flex-grow">
                    <label className="block text-sm text-muted-foreground">Guests</label>
                    <Select defaultValue="1">
                      <SelectTrigger className="w-full border-0 focus:ring-0 p-2 h-auto">
                        <SelectValue placeholder="Select guests" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Guest</SelectItem>
                        <SelectItem value="2">2 Guests</SelectItem>
                        <SelectItem value="3">3+ Guests</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
            <Button className="bg-primary text-white hover:bg-primary/90 cursor-pointer w-full md:w-[300px]">Search</Button>
            </CardFooter>
          </Card>
        </div>
      </motion.section>

      {/* 4. Feature Highlight Section */}
      <motion.section
        ref={featureRef}
        initial="hidden"
        animate={featureInView ? "visible" : "hidden"}
        variants={fadeIn}
        className="py-16 md:py-24 bg-accent"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div variants={fadeInUp} className="md:w-1/2 mb-10 md:mb-0 order-2 md:order-1">
              <div className="rounded-xl overflow-hidden">
                <Image
                  src="/Flexible.jpg"
                  alt="Workspace"
                  width={500}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
            </motion.div>
            <motion.div variants={fadeInUp} className="md:w-1/2 md:pl-16 order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl font-bold text-headline mb-6 text-primary">The future is flexible</h2>
              <p className="text-muted-foreground mb-8">
                Our properties are designed to adapt to your lifestyle. Whether you're looking for a short-term stay or
                a long-term home, we have options that fit your needs.
              </p>
              <Button className="bg-primary text-white hover:bg-primary/90 cursor-pointer">Learn More</Button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* 5. Feature Cards Grid */}
      <motion.section
        ref={cardsRef}
        initial="hidden"
        animate={cardsInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="py-16 md:py-24 bg-white"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-headline mb-4 text-primary">Our Features</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Explore our range of features designed to make your rental experience seamless and enjoyable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div variants={fadeInUp}>
              <Card className="bg-accent rounded-xl h-full">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4">
                    <Home className="text-primary" size={24} />
                  </div>
                  <CardTitle className="text-xl font-semibold text-headline mb-2">Flexible Living</CardTitle>
                  <p className="text-muted-foreground">
                    Choose from a variety of rental periods to suit your needs, from a few days to several months.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="bg-accent rounded-xl h-full">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4">
                    <Calendar className="text-primary" size={24} />
                  </div>
                  <CardTitle className="text-xl font-semibold text-headline mb-2">Move-in Ready</CardTitle>
                  <p className="text-muted-foreground">
                    All our properties come fully furnished and equipped with everything you need to feel at home.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="bg-accent rounded-xl h-full">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4">
                    <Wifi className="text-primary" size={24} />
                  </div>
                  <CardTitle className="text-xl font-semibold text-headline mb-2">High-speed Wi-Fi</CardTitle>
                  <p className="text-muted-foreground">
                    Stay connected with complimentary high-speed internet access in all our properties.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="bg-accent rounded-xl h-full">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4">
                    <Clock className="text-primary" size={24} />
                  </div>
                  <CardTitle className="text-xl font-semibold text-headline mb-2">24/7 Support</CardTitle>
                  <p className="text-muted-foreground">
                    Our dedicated team is available around the clock to assist with any issues or questions.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* 6. Location Picker */}
      <motion.section
        ref={locationRef}
        initial="hidden"
        animate={locationInView ? "visible" : "hidden"}
        variants={fadeIn}
        className="py-16 md:py-24 bg-white"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-headline text-center mb-12 text-primary">Choose your location</h2>

          <div className="relative">
            <motion.div variants={fadeInUp} className="flex overflow-x-auto pb-8 space-x-6 scrollbar-hide">
              {[
                "Shoreditch",
                "City of London",
                "The West End",
                "Kensington",
                "Kingston Upon Thames",
                "Hammersmith",
              ].map((location, index) => (
                <div key={index} className="flex-shrink-0 w-48 md:w-64">
                  <Card className="rounded-xl overflow-hidden shadow-md mb-3">
                    <Image
                      src={`/placeholder.svg?height=200&width=250&text=${location}`}
                      alt={location}
                      width={250}
                      height={200}
                      className="w-full h-40 object-cover"
                    />
                  </Card>
                  <h3 className="text-headline font-medium text-center">{location}</h3>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="flex justify-center mt-8">
            <Button variant="outline" className="cursor-pointer text-primary border-primary hover:bg-accent">
              View all spaces
            </Button>
          </div>
        </div>
      </motion.section>

      {/* 7. Bespoke Spaces Section */}
      <motion.section
        ref={bespokeRef}
        initial="hidden"
        animate={bespokeInView ? "visible" : "hidden"}
        variants={fadeIn}
        className="py-16 md:py-24 relative"
      >
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div className="relative z-20 container mx-auto px-4 text-center text-white">
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold mb-8">
            Bespoke spaces
          </motion.h2>
          <motion.div variants={fadeInUp}>
            <Button className="bg-primary text-white hover:bg-primary/90 cursor-pointer">Start booking</Button>
          </motion.div>
        </div>
        <div className="absolute inset-0 z-0 ">
          <Image
            src="/couch.jpg"
            alt="Bespoke spaces"
            fill
            className="object-cover"
          />
        </div>
      </motion.section>

      {/* 8. Corporate Partnerships */}
      <motion.section
        ref={corporateRef}
        initial="hidden"
        animate={corporateInView ? "visible" : "hidden"}
        variants={fadeIn}
        className="py-16 md:py-24 bg-white"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-headline mb-4 text-primary">Corporate Partnerships</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We work with businesses of all sizes to provide housing solutions that meet their needs.
            </p>
          </div>

          <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div variants={fadeInUp}>
              <Card className="bg-accent rounded-xl h-full">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="text-primary" size={24} />
                  </div>
                  <CardTitle className="text-xl font-semibold text-headline mb-2">Booking Manager</CardTitle>
                  <p className="text-muted-foreground">
                    Dedicated booking manager to handle all your accommodation needs.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="bg-accent rounded-xl h-full">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <UserPlus className="text-primary" size={24} />
                  </div>
                  <CardTitle className="text-xl font-semibold text-headline mb-2">Account Manager</CardTitle>
                  <p className="text-muted-foreground">
                    Personal account manager to ensure your experience is seamless.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="bg-accent rounded-xl h-full">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="text-primary" size={24} />
                  </div>
                  <CardTitle className="text-xl font-semibold text-headline mb-2">Flexible Terms</CardTitle>
                  <p className="text-muted-foreground">Customizable rental terms to accommodate your business needs.</p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* 9. Testimonials Section */}
      <motion.section
        ref={testimonialRef}
        initial="hidden"
        animate={testimonialInView ? "visible" : "hidden"}
        variants={fadeIn}
        className="py-16 md:py-24 bg-accent"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-headline text-center mb-16 text-primary">What our partners think</h2>

          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            <motion.div variants={fadeInUp}>
              <Card className="rounded-xl p-8 shadow-md h-full">
                <CardContent className="p-0">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-full bg-gray-200 mr-4 overflow-hidden">
                      <Image src="/placeholder.svg?height=48&width=48&text=A" alt="Avatar" width={48} height={48} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-headline">Annie</h4>
                      <p className="text-sm text-muted-foreground">Marketing Director</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "The flexibility and quality of the properties have been perfect for our team's needs. The booking
                    process is seamless and the support team is always responsive."
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="rounded-xl p-8 shadow-md h-full">
                <CardContent className="p-0">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-full bg-gray-200 mr-4 overflow-hidden">
                      <Image src="/placeholder.svg?height=48&width=48&text=G" alt="Avatar" width={48} height={48} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-headline">Gabriel</h4>
                      <p className="text-sm text-muted-foreground">Business Owner</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "We've been using RentEase for our corporate housing needs for over a year now. The properties are
                    always clean, well-maintained, and in great locations."
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp} className="hidden lg:block">
              <Card className="rounded-xl p-8 shadow-md h-full">
                <CardContent className="p-0">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-full bg-gray-200 mr-4 overflow-hidden">
                      <Image src="/placeholder.svg?height=48&width=48&text=S" alt="Avatar" width={48} height={48} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-headline">Sarah</h4>
                      <p className="text-sm text-muted-foreground">HR Manager</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "Finding accommodation for our international employees used to be a challenge. RentEase has
                    simplified the process and provided excellent options."
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          <div className="flex justify-center mt-8 space-x-2">
            <Button variant="outline" size="icon" className="cursor-pointer rounded-full bg-white text-primary">
              <ChevronLeft size={20} />
              <span className="sr-only">Previous testimonial</span>
            </Button>
            <Button size="icon" className="cursor-pointer rounded-full bg-primary text-white">
              <ChevronRight size={20} />
              <span className="sr-only">Next testimonial</span>
            </Button>
          </div>
        </div>
      </motion.section>

      {/* 10. Blog Preview Section */}
      <motion.section
        ref={blogRef}
        initial="hidden"
        animate={blogInView ? "visible" : "hidden"}
        variants={fadeIn}
        className="py-16 md:py-24 bg-white"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-headline text-center mb-16 text-primary">Read our blog</h2>

          <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Turpis elit in dictum eget eget",
                image: "/placeholder.svg?height=200&width=400&text=Blog+1",
                readTime: "1 min read",
              },
              {
                title: "Faucibus sagittis sit sit purus ultricies et",
                image: "/placeholder.svg?height=200&width=400&text=Blog+2",
                readTime: "2 min read",
              },
              {
                title: "Risquis gravida sed sit lacus sagittis",
                image: "/placeholder.svg?height=200&width=400&text=Blog+3",
                readTime: "3 min read",
              },
            ].map((blog, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="rounded-xl overflow-hidden shadow-md h-full">
                  <Image
                    src={blog.image || "/placeholder.svg"}
                    alt={blog.title}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <CardContent className="p-6">
                    <CardTitle className="text-xl font-semibold text-headline mb-2">{blog.title}</CardTitle>
                    <p className="text-muted-foreground mb-4">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                      labore.
                    </p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock size={16} className="mr-2" />
                      {blog.readTime}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <div className="flex justify-center mt-10">
            <Button variant="outline" className="cursor-pointer text-primary border-primary hover:bg-accent">
              View all posts
            </Button>
          </div>
        </div>
      </motion.section>

      {/* 11. Useful Links */}
      <motion.section
        ref={linksRef}
        initial="hidden"
        animate={linksInView ? "visible" : "hidden"}
        variants={fadeIn}
        className="py-16 md:py-24 bg-white border-t border-gray-200"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-headline mb-12 text-primary">Useful links</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div variants={fadeInUp} className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-headline mb-4">More London Apartments</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      Apartments in Shoreditch
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      Apartments in City of London
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      Apartments in West End
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      Apartments in Kensington
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-headline mb-4">Suitable for Families</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      Apartments with 2+ Bedrooms
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      Apartments near Schools
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      Apartments with Garden
                    </Link>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-headline mb-4">Apartments with Balcony</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      Apartments with Balcony in Shoreditch
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      Apartments with Balcony in City
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      Apartments with Balcony in West End
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-headline mb-4">Apartments with Parking</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      Apartments with Parking in Shoreditch
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      Apartments with Parking in City
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      Apartments with Parking in West End
                    </Link>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* 12. Final CTA Section */}
      <motion.section
        ref={ctaRef}
        initial="hidden"
        animate={ctaInView ? "visible" : "hidden"}
        variants={fadeIn}
        className="py-16 md:py-24 bg-accent"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div variants={fadeInUp} className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
              <h2 className="text-3xl md:text-4xl font-bold text-headline mb-6 text-primary">Dictum nunc</h2>
              <p className="text-muted-foreground mb-8">
                We make it easy to find your perfect rental property. Our team is dedicated to providing exceptional
                service and support throughout your rental journey.
              </p>
              <Button className="cursor-pointer bg-primary text-white hover:bg-primary/90">Contact Us</Button>
            </motion.div>
            <motion.div variants={fadeInUp} className="md:w-1/2">
              <Card className="rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/placeholder.svg?height=400&width=500"
                  alt="Businesswoman smiling"
                  width={500}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* 13. Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <Link href="/" className="flex items-center mb-6">
                <div className="w-8 h-8 bg-primary rounded-md mr-2"></div>
                <span className="text-lg font-semibold text-primary">RentEase</span>
              </Link>
              <p className="text-muted-foreground mb-4">
                123 Property Street
                <br />
                London, UK
                <br />
                W1 1AA
              </p>
              <p className="text-muted-foreground">
                <Phone size={16} className="inline mr-2" />
                +44 (0) 123 456 7890
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-headline mb-6">Company</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Press
                  </Link>
                </li>
              </ul>

              <h3 className="text-lg font-semibold text-headline mt-8 mb-6">Legal</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-headline mb-6">Newsletter</h3>
              <p className="text-muted-foreground mb-4">
                Subscribe to our newsletter to receive updates and exclusive offers.
              </p>
              <div className="flex">
                <Input type="email" placeholder="Your email" className="rounded-l-xl rounded-r-none border-r-0" />
                <Button className="cursor-pointer rounded-l-none bg-primary text-white hover:bg-primary/90">Subscribe</Button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} RentEase. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
