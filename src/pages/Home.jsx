// pages/Home.jsx
import React from "react";
import Navbar from "../components/Navbar";
import BannerCarousel from "../components/BannerCarousel";
import ServicesProvided from "../components/ServicesProvided";
import MostPopularServices from "../components/MostPopularServices";

export default function Home() {
  return (
    <div className="min-h-screen font-worksans bg-white">
      <Navbar />
      <main className="p-4">
        <BannerCarousel />
        <ServicesProvided />
        <MostPopularServices />
      </main>
    </div>
  );
}
