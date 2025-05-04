import LecturersList from "../../components/LecturersList";
import { LecturersPageContextProvider } from "./LecturersContextProvider";

const LecturersPage = () => {
  return (
    <>
      <LecturersPageContextProvider>
        <div>
          <LecturersList />
        </div>
      </LecturersPageContextProvider>
    </>
  );
};

export default LecturersPage;
