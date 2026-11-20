import type { Metadata } from "next";
import LandingPage from "@/components/landing/landing-page";

export const metadata: Metadata = {
  title: "Inventra | Manajemen Inventaris",
  description:
    "Inventra membantu pengelolaan data barang, stok masuk, stok keluar, dan riwayat inventaris dalam satu sistem.",
};

export default function Home() {
  return <LandingPage />;
}
