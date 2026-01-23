import { BrowserRouter, Route, Routes } from "react-router";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Layout from "./layouts/Layout.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";


createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<App />} />
        <Route path="/pages/LoginPage" element={<LoginPage />} />
        <Route path="/pages/Register" element={<RegisterPage />} />
      </Route>
    </Routes>
  </BrowserRouter>,
);
