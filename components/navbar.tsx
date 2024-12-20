"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Users, Stethoscope, Phone, Info, Bell, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export const Navbar = () => {
  const pathname = usePathname();
  const noPaths = ["/login", "/signup"];

  if (noPaths.includes(pathname)) {
    return;
  }
  return (
    <nav className="bg-primary p-4 text-highlight2">
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
        <div className="flex items-center justify-center gap-4">
          <Bell className="transition-500 m-1 h-9 w-9 rounded-3xl p-2 hover:bg-highlight2 hover:text-primary" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                title="setting"
                type="button"
                className="focus:outline-none"
              >
                <Settings className="transition-500 m-1 h-9 w-9 rounded-3xl p-2 hover:bg-highlight2 hover:text-primary" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="space-y-2 bg-primary text-highlight2 shadow-black">
              <DropdownMenuItem
                asChild
                className="hover:bg-htext-highlight2 transition-500 text-base hover:text-primary"
              >
                <Link href="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                className="hover:bg-htext-highlight2 transition-500 text-base hover:text-primary"
              >
                <Link href="/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-htext-highlight2 transition-500 text-base hover:text-primary">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <SignedOut>
            <Link href="/login" className="button-primary">
              Login
            </Link>
          </SignedOut>
          <SignedIn>
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
