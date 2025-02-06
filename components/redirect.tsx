"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export const Redirect = () => {
  const router = useRouter();
  const { user, isLoaded,isSignedIn } = useUser();

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) return;
    
    const isNewUser = user?.unsafeMetadata?.isNewUser ?? true;
    const isDoctor = user?.publicMetadata?.isDoc ?? false;

    if (isDoctor) {
      router.replace("/dashboard/doctor");
    } else if (isNewUser) {
      router.replace("/entry");
    } else {
      router.replace("/dashboard/patient");
    }
  }, [isLoaded,isSignedIn, user, router]);


  return null;
};
