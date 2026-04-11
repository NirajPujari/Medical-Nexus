"use client";

import Link from "next/link";
import { Activity, MapPin, Phone, Mail, Globe, Share2, MessageCircle, Info } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface border-t border-border mt-auto">
      {/* Mobile Footer */}
      <div className="md:hidden py-8 px-4">
        <div className="flex flex-col items-center text-center space-y-4 mb-8">
          <Link href="/" className="flex items-center gap-2">
            <Activity className="h-8 w-8 text-primary" />
            <span className="font-bold text-2xl tracking-tight">Medical Nexus</span>
          </Link>
          <p className="text-muted-foreground text-sm max-w-70">
            Advanced care with a human touch. Your trusted healthcare partner since 1998.
          </p>
        </div>

        <Accordion className="w-full mb-8">
          <AccordionItem value="links">
            <AccordionTrigger>Quick Links</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-3">
              <Link href="/about" className="text-muted-foreground hover:text-primary">About Us</Link>
              <Link href="/doctors" className="text-muted-foreground hover:text-primary">Our Doctors</Link>
              <Link href="/careers" className="text-muted-foreground hover:text-primary">Careers</Link>
              <Link href="/news" className="text-muted-foreground hover:text-primary">News & Press</Link>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="services">
            <AccordionTrigger>Services</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-3">
              <Link href="/services/cardiology" className="text-muted-foreground hover:text-primary">Cardiology</Link>
              <Link href="/services/neurology" className="text-muted-foreground hover:text-primary">Neurology</Link>
              <Link href="/services/pediatrics" className="text-muted-foreground hover:text-primary">Pediatrics</Link>
              <Link href="/services/surgery" className="text-muted-foreground hover:text-primary">General Surgery</Link>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="contact">
            <AccordionTrigger>Contact Info</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4">
              <div className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="h-5 w-5 shrink-0 text-primary" />
                <span>123 Nexus Drive, Health City, NY 10001</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="h-5 w-5 shrink-0 text-primary" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="h-5 w-5 shrink-0 text-primary" />
                <span>contact@medicalnexus.com</span>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="flex justify-center gap-6 text-2xl mb-6">
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Globe className="h-6 w-6" /></a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Share2 className="h-6 w-6" /></a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><MessageCircle className="h-6 w-6" /></a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Info className="h-6 w-6" /></a>
        </div>
        <p className="text-xs text-center text-muted-foreground pt-4 border-t border-border/50">
          © {currentYear} Medical Nexus. All rights reserved.
        </p>
      </div>

      {/* Desktop Footer */}
      <div className="hidden md:flex flex-col w-full">
        <div className="grid grid-cols-4 gap-8 px-8 py-16 container mx-auto">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <Activity className="h-8 w-8 text-primary" />
              <span className="font-bold text-2xl tracking-tight">Medical Nexus</span>
            </Link>
            <p className="text-muted-foreground leading-relaxed">
              Advanced care with a human touch. Delivering comprehensive healthcare solutions to our community since 1998.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/doctors" className="text-muted-foreground hover:text-primary transition-colors">Our Doctors</Link></li>
              <li><Link href="/careers" className="text-muted-foreground hover:text-primary transition-colors">Careers</Link></li>
              <li><Link href="/news" className="text-muted-foreground hover:text-primary transition-colors">News & Press</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-6">Services</h3>
            <ul className="space-y-4">
              <li><Link href="/services/cardiology" className="text-muted-foreground hover:text-primary transition-colors">Cardiology</Link></li>
              <li><Link href="/services/neurology" className="text-muted-foreground hover:text-primary transition-colors">Neurology</Link></li>
              <li><Link href="/services/pediatrics" className="text-muted-foreground hover:text-primary transition-colors">Pediatrics</Link></li>
              <li><Link href="/services/surgery" className="text-muted-foreground hover:text-primary transition-colors">General Surgery</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 shrink-0 text-primary mt-0.5" />
                <span className="text-muted-foreground">123 Nexus Drive,<br/>Health City, NY 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-muted-foreground">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-muted-foreground">contact@medicalnexus.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border bg-muted/10">
          <div className="container mx-auto px-8 py-6 flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Medical Nexus. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Globe className="h-5 w-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Share2 className="h-5 w-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><MessageCircle className="h-5 w-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Info className="h-5 w-5" /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
