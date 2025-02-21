import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import APOD from "./components/APOD";
import Facts from "./components/Facts";
import EPIC from "./components/EPIC";
import MarsRover from "./components/MarsRover";
import Footer from "./components/Footer";
import UsernameModal from "./components/UsernameModal";

const App = () => {
  const [showFacts, setShowFacts] = useState(true);
  const [showModal, setShowModal] = useState(false); // State for modal
  const [userName, setUserName] = useState(""); // State for username

  // To toggle Facts visibility
  const toggleFacts = () => {
    setShowFacts((prev) => !prev);
  };

  // Check localStorage for username
  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (!storedUserName) {
      setShowModal(true);
    } else {
      setUserName(storedUserName);
    }
  }, []);

  return (
    <>
      <UsernameModal
        showModal={showModal}
        setShowModal={setShowModal}
        setUserName={setUserName}
      />

      <Header
        toggleFacts={toggleFacts}
        showFacts={showFacts}
        userName={userName}
      />
      <div style={{ minHeight: "80vh" }}>
        <Routes>
          <Route path="/" element={<APOD />} />
          <Route path="/apod" element={<APOD />} />
          <Route path="/mars-rover" element={<MarsRover />} />
          <Route path="/epic" element={<EPIC />} />
        </Routes>
      </div>
      <div
        style={{
          position: "absolute",
          top: "1rem",
          right: "0rem",
          opacity: "92%",
          zIndex: 1000,
        }}
      >
        {showFacts && <Facts onClose={toggleFacts} />}
      </div>
      <Footer />
    </>
  );
};

export default App;
