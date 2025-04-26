"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ResourceFormPopup from "@/components/ResourceFormPopup";
import ResourceList from "@/components/ResourceList";

// Navbar Component
function Navbar() {
  return (
    <div className="w-full px-4 pt-6 sm:pt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center sm:max-w-[85%] mx-auto font-serif">
      <div className="flex items-center justify-center gap-2 mb-4 sm:mb-0">
        <img
          width="60"
          height="60"
          src="https://img.icons8.com/badges/48/hammer-and-anvil.png"
          alt="hammer-and-anvil"
        />
        <h1 className="font-extrabold text-3xl sm:text-5xl">Hadeed</h1>
      </div>
      {/* Only show links on desktop */}
      <ul className="hidden sm:flex sm:flex-row items-center gap-10 text-lg">
        <li>
          <Link href="/about" className="text-black hover:text-gray-500">
            About
          </Link>
        </li>
        <li>
          <Link href="/resources" className="text-black hover:text-gray-500">
            Resources
          </Link>
        </li>
        <li>
          <Link href="/reflections" className="text-black hover:text-gray-500">
            Reflections
          </Link>
        </li>
      </ul>
    </div>
  );
}

// Hero Component
function Hero({ onOpenForm }) {
  return (
    <div className="flex flex-col justify-center items-center text-center font-mono w-full px-4 sm:max-w-[75%] mx-auto min-h-[60vh] sm:min-h-0 pt-10 relative">
      <h1 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6">
        An Open Source Library to Forge Stronger Muslims
      </h1>
      <h3 className="text-lg sm:text-2xl max-w-[95%] sm:max-w-[90%] mb-6 sm:mb-8">
        A growing library of reflections and resources from Muslim brothers
        striving to live with purpose – through the lens of Islam.
      </h3>
      <button
        onClick={onOpenForm}
        className="text-base sm:text-lg bg-white border-2 border-black cursor-pointer transition duration-300 ease-in-out hover:scale-105 py-2 px-6 sm:p-3 font-serif"
      >
        + Share a Reflection or Resource
      </button>
    </div>
  );
}

// Main Page Component
export default function Home() {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const openForm = () => setIsFormVisible(true);
  const closeForm = () => setIsFormVisible(false);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-300 to-white">
      <Navbar />
      <div className="flex-grow px-4 sm:px-8 py-6 sm:py-10">
        <Hero onOpenForm={openForm} />
        {/* "Peeking" Resource List */}
        <div className="w-full sm:max-w-[85%] mx-auto mt-12 sm:mt-8">
          <h2 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-6 font-serif">
            Recent Shared Resources
          </h2>
          <ResourceList />
        </div>
      </div>
      <footer className="mt-auto text-center p-4 bg-gray-100 border-t border-gray-300 font-serif text-sm sm:text-base">
        Powered by Taqwa &copy; {new Date().getFullYear()} Hadeed Institute. All
        Rights Reserved
      </footer>
      <ResourceFormPopup isVisible={isFormVisible} onClose={closeForm} />
    </div>
  );
}
