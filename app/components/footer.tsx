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
		<footer className="bg-foreground text-background py-8">
			<div className="container mx-auto px-4">
				{/* Footer Grid */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{/* About Section */}
					<div>
						<h3 className="text-lg font-bold mb-2">
							Medical Nexus
						</h3>
						<p className="text-sm">
							Your trusted partner in healthcare services. We
							provide expert consultations, advanced treatments,
							and personalized care for everyone.
						</p>
					</div>

					{/* Links Section */}
					<div>
						<h3 className="text-lg font-bold mb-2">Quick Links</h3>
						<ul className="text-sm">
							<FooterItem href="/" label="Home" Icons={Home} />
							<FooterItem
								href="/about"
								label="About Us"
								Icons={Info}
							/>
							<FooterItem
								href="/services"
								label="Our Services"
								Icons={Stethoscope}
							/>
							<FooterItem
								href="/contact"
								label="Contact"
								Icons={Phone}
							/>
						</ul>
					</div>

					{/* Contact Section */}
					<div>
						<h3 className="text-lg font-bold mb-2">Contact Us</h3>
						<ul className="text-sm space-y-2">
							<li>
								<span className="font-semibold">Email:</span>{" "}
								support@medicalnexus.com
							</li>
							<li>
								<span className="font-semibold">Phone:</span> +1
								(123) 456-7890
							</li>
							<li>
								<span className="font-semibold">Address:</span>{" "}
								123 Healthcare Drive, Wellness City
							</li>
						</ul>
					</div>
				</div>

				{/* Footer Bottom */}
				<div className="mt-8 border-t border-highlight1 pt-4 text-center text-sm">
					<p>
						© {new Date().getFullYear()} Medical Nexus. All rights
						reserved.
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
				className="group flex items-center font-semibold space-x-1 px-3 py-2 rounded-md transition-700 text-highlight2 hover:text-card w-fit"
			>
				<span className="relative flex gap-2">
					<Icons className="w-4 h-4 mt-[2px] text-highlight2 group-hover:text-card" />
					{label}
					<span className="absolute left-0 bottom-0 w-0 h-0.5 bg-card transition-500 group-hover:w-full"></span>
				</span>
			</Link>
		</li>
	);
}
