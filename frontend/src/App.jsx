import React, { useState } from "react";
import MainPage from "./pages/mainPage";
import LandingPage from "./pages/landingPage";

function App() {
  const [showMainPage, setShowMainPage] = useState(false);

  const handleStart = () => {
    setShowMainPage(true);
  };

  return (
    <div>
      {showMainPage ? <MainPage /> : <LandingPage onStart={handleStart} />}
    </div>
  );
}

export default App;
