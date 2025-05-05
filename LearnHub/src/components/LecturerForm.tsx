/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useLecturers } from "../pages/LecturersPage/LecturersContextProvider";
import { Lecturer } from "./types";

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

    const newLecturer: Lecturer = {
      _id: selectedLecturerId ?? "",
      name,
      surname,
      email,
      password,
    };

    if (selectedLecturerId) {
      await editLecturer(newLecturer);
    } else {
      await addLecturer(newLecturer);
    }

    setName("");
    setSurname("");
    setEmail("");
    setPassword("");
    setSelectedLecturerId(null);
  };

  const handleDelete = async () => {
    if (
      selectedLecturerId &&
      window.confirm("Ar tikrai norite ištrinti šį dėstytoją?")
    ) {
      await deleteLecturer(selectedLecturerId);

      setName("");
      setSurname("");
      setEmail("");
      setSelectedLecturerId(null);

      fetchLecturers();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-control">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label htmlFor="title">Surname:</label>
        <input
          type="text"
          id="surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label htmlFor="title">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label htmlFor="title">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">
        {selectedLecturerId ? "Atnaujinti" : "Pridėti"}
      </button>
      {selectedLecturerId && (
        <button type="button" onClick={handleDelete}>
          Ištrinti
        </button>
      )}

      <div>
        <h3>Lecturers:</h3>
        <ul>
          {lecturers.map((lecturer) => (
            <li key={lecturer._id}>
              <button
                type="button"
                onClick={() => setSelectedLecturerId(lecturer._id)}
              >
                {lecturer.name} - {lecturer.surname}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </form>
  );
};

export default LecturerForm;
