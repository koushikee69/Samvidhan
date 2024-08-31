import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from "react-router-dom";
import Login from "./components/Login";
import Level from "./components/Level";
import levels from "./json/levels.json";
import Home from "./components/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./components/Loading";
import NewLevels from "./components/NewLevels";
import { auth } from "./components/firebase";

const LevelWithParams = () => {
  const { level } = useParams();
  const levelData = levels.levels.find((data) => data.level === parseInt(level));

  return levelData ? <Level data={levelData} /> : <div>Level coming soon...</div>;
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Router>
          <div className="App">
                <Routes>
                  <Route path="/" element={user ? <Navigate to="/home" /> : <Login />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/levels" element={<NewLevels />} />
                  <Route path="/levels/:level" element={<LevelWithParams />} />
                </Routes>
                <ToastContainer />
          </div>
        </Router>
      )}
    </>
  );
};

export default App;
