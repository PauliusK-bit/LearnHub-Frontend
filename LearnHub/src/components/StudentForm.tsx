import { useEffect, useState } from "react";
import { BaseStudent, Student } from "./types";
import axios from "axios";
import { API_URL } from "../config/config";
import styled from "styled-components";

const Delete = styled.button`
  background-color: #8eb1c7;
  border-radius: 10px;
  padding: 8px 16px;
  margin-top: 10px;

  &:hover {
    background-color: red;
    cursor: pointer;
  }
`;

const Edit = styled.button`
  background-color: #c1bfb5;
  border-radius: 10px;
  padding: 8px 16px;
  margin-top: 10px;

  &:hover {
    background-color: green;
    cursor: pointer;
  }
`;

const StyledName = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
  color: #009dff;
  padding: 4px 8px;
`;

const StudentForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(
    null
  );

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/students`);
        setStudents(data);

        if (selectedStudentId) {
          const selectedStudent: Student | undefined = data.find(
            (student: Student) => student._id === selectedStudentId
          );
          if (selectedStudent) {
            setName(selectedStudent.name);
            setEmail(selectedStudent.email);
            setPassword(selectedStudent.password);
          } else {
            setName("");
            setEmail("");
            setPassword("");
          }
        } else {
          setName("");
          setEmail("");
          setPassword("");
        }
      } catch (error) {
        console.error("Klaida gaunant studentus:", error);
      }
    };

    fetchStudents();
  }, [selectedStudentId]);

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (selectedStudentId) {
        const updatedStudent: Student = {
          _id: selectedStudentId,
          name,
          email,
          password,
        };

        await axios.put(
          `${API_URL}/students/${selectedStudentId}`,
          updatedStudent
        );
        setStudents((prevStudents) =>
          prevStudents.map((student) =>
            student._id === selectedStudentId ? updatedStudent : student
          )
        );
      } else {
        const newStudent: BaseStudent = {
          name,
          email,
          password,
        };

        const { data } = await axios.post(`${API_URL}/students`, newStudent);

        setStudents((prevStudents) => [...prevStudents, data]);
      }

      setName("");
      setEmail("");
      setPassword("");
      setSelectedStudentId(null);
    } catch (error) {
      console.log("Student was not created/updated", error);
    }
  };

  const deleteHandler = async (studentId: string) => {
    try {
      await axios.delete(`${API_URL}/students/${studentId}`);

      setStudents((prevStudents) =>
        prevStudents.filter((student) => student._id !== studentId)
      );
    } catch (error) {
      console.error("Klaida trinant studentą:", error);
    }
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <div className="form-control">
          <label htmlFor="name">Name:</label>
          <input
            className="input"
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>

        <div className="form-control">
          <label htmlFor="capital">Email:</label>
          <input
            className="input"
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div className="form-control">
          <label htmlFor="password">Password:</label>
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "green",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          {selectedStudentId ? "Update Student" : "Add Student"}
        </button>
      </form>

      <ul>
        {students.map((student) => (
          <li key={student._id}>
            <StyledName>{student.name}</StyledName>
            <Edit
              type="button"
              onClick={() => setSelectedStudentId(student._id)}
            >
              Edit
            </Edit>
            <Delete type="button" onClick={() => deleteHandler(student._id)}>
              Delete
            </Delete>
          </li>
        ))}
      </ul>
    </>
  );
};

export default StudentForm;
