import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import api from "../../api";
import { Subject } from "../../components/types";
import styled from "styled-components";

const Container = styled.div`
  padding: 30px 40px;
  max-width: 900px;
  margin: 0 auto;
  background-color: #f0f4f8;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 28px;
  margin-bottom: 20px;
  color: #2c3e50;
  font-weight: 700;
`;

const InfoDiv = styled.div`
  background-color: #ffffff;
  padding: 15px 20px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin-bottom: 30px;

  font-size: 18px;
  color: #34495e;
  font-weight: 600;
`;

const SubjectList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SubjectItem = styled.li`
  background-color: #ffffff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.3s ease, transform 0.3s ease;

  &:hover {
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    transform: translateY(-4px);
  }

  a {
    display: block;
    font-size: 22px;
    font-weight: 700;
    color: #2980b9;
    text-decoration: none;

    &:hover {
      color: #3498db;
    }
  }

  p {
    margin-top: 12px;
    font-size: 16px;
    color: #7f8c8d;
    line-height: 1.5;
  }
`;

const CategoryPage = () => {
  const [loading, setLoading] = useState(true);
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const { id } = useParams();

  useEffect(() => {
    const fetchCategoriesSubjects = async () => {
      try {
        const { data } = await api.get(`/categories/${id}/subjects`);
        setSubjects(data);
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
      <Container>
        <InfoDiv>Category id: {id}</InfoDiv>
        <Title>Subjects:</Title>
        {subjects.length === 0 ? (
          <p
            style={{ fontSize: "20px", color: "#bdc3c7", textAlign: "center" }}
          >
            No subjects found.
          </p>
        ) : (
          <SubjectList>
            {subjects.map((subject) => (
              <SubjectItem key={subject._id}>
                <Link to={`/subjects/${subject._id}`}>{subject.name}</Link>
                <p>{subject.description}</p>
              </SubjectItem>
            ))}
          </SubjectList>
        )}
      </Container>
    </>
  );
};

export default CategoryPage;
