import { useEffect, useState } from "react";
import { Student } from "../../components/types";
import { useParams } from "react-router";
import api from "../../api";

const LecturerPage = () => {
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState<Student[]>([]);

  const { id } = useParams();

  useEffect(() => {
    const fetchLecturersStudents = async () => {
      try {
        const { data } = await api.get(`/lecturers/${id}/students`);
        setStudents(data);
      } catch (error) {
        console.log("Something went wrong", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLecturersStudents();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>Lecturers id: {id}</div>
      <h2>Students:</h2>
      {students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <ul>
          {students.map((student) => (
            <li key={student._id}>
              <h3>{student.name}</h3>
              <p>{student.email}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default LecturerPage;
