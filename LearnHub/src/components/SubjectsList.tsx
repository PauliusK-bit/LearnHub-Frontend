import { useSubjects } from "../pages/SubjectsPage/SubjectsContextProvider";
import { useEffect } from "react";
import SubjectItem from "./SubjectItem";

const SubjectsList = () => {
  const { subjects, error, loading, fetchSubjects } = useSubjects();

  useEffect(() => {
    const fetchData = async () => {
      await fetchSubjects();
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <p>Subjects</p>
      <div>
        <ul>
          {subjects.map((subject) => (
            <SubjectItem key={subject._id} data={subject} />
          ))}
        </ul>
      </div>
    </>
  );
};

export default SubjectsList;
