"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Footer = () => {
	const pathname = usePathname();
	const noPaths = ["/login", "/signup"];

	if (noPaths.includes(pathname)) {
		return;
	}

	return (
		<footer className="bg-foreground text-background py-8">
			<div className="container mx-auto px-4">
				{/* Footer Grid */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{/* About Section */}
					<div>
						<h3 className="text-lg font-bold mb-4">
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
						<h3 className="text-lg font-bold mb-4">Quick Links</h3>
						<ul className="space-y-2 text-sm">
							<li>
								<Link
									href="/"
									className="hover:text-highlight1 transition"
								>
									Home
								</Link>
							</li>
							<li>
								<a
									href="/about"
									className="hover:text-highlight1 transition"
								>
									About Us
								</a>
							</li>
							<li>
								<a
									href="/services"
									className="hover:text-highlight1 transition"
								>
									Our Services
								</a>
							</li>
							<li>
								<a
									href="/contact"
									className="hover:text-highlight1 transition"
								>
									Contact
								</a>
							</li>
						</ul>
					</div>

					{/* Contact Section */}
					<div>
						<h3 className="text-lg font-bold mb-4">Contact Us</h3>
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
