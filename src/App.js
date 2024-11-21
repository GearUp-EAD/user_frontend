import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ContactUs from "./pages/ContactUs";

const App = () => {
  const [isVisible, setIsVisible] = useState(false); // State for visibility toggle

  return (
    <Router>
      {/* Overall Layout */}
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <Header />

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
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
