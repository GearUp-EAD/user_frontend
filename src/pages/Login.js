import React, { useState } from "react";
import login from "../assets/images/login.jpg";
import { MdOutlineAlternateEmail, MdOutlineRemoveRedEye } from "react-icons/md";
import { Link } from "react-router-dom";
import GoogleLogin from "../components/social/GoogleLogin";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <div className=" flex flex-row ">
        <div className=" flex flex-col  object-contain">
          <img src={login} className=" rounded-lg" />
        </div>

        <div className=" mx-auto max-w-lg mb-0 mt-20 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 w-[50vh] h-[60vh] my-10">
          <form className=" space-y-4">
            <div className=" flex flex-col gap-3 mb-10 p-5 items-center  justify-center">
              <h1 className=" text-center font-poppins font-bold text-4xl justify-center">
                Sign In
              </h1>
              <p className=" text-center font-poppins text-sm ">
                Shop the best of Sports Items, Grab the deals, offers and more.
              </p>
            </div>

            <div>
              <label htmlFor="email" className=" sr-only">
                Email
              </label>
              <div className=" relative">
                <input
                  type=" email"
                  name="email"
                  placeholder="Enter Email"
                  className=" w-full border outline-none rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm "
                />
                <span className=" absolute inset-y-0 end-0 grid place-content-center px-4">
                  <MdOutlineAlternateEmail className=" h-4 w-4 text-gray-400" />
                </span>
              </div>
            </div>
            {/* password */}
            <div>
              <label htmlFor="password" className=" sr-only">
                Password
              </label>
              <div className=" relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter password"
                  className=" w-full border outline-none rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm "
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className=" absolute inset-y-0 end-0 grid place-content-center px-4 cursor-pointer"
                >
                  <MdOutlineRemoveRedEye className=" h-4 w-4 text-gray-400" />
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="block w-full rounded-lg bg-brown-800 px-5 py-3 text-sm font-medium text-white mt-4 items-center "
            >
              Sign In
            </button>
          </form>
          <GoogleLogin />
          <p className=" text-center text-sm text-gray-500">
            No Account?{" "}
            <Link className="underline text-secondary" to="/register">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
