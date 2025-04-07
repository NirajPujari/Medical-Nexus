"use client";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";

export default function Home() {
  const router = useRouter();
  const { user, isLoaded,isSignedIn } = useUser();

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) return;
    
    const isNewUser = user?.unsafeMetadata?.isNewUser ?? true;
    const isDoctor = user?.publicMetadata?.isDoc ?? false;

    router.replace("/entry");

    if (isDoctor) {
      router.replace("/dashboard/doctor");
    } else if (isNewUser) {
      router.replace("/entry");
    } else {
      router.replace("/dashboard/patient");
    }
  }, [isLoaded,isSignedIn, user, router]);

  return (
    <div className="relative flex h-screen w-screen items-center justify-center bg-primary">
      {/* Background Image */}
      <Image
        src="/images/background/background.jpg"
        alt="background"
        fill
        priority
        className="absolute left-0 top-0 h-screen w-screen opacity-40"
      />

      {/* Redirecting Animation */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-20 text-center text-highlight2 text-lg font-semibold"
      >
        Redirecting...
      </motion.div>
    </div>
  );
}
