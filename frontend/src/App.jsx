
import React from "react";
import ChatBot from "./components/ChatBot";
import Loading from "./components/Loading";
import NewLevels from "./components/NewLevels";
import { useState, useEffect } from 'react';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? <Loading /> :
        (
          <>
            <NewLevels/>
            <ChatBot />
          </>
        )}
    </>
  );
};

export default App;

// satya

import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Login";
import Level from "./components/Level";
import levels from "./json/levels.json";
import Home from "./components/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Homepage from "./components/Homepage";
import { useState } from "react";
import { auth } from "./components/firebase";

function App() {
  const [user, setUser] = useState();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  });
  const lvl = 1;
  return (
    // <div>
    //   {/* <Login /> */}
    //   {/* {levels.levels.map((data, index) => (
    //    lvl===data.level && <Level key={index} data={data} />
    //   ))} */}
    //   <Home />
    // </div>
    <Router>
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route path="/" element={user ? <Navigate to="/home" /> : <Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route
                path="/levels"
                element={levels.levels.map((data, index) => lvl === data.level && <Level key={index} data={data} />)}
              />
            </Routes>
            <ToastContainer />
          </div>
        </div>
      </div>
    </Router>
  );
}
export default App;
