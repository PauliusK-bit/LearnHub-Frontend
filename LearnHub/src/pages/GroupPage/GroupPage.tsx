import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Student } from "../../components/types";
import api from "../../api";

const GroupPage = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const { data } = await api.get(`groups/${id}/students`);
        setStudents(data);
      } catch (error) {
        console.log("Something went wrong", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>Id: {id}</div>
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

export default GroupPage;
