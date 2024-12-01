import React, { useState } from "react";
import login from "../assets/images/login.jpg";
import { MdOutlineAlternateEmail, MdOutlineRemoveRedEye } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import GoogleLogin from "../components/social/GoogleLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Validation function
  const validate = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Proceed with form submission
      console.log("Form Submitted:", { email, password });
      navigate("/"); 
    }
  };

  return (
    <div>
      <div className="flex flex-row">
        <div className="flex flex-col object-contain">
          <img src={login} className="rounded-lg" alt="Login Visual" />
        </div>

        <div className="mx-auto max-w-lg mb-0 mt-20 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 w-[50vh] h-[60vh] my-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="text-center mb-8">
              <h1 className="font-poppins font-bold text-4xl">Sign In</h1>
              <p className="font-poppins text-sm">
                Shop the best of Sports Items, Grab the deals, offers and more.
              </p>
            </div>

            {/* Email Input */}
            <div className="relative">
              <label htmlFor="email" className="text-sm font-medium text-gray-600">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="johndoe@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full border outline-none rounded-lg p-4 text-sm shadow-sm ${
                  errors.email ? "border-red-500" : "border-gray-200"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <MdOutlineAlternateEmail className="h-4 w-4 text-gray-400" />
              </span>
            </div>

            {/* Password Input */}
            <div className="relative">
              <label htmlFor="password" className="text-sm font-medium text-gray-600">
                Password
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full border outline-none rounded-lg p-4 text-sm shadow-sm ${
                  errors.password ? "border-red-500" : "border-gray-200"
                }`}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 end-0 grid place-content-center px-4 cursor-pointer"
              >
                <MdOutlineRemoveRedEye className="h-4 w-4 text-gray-400" />
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="block w-full rounded-lg bg-brown-800 px-5 py-3 text-sm font-medium text-white hover:bg-brown-600"
            >
              Sign In
            </button>
          </form>
          <GoogleLogin />
          <p className="text-center text-sm text-bg-brown-500 mt-4">
            No Account?{" "}
            <Link className="underline" to="/register">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
