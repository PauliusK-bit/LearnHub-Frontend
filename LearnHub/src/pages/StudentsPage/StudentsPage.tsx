import { useAuth } from "../../components/AuthContext";
import StudentsList from "../../components/StudentsList";

const StudentsPage = () => {
  const { user } = useAuth();

  const allowedRoles = ["LECTURER", "ADMIN"];
  if (!user || !allowedRoles.includes(user.role)) {
    return <p>This page can see only Lecturer and Admin</p>;
  }

  return (
    <>
      <div>
        <StudentsList />
      </div>
    </>
  );
};

export default StudentsPage;
