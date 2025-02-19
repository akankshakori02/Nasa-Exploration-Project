import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import APOD from "./components/APOD";
import Facts from "./components/Facts";
import EPIC from "./components/EPIC";
import MarsRover from "./components/MarsRover";
import Footer from "./components/Footer";

const App = () => {
  const [showFacts, setShowFacts] = useState(true);

  //To toggle Facts visibility
  const toggleFacts = () => {
    setShowFacts((prev) => !prev);
  };
  return (
    <BrowserRouter>
        <Header toggleFacts={toggleFacts} showFacts={showFacts} />
        <Routes>
          <Route path="/apod" element={<APOD />} />
          <Route path="/mars-rover" element={<MarsRover />} />
          <Route path="/epic" element={<EPIC />} />
        </Routes>
        <div style={{ position: "absolute", top: "1rem", right: "0rem", zIndex: 1000 }}>
          {showFacts && <Facts onClose={toggleFacts} />}
        </div>
        <Footer />
    </BrowserRouter>
  );
};

export default App;
