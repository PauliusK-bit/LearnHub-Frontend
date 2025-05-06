import { useAuth } from "../../components/AuthContext";
import StudentForm from "../../components/StudentForm";

const AdminStudentsControlPage = () => {
  const { user } = useAuth();

  const allowedRoles = ["ADMIN", "LECTURER"];

  if (!user || !allowedRoles.includes(user.role)) {
    return <p>This page can see only Admin and Lecturer</p>;
  }

  return (
    <>
      <StudentForm />
    </>
  );
};

export default AdminStudentsControlPage;
