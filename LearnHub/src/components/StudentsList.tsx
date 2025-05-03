import { useEffect, useState } from "react";
import { Student } from "./types";
import api from "../api";
import StudentItem from "./StudentItem";

const StudentsList = () => {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    const fetchStudentsData = async () => {
      try {
        const { data } = await api.get("/students");
        setStudents(data);
      } catch (err) {
        console.log("Failed fetching students", err);
      }
    };
    fetchStudentsData();
  }, []);

  return (
    <>
      <div>
        {students.map((student) => (
          <StudentItem key={student._id} data={student} />
        ))}
      </div>
    </>
  );
};

export default StudentsList;
