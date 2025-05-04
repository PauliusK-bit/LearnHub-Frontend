import { useEffect } from "react";
import { useLecturers } from "../pages/LecturersPage/LecturersContextProvider";
import LecturerItem from "./LecturerItem";

const LecturersList = () => {
  const { lecturers, error, loading, fetchLecturers } = useLecturers();

  useEffect(() => {
    const fetchData = async () => {
      await fetchLecturers();
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div>
        <ul>
          {lecturers.map((lecturer) => (
            <LecturerItem key={lecturer._id} data={lecturer} />
          ))}
        </ul>
      </div>
    </>
  );
};

export default LecturersList;
