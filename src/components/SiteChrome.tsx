"use client";

import { usePathname } from "next/navigation";
import Preloader from "./Preloader";
import CursorGlow from "./CursorGlow";
import Navbar from "./Navbar";
import EmergencyBar from "./EmergencyBar";
import Footer from "./Footer";

// The public site (navbar, footer, preloader, emergency bar, cursor glow)
// should not appear on /admin — that's a separate internal tool with its
// own header. This wrapper checks the route and skips all of that chrome
// for anything under /admin.
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Preloader />
      <CursorGlow />
      <Navbar />
      <main>{children}</main>
      <EmergencyBar />
      <Footer />
    </>
  );
}
