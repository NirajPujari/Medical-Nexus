import { SignUp } from "@clerk/nextjs";

export default function Home() {
	return (
		<div className="flex justify-center items-center h-screen">
			<SignUp
				appearance={{
					variables: {
						colorPrimary: "#002b5b",
						colorBackground: "#e6f4fa",
						colorText: "#002b5b",
						colorTextSecondary: "#004f8a",
						colorNeutral: "#004f8a",
					},

					elements: {
						// Container size
						cardBox: "w-[550px] shadow-md flex justify-center",
						card: "w-[550px] border",
						// Header (title and subtitle)
						headerTitle: "text-3xl font-bold",
						headerSubtitle: "text-base text-[#004f8a]",
						// Buttons
						primaryButton: "py-3 px-4 text-lg font-semibold",
						secondaryButton: "py-2 px-3 text-sm",
						// Input fields
						formFieldInput: "h-12 text-base px-3",
						formFieldLabel: "text-sm font-medium text-[#004f8a]",
						formFieldErrorText: "text-xs text-red-500",
						// Social buttons
						socialButtonsBlockButton: "py-3 text-sm",
						socialButtonsIconButton: "p-3",
						// Footer links
						footerActionLink: "text-sm text-[#004f8a] underline",
						footer: "rounded-b-xl justify-end",
					},
				}}
				routing="hash"
				forceRedirectUrl="/"
				signInUrl="/login"
			/>
		</div>
	);
}
