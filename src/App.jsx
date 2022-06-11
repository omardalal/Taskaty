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
import SectionPage from "./Views/SectionPage/SectionPage";
import ClassPage from "./Views/ClassPage/ClassPage";
import NotificationsPage from "./Views/NotificationsPage/NotificationsPage";
import ProjectPage from "./Views/ProjectPage/ProjectPage";
import TaskPage from "./Views/TaskPage/TaskPage";
import SubmissionPage from "./Views/SubmissionPage/SubmissionPage";
import ProfilePage from "./Views/ProfilePage/ProfilePage";

const App = () => {
  useAuth();

  return (
    <BrowserRouter>
      <TopBar />
      <Routes>
        <Route path="/search" element={<SearchPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/classes" element={<ClassesPage />} />
        <Route path="/class/:classId" element={<ClassPage />} />
        <Route path="/class/:classId/:sectionId" element={<SectionPage />} />
        <Route path="/project/:projectId" element={<ProjectPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/profile/:userId" element={<ProfilePage />} />
        <Route path="/task/:taskId" element={<TaskPage />} />
        <Route path="/submission/:submissionId" element={<SubmissionPage />} />
        <Route exact path="/" element={<LandingPage />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
