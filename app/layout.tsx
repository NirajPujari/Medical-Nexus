import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Medical Nexus | Coming Soon",
  description: "We are launching soon.",
};

const isProd = process.env.NODE_ENV === "production";

function ComingSoon() {
  return (
    <div className="flex flex-1 items-center justify-center bg-background text-foreground">
      <div className="text-center px-6">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Medical Nexus
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Advanced Care, Human Touch
        </p>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold">Coming Soon</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            We’re building something powerful. Stay tuned.
          </p>
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <input
            placeholder="Enter your email"
            className="px-4 py-2 rounded-md border bg-background"
          />
          <button className="px-6 py-2 rounded-md bg-primary text-primary-foreground">
            Notify Me
          </button>
        </div>
      </div>
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("h-full antialiased", "font-sans", inter.variable)}
    >
      <body className="min-h-dvh flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {isProd ? (
            <ComingSoon />
          ) : (
            <>
              <Navbar />
              {children}
              <Footer />
            </>
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}