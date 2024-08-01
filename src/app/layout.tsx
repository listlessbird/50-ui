import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar, SidebarStateContextProvider } from "@/components/navbar";
import { Wrapper } from "@/app/wrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "50 days of ui",
  description:
    "i make a ui component every day for 50 days with cool animations and all",
};

const navItems = [
  {
    label: "Accordion",
    href: "/accordion",
  },
  {
    label: "game-list",
    href: "game-list",
  },
  {
    label: "time-picker-compact",
    href: "time-picker-compact",
  },
  {
    label: "feedback-popover",
    href: "feedback-popover",
  },
  {
    label: "shiny button",
    href: "shiny-button",
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex">
          <SidebarStateContextProvider>
            <Navbar items={navItems} />
            <div className="grow">
              <Wrapper>{children}</Wrapper>
            </div>
          </SidebarStateContextProvider>
        </div>
      </body>
    </html>
  );
}
