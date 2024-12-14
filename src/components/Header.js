import React, { useEffect, useState } from "react";
import { FiSearch, FiBell, FiShoppingCart, FiMenu, FiUser } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { keycloak, login, logout } from "../context/ProtectedRoutes";
import Logo from "../assets/images/ead_Logo.png";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(keycloak.authenticated);
  const [userName, setUserName] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const initializeKeycloak = async () => {
      try {
        await keycloak.init({ 
          onLoad: 'login-required', 
          // redirectUri: 'http://localhost:3000/CheckUser' 
        });
        if (keycloak.authenticated) {
          console.log('User authenticated');
          localStorage.setItem('access-token', keycloak.token);
          localStorage.setItem('refresh-token', keycloak.refreshToken);
          setIsAuthenticated(true);
          setUserName(keycloak.tokenParsed?.preferred_username || "User");

          
        } else {
          console.warn('Authentication failed');
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Keycloak initialization failed:', error);
      }
    };
  
    initializeKeycloak();
  }, []);
  

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLoginLogout = async () => {
    if (isAuthenticated) {
      await logout();
      setIsAuthenticated(false);
      setUserName("");
    } else {
      const success = await login();
      if (success) {
        setIsAuthenticated(true);
        setUserName(keycloak.tokenParsed?.preferred_username || "User");
      }
    }
  };

  return (
    <header className="bg-[#F8F4E1] shadow-md">
      <div className="flex items-center justify-between px-4 py-1.5">
        {/* Logo and Text */}
        <div className="flex items-center space-x-2">
          <img src={Logo} className="w-18 h-16" alt="GearUp Logo" />
          <span className="font-bold text-xl text-brown-700">
            <span className="text-[#AF8F6F]">Elite</span>Gear
          </span>
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
          <FiBell className="text-gray-700 w-5 h-5 hover:text-gray-900" />
          <FiShoppingCart
            className="text-gray-700 w-5 h-5 hover:text-gray-900"
            onClick={() => navigate("../cart")}
          />

          {/* Conditional Rendering */}
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <FiUser
                  className="text-gray-700 w-6 h-6 hover:text-gray-900 cursor-pointer"
                  onClick={() => navigate("/profile")}
                />
                <span className="text-sm text-gray-700 ml-2">{userName}</span>
              </div>
              <button
                className="px-6 py-2 bg-brown-500 text-white font-semibold rounded hover:bg-brown-600"
                onClick={handleLoginLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              className="px-6 py-2 bg-brown-500 text-white font-semibold rounded hover:bg-brown-600"
              onClick={handleLoginLogout}
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button onClick={toggleMenu} className="md:hidden text-gray-700 ml-4">
          <FiMenu className="w-5 h-5" />
        </button>
      </div>

      {/* Bottom Navigation */}
      <div className="hidden md:flex justify-center bg-[#F8F4E1] py-1">
        <nav className="flex space-x-8 text-gray-700 font-medium text-base font-poppins">
          <Link to="/" className="mr-12 hover:text-[#543310] hover:font-semibold transition duration-300">
            Home
          </Link>
          <Link to="/equipments" className="hover:text-[#543310] hover:font-semibold transition duration-300">
            Equipments
          </Link>
          <Link to="/apparels" className="hover:text-[#543310] hover:font-semibold transition duration-300">
            Apparels
          </Link>
          <Link to="/footwear" className="hover:text-[#543310] hover:font-semibold transition duration-300">
            Footwear
          </Link>
          <Link to="/accessories" className="hover:text-[#543310] hover:font-semibold transition duration-300">
            Accessories
          </Link>
          <Link to="/nutritionHealth" className="hover:text-[#543310] hover:font-semibold transition duration-300">
            Nutrition & Health
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
