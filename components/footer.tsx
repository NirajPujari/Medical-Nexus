"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Info, Phone, Stethoscope } from "lucide-react";

export const Footer = () => {
  const pathname = usePathname();
  const noPaths = ["/login", "/signup"];

  if (noPaths.includes(pathname)) {
    return null; // Explicitly return null if footer should not be rendered
  }

  return (
    <footer className="bg-foreground py-8 text-background">
      <div className="container mx-auto px-4">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* About Section */}
          <div>
            <h3 className="mb-2 text-lg font-bold">Medical Nexus</h3>
            <p className="text-sm">
              Your trusted partner in healthcare services. We provide expert
              consultations, advanced treatments, and personalized care for
              everyone.
            </p>
          </div>

          {/* Links Section */}
          <div>
            <h3 className="mb-2 text-lg font-bold">Quick Links</h3>
            <ul className="text-sm">
              <FooterItem href="/" label="Home" Icons={Home} />
              <FooterItem href="/about" label="About Us" Icons={Info} />
              <FooterItem
                href="/services"
                label="Our Services"
                Icons={Stethoscope}
              />
              <FooterItem href="/contact" label="Contact" Icons={Phone} />
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="mb-2 text-lg font-bold">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="font-semibold">Email:</span>{" "}
                support@medicalnexus.com
              </li>
              <li>
                <span className="font-semibold">Phone:</span> +1 (123) 456-7890
              </li>
              <li>
                <span className="font-semibold">Address:</span> 123 Healthcare
                Drive, Wellness City
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 border-t border-highlight1 pt-4 text-center text-sm">
          <p>
            © {new Date().getFullYear()} Medical Nexus. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

function FooterItem({
  href,
  label,
  Icons,
}: {
  href: string;
  label: string;
  Icons: React.ElementType;
}) {
  return (
    <li>
      <Link
        href={href}
        className="transition-700 group flex w-fit items-center space-x-1 rounded-md px-3 py-2 font-semibold text-highlight2 hover:text-card"
      >
        <span className="relative flex gap-2">
          <Icons className="mt-[2px] h-4 w-4 text-highlight2 group-hover:text-card" />
          {label}
          <span className="transition-500 absolute bottom-0 left-0 h-0.5 w-0 bg-card group-hover:w-full"></span>
        </span>
      </Link>
    </li>
  );
}
