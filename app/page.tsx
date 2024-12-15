import Image from "next/image";
import Link from "next/link";
import MotionUI from "./ui/motion";

export default function Page() {
	return (
		<section className="bg-background text-foreground py-20">
			<div className="container mx-auto flex flex-col md:flex-row items-center gap-12 px-4">
				{/* Left Content */}
				<div className="flex-1 text-center md:text-left">
					<MotionUI
						Tag="h1"
						className="text-4xl md:text-6xl font-bold leading-tight"
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
					>
						Welcome to{" "}
						<span className="text-highlight1">Medical Nexus</span>
					</MotionUI>
					<MotionUI
						Tag="p"
						className="mt-4 text-lg md:text-xl text-secondary"
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.7, delay: 0.2 }}
					>
						Your trusted partner in comprehensive healthcare
						solutions. Discover expert care, personalized services,
						and a journey to better health.
					</MotionUI>
					<MotionUI
						Tag="div"
						className="mt-8 flex justify-center md:justify-start gap-4"
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.7, delay: 0.4 }}
					>
						<Link
							href="/services"
							className="bg-highlight1 text-background py-3 px-6 rounded-md text-lg font-semibold hover:text-highlight1 hover:bg-secondary transition-500"
						>
							Explore Services
						</Link>
						<Link
							href="/contact"
							className="bg-secondary text-background py-3 px-6 rounded-md text-lg font-semibold hover:text-secondary hover:bg-primary transition-500"
						>
							Contact Us
						</Link>
					</MotionUI>
				</div>

				{/* Right Content */}
				<MotionUI
					Tag="div"
					className="flex-1 relative aspect-[3/2] rounded-lg overflow-hidden shadow-lg"
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.8, delay: 0.6 }}
				>
					<Image
						src="/images/hero.png"
						fill
						alt="Healthcare professionals"
						className="object-cover"
						placeholder="blur" // Placeholder with blur effect
						blurDataURL="data:image/png;base64,iVBORw0..." // Add base64 blur image string
					/>
				</MotionUI>
			</div>
		</section>
	);
}
