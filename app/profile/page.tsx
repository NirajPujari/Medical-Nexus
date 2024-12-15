"use client";
import { UserProfile } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
	const router = useRouter();
	return (
		<div className="flex justify-center items-center">
			<div
				className="absolute left-0 top-0 w-screen h-screen bg-black bg-opacity-30"
				onClick={router.back}
			></div>
			<UserProfile
				appearance={{
					variables: {
						colorPrimary: "#002b5b",
						colorBackground: "#e6f4fa",
						colorTextSecondary: "#004f8a",
						colorText: "#002b5b",
						colorNeutral: "#004f8a",
					},
				}}
				routing="hash"
			/>
		</div>
	);
}
