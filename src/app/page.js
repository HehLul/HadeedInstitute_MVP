"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ResourceFormPopup from "@/components/ResourceFormPopup";
import ResourceList from "@/components/ResourceList";

// Navbar Component
function Navbar() {
  return (
    <div className="max-w-[85%] mx-auto pt-4 flex justify-between items-center gap-60 font-serif">
      <div className="flex items-center gap-1">
        <img
          width="68"
          height="68"
          src="https://img.icons8.com/badges/48/hammer-and-anvil.png"
          alt="hammer-and-anvil"
          className="mb-5"
        />
        <h1 className="font-extrabold text-5xl">Hadeed</h1>
      </div>
      <ul className="flex gap-10">
        <li className="cursor-pointer text-lg">
          <Link href="/about" className="text-black hover:text-gray-500">
            About
          </Link>
        </li>
        <li className="cursor-pointer text-lg">
          <Link href="/resources" className="text-black hover:text-gray-500">
            Resources
          </Link>
        </li>
        <li className="cursor-pointer text-lg">
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
    <div className="flex flex-col justify-center items-center text-center font-mono max-w-[75%] mx-auto">
      <h1 className="text-4xl font-bold mb-4">
        An Open Source Library to Forge Stronger Muslims
      </h1>
      <h3 className="text-xl max-w-[90%] mb-6">
        A growing library of reflections and resources from Muslim brothers
        striving to live with purpose - through the lens of Islam.
      </h3>
      <button
        onClick={onOpenForm}
        className="text-lg bg-white border-2 border-black cursor-pointer transition duration-300 ease-in-out hover:scale-110 py-3 px-6 font-serif"
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
      <div className="flex-grow flex items-center justify-center">
        <Hero onOpenForm={openForm} />
      </div>
      <div className="max-w-[85%] mx-auto mt-6">
        <h2 className="text-2xl font-bold mb-6 font-serif">
          Recent Shared Resources
        </h2>
        <ResourceList />
      </div>
      <footer className="mt-auto text-center p-4 bg-gray-100 border-t border-gray-300 font-serif">
        Powered by Taqwa &copy; {new Date().getFullYear()} Hadeed Institute. All
        Rights Reserved
      </footer>
      {/* Resource Form Popup */}
      <ResourceFormPopup isVisible={isFormVisible} onClose={closeForm} />
    </div>
  );
}
