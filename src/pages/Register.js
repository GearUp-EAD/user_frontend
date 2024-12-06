import React, { useState } from "react";
import login from "../assets/images/login.jpg";
import { MdOutlineAlternateEmail, MdOutlineMap, MdOutlineRemoveRedEye } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import GoogleLogin from "../components/social/GoogleLogin";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};

    // Validate email
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid.";
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    // Validate confirm password
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    // Validate address
    if (!formData.address) {
      newErrors.address = "Address is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form submitted:", formData);
      navigate("/"); // Navigate to the home page on success
    }
  };

  return (
    <div>
      <div className="flex flex-row">
        <div className="flex flex-col object-contain">
          <img src={login} className="rounded-lg" alt="Login" />
        </div>

        <div className="mx-auto max-w-lg mb-0 mt-20 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 w-[50vh] h-[75vh] my-10">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3 mb-10 p-5 items-center justify-center">
              <h1 className="text-center font-poppins font-bold text-4xl justify-center">
                Register
              </h1>
              <p className="text-center font-poppins text-sm">
                Shop the best of Sports Items, Grab the deals, offers and more.
              </p>
            </div>
            {/* Email Field */}
            <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-600">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="johndoe@gmail.com"
                  className="w-full border outline-none rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                />
                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <MdOutlineAlternateEmail className="h-4 w-4 text-gray-400" />
                </span>
              </div>
              {errors.email && <p  className="text-red-500 text-xs">{errors.email}</p>}
            </div>
            {/* Password Field */}
            <div>
              <label htmlFor="password" className="text-sm font-medium text-gray-600">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className="w-full border outline-none rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 end-0 grid place-content-center px-4 cursor-pointer"
                >
                  <MdOutlineRemoveRedEye className="h-4 w-4 text-gray-400" />
                </span>
              </div>
              {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
            </div>
            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-600">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  className="w-full border outline-none rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 end-0 grid place-content-center px-4 cursor-pointer"
                >
                  <MdOutlineRemoveRedEye className="h-4 w-4 text-gray-400" />
                </span>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
              )}
            </div>
            {/* Address Field */}
            <div>
              <label htmlFor="address" className="text-sm font-medium text-gray-600">
                Enter Shipping Address
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="27/11, Moratuwa , Katubedda"
                  className="w-full border outline-none rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                />
                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <MdOutlineMap className="h-4 w-4 text-gray-400" />
                </span>
              </div>
              {errors.address && <p className="text-red-500 text-xs">{errors.address}</p>}
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="block w-full rounded-lg bg-brown-800 px-5 py-3 text-sm font-medium text-white mt-4 items-center hover:bg-brown-00"
            >
              Register
            </button>
          </form>
          <p className=" text-center text-sm text-brown-500 mt-4">
            Already Have An Account?{" "}
            <Link className="underline text-secondary" to="/login">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
