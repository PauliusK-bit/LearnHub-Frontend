import { useEffect, useState } from "react";
import { Group, Student } from "../../components/types";
import { Link, useParams } from "react-router";
import api from "../../api";

const LecturerPage = () => {
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState<Student[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);

  const { id } = useParams();

  useEffect(() => {
    const fetchLecturersStudents = async () => {
      try {
        const { data } = await api.get(`/lecturers/${id}/students`);
        const response = await api.get(`lecturers/${id}/groups`);
        setStudents(data);
        setGroups(response.data);
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
      <h2>Lecturer Groups</h2>
      {groups.length === 0 ? (
        <p>No groups found.</p>
      ) : (
        <ul>
          {groups.map((group) => (
            <li key={group._id}>
              <Link to={`/groups/${id}`}>{group.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default LecturerPage;
