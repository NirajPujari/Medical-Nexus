"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { Users, Stethoscope, Phone, Info } from "lucide-react";

export const Navbar = () => {
  const pathname = usePathname();
  const { user } = useUser()
  const noPaths = ["/login", "/signup", "/entry"];

  if (noPaths.some(sub => pathname.includes(sub))) {
    return;
  }
  return (
    <nav className="min-w-full sticky z-[100] bg-primary p-4 text-highlight2">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center gap-8">
          <Link
            href="/"
            className="transition-500 text-3xl font-bold hover:scale-105"
          >
            Medical Nexus
          </Link>
          <div className="hidden space-x-4 md:flex">
            <NavItem
              href="/services"
              label="Our Services"
              Icons={Stethoscope}
            />
            <NavItem href="/doctors" label="Our Doctors" Icons={Users} />
            <NavItem href="/about" label="About Us" Icons={Info} />
            <NavItem href="/contact" label="Contact" Icons={Phone} />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <SignedOut>
            <Link href="/login" className="button-primary">
              Login
            </Link>
          </SignedOut>
          <SignedIn>
            <div className="flex justify-center items-center gap-4">

          <Link href={user?.publicMetadata?.isDoc ? "/dashboard/doctor" : "/dashboard/patient"} className="px-4 py-2 rounded-lg bg-card text-primary font-semibold transition-500 hover:bg-highlight2 hover:scale-105">
                Dashboard
              </Link>
            <div className="transition-500 flex justify-center rounded-3xl p-2 hover:bg-highlight2 hover:text-primary">
              <UserButton
                appearance={{
                  variables: {
                    colorPrimary: "#002b5b",
                    colorBackground: "#e6f4fa",
                    colorText: "#002b5b",
                    colorTextSecondary: "#004f8a",
                    colorNeutral: "#004f8a",
                  },
                }}
                afterMultiSessionSingleSignOutUrl="/"
              />
            </div>
            </div>
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};

function NavItem({
  href,
  label,
  Icons,
}: {
  href: string;
  label: string;
  Icons: React.ElementType;
}) {
  return (
    <Link
      href={href}
      className="transition-700 group flex items-center space-x-1 rounded-md px-3 py-2 font-semibold text-highlight2 hover:bg-highlight2 hover:text-primary"
    >
      <span className="relative flex gap-2">
        <Icons className="m-1 ml-0 h-4 w-4" />
        {label}
        <span className="transition-500 absolute bottom-0 left-0 h-0.5 w-0 bg-primary group-hover:w-full"></span>
      </span>
    </Link>
  );
}
