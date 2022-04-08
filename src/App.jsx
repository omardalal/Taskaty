import React, { useEffect } from "react";
import LandingPage from "./Views/LandingPage/LandingPage";
import TopBar from "./Components/TopBar/TopBar";
import "./App.css";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUpPage from "./Views/SignUpPage/SignUpPage";
import useAuth from "./CustomHooks/useAuth";
import { setUser } from "./Redux/Actions";
import SearchPage from "./Views/SearchPage/SearchPage";

const App = () => {
  const loginState = useAuth();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setUser(loginState.user));
  }, [loginState]);
  return (
    <BrowserRouter>
      <TopBar />
      <Routes>
        <Route path="/search" element={<SearchPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route exact path="/" element={<LandingPage />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
