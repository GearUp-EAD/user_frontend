import React, { useState } from "react";
import emailjs from "emailjs-com";
import contactImage from "../assets/images/contactImage.jpg";
import Footer from "../components/Footer";
import Header from "../components/Header";

const ContactUs = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const validateInputs = () => {
    let hasError = false;
    const newErrors = {
      name: "",
      email: "",
    };

    if (!inputs.name.trim()) {
      newErrors.name = "Name is required.";
      hasError = true;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inputs.email)) {
      newErrors.email = "Valid email is required.";
      hasError = true;
    }

    setErrors(newErrors);
    return !hasError;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    emailjs
      .send("service_bhprfrt", "template_23qntpg", inputs, "BOC-44GXnTcSLL6nR")
      .then(
        () => {
          alert("Message sent successfully!");
          setInputs({ name: "", email: "", message: "" });
        },
        (error) => {
          console.error("Failed to send message:", error);
          alert("Message failed to send. Please try again.");
        }
      );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <div className="flex flex-col md:flex-row min-h-[90vh] m-12">
        {/* Contact Form Section */}
        <div
          className="w-full md:w-6/12 p-8 lg:p-16 bg-[#F2F2F2] flex flex-col justify-center shadow-md "
          style={{ height: "auto" }}
        >
          <h2 className="text-4xl font-bold mb-8 text-center text-[#543310]">
            CONTACT US
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={inputs.name}
                onChange={handleInputChange}
                className={`w-full p-4 bg-[#E5E5E5] border border-gray-300 focus:outline-none focus:ring ${
                  errors.name ? "ring-red-500" : "ring-[#74512D]"
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-2">{errors.name}</p>
              )}
            </div>

            {/* Email Input */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={inputs.email}
                onChange={handleInputChange}
                className={`w-full p-4 bg-[#E5E5E5] border border-gray-300 focus:outline-none focus:ring ${
                  errors.email ? "ring-red-500" : "ring-[#74512D]"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-2">{errors.email}</p>
              )}
            </div>

            {/* Message Input */}
            <textarea
              name="message"
              placeholder="Your Comment"
              value={inputs.message}
              onChange={handleInputChange}
              rows="6"
              className="w-full p-4 bg-[#E5E5E5] border border-gray-300 focus:outline-none focus:ring focus:ring-[#74512D]"
            />

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-10 py-3 bg-[#74512D] text-white font-semibold rounded-md hover:bg-opacity-90 transition-all"
              >
                SUBMIT
              </button>
            </div>
          </form>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-6/12">
          <img
            src={contactImage}
            alt="Contact"
            className="w-full h-full object-cover"
            style={{ height: "100%" }}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;
