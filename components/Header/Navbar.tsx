"use client";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { redirect } from "next/navigation";
import { useAuth } from "@/context/Auth";
import { Role } from "@/module/@types";

const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex items-center cursor-pointer">
            <div className="w-8 h-8 bg-primary rounded-md mr-2"></div>
            <span
              className="text-lg font-semibold text-primary"
              onClick={() => {
                scrollTo({
                  top: 0,
                  left: 0,
                  behavior: "smooth"
                });
                redirect("/");
              }}
            >
              RentEase
            </span>
          </div>
          <div className="hidden md:flex ml-10 space-x-8">
            <Link
              href="/"
              className="text-headline hover:text-primary transition-colors"
            >
              Home
            </Link>
            {user?.role === Role.OWNER && (
              <Link
                href="/landlords"
                className="text-headline hover:text-primary transition-colors"
              >
                Landlords
              </Link>
            )}
            <Link
              href="/blog"
              className="text-headline hover:text-primary transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/contacts"
              className="text-headline hover:text-primary transition-colors"
            >
              Contacts
            </Link>
            {user?.role === Role.STUDENT && (
              <Link
                href="/apartments"
                className="text-headline hover:text-primary transition-colors"
              >
                Book Now
              </Link>
            )}
          </div>
        </div>
        {user ? (
          <Button
            variant="outline"
            className="text-primary border-primary hover:bg-accent cursor-pointer"
            onClick={logout}
          >
            <Link href="/signin">Logout</Link>
          </Button>
        ) : (
          <Button
            variant="outline"
            className="text-primary border-primary hover:bg-accent cursor-pointer"
          >
            <Link href="/signin">Sign in</Link>
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
