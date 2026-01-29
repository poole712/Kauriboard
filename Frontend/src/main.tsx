import { BrowserRouter, Route, Routes } from "react-router";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Layout from "./layouts/Layout.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import ProjectsPage from "./pages/ProjectsPage.tsx";
import CreateProject from "./pages/CreateProject.tsx";
import ProjectManagePage from "./pages/ProjectManagePage.tsx";


createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<App />} />
        <Route path="/pages/Login" element={<LoginPage />} />
        <Route path="/pages/Register" element={<RegisterPage />} />
        <Route path="/pages/Projects" element={<ProjectsPage />} />
        <Route path="/pages/CreateProject" element={<CreateProject />} />
        <Route path="/pages/ProjectManagePage/:id" element={<ProjectManagePage />} />
      </Route>
    </Routes>
  </BrowserRouter>,
);
