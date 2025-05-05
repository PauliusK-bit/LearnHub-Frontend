import { Link, useNavigate } from "react-router";
import { useSubjects } from "../pages/SubjectsPage/SubjectsContextProvider";
import { SubjectProps } from "./types";

const SubjectItem = ({ data }: SubjectProps) => {
  const { name, description, _id } = data;
  const { deleteSubject } = useSubjects();

  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/editSubject/${_id}`);
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
        <Link to={`/subjects/${_id}`}> {name}</Link>
      </p>

      <p>{description}</p>
      <button
        onClick={() => _id && deleteSubject(_id)}
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
