"use client"
import Image from "next/image";
import Link from "next/link";
import { MotionUI } from "@/components/ui/motion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { images, links, specialties } from "./data";
import { ComboboxWrapper } from "@/components/ui/comboBox";
import Autoplay from "embla-carousel-autoplay";

export default function Page() {
  return (
    <>
      <section className="relative w-full -mt-20 mx-auto">
        <Carousel
          className="rounded-lg shadow-md overflow-hidden"
          plugins={[Autoplay({ delay: 3000 })]}
        >
          <CarouselContent className="flex justify-center items-center h-full">
            {images.map((image, id) => (
              <CarouselItem key={id} className="flex justify-center h-screen">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={2000}
                  height={1000}
                  objectFit="cover"
                  loading="lazy"
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation Buttons */}
          <CarouselPrevious className="absolute left-4 top-1/2 z-10 -translate-y-1/2 bg-highlight2 p-2 rounded-full shadow-md hover:bg-highlight1 transition-500 active:scale-90" />
          <CarouselNext className="absolute right-4 top-1/2 z-10 -translate-y-1/2 bg-highlight2 p-2 rounded-full shadow-md hover:bg-highlight1 transition-500 active:scale-90" />
        </Carousel>
      </section>



      <section className="bg-background py-20 text-foreground">
        <div className="container mx-auto flex flex-col items-center gap-12 px-4 md:flex-row">
          {/* Left Content */}
          <div className="flex-1 text-center md:text-left">
            <MotionUI
              Tag="h1"
              className="text-4xl font-bold leading-tight md:text-6xl"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              view
            >
              Welcome to <span className="text-highlight1">Medical Nexus</span>
            </MotionUI>
            <MotionUI
              Tag="p"
              className="mt-4 text-lg text-secondary md:text-xl"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              view
            >
              Your trusted partner in comprehensive healthcare solutions.
              Discover expert care, personalized services, and a journey to
              better health.
            </MotionUI>
            <MotionUI
              Tag="div"
              className="mt-8 flex justify-center gap-4 md:justify-start"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              view
            >
              <Link
                href="/services"
                className="transition-500 rounded-md bg-highlight1 px-6 py-3 text-lg font-semibold text-background hover:bg-secondary hover:text-highlight1"
              >
                Explore Services
              </Link>
              <Link
                href="/contact"
                className="transition-500 rounded-md bg-secondary px-6 py-3 text-lg font-semibold text-background hover:bg-primary hover:text-secondary"
              >
                Contact Us
              </Link>
            </MotionUI>
          </div>

          {/* Right Content */}
          <MotionUI
            Tag="div"
            className="relative aspect-[3/2] flex-1 overflow-hidden rounded-lg shadow-lg"
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
      <section className="bg-background py-20 text-foreground">
        <div className="container mx-auto flex flex-col items-center justify-center gap-20 px-4 md:flex-row">
          {/* Left Content */}
          <div className="min-h-[40rem] max-w-xl flex-1 rounded-3xl bg-foreground px-8 py-10 text-background shadow-shadow shadow-black">
            <div>
              <h2 className="relative mb-4 text-3xl font-bold before:absolute before:-bottom-2 before:left-0 before:h-1 before:w-24 before:bg-highlight2">
                For Patients
              </h2>

              <p className="my-8 text-sm">
                Which of these health care services can we help you with?
              </p>
              <div className="flex flex-wrap items-center justify-center gap-5">
                {links.map(({ label, href }, items) => (
                  <Link
                    key={items}
                    href={href}
                    className="transition-500 rounded-3xl border-2 border-highlight2 px-4 py-2 font-semibold hover:border-secondary hover:bg-secondary hover:text-primary"
                  >
                    {label}
                  </Link>
                ))}
              </div>
              <Link href="/appointment">
                <Image
                  src="/images/home/consultation-banner.png"
                  alt="consultation-banner"
                  width={594}
                  height={174}
                  className="pt-10"
                />
              </Link>
            </div>
          </div>
          {/* Right Content */}
          <div className="min-h-[40rem] max-w-xl flex-1 rounded-3xl px-8 py-10 shadow-shadow shadow-black">
            <h2 className="relative mb-4 text-3xl font-bold before:absolute before:-bottom-2 before:left-0 before:h-1 before:w-24 before:bg-primary">
              Know About Our Specialities, Doctors & Clinics
            </h2>
            <p className="my-8 text-sm">Find the right doctor for your needs</p>
            <div className="flex flex-col items-center justify-center gap-10 px-4">
              <ComboboxWrapper
                options={specialties}
                placeholder="Select an Specialties..."
                style={{
                  button: "bg-primary text-highlight2 w-full",
                  command: "bg-primary text-highlight2",
                }}
              />
            </div>
            <div className="relative h-72">
              <Image
                src="/images/home/doc.png"
                alt=""
                width={300}
                height={100}
                className="absolute bottom-0 right-0"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
