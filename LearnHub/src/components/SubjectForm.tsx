import { useEffect, useState } from "react";
import { useSubjects } from "../pages/SubjectsPage/SubjectsContextProvider";
import { Subject } from "./types";

const SubjectForm = () => {
  const { fetchSubjects, addSubject, deleteSubject, editSubject, subjects } =
    useSubjects();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(
    null
  );

  const selectedSubject = subjects.find(
    (subject) => subject._id === selectedSubjectId
  );

  useEffect(() => {
    fetchSubjects();
    if (selectedSubject) {
      const subject = subjects.find((s) => s._id === selectedSubjectId);
      if (subject) {
        setName(selectedSubject.name ?? "");
        setDescription(selectedSubject.description ?? "");
      }
    } else {
      setName("");
      setDescription("");
    }
  }, [selectedSubjectId]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    let newSubject: Subject;

    if (selectedSubjectId) {
      newSubject = {
        _id: selectedSubjectId,
        name,
        description,
      };
      await editSubject(newSubject);
    } else {
      newSubject = {
        name,
        description,
      };
      await addSubject(newSubject);
    }

    setName("");
    setDescription("");
    setSelectedSubjectId(null);
  };

  const handleDelete = async (_id: string) => {
    if (window.confirm("Ar tikrai norite ištrinti šį dėstytoją?")) {
      await deleteSubject(_id);

      fetchSubjects();
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
        <label htmlFor="title">Description:</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button type="submit">
        {selectedSubjectId ? "Atnaujinti" : "Pridėti"}
      </button>

      <div>
        <h3>Subjects:</h3>
        <ul>
          {subjects.map((subject) => (
            <li key={subject._id}>
              <button
                type="button"
                onClick={() => setSelectedSubjectId(subject._id ?? null)}
              >
                {subject.name}
              </button>
              <button
                type="button"
                onClick={() => handleDelete(subject._id ?? "")}
              >
                Ištrinti
              </button>
            </li>
          ))}
        </ul>
      </div>
    </form>
  );
};

export default SubjectForm;
