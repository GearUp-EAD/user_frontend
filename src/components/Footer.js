import React from "react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-brown-900 text-white py-6">
      {/* Main Section */}
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-6 text-sm">
        {/* Products Section */}
        <div>
          <h3 className="font-bold text-base mb-3">PRODUCTS</h3>
          <ul>
            <li className="mb-1">Shoes</li>
            <li className="mb-1">Clothing</li>
            <li>Accessories</li>
          </ul>
        </div>

        {/* Category Section */}
        <div>
          <h3 className="font-bold text-base mb-3">Category</h3>
          <ul>
            <li className="mb-1">Men</li>
            <li className="mb-1">Women</li>
            <li className="mb-1">Kids</li>
            <li>Outlet</li>
          </ul>
        </div>

        {/* Help You Section */}
        <div>
          <h3 className="font-bold text-base mb-3">Help you</h3>
          <ul>
            <li className="mb-1">Return & Cancelation</li>
            <li className="mb-1">Membership</li>
            <li className="mb-1">Payments</li>
            <li className="mb-1">Account</li>
            <li>Shipping</li>
          </ul>
        </div>

        {/* Social Section */}
        <div>
          <h3 className="font-bold text-base mb-3">Social</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-400" aria-label="Facebook">
              <FaFacebookF size={20} />
            </a>
            <a href="#" className="hover:text-gray-400" aria-label="Instagram">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="hover:text-gray-400" aria-label="WhatsApp">
              <FaWhatsapp size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Contact and Mail Section */}
      <div className="container mx-auto px-6 mt-6 border-t border-gray-700 pt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div>
          <h3 className="font-bold text-base mb-2">Mail Us</h3>
          <p>gearup@gmail.com</p>
        </div>
        <div>
          <h3 className="font-bold text-base mb-2">
            <Link to="/contact-us">Contact Us</Link>
          </h3>
          <p>B-11 D.S.I.D.C Complex, F.I.E Patparganj Industrial Area</p>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center mt-4 text-xs text-gray-400">
        <p>© 2024 . All rights reserved.</p>
      </div>
    </footer>
  );

  return <div>Footer</div>;
};

export default Footer;
