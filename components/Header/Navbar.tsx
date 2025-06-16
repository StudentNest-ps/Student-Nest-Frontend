'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/Auth';
import { Role } from '@/module/@types';
import { hiddenHeaderPaths } from '@/data/hiddenPaths';
import Logo from './Logo';
import { Bell, BellDot, Menu, User, X } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import type { INotification } from '@/module/types/Notifications';
import NotificationService from '@/module/services/Notifications';
import { toast } from 'sonner';
import Notifications from '../notifications/Notifications';
import { ModeToggle } from './ModeToggle';

const dummyNotifications: INotification[] = [
  {
    _id: '684031a90c6f5a63286d1859',
    userId: '681a048ec95d02acc4aeed08',
    message: 'Refresh to preview notifications.',
    seen: false,
    type: 'error',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const Navbar = () => {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [loading, setLoading] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const res = await NotificationService.getNotifications();
        setNotifications(res);
      } catch {
        toast.error('Failed to load Notifications');
        setNotifications(dummyNotifications);
      } finally {
        setLoading(false);
      }
    };
    if (user) {
      fetchNotifications();
    }
  }, [user]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { href: '/', label: 'Home' },
    ...(user?.role === Role.OWNER
      ? [{ href: '/landlords', label: 'Landlords' }]
      : []),
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
    ...(user?.role === Role.STUDENT
      ? [
          { href: '/apartments', label: 'Book Now' },
          { href: '/my-bookings', label: 'My Bookings' },
        ]
      : []),
  ];

  if (!hiddenHeaderPaths.some((path) => pathname.startsWith(path)))
    return (
      <>
        {/* Floating Background Orbs */}
        {mounted && (
          <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            <motion.div
              className="absolute w-32 h-32 bg-primary/10 rounded-full blur-2xl"
              animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: 'linear',
              }}
              style={{ top: '5%', left: '5%' }}
            />
            <motion.div
              className="absolute w-24 h-24 bg-ring/20 rounded-full blur-xl"
              animate={{
                x: [0, -80, 0],
                y: [0, 60, 0],
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 15,
                repeat: Number.POSITIVE_INFINITY,
                ease: 'linear',
                delay: 2,
              }}
              style={{ top: '10%', right: '10%' }}
            />
            <motion.div
              className="absolute w-20 h-20 bg-accent/30 rounded-full blur-lg"
              animate={{
                x: [0, 60, 0],
                y: [0, -40, 0],
                scale: [1, 1.1, 1],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 12,
                repeat: Number.POSITIVE_INFINITY,
                ease: 'linear',
                delay: 1,
              }}
              style={{ top: '15%', left: '50%' }}
            />
          </div>
        )}

        {/* Floating Glass Navbar */}
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-8xl"
        >
          <motion.nav
            className={`relative transition-all duration-500 ease-out ${
              isScrolled
                ? 'bg-background/50 backdrop-blur-xl shadow-2xl shadow-primary/10 border border-primary/20'
                : 'bg-background/30 backdrop-blur-lg shadow-xl shadow-primary/5 border border-border/50'
            } rounded-2xl overflow-hidden`}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.3 }}
          >
            {/* Glowing top border */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

            {/* Subtle background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-ring/5 rounded-2xl" />

            <div className="relative z-10 px-6 py-4 flex items-center justify-between">
              {/* Logo Section */}
              <div className="flex items-center">
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Logo />
                </motion.div>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex ml-12 space-x-8">
                  {navigationItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      whileHover={{ y: -3 }}
                    >
                      <Link
                        href={item.href}
                        className={`relative text-sm font-medium transition-all duration-300 group ${
                          pathname === item.href
                            ? 'text-primary'
                            : 'text-foreground hover:text-primary'
                        }`}
                      >
                        {item.label}

                        {/* Hover underline */}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-ring transition-all duration-300 group-hover:w-full rounded-full" />

                        {/* Active indicator */}
                        {pathname === item.href && (
                          <motion.span
                            layoutId="activeTab"
                            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-ring rounded-full"
                            transition={{ duration: 0.3 }}
                          />
                        )}

                        {/* Glow effect on hover */}
                        <span className="absolute inset-0 bg-primary/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 scale-110" />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Desktop Actions */}
              <div className="hidden lg:flex items-center gap-3">
                {user ? (
                  <div className="flex items-center gap-2">
                    {/* Profile Button */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        size="sm"
                        variant="ghost"
                        className="relative overflow-hidden hover:bg-accent/50 transition-all duration-300 group"
                        onClick={() => router.push('/profile')}
                      >
                        <span className="absolute inset-0 bg-gradient-to-r from-primary/10 to-ring/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <User size={18} className="relative z-10" />
                      </Button>
                    </motion.div>

                    {/* Notifications */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="relative overflow-hidden hover:bg-accent/50 transition-all duration-300 group"
                          >
                            <span className="absolute inset-0 bg-gradient-to-r from-primary/10 to-ring/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            {notifications.some((n) => !n.seen) ? (
                              <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{
                                  duration: 2,
                                  repeat: Number.POSITIVE_INFINITY,
                                }}
                              >
                                <BellDot
                                  size={18}
                                  className="relative z-10 text-primary"
                                />
                              </motion.div>
                            ) : (
                              <Bell size={18} className="relative z-10" />
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80 mr-4">
                          <Notifications
                            loading={loading}
                            notifications={notifications}
                          />
                        </PopoverContent>
                      </Popover>
                    </motion.div>

                    {/* Logout Button */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        size="sm"
                        variant="outline"
                        className="relative overflow-hidden text-primary border-primary/50 hover:bg-primary/10 hover:border-primary transition-all duration-300 group"
                        onClick={logout}
                      >
                        <span className="absolute inset-0 bg-gradient-to-r from-primary/5 to-ring/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="relative z-10">Logout</span>
                      </Button>
                    </motion.div>
                  </div>
                ) : (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      size="sm"
                      variant="outline"
                      className="relative overflow-hidden text-primary border-primary/50 hover:bg-primary/10 hover:border-primary transition-all duration-300 group"
                      onClick={() => router.push('/signin')}
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-primary/5 to-ring/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="relative z-10">Sign In</span>
                    </Button>
                  </motion.div>
                )}

                {/* Theme Toggle */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ModeToggle />
                </motion.div>
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden relative z-10 p-2 text-foreground hover:text-primary transition-colors duration-300 hover:bg-accent/50 rounded-lg"
              >
                <Menu size={24} />
              </motion.button>
            </div>
          </motion.nav>
        </motion.div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                onClick={() => setIsMobileMenuOpen(false)}
              />

              {/* Drawer */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{
                  type: 'spring',
                  damping: 25,
                  stiffness: 200,
                  duration: 0.5,
                }}
                className="fixed top-0 right-0 h-full w-80 bg-background/95 backdrop-blur-xl border-l border-primary/20 z-50 lg:hidden shadow-2xl"
              >
                {/* Drawer Header */}
                <div className="flex items-center justify-between p-6 border-b border-border/50">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Logo />
                  </motion.div>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-foreground hover:text-primary transition-colors duration-300 hover:bg-accent/50 rounded-lg"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <X size={24} />
                  </motion.button>
                </div>

                {/* Navigation Links */}
                <div className="p-6 space-y-4">
                  {navigationItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.1, duration: 0.4 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block text-lg font-medium py-3 px-4 rounded-lg transition-all duration-300 relative group ${
                          pathname === item.href
                            ? 'text-primary bg-primary/10'
                            : 'text-foreground hover:text-primary hover:bg-accent/50'
                        }`}
                      >
                        <span className="relative z-10">{item.label}</span>
                        {pathname === item.href && (
                          <motion.div
                            layoutId="activeMobileTab"
                            className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-ring rounded-r-full"
                            transition={{ duration: 0.3 }}
                          />
                        )}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Mobile Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="absolute bottom-0 left-0 right-0 p-6 border-t border-border/50 bg-background/50"
                >
                  {user ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="flex-1 justify-start hover:bg-accent/50"
                          onClick={() => {
                            router.push('/profile');
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          <User size={18} className="mr-2" />
                          Profile
                        </Button>

                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="hover:bg-accent/50"
                            >
                              {notifications.some((n) => !n.seen) ? (
                                <BellDot size={18} className="text-primary" />
                              ) : (
                                <Bell size={18} />
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-80 mr-4">
                            <Notifications
                              loading={loading}
                              notifications={notifications}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <Button
                        variant="outline"
                        className="w-full text-primary border-primary/50 hover:bg-primary/10"
                        onClick={() => {
                          logout();
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      className="w-full text-primary border-primary/50 hover:bg-primary/10"
                      onClick={() => {
                        router.push('/signin');
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Sign In
                    </Button>
                  )}

                  <div className="flex justify-center mt-4">
                    <ModeToggle className="w-full" />
                  </div>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </>
    );
};

export default Navbar;
