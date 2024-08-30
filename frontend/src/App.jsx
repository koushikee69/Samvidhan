import React from "react";
import Login from "./components/Login";
import Level from "./components/Level";
import levels from "./json/levels.json";
import Home from "./components/Home";
import { Routes, Route } from 'react-router-dom';

const App = () => {
  
  const lvl = 1;
  return (
    // <div>
    //   {/* <Login /> */}
    //   {/* {levels.levels.map((data, index) => (
    //    lvl===data.level && <Level key={index} data={data} />
    //   ))} */}
    //   <Home />
    // </div>
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/levels" element={<Level />} /> {/* Add your routes here */}
  </Routes>
  );
};

export default App;
