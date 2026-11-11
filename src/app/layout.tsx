import "./globals.css";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Header } from "@/components/ui/header";
import FooterInteractive from "@/components/ui/footer-interactive";
import { StaticDotGrid } from "@/components/ui/static-dot-grid";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata = {
  title: "CampusCode — Evidence-Based Engineering Profiles",
  description: "AI-Powered student codebase portfolio & architecture analyzer. Extract verifiable code evidence with line-level citations.",
  icons: {
    icon: "/assets/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${jetbrainsMono.variable} ${inter.variable}`}>
      <body className="relative isolate flex min-h-screen flex-col bg-black font-sans text-[13px] leading-relaxed text-[#ededed] antialiased selection:bg-white/20 selection:text-white">
        <StaticDotGrid />
        <Header />
        <main className="flex-1">{children}</main>
        <FooterInteractive />
      </body>
    </html>
  );
}
