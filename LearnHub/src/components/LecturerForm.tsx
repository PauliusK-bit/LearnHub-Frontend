/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useLecturers } from "../pages/LecturersPage/LecturersContextProvider";
import { BaseLecturer, ExistingLecturer } from "./types";
import styled from "styled-components";

const Form = styled.form`
  width: 500px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #000000;
  border-radius: 5px;
  background-color: #100b00;
`;

const FormControl = styled.div`
  margin-bottom: 15px;

  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }

  input[type="text"],
  input[type="email"],
  input[type="password"] {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 16px;

    &:focus {
      border-color: #007bff;
      outline: none;
      box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    }
  }
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ListContainer = styled.div`
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 5px;
  background-color: #231f20;
`;

const ListTitle = styled.h3`
  margin-bottom: 10px;
  color: #333;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;

  li {
    padding: 8px 10px;
    margin-bottom: 5px;
    border-bottom: 1px solid #200053;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:last-child {
      border-bottom: none;
    }

    button {
      background-color: #28a745;
      color: white;
      border: none;
      padding: 5px 10px;
      border-radius: 4px;
      cursor: pointer;
      margin-right: 5px;

      &:hover {
        background-color: #218838;
      }

      &:last-child {
        background-color: #dc3545;

        &:hover {
          background-color: #c82333;
        }
      }
    }
  }
`;

const LecturerForm = () => {
  const {
    addLecturer,
    editLecturer,
    deleteLecturer,
    lecturers,
    fetchLecturers,
  } = useLecturers();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedLecturerId, setSelectedLecturerId] = useState<string | null>(
    null
  );

  const selectedLecturer = lecturers.find(
    (lecturer) => lecturer._id === selectedLecturerId
  );

  useEffect(() => {
    fetchLecturers();
    if (selectedLecturer) {
      const lecturer = lecturers.find((l) => l._id === selectedLecturerId);
      if (lecturer) {
        setName(selectedLecturer.name ?? "");
        setSurname(selectedLecturer.surname ?? "");
        setEmail(selectedLecturer.email ?? "");
        setPassword(selectedLecturer.password ?? "");
      }
    } else {
      setName("");
      setSurname("");
      setEmail("");
      setPassword("");
    }
  }, [selectedLecturerId]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (selectedLecturerId) {
      const updatedLecturerData: ExistingLecturer = {
        _id: selectedLecturerId,
        name,
        surname,
        email,
        password,
      };
      await editLecturer(updatedLecturerData);
    } else {
      const newLecturerData: BaseLecturer = {
        name,
        surname,
        email,
        password,
      };
      await addLecturer(newLecturerData);
    }

    setName("");
    setSurname("");
    setEmail("");
    setPassword("");
    setSelectedLecturerId(null);
  };

  const handleDelete = async (_id: string) => {
    if (window.confirm("Ar tikrai norite ištrinti šį dėstytoją?")) {
      await deleteLecturer(_id);

      fetchLecturers();
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormControl>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <label htmlFor="surname">Surname:</label>
        <input
          type="text"
          id="surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>
      <Button type="submit">
        {selectedLecturerId ? "Atnaujinti" : "Pridėti"}
      </Button>

      <ListContainer>
        <ListTitle>Lecturers:</ListTitle>
        <List>
          {lecturers.map((lecturer) => (
            <li key={lecturer._id}>
              <button
                type="button"
                onClick={() => setSelectedLecturerId(lecturer._id)}
              >
                {lecturer.name} - {lecturer.surname}
              </button>
              <button type="button" onClick={() => handleDelete(lecturer._id)}>
                Ištrinti
              </button>
            </li>
          ))}
        </List>
      </ListContainer>
    </Form>
  );
};

export default LecturerForm;
