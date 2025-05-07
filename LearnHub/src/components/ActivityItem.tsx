import { Link } from "react-router";
import { ActivityProps } from "./types";
import styled from "styled-components";

const EventContainer = styled.div`
  padding: 16px;
  margin: 10px 0;
  background-color: #f0f8ff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const EventTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin: 0;

  a {
    color: #0066cc;
    text-decoration: none;
    transition: color 0.3s;

    &:hover {
      color: #004499;
    }
  }
`;

const ActivityItem = ({ data }: ActivityProps) => {
  const { title, _id } = data;

  return (
    <>
      <EventContainer>
        <EventTitle>
          <Link to={`/activities/${_id}`}>{title}</Link>
        </EventTitle>
      </EventContainer>
    </>
  );
};

export default ActivityItem;
