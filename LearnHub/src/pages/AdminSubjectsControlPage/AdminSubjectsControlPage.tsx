import SubjectForm from "../../components/SubjectForm";

import { SubjectsPageContextProvider } from "../SubjectsPage/SubjectsContextProvider";

const AdminSubjectsControlPage = () => {
  return (
    <SubjectsPageContextProvider>
      <InsideComponent />
    </SubjectsPageContextProvider>
  );
};

const InsideComponent = () => {
  return (
    <>
      <div>Veikia</div>
      <SubjectForm />
    </>
  );
};

export default AdminSubjectsControlPage;
