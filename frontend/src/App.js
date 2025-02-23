import React, { useState, useEffect, Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import APOD from "./components/APOD";
import Facts from "./components/Facts";
import Footer from "./components/Footer";
import UserName from "./components/UserName";
import LoadSpinner from "./components/LoadSpinner";
// Lazy Load Mars & EPIC
const MarsRover = lazy(() => import("./components/MarsRover"));
const EPIC = lazy(() => import("./components/EPIC"));

const App = () => {
  const [showFacts, setShowFacts] = useState(true); // State to control the visibility of Facts component
  const [showModal, setShowModal] = useState(false); // State to control the visibility of UserName component
  const [userName, setUserName] = useState(""); // State to store current username

  // Toggle visibility of Fact component
  const toggleFacts = () => {
    setShowFacts((prev) => !prev);
  };

  // Retrieve username from localStorage on component mount- if not found show useName component.
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
      <UserName
        showModal={showModal}
        setShowModal={setShowModal}
        setUserName={setUserName}
      />

      <Header
        toggleFacts={toggleFacts}
        showFacts={showFacts}
        userName={userName}
      />
      <div className="set-container">
        <Suspense fallback={<LoadSpinner />}>
          <Routes>
            <Route exact path="/" element={<APOD />} />
            <Route exact path="/apod" element={<APOD />} />
            <Route exact path="/mars-rover" element={<MarsRover />} />
            <Route exact path="/epic" element={<EPIC />} />
          </Routes>
        </Suspense>
      </div>
      <div className="display-facts">
        {showFacts && <Facts onClose={toggleFacts} />}
      </div>
      <Footer />
    </>
  );
};

export default App;
