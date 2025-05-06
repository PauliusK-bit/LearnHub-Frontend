import { useAuth } from "../../components/AuthContext";
import SubjectForm from "../../components/SubjectForm";

import { SubjectsPageContextProvider } from "../SubjectsPage/SubjectsContextProvider";

const AdminSubjectsControlPage = () => {
  const { user } = useAuth();

  const allowedRoles = ["ADMIN", "LECTURER"];

  if (!user || !allowedRoles.includes(user.role)) {
    return <p>This page can see only Admin and Lecturer</p>;
  }

  return (
    <SubjectsPageContextProvider>
      <InsideComponent />
    </SubjectsPageContextProvider>
  );
};

const InsideComponent = () => {
  return (
    <>
      <SubjectForm />
    </>
  );
};

export default AdminSubjectsControlPage;
