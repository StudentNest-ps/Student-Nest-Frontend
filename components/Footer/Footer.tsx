'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Phone, Mail, MapPin, ArrowUp } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { hiddenFooterPaths } from '@/data/hiddenPaths';
import Logo from '../Header/Logo';

const Footer = () => {
  const pathname = usePathname();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
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

  if (!hiddenFooterPaths.some((path) => pathname.startsWith(path))) {
    return (
      <footer className="relative bg-background border-t border-border overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute w-64 h-64 bg-primary/5 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 25,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'linear',
            }}
            style={{ top: '20%', left: '10%' }}
          />
          <motion.div
            className="absolute w-48 h-48 bg-accent/10 rounded-full blur-2xl"
            animate={{
              x: [0, -80, 0],
              y: [0, 60, 0],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'linear',
            }}
            style={{ bottom: '10%', right: '15%' }}
          />

          {/* Floating particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary/20 rounded-full"
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 4 + i,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.5,
              }}
              style={{
                left: `${20 + i * 15}%`,
                bottom: '10%',
              }}
            />
          ))}
        </div>

        {/* Glowing top border */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

        <div className="relative z-10 py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-12"
            >
              {/* Company Info */}
              <motion.div variants={fadeInUp} className="space-y-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link href="/" className="flex items-center mb-6">
                    <Logo />
                  </Link>
                </motion.div>

                <div className="space-y-4">
                  <motion.div
                    className="flex items-start space-x-3 text-muted-foreground group"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <MapPin
                      size={18}
                      className="mt-1 text-primary group-hover:text-accent transition-colors"
                    />
                    <div>
                      <p>123 Property Street</p>
                      <p>London, UK</p>
                      <p>W1 1AA</p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-center space-x-3 text-muted-foreground group"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Phone
                      size={18}
                      className="text-primary group-hover:text-accent transition-colors"
                    />
                    <p>+44 (0) 123 456 7890</p>
                  </motion.div>

                  <motion.div
                    className="flex items-center space-x-3 text-muted-foreground group"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Mail
                      size={18}
                      className="text-primary group-hover:text-accent transition-colors"
                    />
                    <p>hello@studentnest.com</p>
                  </motion.div>
                </div>
              </motion.div>

              {/* Links Section */}
              <motion.div variants={fadeInUp} className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-6 relative">
                    Company
                    <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-primary to-accent" />
                  </h3>
                  <ul className="space-y-3">
                    {['About Us', 'Careers', 'Blog', 'Press'].map((item) => (
                      <motion.li
                        key={item}
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Link
                          href="#"
                          className="text-muted-foreground hover:text-primary transition-all duration-300 relative group"
                        >
                          {item}
                          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-6 relative">
                    Legal
                    <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-primary to-accent" />
                  </h3>
                  <ul className="space-y-3">
                    {[
                      'Terms & Conditions',
                      'Privacy Policy',
                      'Cookie Policy',
                    ].map((item) => (
                      <motion.li
                        key={item}
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Link
                          href="#"
                          className="text-muted-foreground hover:text-primary transition-all duration-300 relative group"
                        >
                          {item}
                          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* Newsletter Section */}
              <motion.div variants={fadeInUp} className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-6 relative">
                    Newsletter
                    <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-primary to-accent" />
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Subscribe to our newsletter to receive updates and exclusive
                    offers.
                  </p>

                  <div className="space-y-4">
                    <div className="flex relative">
                      <Input
                        type="email"
                        placeholder="Your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="rounded-l-xl rounded-r-none border-r-0 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                      />
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          onClick={handleSubscribe}
                          className="cursor-pointer rounded-l-none bg-primary text-primary-foreground hover:bg-primary/90 relative overflow-hidden group transition-all duration-300"
                        >
                          <span className="absolute inset-0 bg-gradient-to-r from-accent/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <span className="relative z-10">
                            {isSubscribed ? 'Subscribed!' : 'Subscribe'}
                          </span>
                        </Button>
                      </motion.div>
                    </div>

                    {isSubscribed && (
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-primary"
                      >
                        Thank you for subscribing! 🎉
                      </motion.p>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Bottom Section */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center relative"
            >
              <p className="text-sm text-muted-foreground mb-4 md:mb-0">
                &copy; {new Date().getFullYear()} StudentNest. All rights
                reserved.
              </p>

              <div className="flex items-center space-x-6">
                {/* Social Links */}
                <div className="flex space-x-4">
                  {[
                    {
                      icon: 'facebook',
                      path: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z',
                    },
                    {
                      icon: 'twitter',
                      path: 'M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z',
                    },
                    {
                      icon: 'instagram',
                      path: 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z M17.5 6.5h.01',
                    },
                  ].map((social) => (
                    <motion.div
                      key={social.icon}
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Link
                        href="#"
                        className="text-muted-foreground hover:text-primary transition-all duration-300 relative group"
                      >
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
                          className="w-5 h-5 group-hover:drop-shadow-lg transition-all duration-300"
                        >
                          <path d={social.path} />
                          {social.icon === 'instagram' && (
                            <rect
                              x="2"
                              y="2"
                              width="20"
                              height="20"
                              rx="5"
                              ry="5"
                            />
                          )}
                        </svg>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Scroll to Top */}
                <motion.button
                  onClick={scrollToTop}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="cursor-pointer p-2 rounded-full bg-primary/10 text-primary hover:bg-foreground hover:text-background transition-all duration-300 group"
                >
                  <ArrowUp size={16} className="group-hover:animate-bounce" />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </footer>
    );
  }
  return null;
};

export default Footer;
