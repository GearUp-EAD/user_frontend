import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ContactUs from "./pages/ContactUs";

import Navbar from "./components/Navbar/Navbar";

import CartPage from "./pages/Cart";
import ProductItem from "./pages/ProductItem";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Equipments from "./pages/Equipments";
import Accessories from "./pages/Accessories";
import Apparels from "./pages/Apparels";
import FootWear from "./pages/Footwear";
import NutritionHealth from "./pages/NutritionHealth";
import EditProfile from "./pages/EditProfile";
import Profile from "./pages/Profile";

const App = () => {
  const [isVisible, setIsVisible] = useState(false); // State for visibility toggle

  return (
    <Router>
      {/* Overall Layout */}
      <div className="flex flex-col min-h-screen">
        {/* Header */}

        {/* Main Content */}
        <main className="flex-grow">
          <Routes>
            {/* Pass props to Home */}
            <Route
              path="/"
              element={
                <Home isVisible={isVisible} setIsVisible={setIsVisible} />
              }
            />
            <Route path="/contact-us" element={<ContactUs />} />

            <Route path="/cart" element={<CartPage />} />
            <Route path="/product-item" element={<ProductItem />} />
          </Routes>
        </main>

        {/* Footer */}
      </div>
    </Router>
  );
};

export default App;
