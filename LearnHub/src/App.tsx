import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import { ToastContainer } from "react-toastify";
import HomePage from "./pages/HomePage/HomePage";
import Navigation from "./components/Navigation";

import LoginPage from "./pages/LoginPage/LoginPage";
import { AuthProvider } from "./components/AuthContext";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <ToastContainer />
          <Navigation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
