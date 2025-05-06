import { useAuth } from "../../components/AuthContext";
import LecturerForm from "../../components/LecturerForm";
import { LecturersPageContextProvider } from "../LecturersPage/LecturersContextProvider";

const AdminLecturersControlPage = () => {
  const { user } = useAuth();

  const allowedRoles = ["ADMIN"];

  if (!user || !allowedRoles.includes(user.role)) {
    return <p>This page can see only Admin</p>;
  }

  return (
    <LecturersPageContextProvider>
      <InsideComponent />
    </LecturersPageContextProvider>
  );
};

const InsideComponent = () => {
  return (
    <>
      <LecturerForm />
    </>
  );
};

export default AdminLecturersControlPage;
