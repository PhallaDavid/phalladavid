import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { DotPattern } from "@/components/ui/dot-pattern";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Phalla David - Software Developer",
  description: "Software Developer",
  icons: {
    icon: [{ url: "/len/E5A3DC0A-CD3E-4464-BFF1-75613D346D6D_1_105_c.jpeg", type: "image/png" }],
    shortcut: ["/len/E5A3DC0A-CD3E-4464-BFF1-75613D346D6D_1_105_c.jpeg"],
    apple: [{ url: "/len/E5A3DC0A-CD3E-4464-BFF1-75613D346D6D_1_105_c.jpeg", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col relative bg-zinc-50 dark:bg-[#0b0b0c]">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <DotPattern
            width={20}
            height={20}
            cx={1}
            cy={1}
            cr={1}
            className="fixed inset-0 z-0 h-full w-full opacity-40 dark:opacity-30 [mask-image:radial-gradient(800px_circle_at_center,white,transparent)] pointer-events-none"
          />
          <div className="relative z-10 flex-1 flex flex-col">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

