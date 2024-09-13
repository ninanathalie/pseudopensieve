import type { Metadata } from "next";
import "@/styles/globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ThemeContextProvider from "@/context/theme-context";

export const metadata: Metadata = {
  title: "Letters Of Nathalie - A Sanctuary Of My Daily Musings",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeContextProvider>
          <div className="flex flex-col min-h-screen bg-grid-small-neutral-400/[0.2] relative font-polysans-thin dark:text-neutral-100 dark:bg-slate-900 overflow-x-hidden">
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-white dark:bg-slate-900 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

            <Header />
            {children}
            <Footer />
          </div>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
