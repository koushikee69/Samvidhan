import React, { useState } from "react";
import { FaGithub, FaGoogle, FaLinkedinIn } from "react-icons/fa";

import { auth, db } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

const Login = () => {
  const [isActive, setIsActive] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in Successfully");
      window.location.href = "/Homepage";
      toast.success("User logged in Successfully", {
        position: "top-center",
      });
    } catch (error) {
      console.log(error.message);

      toast.error("User don't exists/Invalid credentials ", {
        position: "bottom-center",
      });
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: name,
        });
      }
      console.log("User Registered Successfully!!");
      toast.success("User Registered Successfully!!", {
        position: "top-center",
      });
      window.location.href = "/Homepage";
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#4345c2] to-[#252e4a]">
      <div className="relative w-full max-w-[900px] min-h-[500px] bg-white rounded-[30px] shadow-lg overflow-hidden transition-transform">
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center bg-[#fcfcfc] px-10 transition-opacity duration-500 ease-in-out transform ${
            isActive ? "opacity-0 z-0" : "opacity-100 z-10"
          }`}
          style={{ width: "50%", height: "100%" }}
        >
          <form onSubmit={handleLogin}>
            <h1 className="text-3xl font-semibold mb-4">Sign In</h1>
            <div className="flex space-x-3 my-5">
              <a
                href="#"
                className="flex items-center justify-center w-10 h-10 border rounded-full text-gray-700 hover:bg-gray-100"
              >
                <FaGoogle />
              </a>
              <a
                href="#"
                className="flex items-center justify-center w-10 h-10 border rounded-full text-gray-700 hover:bg-gray-100"
              >
                <FaGithub />
              </a>
              <a
                href="#"
                className="flex items-center justify-center w-10 h-10 border rounded-full text-gray-700 hover:bg-gray-100"
              >
                <FaLinkedinIn />
              </a>
            </div>
            <span className="text-sm mb-3">or use your registered email and password</span>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className="w-full p-3 mb-3 bg-gray-200 rounded-lg"
              required
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="w-full p-3 mb-3 bg-gray-200 rounded-lg"
              required
            />
            <a href="#" className="text-sm mb-3">
              Forget Your Password?
            </a>
            <button className="bg-blue-600 text-white uppercase text-sm font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-black transition-colors duration-300">
              Sign In
            </button>
          </form>
        </div>

        <div
          className={`absolute inset-0 flex flex-col items-center justify-center bg-[#fcfcfc] px-10 transition-opacity duration-500 ease-in-out transform ${
            isActive ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          style={{ width: "50%", height: "100%", left: "50%" }}
        >
          <form onSubmit={handleSignup}>
            <h1 className="text-3xl font-semibold mb-4">Create Account</h1>
            <span className="text-sm mb-3">or use your email for registration</span>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Name"
              className="w-full p-3 mb-3 bg-gray-200 rounded-lg"
              required
            />
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className="w-full p-3 mb-3 bg-gray-200 rounded-lg"
              required
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="w-full p-3 mb-3 bg-gray-200 rounded-lg"
              required
            />
            <button className="bg-blue-600 text-white uppercase text-sm font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-black transition-colors duration-300">
              Sign Up
            </button>
          </form>
        </div>

        <div
          className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform transform duration-500 ease-in-out ${
            isActive ? "translate-x-[-101%] rounded-r-[200px]" : "rounded-l-[200px]"
          }`}
        >
          <div
            className={`absolute inset-0 bg-gradient-to-r from-[#5c6bc0] to-[#512da8] text-white flex flex-col items-center justify-center px-8 text-center transition-transform transform ${
              isActive ? "translate-x-[100%]" : "translate-x-[0%]"
            }`}
            style={{ height: "100%" }}
          >
            <h1 className="text-3xl font-bold mb-4">Welcome Back!</h1>
            <p className="mb-6">Enter your personal details to use all of site features</p>
            <button
              onClick={() => setIsActive(true)}
              className="bg-transparent border border-white text-white uppercase text-sm font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-black transition-colors duration-300 shadow-2xl"
            >
              Sign Up
            </button>
          </div>

          <div
            className={`absolute inset-0 bg-gradient-to-r from-[#5c6bc0] to-[#512da8] text-white flex flex-col items-center justify-center px-8 text-center transition-transform transform ${
              isActive ? "translate-x-[0]" : "translate-x-[-100%]"
            }`}
            style={{ height: "100%" }}
          >
            <h1 className="text-3xl font-bold mb-4">Hello, User!</h1>
            <p className="mb-6">Register with your personal details to use all of site features</p>
            <button
              onClick={() => setIsActive(false)}
              className=" bg-transparent border border-white text-white uppercase text-sm font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-black transition-colors duration-300 shadow-2xl"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
