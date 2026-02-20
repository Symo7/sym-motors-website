import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://symmotors.co.ke"),
  title: {
    default: "SYM MOTORS | Premium Cars for Sale & Hire",
    template: "%s | SYM MOTORS"
  },
  description: "SYM MOTORS offers premium cars for sale and rental in Nairobi, Nakuru, Kisii, and Kisumu.",
  openGraph: {
    title: "SYM MOTORS",
    description: "Cars for sale and car hire in Kenya.",
    type: "website",
    url: "https://symmotors.co.ke"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
