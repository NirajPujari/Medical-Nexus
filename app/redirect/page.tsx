"use client"
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function Home() {
  const router = useRouter();
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded) return;

    // Check if user has metadata
    const isNewUser = user?.publicMetadata?.isNewUser ?? true;
    console.log(isNewUser)

    if (isNewUser) {
      router.replace("/entry");
    } else {
      router.replace("/"); // Redirect returning users to dashboard
    }
  }, [isLoaded, user, router]);

  return (
    <div className="relative h-screen w-screen">
      <Image
        src="/images/background/background.jpg"
        alt="background"
        fill
        priority
        className="absoulte left-0 top-0 z-10 h-screen w-screen opacity-40"
      />
      <div className="flex h-screen items-center justify-center">Redirecting...</div>
    </div>
  );
}
