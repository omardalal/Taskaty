import React from "react";
import LandingPage from "./Views/LandingPage/LandingPage";
import TopBar from "./Components/TopBar/TopBar";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUpPage from "./Views/SignUpPage/SignUpPage";
import useAuth from "./CustomHooks/useAuth";
import SearchPage from "./Views/SearchPage/SearchPage";
import ClassesPage from "./Views/ClassesPage/ClassesPage";
import ProjectsPage from "./Views/ProjectsPage/ProjectsPage";

const App = () => {
  useAuth();

  return (
    <BrowserRouter>
      <TopBar />
      <Routes>
        <Route path="/search" element={<SearchPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/classes" element={<ClassesPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route exact path="/" element={<LandingPage />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
