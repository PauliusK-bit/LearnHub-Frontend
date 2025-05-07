import styled from "styled-components";
import { LecturerProps } from "./types";
import { Link } from "react-router";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: flex-start;
  padding: 20px;
  width: 100%;
`;

const Card = styled.div`
  width: 300px;

  padding: 20px;
  border-radius: 15px;
  background-color: #1f2937;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #f9fafb;
  transition: transform 0.3s, box-shadow 0.3s;
  flex: 0 0 auto;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
  }

  @media (max-width: 768px) {
    width: calc(50% - 20px);
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const Name = styled.h2`
  font-size: 1.8em;
  margin: 0 0 10px 0;
  font-weight: 700;
`;

const Surname = styled.h3`
  font-size: 1.4em;
  margin: 0 0 15px 0;
  font-weight: 500;
  color: #9ca3af;
`;

const Email = styled.p`
  font-size: 1em;
  font-style: italic;
  color: #9ca3af;
  margin: 0;
`;

const LecturerItem = ({ data }: LecturerProps) => {
  const { name, surname, email, _id } = data;

  return (
    <>
      <Container>
        <Card>
          <Name>{name}</Name>
          <Surname>{surname}</Surname>
          <Email>{email}</Email>
          <Link to={`/lecturers/${_id}`}>Groups</Link>
        </Card>
      </Container>
    </>
  );
};

export default LecturerItem;
