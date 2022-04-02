import React from "react";
import LandingPage from "./Views/LandingPage/LandingPage";
import TopBar from "./Components/TopBar/TopBar";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUpPage from "./Views/SignUpPage/SignUpPage";

const App = () => {
  return (
    <BrowserRouter>
      <TopBar />
      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route exact path="/" element={<LandingPage />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
