import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar, SidebarStateContextProvider } from "@/components/navbar";
import { Wrapper } from "@/app/wrapper";
import fs from "fs/promises";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const t = await buildNav();
  // console.log(t);
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex">
          <SidebarStateContextProvider>
            <Navbar items={t} />
            <div className="grow">
              <Wrapper>{children}</Wrapper>
            </div>
          </SidebarStateContextProvider>
        </div>
      </body>
    </html>
  );
}

async function buildNav() {
  const dirs = (await fs.readdir("./src/app/", { withFileTypes: true })).filter(
    (f) => f.isDirectory()
  );

  const dirnames = dirs.map((d) => d.name);

  return dirnames.map((d) => ({ label: d, href: d }));
}
