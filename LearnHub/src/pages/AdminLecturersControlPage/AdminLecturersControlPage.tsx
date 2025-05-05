import LecturerForm from "../../components/LecturerForm";
import { LecturersPageContextProvider } from "../LecturersPage/LecturersContextProvider";

const AdminLecturersControlPage = () => {
  return (
    <LecturersPageContextProvider>
      <InsideComponent />
    </LecturersPageContextProvider>
  );
};

const InsideComponent = () => {
  return (
    <>
      <div>Veikia</div>
      <LecturerForm />
    </>
  );
};

export default AdminLecturersControlPage;
