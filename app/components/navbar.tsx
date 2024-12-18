"use client";
import Link from "next/link";
import { Users, Stethoscope, Phone, Info, Bell, Settings } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./dropdown-menu";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export const Navbar = () => {
	const pathname = usePathname();
	const noPaths = ["/login", "/signup"];

	if (noPaths.includes(pathname)) {
		return;
	}
	return (
		<nav className="bg-primary text-highlight2 p-4">
			<div className="flex justify-between items-center">
				<div className="flex justify-center items-center gap-8">
					<Link
						href="/"
						className="text-3xl font-bold hover:scale-105 transition-500"
					>
						Medical Nexus
					</Link>
					<div className="hidden md:flex space-x-4">
						<NavItem
							href="/services"
							label="Our Services"
							Icons={Stethoscope}
						/>
						<NavItem
							href="/doctors"
							label="Our Doctors"
							Icons={Users}
						/>
						<NavItem href="/about" label="About Us" Icons={Info} />
						<NavItem
							href="/contact"
							label="Contact"
							Icons={Phone}
						/>
					</div>
				</div>
				<div className="flex justify-center items-center gap-4">
					<Bell className="w-9 h-9 m-1 p-2 rounded-3xl hover:bg-highlight2 hover:text-primary transition-500" />
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<button
								title="setting"
								type="button"
								className="focus:outline-none"
							>
								<Settings className="w-9 h-9 m-1 p-2 rounded-3xl hover:bg-highlight2 hover:text-primary transition-500" />
							</button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="bg-primary text-highlight2 shadow-black space-y-2">
							<DropdownMenuItem
								asChild
								className="text-base hover:bg-htext-highlight2 hover:text-primary transition-500"
							>
								<Link href="/profile">Profile</Link>
							</DropdownMenuItem>
							<DropdownMenuItem
								asChild
								className="text-base hover:bg-htext-highlight2 hover:text-primary transition-500"
							>
								<Link href="/settings">Settings</Link>
							</DropdownMenuItem>
							<DropdownMenuItem className="text-base hover:bg-htext-highlight2 hover:text-primary transition-500">
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
						<div className="flex justify-center p-2  rounded-3xl hover:bg-highlight2 hover:text-primary transition-500">
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
			className="group flex items-center font-semibold space-x-1 px-3 py-2 rounded-md hover:bg-highlight2 transition-700 text-highlight2 hover:text-primary"
		>
			<span className="relative flex gap-2">
				<Icons className="w-4 h-4 m-1 ml-0" />
				{label}
				<span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary transition-500 group-hover:w-full"></span>
			</span>
		</Link>
	);
}
