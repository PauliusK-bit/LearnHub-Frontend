import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import { ToastContainer } from "react-toastify";
import HomePage from "./pages/HomePage/HomePage";
import Navigation from "./components/Navigation";

import LoginPage from "./pages/LoginPage/LoginPage";
import { AuthProvider } from "./components/AuthContext";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import SubjectsPage from "./pages/SubjectsPage/SubjectsPage";
import CategoriesPage from "./pages/CategoriesPage/CategoriesPage";
import StudentsPage from "./pages/StudentsPage/StudentsPage";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import LecturersPage from "./pages/LecturersPage/LecturersPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

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
            <Route path="subjects" element={<SubjectsPage />} />
            <Route path="categories" element={<CategoriesPage />} />
            <Route path="categories/:id" element={<CategoryPage />} />
            <Route path="students" element={<StudentsPage />} />
            <Route path="lecturers" element={<LecturersPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
