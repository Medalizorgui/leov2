"use client";
import { usePathname } from "next/navigation";
import { NavBar } from "@/components/nav-buttons";

export default function ClientNavBarWrapper() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  return <NavBar />;
} 