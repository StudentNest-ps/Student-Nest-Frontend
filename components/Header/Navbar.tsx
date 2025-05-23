'use client';
import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/Auth';
import { Role } from '@/module/@types';
import { hiddenHeaderPaths } from '@/data/hiddenPaths';
import { ModeToggle } from '../providers/theme-provider';
import Logo from './Logo';

const Navbar = () => {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  if (!hiddenHeaderPaths.some((path) => pathname.startsWith(path)))
    return (
      <nav className="sticky top-0 z-50 bg-background shadow-sm border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Logo />
            <div className="hidden md:flex ml-10 space-x-8">
              <Link
                href="/"
                className="text-foreground hover:text-primary transition-colors"
              >
                Home
              </Link>
              {user?.role === Role.OWNER && (
                <Link
                  href="/landlords"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  Landlords
                </Link>
              )}
              <Link
                href="/blog"
                className="text-foreground hover:text-primary transition-colors"
              >
                Blog
              </Link>
              <Link
                href="/contact-us"
                className="text-foreground hover:text-primary transition-colors"
              >
                Contacts
              </Link>
              {user?.role === Role.STUDENT && (
                <Link
                  href="/apartments"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  Book Now
                </Link>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {user ? (
              <Button
                variant="outline"
                className="text-primary border-primary hover:bg-accent cursor-pointer"
                onClick={logout}
              >
                <Link href="/signin">Logout</Link>
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  className="text-primary border-primary hover:bg-accent cursor-pointer"
                >
                  <Link href="/signin">Sign in</Link>
                </Button>
              </>
            )}
            <ModeToggle />
          </div>
        </div>
      </nav>
    );
};

export default Navbar;
