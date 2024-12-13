import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ContactUs from "./pages/ContactUs";
import ProtectedRoutes from "./context/ProtectedRoutes"

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
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";

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
            <Route path="/product-item/:productId" element={<ProductItem />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<ProtectedRoutes />}>
            
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile-edit" element={<EditProfile />} />
            </Route>            
            {/* <Route path="/equipments" element={<Equipments />} /> */}
            <Route path="/equipments" element={<Equipments />} />
            <Route path="/accessories" element={<Accessories />} />
            <Route path="/apparels" element={<Apparels />} />
            <Route path="/footWear" element={<FootWear />} />
            <Route path="/nutritionHealth" element={<NutritionHealth />} />
           
          </Routes>
        </main>

        {/* Footer */}
      </div>
    </Router>
  );
};

export default App;