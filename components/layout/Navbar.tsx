"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Activity, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useRouter } from "next/navigation";

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Doctors", href: "/doctors" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-20 min-h-20 max-h-20 overflow-hidden transition-all duration-500 ${
        scrolled
          ? "bg-surface/90 backdrop-blur-lg border-b border-border shadow-sm"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="container mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 group">
          <Activity className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
          <span className="font-bold text-xl sm:text-2xl tracking-tight">
            Medical Nexus
          </span>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-semibold hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3 sm:gap-6">

          {/* CTA — desktop */}
          <Button
            size="default"
            className="hidden sm:inline-flex rounded-full px-6 font-bold shadow-lg shadow-primary/20"
            onClick={() => router.push("/login")}
          >
            Login / Register
          </Button>

          {/* MOBILE HAMBURGER */}
          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden hover:bg-primary/5 rounded-full h-11 w-11"
                >
                  <Menu className="h-7 w-7" />
                  <span className="sr-only">Open menu</span>
                </Button>
              }
            />

            <SheetContent
              side="right"
              className="w-full sm:w-80 flex flex-col p-6 pt-20"
            >
              {/* NAV LINKS */}
              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-2xl font-bold border-b border-border pb-4 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* BOTTOM ACTIONS */}
              <div className="mt-auto flex flex-col gap-8 pb-10">
                <Button
                  size="lg"
                  className="w-full h-14 rounded-2xl text-lg font-bold"
                  onClick={() => router.push("/login")}
                >
                  Login / Register
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};
