"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  HeartPulse,
  Stethoscope,
  Activity as ActivityIcon,
  ChevronRight,
  Brain,
  Baby,
  Bone,
  ArrowUpRight,
  Star,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

// ─── ANIMATION VARIANTS ────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
  }),
};



const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardReveal = {
  hidden: { opacity: 0, y: 50, scale: 0.96 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      delay: i * 0.13,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

// ─── MAGNETIC BUTTON HOOK ───────────────────────────────────────────────────

function useMagnetic(strength = 0.4) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      x.set(dx * strength);
      y.set(dy * strength);
    };
    const reset = () => { x.set(0); y.set(0); };
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", reset);
    return () => { el.removeEventListener("mousemove", move); el.removeEventListener("mouseleave", reset); };
  }, [x, y, strength]);

  return { ref, sx, sy };
}

// ─── COUNTER COMPONENT ──────────────────────────────────────────────────────

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── FLOATING PULSE ─────────────────────────────────────────────────────────

function PulseDot({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      className="absolute w-2 h-2 rounded-full bg-primary/60"
      animate={{ scale: [1, 2.5, 1], opacity: [0.6, 0, 0.6] }}
      transition={{ duration: 2.5, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

// ─── SERVICES DATA ──────────────────────────────────────────────────────────

const services = [
  {
    icon: HeartPulse,
    title: "Cardiology",
    tag: "Heart",
    desc: "Digital heart mapping and minimally invasive cardiac solutions for complex conditions.",
    color: "from-rose-500/10 to-rose-500/5",
    accent: "text-rose-500",
    bg: "bg-rose-500/10",
  },
  {
    icon: Brain,
    title: "Neurology",
    tag: "Brain",
    desc: "Expert neurological treatments utilizing the latest AI-driven diagnostics.",
    color: "from-violet-500/10 to-violet-500/5",
    accent: "text-violet-500",
    bg: "bg-violet-500/10",
  },
  {
    icon: Bone,
    title: "Orthopedics",
    tag: "Joints",
    desc: "Advanced joint replacement and sports medicine rehabilitation programs.",
    color: "from-amber-500/10 to-amber-500/5",
    accent: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    icon: Baby,
    title: "Pediatrics",
    tag: "Children",
    desc: "Specialized care for infants, children and adolescents in a safe environment.",
    color: "from-emerald-500/10 to-emerald-500/5",
    accent: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    icon: Stethoscope,
    title: "Oncology",
    tag: "Cancer",
    desc: "Comprehensive cancer treatment plans with multidisciplinary expert teams.",
    color: "from-sky-500/10 to-sky-500/5",
    accent: "text-sky-500",
    bg: "bg-sky-500/10",
  },
  {
    icon: Zap,
    title: "Emergency",
    tag: "24/7",
    desc: "Round-the-clock emergency response with state-of-the-art trauma care units.",
    color: "from-orange-500/10 to-orange-500/5",
    accent: "text-orange-500",
    bg: "bg-orange-500/10",
  },
];

// ─── DOCTORS DATA ────────────────────────────────────────────────────────────

const doctors = [
  { name: "Dr. Sarah Jenkins", spec: "Cardiology", initials: "SJ", rating: 4.9, patients: "2.4k" },
  { name: "Dr. Marcus Chen", spec: "Neurology", initials: "MC", rating: 4.8, patients: "1.8k" },
  { name: "Dr. Emily Rostova", spec: "Pediatrics", initials: "ER", rating: 5.0, patients: "3.1k" },
  { name: "Dr. James Wilson", spec: "Orthopedics", initials: "JW", rating: 4.7, patients: "2.0k" },
];

// ─── TESTIMONIALS DATA ───────────────────────────────────────────────────────

const testimonials = [
  { quote: "The care I received at Medical Nexus was truly exceptional. Every staff member went above and beyond.", name: "Priya Sharma", treatment: "Cardiac Surgery", rating: 5 },
  { quote: "I was nervous about my procedure, but the team made me feel completely at ease. Outstanding professionalism.", name: "Rohit Mehta", treatment: "Orthopedic Rehabilitation", rating: 5 },
  { quote: "From diagnosis to recovery, every step was handled with precision and warmth. I couldn't ask for better.", name: "Ananya Gupta", treatment: "Neurology Consultation", rating: 5 },
];

// ─── SECTION HEADING ────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={fadeUp}
      className="flex items-center gap-3 mb-4"
    >
      <div className="h-px w-8 bg-primary" />
      <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase">{children}</span>
    </motion.div>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const servicesRef = useRef(null);
  const servicesInView = useInView(servicesRef, { once: true, margin: "-100px" });

  const doctorsRef = useRef(null);
  const doctorsInView = useInView(doctorsRef, { once: true, margin: "-100px" });

  const testimonialsRef = useRef(null);
  const testimonialsInView = useInView(testimonialsRef, { once: true, margin: "-100px" });

  const { ref: magneticRef, sx: magneticX, sy: magneticY } = useMagnetic(0.3);

  return (
    <main className="flex flex-col min-h-dvh overflow-x-hidden bg-background">

      {/* ── HERO ── */}
      <section
        ref={heroRef}
        className="relative min-h-dvh flex flex-col justify-center overflow-hidden"
      >
        {/* Background layers */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[60vw] h-[60vw] max-w-3xl max-h-3xl bg-primary/5 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] max-w-xl max-h-xl bg-accent/5 rounded-full blur-[100px] -translate-x-1/4 translate-y-1/4" />

          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-[0.025]" style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: "60px 60px"
          }} />

          {/* Pulse dots */}
          <div className="absolute top-1/4 right-1/4">
            <PulseDot delay={0} />
          </div>
          <div className="absolute top-2/3 right-1/3">
            <PulseDot delay={1.2} />
          </div>
          <div className="absolute top-1/2 left-1/4">
            <PulseDot delay={0.6} />
          </div>
        </div>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 z-10 relative"
        >
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* LEFT */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="flex flex-col items-center text-center lg:items-start lg:text-left space-y-8"
            >

              <motion.h1
                variants={fadeUp}
                custom={1}
                className="text-5xl sm:text-6xl xl:text-8xl font-black tracking-tighter leading-[0.9] text-balance"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Advanced{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-primary">Care,</span>
                  <motion.span
                    className="absolute -bottom-1 left-0 right-0 h-3 bg-primary/10 z-0 rounded-sm"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.9, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    style={{ originX: 0 }}
                  />
                </span>
                <br />
                Human{" "}
                <span className="text-foreground/30">Touch</span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                custom={2}
                className="text-muted-foreground text-base sm:text-lg max-w-lg leading-relaxed"
              >
                World-class medical expertise integrated with compassionate care.
                Your health is our singular mission — always.
              </motion.p>

              <motion.div
                variants={fadeUp}
                custom={3}
                className="flex flex-col w-full sm:flex-row gap-4"
              >
                <div ref={magneticRef}>
                  <motion.div style={{ x: magneticX, y: magneticY }}>
                    <Button
                      size="lg"
                      className="w-full sm:w-auto h-14 rounded-2xl text-base font-extrabold px-10 shadow-2xl shadow-primary/25 group"
                    >
                      Book Appointment
                      <motion.span
                        className="ml-2 inline-block"
                        animate={{ x: [0, 4, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                      >
                        →
                      </motion.span>
                    </Button>
                  </motion.div>
                </div>
                <Link href="/services" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full h-14 rounded-2xl text-base font-bold px-10 border-2 group hover:bg-primary/5 transition-colors"
                  >
                    Explore Services
                    <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>

              {/* STATS */}
              <motion.div
                variants={fadeUp}
                custom={4}
                className="w-full pt-6 flex flex-wrap justify-center lg:justify-start gap-0 divide-x divide-border"
              >
                {[
                  { value: 500, suffix: "+", label: "Doctors" },
                  { value: 20, suffix: "+", label: "Specialties" },
                  { value: 50, suffix: "K+", label: "Patients" },
                  { value: 24, suffix: "/7", label: "Care" },
                ].map((stat, i) => (
                  <div key={i} className="px-6 first:pl-0 text-center lg:text-left">
                    <div className="text-2xl sm:text-4xl font-black text-foreground tabular-nums">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-xs text-muted-foreground font-bold uppercase tracking-widest mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* RIGHT — decorative card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 40 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:block relative"
            >
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                {/* Rotated bg card */}
                <motion.div
                  animate={{ rotate: [6, 4, 6] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-primary/8 rounded-[3rem] border border-primary/10"
                />

                {/* Main card */}
                <motion.div
                  animate={{ rotate: [-2, 0, -2] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-surface border border-border shadow-2xl rounded-[3rem] p-8 flex flex-col gap-6"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-primary/10 rounded-2xl">
                        <HeartPulse className="h-7 w-7 text-primary" />
                      </div>
                      <div>
                        <div className="font-black text-sm">Medical Nexus</div>
                        <div className="text-xs text-muted-foreground">Health Dashboard</div>
                      </div>
                    </div>
                    <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 text-xs font-bold">
                      ● LIVE
                    </Badge>
                  </div>

                  <Separator />

                  {/* Activity line */}
                  <div className="space-y-2">
                    <div className="text-xs text-muted-foreground font-bold uppercase tracking-widest">Today&apos;s Activity</div>
                    <div className="flex items-end gap-1 h-16">
                      {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                        <motion.div
                          key={i}
                          className="flex-1 bg-primary/20 rounded-t-sm"
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          transition={{ delay: 0.6 + i * 0.05, duration: 0.4, ease: "backOut" }}
                          style={{ height: `${h}%`, originY: 1 }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Doctor avatars row */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-muted-foreground font-bold uppercase tracking-widest mb-2">On Duty Now</div>
                      <div className="flex -space-x-2">
                        {["SJ", "MC", "ER", "JW"].map((initials, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.8 + i * 0.1 }}
                          >
                            <Avatar className="h-9 w-9 border-2 border-surface text-xs">
                              <AvatarFallback className="bg-primary/10 text-primary font-black text-xs">
                                {initials}
                              </AvatarFallback>
                            </Avatar>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">Avg Wait</div>
                      <div className="text-2xl font-black text-foreground">8<span className="text-sm font-bold text-muted-foreground">min</span></div>
                    </div>
                  </div>

                  {/* Status items */}
                  <div className="grid grid-cols-2 gap-3 mt-auto">
                    {[
                      { label: "Beds Available", value: "47", color: "bg-emerald-500/10 text-emerald-500" },
                      { label: "ICU Capacity", value: "82%", color: "bg-amber-500/10 text-amber-500" },
                    ].map((item, i) => (
                      <div key={i} className="bg-muted/30 rounded-2xl p-4">
                        <div className="text-xs text-muted-foreground mb-1">{item.label}</div>
                        <div className={`text-xl font-black ${item.color.split(" ")[1]}`}>{item.value}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-muted-foreground/20 rounded-full flex justify-center pt-2"
          >
            <div className="w-1 h-2 bg-muted-foreground/40 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── SERVICES ── */}
      <section
        ref={servicesRef}
        id="services"
        className="py-24 sm:py-36 px-4 bg-background relative overflow-hidden"
      >
        <div className="absolute right-0 top-0 w-96 h-96 bg-primary/3 rounded-full blur-[80px] pointer-events-none" />

        <div className="container mx-auto relative z-10">
          <motion.div
            initial="hidden"
            animate={servicesInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16"
          >
            <div>
              <SectionLabel>What We Treat</SectionLabel>
              <motion.h2
                variants={fadeUp}
                className="text-4xl sm:text-6xl font-black tracking-tighter leading-none"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Core<br />
                <span className="text-primary">Specialties</span>
              </motion.h2>
            </div>
            <motion.div variants={fadeUp}>
              <Link href="/services">
                <Button
                  variant="ghost"
                  className="text-primary font-bold text-base hover:bg-primary/5 group gap-2 h-12 rounded-full px-6 border border-primary/20"
                >
                  Browse All
                  <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={servicesInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {services.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={i} variants={cardReveal} custom={i}>
                  <Card className="group border border-border hover:border-primary/30 bg-surface hover:shadow-xl hover:shadow-primary/5 rounded-3xl transition-all duration-500 cursor-pointer h-full overflow-hidden relative">
                    <div className={`absolute inset-0 bg-linear-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    <CardHeader className="p-6 pb-3 relative">
                      <div className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className={`h-7 w-7 ${item.accent}`} />
                      </div>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl font-black">{item.title}</CardTitle>
                        <Badge variant="outline" className="text-xs font-bold text-muted-foreground">
                          {item.tag}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="px-6 pb-3 relative">
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </CardContent>
                    <CardFooter className="px-6 pb-6 relative">
                      <Button
                        variant="ghost"
                        className={`p-0 ${item.accent} font-bold text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0`}
                      >
                        Learn More <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── DOCTORS ── */}
      <section
        ref={doctorsRef}
        id="doctors"
        className="py-24 sm:py-36 px-4 bg-surface relative overflow-hidden"
      >
        <div className="absolute left-0 bottom-0 w-96 h-96 bg-accent/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="container mx-auto relative z-10">
          <motion.div
            initial="hidden"
            animate={doctorsInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16"
          >
            <div>
              <SectionLabel>Our Team</SectionLabel>
              <motion.h2
                variants={fadeUp}
                className="text-4xl sm:text-6xl font-black tracking-tighter leading-none"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                World-Class<br />
                <span className="text-primary">Experts</span>
              </motion.h2>
            </div>
            <motion.div variants={fadeUp}>
              <Link href="/doctors">
                <Button
                  variant="outline"
                  className="rounded-full px-8 h-12 font-extrabold border-2 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
                >
                  Full Team
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Mobile: horizontal scroll | Desktop: grid */}
          <motion.div
            initial="hidden"
            animate={doctorsInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="flex overflow-x-auto gap-5 snap-x snap-mandatory lg:grid lg:grid-cols-4 lg:overflow-visible scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 pb-8 lg:pb-0"
          >
            {doctors.map((doc, i) => (
              <motion.div
                key={i}
                variants={cardReveal}
                custom={i}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="min-w-65 sm:min-w-75 lg:min-w-0 snap-center shrink-0 w-full"
              >
                <Card className="border border-border bg-background rounded-3xl h-full group hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 overflow-hidden">
                  <CardHeader className="flex flex-col items-center text-center p-8 pb-4">
                    {/* Avatar with ring animation */}
                    <div className="relative mb-5">
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-primary/30"
                        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2.5, delay: i * 0.4, repeat: Infinity }}
                      />
                      <Avatar className="h-24 w-24 border-4 border-surface shadow-xl relative z-10">
                        <AvatarImage src="" />
                        <AvatarFallback className="text-2xl bg-primary/10 text-primary font-black">
                          {doc.initials}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <CardTitle className="text-lg font-black">{doc.name}</CardTitle>
                    <Badge
                      variant="secondary"
                      className="mt-2 px-4 py-1 font-bold rounded-full text-xs uppercase tracking-widest"
                    >
                      {doc.spec}
                    </Badge>
                  </CardHeader>
                  <CardContent className="px-8 pb-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star className="h-4 w-4 fill-amber-500" />
                        <span className="font-black text-foreground">{doc.rating}</span>
                      </div>
                      <div className="text-muted-foreground">
                        <span className="font-bold text-foreground">{doc.patients}</span> patients
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="px-8 pb-8">
                    <Button
                      variant="outline"
                      className="w-full rounded-2xl h-11 font-bold border-2 group-hover:border-primary group-hover:text-primary transition-all duration-300"
                    >
                      View Profile
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section
        ref={testimonialsRef}
        className="py-24 sm:py-36 px-4 bg-background relative overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none opacity-30" style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.06) 0%, transparent 70%)`
        }} />

        <div className="container mx-auto relative z-10">
          <motion.div
            initial="hidden"
            animate={testimonialsInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <SectionLabel>Patient Stories</SectionLabel>
            <motion.h2
              variants={fadeUp}
              className="text-4xl sm:text-6xl font-black tracking-tighter"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Voices of <span className="text-primary">Recovery</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={testimonialsInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                variants={cardReveal}
                custom={i}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Card className="border border-border bg-surface rounded-3xl p-8 h-full flex flex-col gap-6 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500">
                  {/* Stars */}
                  <div className="flex gap-1">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <motion.div
                        key={j}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={testimonialsInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.3 + i * 0.1 + j * 0.05 }}
                      >
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-foreground/80 leading-relaxed flex-1 text-sm sm:text-base">
                    &ldquo;{t.quote}&rdquo;
                  </p>

                  <Separator />

                  {/* Attribution */}
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10 text-primary font-black text-xs">
                        {t.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-black text-sm">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.treatment}</div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section className="px-4 py-16 sm:py-20">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="bg-primary rounded-3xl sm:rounded-[2.5rem] p-10 sm:p-16 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
          >
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
            </div>
            <div className="relative text-center md:text-left">
              <h2
                className="text-3xl sm:text-5xl font-black text-white mb-3 tracking-tight"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Your health can&apos;t wait.
              </h2>
              <p className="text-white/70 text-base sm:text-lg">
                Book an appointment with our specialists today.
              </p>
            </div>
            <div className="relative flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 font-extrabold h-14 rounded-2xl px-10 shadow-2xl shadow-black/20 w-full sm:w-auto"
              >
                Book Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 font-bold h-14 rounded-2xl px-10 w-full sm:w-auto"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-surface border-t border-border px-4 pt-16 pb-8">
        <div className="container mx-auto">
          {/* Desktop grid */}
          <div className="hidden md:grid grid-cols-4 gap-12 pb-12 border-b border-border">
            <div className="col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <ActivityIcon className="h-7 w-7 text-primary" />
                <span className="font-black text-xl tracking-tight">Medical Nexus</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                World-class healthcare delivered with compassion. Your wellbeing is our mission.
              </p>
            </div>
            {[
              {
                title: "Quick Links",
                links: ["Home", "Services", "Doctors", "About Us"],
                hrefs: ["/", "/services", "/doctors", "/about"],
              },
              {
                title: "Specialties",
                links: ["Cardiology", "Neurology", "Orthopedics", "Pediatrics"],
                hrefs: ["/services", "/services", "/services", "/services"],
              },
              {
                title: "Contact",
                links: ["+91 98765 43210", "info@medicalnexus.in", "Mumbai, Maharashtra", "Open 24/7"],
                hrefs: ["#", "#", "#", "#"],
              },
            ].map((col) => (
              <div key={col.title}>
                <div className="font-black text-sm uppercase tracking-widest mb-5 text-foreground">{col.title}</div>
                <ul className="space-y-3">
                  {col.links.map((link, i) => (
                    <li key={i}>
                      <Link
                        href={col.hrefs[i]}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Mobile stacked */}
          <div className="md:hidden space-y-8 pb-10 border-b border-border">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <ActivityIcon className="h-6 w-6 text-primary" />
                <span className="font-black text-lg">Medical Nexus</span>
              </div>
              <p className="text-muted-foreground text-sm">World-class healthcare with compassion.</p>
            </div>
            <div className="grid grid-cols-2 gap-8">
              {[
                { title: "Navigate", links: ["Services", "Doctors", "About", "Contact"], hrefs: ["/services", "/doctors", "/about", "/contact"] },
                { title: "Specialties", links: ["Cardiology", "Neurology", "Orthopedics", "Pediatrics"], hrefs: ["/services", "/services", "/services", "/services"] },
              ].map((col) => (
                <div key={col.title}>
                  <div className="font-black text-xs uppercase tracking-widest mb-4 text-foreground">{col.title}</div>
                  <ul className="space-y-3">
                    {col.links.map((link, i) => (
                      <li key={i}>
                        <Link href={col.hrefs[i]} className="text-sm text-muted-foreground hover:text-primary transition-colors">{link}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground text-center sm:text-left">
              © {new Date().getFullYear()} Medical Nexus. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-xl">
              {["𝕏", "in", "f", "▶"].map((icon, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-muted-foreground hover:text-primary transition-colors text-base font-bold"
                >
                  {icon}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}