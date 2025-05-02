import { useNavigate } from "react-router";
import { useSubjects } from "../pages/SubjectsPage/SubjectsContextProvider";
import { SubjectProps } from "./types";

const SubjectItem = ({ data }: SubjectProps) => {
  const { name, description, id } = data;
  const { deleteSubject } = useSubjects();

  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/editSubject/${id}`);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        borderBottom: "1px solid #ddd",
      }}
    >
      <p>
        <strong>Subject name:</strong> {name}
      </p>

      <p>{description}</p>
      <button
        onClick={() => deleteSubject(id)}
        style={{
          background: "red",
          color: "white",
          border: "none",
          padding: "5px 10px",
          cursor: "pointer",
        }}
      >
        Delete
      </button>
      <button
        onClick={handleEditClick}
        style={{
          background: "blue",
          color: "white",
          border: "none",
          padding: "5px 10px",
          cursor: "pointer",
        }}
      >
        Edit
      </button>
    </div>
  );
};

export default SubjectItem;
