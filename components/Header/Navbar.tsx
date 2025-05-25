'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/Auth';
import { Role } from '@/module/@types';
import { hiddenHeaderPaths } from '@/data/hiddenPaths';
import { ModeToggle } from '../providers/theme-provider';
import Logo from './Logo';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!hiddenHeaderPaths.some((path) => pathname.startsWith(path)))
    return (
      <>
        {/* Floating Orbs Background */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <motion.div
            className="absolute w-32 h-32 bg-primary/10 rounded-full blur-xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'linear',
            }}
            style={{ top: '10%', left: '10%' }}
          />
          <motion.div
            className="absolute w-24 h-24 bg-accent/20 rounded-full blur-lg"
            animate={{
              x: [0, -80, 0],
              y: [0, 60, 0],
            }}
            transition={{
              duration: 15,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'linear',
            }}
            style={{ top: '20%', right: '15%' }}
          />
        </div>

        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className={`sticky top-0 z-50 transition-all duration-300 ${
            isScrolled
              ? 'bg-background/80 backdrop-blur-xl shadow-lg border-b border-primary/20'
              : 'bg-background/60 backdrop-blur-sm shadow-sm border-b border-border'
          }`}
        >
          {/* Glowing top border */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

          <div className="container mx-auto px-4 py-4 flex items-center justify-between relative">
            {/* Subtle glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 rounded-lg" />

            <div className="flex items-center relative z-10">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Logo />
              </motion.div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex ml-10 space-x-8">
                {[
                  { href: '/', label: 'Home' },
                  ...(user?.role === Role.OWNER
                    ? [{ href: '/landlords', label: 'Landlords' }]
                    : []),
                  { href: '/blog', label: 'Blog' },
                  { href: '/contact-us', label: 'Contacts' },
                  ...(user?.role === Role.STUDENT
                    ? [
                        { href: '/apartments', label: 'Book Now' },
                        { href: '/my-bookings', label: 'My Bookings' },
                      ]
                    : []),
                ].map((item) => (
                  <motion.div
                    key={item.href}
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      href={item.href}
                      className={`relative text-foreground hover:text-primary transition-all duration-300 group ${
                        pathname === item.href ? 'text-primary' : ''
                      }`}
                    >
                      {item.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 group-hover:w-full" />
                      {pathname === item.href && (
                        <motion.span
                          layoutId="activeTab"
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-accent"
                        />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3 relative z-10">
              {user ? (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    className="relative overflow-hidden text-primary border-primary hover:bg-accent cursor-pointer group transition-all duration-300"
                    onClick={logout}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <Link href="/signin" className="relative z-10">
                      Logout
                    </Link>
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    className="relative overflow-hidden text-primary border-primary hover:bg-accent cursor-pointer group transition-all duration-300"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <Link href="/signin" className="relative z-10">
                      Sign in
                    </Link>
                  </Button>
                </motion.div>
              )}

              <ModeToggle />
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative z-10 p-2 text-foreground hover:text-primary transition-colors"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden bg-background/95 backdrop-blur-xl border-t border-primary/20"
              >
                <div className="container mx-auto px-4 py-6 space-y-4">
                  {[
                    { href: '/', label: 'Home' },
                    ...(user?.role === Role.OWNER
                      ? [{ href: '/landlords', label: 'Landlords' }]
                      : []),
                    { href: '/blog', label: 'Blog' },
                    { href: '/contact-us', label: 'Contacts' },
                    ...(user?.role === Role.STUDENT
                      ? [{ href: '/apartments', label: 'Book Now' }]
                      : []),
                  ].map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block text-foreground hover:text-primary transition-colors py-2"
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="pt-4 border-t border-border flex items-center gap-3"
                  >
                    {user ? (
                      <Button
                        variant="outline"
                        className="text-primary border-primary hover:bg-accent cursor-pointer"
                        onClick={() => {
                          logout();
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        <Link href="/signin">Logout</Link>
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        className="text-primary border-primary hover:bg-accent cursor-pointer"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Link href="/signin">Sign in</Link>
                      </Button>
                    )}
                    <ModeToggle />
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </>
    );
};

export default Navbar;
