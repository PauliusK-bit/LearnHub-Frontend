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
import AdminPage from "./pages/AdminPage/AdminPage";
import AdminCategoriesControlPage from "./pages/AdminCategoriesControlPage/AdminCategoriesControlPage";
import AdminLecturersControlPage from "./pages/AdminLecturersControlPage/AdminLecturersControlPage";
import AdminSubjectsControlPage from "./pages/AdminSubjectsControlPage/AdminSubjectsControlPage";
import AdminStudentsControlPage from "./pages/AdminStudentsControlPage/AdminStudentsControlPage";
import ActivitiesPage from "./pages/ActivitiesPage/ActivitiesPage";
import ActivityPage from "./pages/ActivityPage/ActivityPage";
import LecturerPage from "./pages/LecturerPage/LecturerPage";
import VideoPage from "./pages/VideoPage/VideoPage";
import VideoForm from "./components/VideoForm";
import GroupPage from "./pages/GroupPage/GroupPage";
import ProtectedRoute from "./components/ProtectedRoute";
import EventsControlPage from "./pages/EventsControlPage.tsx/EventsControlPage";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <ToastContainer />
          <Navigation />
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="categories/:id" element={<CategoryPage />} />
              <Route path="subjects" element={<SubjectsPage />} />
              <Route path="subjects/:id" element={<VideoPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="videos" element={<VideoForm />} />
              <Route path="groups/:id" element={<GroupPage />} />
              <Route path="students" element={<StudentsPage />} />
              <Route path="lecturers" element={<LecturersPage />} />
              <Route path="lecturers/:_id" element={<LecturerPage />} />
              <Route path="admin-dashboard" element={<AdminPage />} />
              <Route
                path="categories-control"
                element={<AdminCategoriesControlPage />}
              />
              <Route
                path="lecturers-control"
                element={<AdminLecturersControlPage />}
              />
              <Route
                path="subjects-control"
                element={<AdminSubjectsControlPage />}
              />
              <Route
                path="students-control"
                element={<AdminStudentsControlPage />}
              />
              <Route path="events-control" element={<EventsControlPage />} />
            </Route>
            <Route path="/" element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="categories" element={<CategoriesPage />} />
            <Route path="activities" element={<ActivitiesPage />} />
            <Route path="activities/:id" element={<ActivityPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
