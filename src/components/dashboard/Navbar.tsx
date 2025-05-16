"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle the menu for mobile view
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full bg-gray-800 text-white flex items-center justify-between p-4 shadow-md">
      {/* Logo Section */}
      <div className="flex items-center space-x-4">
        <Link href="/dashboard">
          <div className="text-2xl font-bold">My Dashboard</div>
        </Link>
      </div>

      {/* Desktop Navbar Links */}
      <nav className="hidden md:flex space-x-6 items-center">
        <Link href="/dashboard" className="hover:text-gray-300">
          Dashboard
        </Link>
        <Link href="/dashboard/users" className="hover:text-gray-300">
          Users
        </Link>
        <Link href="/dashboard/settings" className="hover:text-gray-300">
          Settings
        </Link>
        {/* Add other links as needed */}
      </nav>

      {/* User Actions & Mobile Menu */}
      <div className="flex items-center space-x-4">
        <div className="relative">
          {/* User profile icon or notifications */}
          <button className="text-gray-300 hover:text-gray-100">👤</button>
        </div>

        {/* Mobile Hamburger Icon */}
        <button className="md:hidden text-white" onClick={toggleMenu}>
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-0 left-0 w-full bg-gray-800 text-white p-4 space-y-4">
          <Link href="/dashboard" className="block hover:text-gray-300">
            Dashboard
          </Link>
          <Link href="/dashboard/users" className="block hover:text-gray-300">
            Users
          </Link>
          <Link
            href="/dashboard/settings"
            className="block hover:text-gray-300"
          >
            Settings
          </Link>
          {/* Add other links as needed */}
        </div>
      )}
    </header>
  );
};

export default Navbar;
