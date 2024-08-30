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

