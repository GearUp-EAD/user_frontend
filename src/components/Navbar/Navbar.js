import React, { useState } from "react";
import { FiSearch, FiBell, FiShoppingCart, FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";
import Logo from "./ead_Logo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-[#fef08a] shadow-md"> {/* Updated background color */}
      {/* Top Section */}
      <div className="flex items-center justify-between px-4 py-1.5"> {/* Reduced padding */}
        {/* Logo and Text */}
        <div className="flex items-center space-x-2">
          <img src={Logo} className="w-14 h-14" alt="GearUp Logo" /> {/* Reduced logo size */}
          <span className="font-bold text-2xl text-brown-700">GearUp</span> {/* Slightly smaller font size */}
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="border border-gray-300 rounded-full px-4 py-2 pl-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <FiSearch className="absolute top-2.5 left-3 text-gray-500" />
          </div>

          {/* Icons */}
          <FiBell className="text-gray-700 w-5 h-5 hover:text-gray-900" /> {/* Smaller icon size */}
          <FiShoppingCart className="text-gray-700 w-5 h-5 hover:text-gray-900" /> {/* Smaller icon size */}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-700 ml-4"
        >
          <FiMenu className="w-5 h-5" /> {/* Smaller icon size */}
        </button>
      </div>

      {/* Bottom Navigation */}
      <div className="hidden md:flex justify-center bg-[#fef08a] py-1"> {/* Reduced padding */}
        <nav className="flex space-x-6 text-gray-700 font-medium text-lg">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/equipments" className="hover:underline">
            Equipments
          </Link>
          <Link to="/apperals" className="hover:underline">
            Apparels
          </Link>
          <Link to="/footwear" className="hover:underline">
            Footwear
          </Link>
          <Link to="/accessories" className="hover:underline">
            Accessories
          </Link>
          <Link to="/nutritionHealth" className="hover:underline">
            Nutrition & Health
          </Link>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-[#FDF8EC] p-6 shadow-lg">
          <nav className="space-y-4">
            <Link to="/" className="block text-gray-700 hover:underline">
              Home
            </Link>
            <Link to="/equipments" className="block text-gray-700 hover:underline">
              Equipments
            </Link>
            <Link to="/apperals" className="block text-gray-700 hover:underline">
              Apparels
            </Link>
            <Link to="/footwear" className="block text-gray-700 hover:underline">
              Footwear
            </Link>
            <Link to="/accessories" className="block text-gray-700 hover:underline">
              Accessories
            </Link>
            <Link to="/nutritionHealth" className="block text-gray-700 hover:underline">
              Nutrition & Health
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
