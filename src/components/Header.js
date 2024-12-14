import React, { useState } from "react";
import { FiSearch, FiBell, FiShoppingCart, FiMenu } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/images/ead_Logo.png";
import { login, logout } from "../context/ProtectedRoutes";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-[#F8F4E1] shadow-md">
      {" "}
      {/* Updated background color */}
      {/* Top Section */}
      <div className="flex items-center justify-between px-4 py-1.5">
        {" "}
        {/* Reduced padding */}
        {/* Logo and Text */}
        <div className="flex items-center space-x-2">
          <img src={Logo} className="w-18 h-16" alt="GearUp Logo" />
          {/* Reduced logo size */}
          <span className="font-bold text-xl text-brown-700">
            <span className="text-[#AF8F6F]">Gear</span>Up
          </span>
          {/* Slightly smaller font size */}
        </div>
        {/* Right Section */}
        <div>
          <button 
            className="mt-6 px-6 py-2 bg-brown-500 text-white font-semibold rounded hover:bg-brown-600"
            onClick={login}>
            Login
          </button>
          <button 
            className="mt-6 px-6 py-2 bg-brown-500 text-white font-semibold rounded hover:bg-brown-600"
            onClick={logout}>
            Logout
          </button>
        </div>
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
          <FiBell className="text-gray-700 w-5 h-5 hover:text-gray-900" />{" "}
          {/* Smaller icon size */}
          <FiShoppingCart
            className="text-gray-700 w-5 h-5 hover:text-gray-900"
            onClick={() => navigate("../cart")}
          />{" "}
          {/* Smaller icon size */}
        </div>
        {/* Mobile Menu Toggle */}
        <button onClick={toggleMenu} className="md:hidden text-gray-700 ml-4">
          <FiMenu className="w-5 h-5" /> {/* Smaller icon size */}
        </button>
      </div>
      {/* Bottom Navigation */}
      <div className="hidden md:flex justify-center bg-[#F8F4E1] py-1">
        {" "}
        {/* Reduced padding */}
        <nav className="flex space-x-8 text-gray-700 font-medium text-base font-poppins">
          <Link
            to="/"
            className="mr-12 hover:text-[#543310] hover:font-semibold transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/equipments"
            className="hover:text-[#543310] hover:font-semibold transition duration-300"
          >
            Equipments
          </Link>
          <Link
            to="/apparels"
            className="hover:text-[#543310] hover:font-semibold transition duration-300"
          >
            Apparels
          </Link>
          <Link
            to="/footwear"
            className="hover:text-[#543310] hover:font-semibold transition duration-300"
          >
            Footwear
          </Link>
          <Link
            to="/accessories"
            className="hover:text-[#543310] hover:font-semibold transition duration-300"
          >
            Accessories
          </Link>
          <Link
            to="/nutritionHealth"
            className="hover:text-[#543310] hover:font-semibold transition duration-300"
          >
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
            <Link
              to="/equipments"
              className="block text-gray-700 hover:underline"
            >
              Equipments
            </Link>
            <Link
              to="/apperals"
              className="block text-gray-700 hover:underline"
            >
              Apparels
            </Link>
            <Link
              to="/footwear"
              className="block text-gray-700 hover:underline"
            >
              Footwear
            </Link>
            <Link
              to="/accessories"
              className="block text-gray-700 hover:underline"
            >
              Accessories
            </Link>
            <Link
              to="/nutritionHealth"
              className="block text-gray-700 hover:underline"
            >
              Nutrition & Health
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;