import { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../../api";
import { Activity } from "../../components/types";
import styled from "styled-components";

const EventCard = styled.li`
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
  padding: 20px;
  margin-bottom: 25px;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  }
`;

const Title = styled.h3`
  font-size: 24px;
  margin-bottom: 12px;
  color: #2c3e50;
`;

const Description = styled.p`
  font-size: 16px;
  color: #34495e;
  margin-bottom: 10px;
`;

const DateText = styled.p`
  font-size: 14px;
  color: #7f8c8d;
  margin-top: 8px;
`;

const ActivityPage = () => {
  const [loading, setLoading] = useState(true);
  const [activity, setActivity] = useState<Activity | null>(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const { data } = await api.get(`/activities/${id}`);
        setActivity(data);
      } catch (error) {
        console.log("Something went wrong", error);
      } finally {
        setLoading(false);
      }
    };
    fetchActivity();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!activity) {
    return <p>No activity found.</p>;
  }

  return (
    <>
      <div>Activity id: {id}</div>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <EventCard>
          <Title>Title: {activity.title}</Title>
          <Description>Description: {activity.description}</Description>
          <DateText>Date: {activity.eventDate}</DateText>
        </EventCard>
      </ul>
    </>
  );
};

export default ActivityPage;
