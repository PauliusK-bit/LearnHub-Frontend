import { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../../api";
import { Subject } from "../../components/types";

const CategoryPage = () => {
  const [loading, setLoading] = useState(true);
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const { id } = useParams();

  useEffect(() => {
    const fetchCategoriesSubjects = async () => {
      try {
        const subjectsData = await api.get(`/categories/${id}/subjects`);
        setSubjects(subjectsData.data);
      } catch (error) {
        console.log("Something went wrong", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategoriesSubjects();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>Category id: {id}</div>
      <h2>Subjects:</h2>
      {subjects.length === 0 ? (
        <p>No subjects found.</p>
      ) : (
        <ul>
          {subjects.map((subject) => (
            <li key={subject._id}>
              <h3>{subject.name}</h3>
              <p>{subject.description}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default CategoryPage;
