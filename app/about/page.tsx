"use client";

import { Activity, Calendar, Stethoscope, ThumbsUp, ArrowRight } from "lucide-react";
import Image from "next/image";
import { MotionUI } from "@/components/ui/motion"; // Import the MotionUI component

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <MotionUI
        Tag="section"
        className="container mx-auto px-4 py-12 md:py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        view
      >
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight text-primary md:text-5xl lg:text-6xl">
                Your health is our top priority
              </h1>
              <p className="max-w-lg text-lg text-foreground">
                We are committed to providing you with exceptional healthcare
                services for all your needs.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <button className="transition-500 flex items-center justify-center rounded-lg bg-highlight1 px-6 py-2 font-semibold text-highlight2 hover:bg-card">
                Book an Appointment
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
              <button className="transition-500 rounded-lg border-2 border-highlight1 px-6 py-2 text-highlight1 hover:bg-card">
                Take a Tour
              </button>
            </div>
            <div className="space-y-3">
              <p className="font-medium">Find a doctor</p>
              <div className="flex gap-3">
                {["Sarah Adams", "Beverly Lawrence", "Adrian Henry"].map(
                  (name: string) => (
                    <div
                      key={name}
                      className="flex items-center gap-2 rounded-full border bg-primary px-3 py-1.5 shadow-sm"
                    >
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-highlight1 font-bold">
                        {name[0]}
                      </div>
                      <span className="text-sm font-semibold text-highlight2">
                        {name}
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
          <div className="relative">
            <Image
              src="/images/placeholder/doctor2.png"
              alt="Doctor"
              className="m-auto h-auto w-full rounded-2xl"
              width={10000}
              height={10000}
            />
            <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-2xl bg-highlight1"></div>
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-2xl bg-card"></div>
          </div>
        </div>
      </MotionUI>

      {/* Process Section */}
      <MotionUI
        Tag="section"
        className="bg-gray-50 py-16 md:py-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        view
      >
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <p className="mb-4 font-semibold text-card">FIND SOLUTION</p>
            <h2 className="text-3xl font-bold text-background md:text-4xl">
              Step by step to
              <br />
              get your solution
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Activity,
                title: "Health complaints",
                description:
                  "Tell us what's bothering you and we'll connect you with the right doctor.",
                color: "text-teal-500",
              },
              {
                icon: Stethoscope,
                title: "Choose doctor",
                description:
                  "Browse our network of top doctors and find the right one for you.",
                color: "text-blue-500",
              },
              {
                icon: Calendar,
                title: "Make a schedule",
                description:
                  "Select the time that works best for your consultation.",
                color: "text-cyan-500",
              },
              {
                icon: ThumbsUp,
                title: "Get your solution",
                description:
                  "Receive your diagnosis and treatment plan from your doctor.",
                color: "text-emerald-500",
              },
            ].map((step, index) => (
              <MotionUI
                key={index}
                Tag="div"
                className="text-center"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                view
              >
                <div className="mb-6 inline-block">
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-full ${step.color} bg-white shadow-lg`}
                  >
                    <step.icon className="h-8 w-8" />
                  </div>
                </div>
                <h3 className="mb-4 text-xl font-semibold text-background">
                  {step.title}
                </h3>
                <p className="text-card">{step.description}</p>
              </MotionUI>
            ))}
          </div>
        </div>
      </MotionUI>

      {/* Mental Health Section */}
      <MotionUI
        Tag="section"
        className="py-16 md:py-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        view
      >
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-foreground md:text-4xl">
                We care about your
                <br />
                mental health
              </h2>
              <p className="text-lg text-foreground">
                We are dedicated to taking care of children, adolescents and
                adults who need help. We help you recover from depression,
                anxiety, and various concerns.
              </p>
              <button className="transition-500 flex items-center justify-center gap-2 rounded-lg bg-highlight1 px-6 py-2 font-semibold text-highlight2 hover:bg-card">
                Get in Touch
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <div className="relative">
              <Image
                src="/images/placeholder/doctor3.png"
                alt="Mental Health Care"
                className="h-auto w-full rounded-2xl"
                width={600}
                height={400}
              />
              <div className="absolute right-0 top-0 -z-10 h-32 w-32 -translate-y-1/4 translate-x-1/4 rounded-full bg-blue-100"></div>
              <div className="absolute bottom-0 left-0 -z-10 h-32 w-32 -translate-x-1/4 translate-y-1/4 rounded-full bg-pink-100"></div>
            </div>
          </div>
        </div>
      </MotionUI>

      {/* Stats Section */}
      <MotionUI
        Tag="section"
        className="bg-primary py-16 md:py-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        view
      >
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="grid grid-cols-2 gap-8">
              <div className="rounded-2xl bg-card p-8 text-center shadow-sm">
                <div className="mb-2 text-4xl font-bold text-highlight1">
                  5000+
                </div>
                <div className="text-highlight2">Worldwide Doctors</div>
              </div>
              <div className="rounded-2xl bg-card p-8 text-center shadow-sm">
                <div className="mb-2 text-4xl font-bold text-highlight1">
                  1000+
                </div>
                <div className="text-highlight2">Happy Patients</div>
              </div>
              <div className="rounded-2xl bg-card p-8 text-center shadow-sm">
                <div className="mb-2 text-4xl font-bold text-highlight1">
                  300+
                </div>
                <div className="text-highlight2">Expert Teams</div>
              </div>
            </div>
            <div className="space-y-6">
              <p className="font-medium text-card">OUR BENEFITS</p>
              <h2 className="text-3xl font-bold text-highlight2 md:text-4xl">
                Why we are better
              </h2>
              <p className="text-lg text-card">
                Our healthcare is backed by our ever-evolving, collaborative
                practice and decades-long collection. We provide the most
                effective and meaningful care at an incredible price.
              </p>
            </div>
          </div>
        </div>
      </MotionUI>

      {/* Testimonials Section */}
      <MotionUI
        Tag="section"
        className="bg-background py-16 md:py-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        view
      >
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <p className="mb-4 font-semibold text-card">TESTIMONIALS</p>
            <h2 className="text-3xl font-bold text-primary md:text-4xl">
              What our patients say
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "John Doe",
                image: "/images/placeholder/placeholder.jpg",
                feedback:
                  "The treatment I received here was exceptional! I feel better than ever.",
              },
              {
                name: "Jane Smith",
                image: "/images/placeholder/placeholder.jpg",
                feedback:
                  "A wonderful experience from start to finish. I highly recommend this hospital!",
              },
              {
                name: "Emily Davis",
                image: "/images/placeholder/placeholder.jpg",
                feedback:
                  "Thank you for the amazing care and support throughout my recovery!",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="rounded-lg bg-primary p-8 shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="h-16 w-16 rounded-full"
                    width={64}
                    height={64}
                  />
                  <div className="ml-4">
                    <p className="font-bold text-lg text-background">
                      {testimonial.name}
                    </p>
                    <p className="text-card text-sm font-semibold">Patient</p>
                  </div>
                </div>
                <p className="text-lg text-card italic">
                &quot;{testimonial.feedback}&quot;
                </p>
              </div>
            ))}
          </div>
        </div>
      </MotionUI>
    </main>
  );
}
