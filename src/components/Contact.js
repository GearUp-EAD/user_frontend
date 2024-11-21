import React, { useState } from "react";
import { motion } from "framer-motion";
import { GiCrossMark } from "react-icons/gi";
import emailjs from "emailjs-com"; 
import contactImage from "../assets/img/contactImage.jpeg";

const Contact = ({ isVisible, setIsVisible }) => {
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
      .send(
        "service_bhprfrt", 
        "template_23qntpg", 
        inputs,
        "BOC-44GXnTcSLL6nR" 
      )
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

  const handleToggle = () => {
    setIsVisible(false);
  };

  return (
    isVisible && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      >
        <motion.div
          initial={{ y: "-100vh" }}
          animate={{ y: "0" }}
          exit={{ y: "-100vh" }}
          transition={{ type: "spring", stiffness: 100 }}
          className="relative bg-white rounded-lg shadow-lg w-11/12 max-w-3xl flex flex-row"
        >
          {/* Close Button */}
          <button
            onClick={handleToggle}
            className="absolute top-4 right-4 text-black text-2xl z-50"
          >
            <GiCrossMark />
          </button>

          {/* Contact Form */}
          <div className="w-full md:w-7/12 p-6 bg-[#F2F2F2]">
            <h2 className="text-4xl mb-4 mt-7 text-center text-[#543310]">
              CONTACT US
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Input */}
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={inputs.name}
                  onChange={handleInputChange}
                  className={`w-full p-3 bg-[#E5E5E5] rounded-lg focus:outline-none focus:ring text-base ${
                    errors.name ? "ring-red-500" : "ring-blue-500"
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
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
                  className={`w-full p-3 bg-[#E5E5E5] rounded-lg focus:outline-none focus:ring text-base ${
                    errors.email ? "ring-red-500" : "ring-blue-500"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Message Input */}
              <textarea
                name="message"
                placeholder="Your Comment"
                value={inputs.message}
                onChange={handleInputChange}
                rows="4"
                className="w-full p-3 bg-[#E5E5E5] rounded-lg focus:outline-none focus:ring focus:ring-blue-500 text-base"
              />

              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="px-10 py-2 bg-[#74512D] text-white text-base rounded-lg hover:bg-opacity-90 transition-all"
                >
                  SUBMIT
                </button>
              </div>
            </form>
          </div>

          {/* Image Section */}
          <div className="hidden md:block w-5/12 bg-cover bg-center relative">
            <img
              src={contactImage}
              alt="Contact"
              className="w-full h-full object-cover rounded-r-lg"
            />
          </div>
        </motion.div>
      </motion.div>
    )
  );
};

export default Contact;
