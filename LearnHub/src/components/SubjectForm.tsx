import { useEffect, useState } from "react";
import { useSubjects } from "../pages/SubjectsPage/SubjectsContextProvider";
import { Subject } from "./types";
import styled from "styled-components";

const Card = styled.div`
  border: 2px solid white;
  margin-top: 20px;
  margin-left: 20px;
`;

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
        <input
          placeholder="Name"
          className="input"
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-control">
        <input
          placeholder="Description"
          className="input"
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button className="btn btn-dash btn-accent" type="submit">
        {selectedSubjectId ? "Atnaujinti" : "Pridėti"}
      </button>
      <h3>Subjects:</h3>
      <div className="flex flex-row gap-x-4 flex-wrap">
        {subjects.map((subject) => (
          <Card
            key={subject._id}
            className="card w-96 bg-base-100 card-lg shadow-sm "
          >
            <div className="card-body">
              <h2 className="card-title">
                {" "}
                <button
                  className="btn btn-soft"
                  type="button"
                  onClick={() => setSelectedSubjectId(subject._id ?? null)}
                >
                  {subject.name}
                </button>
              </h2>
              <div className="justify-end card-actions">
                <button
                  className="btn btn-outline btn-error"
                  type="button"
                  onClick={() => handleDelete(subject._id ?? "")}
                >
                  Ištrinti
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </form>
  );
};

export default SubjectForm;
