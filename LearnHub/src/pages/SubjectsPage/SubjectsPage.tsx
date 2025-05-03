import SubjectsList from "../../components/SubjectsList";
import { SubjectsPageContextProvider } from "./SubjectsContextProvider";

const SubjectsPage = () => {
  return (
    <>
      <SubjectsPageContextProvider>
        <div>
          <SubjectsList />
        </div>
      </SubjectsPageContextProvider>
    </>
  );
};

export default SubjectsPage;
