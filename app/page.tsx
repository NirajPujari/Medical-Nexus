import Image from "next/image";
import Link from "next/link";
import MotionUI from "./ui/motion";
import { Carousel } from "@//ui/carousal";

export default function Page() {
	const images = [
		{
			src: "/images/filler/1.jpg",
			alt: "1",
		},
		{
			src: "/images/filler/2.jpg",
			alt: "2",
		},
		{
			src: "/images/filler/3.jpeg",
			alt: "3",
		},
		{
			src: "/images/filler/hero.png",
			alt: "4",
		},
	];
	return (
		<>
			<section className="bg-background text-foreground">
				<Carousel images={images} />
			</section>
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
							view
						>
							Welcome to{" "}
							<span className="text-highlight1">
								Medical Nexus
							</span>
						</MotionUI>
						<MotionUI
							Tag="p"
							className="mt-4 text-lg md:text-xl text-secondary"
							initial={{ opacity: 0, y: 50 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.7, delay: 0.2 }}
							view
						>
							Your trusted partner in comprehensive healthcare
							solutions. Discover expert care, personalized
							services, and a journey to better health.
						</MotionUI>
						<MotionUI
							Tag="div"
							className="mt-8 flex justify-center md:justify-start gap-4"
							initial={{ opacity: 0, y: 50 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.7, delay: 0.4 }}
							view
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
						view
					>
						<Image
							src="/images/filler/hero.png"
							fill
							alt="Healthcare professionals"
							className="object-cover"
							placeholder="blur" // Placeholder with blur effect
							blurDataURL="data:image/png;base64,iVBORw0..." // Add base64 blur image string
						/>
					</MotionUI>
				</div>
			</section>
			<section className="bg-background text-foreground py-20">
				<div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-20 px-4">
					{/* Left Content */}
					<div className="flex-1 max-w-lg border px-8">
						<div>
							<h2 className="text-3xl font-bold mb-4">
								For Patients
							</h2>
							<p className="text-sm mb-8">
								Which of these health care services can we help
								you with?
							</p>
							<div className="flex flex-wrap gap-5">
								<Link href="/appointment">Consulation</Link>
								<Link href="/inpatient">Admission Process</Link>
								<Link href="/insurance">Insurance</Link>
								<Link href="/emergency">24*7 Emergency</Link>
								<Link href="/short-stay-services">
									Short Stay Services
								</Link>
							</div>
							<Link href="/appointment" className="">
								<Image
									src="/images/home/consultation-banner.png"
									alt="consultation-banner"
									width={594}
									height={174}
									className=""
								/>
							</Link>
						</div>
					</div>
					{/* Right Content */}
					<div className="flex-1 max-w-lg border px-8">
						<div>
							<h2 className="text-3xl font-bold mb-4">
								Know About Our Specialities, Doctors & Clinics
							</h2>
							<p className="text-sm mb-8">
								Find the right doctor for your needs
							</p>
							<div className="flex gap-5">
								<select
									title="Search by Speciality"
									className="text-black bg-blue"
								>
									<option value="0">
										Search by Speciality
										{/*  placeholder */}
									</option>
									<option value="129">
										Adult Immunization Clinic
									</option>
									<option value="189">Allergy Clinic</option>
									<option value="114">Anaesthesiology</option>
									<option value="184">Blood Bank</option>
									<option value="70">
										Bone Marrow Transplantation
									</option>
									<option value="58">
										Centre for Cancer Care
									</option>
									<option value="54">
										Centre for Cardiac Care
									</option>
									<option value="63">
										Centre for Neuro Care
									</option>
									<option value="67">
										Centre for Orthopedic Care
									</option>
									<option value="199">
										Child Development Centre
									</option>
									<option value="88">
										Clinical Genetics
									</option>
									<option value="71">
										Clinical Hematology
									</option>
									<option value="112">
										Clinical Nutrition
									</option>
									<option value="91">
										Clinical Psychology
									</option>
									<option value="128">
										Collagen and Lung Clinic
									</option>
									<option value="105">Dental</option>
									<option value="127">
										Dental Implant Clinic
									</option>
									<option value="86">Dermatology</option>
									<option value="104">ENT</option>
									<option value="198">Emergency</option>
									<option value="97">Endocrinology</option>
									<option value="335">
										Evening Consultations Clinic
									</option>
									<option value="121">Fitness Clinic</option>
									<option value="96">
										Gastroenterology Surgery
									</option>
									<option value="95">
										Gastroenterology and Liver Care
									</option>
									<option value="85">
										General Medicine / Internal Medicine
									</option>
									<option value="170">General Surgery</option>
									<option value="76">Gynecology</option>
									<option value="204">
										Heart Valve Clinic
									</option>
									<option value="77">
										IVF &amp; Infertility
									</option>
									<option value="115">Imaging</option>
									<option value="89">
										Infectious Diseases
									</option>
									<option value="113">
										Interventional Radiology
									</option>
									<option value="200">
										Irritable Bowel Disease Clinic
									</option>
									<option value="116">Lab Medicine</option>
									<option value="122">Lupus Clinic</option>
									<option value="107">
										Minimal Access Surgery
									</option>
									<option value="338">
										Myasthenia Gravis Clinic
									</option>
									<option value="317">Nephrology</option>
									<option value="117">
										Nuclear Medicine
									</option>
									<option value="333">
										Ocular Immunology Clinic
									</option>
									<option value="100">Ophthalmology</option>
									<option value="78">Paediatric Care</option>
									<option value="111">Pain Management</option>
									<option value="202">
										Pain Management Clinic
									</option>
									<option value="119">Palliative Care</option>
									<option value="110">
										Physiotherapy &amp; Rehabilitation
									</option>
									<option value="201">Plastic Surgery</option>
									<option value="87">Psychiatry</option>
									<option value="92">
										Pulmonary Medicine
									</option>
									<option value="99">Rheumatology</option>
									<option value="108">Robotic Surgery</option>
									<option value="125">
										Tobacco Cessation Clinic
									</option>
									<option value="130">
										Travel Medicine Clinic
									</option>
									<option value="75">Urology</option>
									<option value="203">Uveitis Clinic</option>
									<option value="120">Vulva Clinic</option>
									<option value="330">
										Women’s Cancer Screening Clinic
									</option>
								</select>
								<Image
									src="/images/home/doc.png"
									alt="doc"
									width={300}
									height={100}
									className=""
								/>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
