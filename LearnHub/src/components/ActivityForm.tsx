import { useEffect, useState } from "react";
import { Activity } from "./types";
import axios from "axios";
import { API_URL } from "../config/config";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  padding: 20px;
`;

const Card = styled.div`
  background-color: #1f2937;
  color: #fff;
  border-radius: 10px;
  padding: 16px;
  width: 100%;
  max-width: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  }
`;

const Title = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 12px;
`;

const ButtonGroup = styled.div`
  margin-top: auto;
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s;
`;

const ActivityForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventData] = useState("");
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivityId, setSelectedActivityId] = useState<string | null>(
    null
  );

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/activities`);
        setActivities(data);

        if (selectedActivityId) {
          const selectedActivity: Activity | undefined = data.find(
            (activity: Activity) => activity._id === selectedActivityId
          );
          if (selectedActivityId) {
            if (selectedActivity) {
              setTitle(selectedActivity.title);
              setDescription(selectedActivity.description);
              setEventData(selectedActivity.eventDate);
            }
          } else {
            setTitle("");
            setDescription("");
            setEventData("");
          }
        } else {
          setTitle("");
          setDescription("");
          setEventData("");
        }
      } catch (error) {
        console.error("Klaida gaunant events:", error);
      }
    };

    fetchActivities();
  }, [selectedActivityId]);

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (selectedActivityId) {
        const updatedActivity: Activity = {
          _id: selectedActivityId,
          title,
          description,
          eventDate,
        };

        await axios.put(
          `${API_URL}/activities/${selectedActivityId}`,
          updatedActivity
        );
        setActivities((prevActivities) =>
          prevActivities.map((activity) =>
            activity._id === selectedActivityId ? updatedActivity : activity
          )
        );
      } else {
        const newActivity: Activity = {
          title,
          description,
          eventDate,
        };

        const { data } = await axios.post(`${API_URL}/activities`, newActivity);

        setActivities((prevActivities) => [...prevActivities, data]);
      }

      setTitle("");
      setDescription("");
      setEventData("");
      setSelectedActivityId(null);
    } catch (error) {
      console.log("Activity was not created/updated", error);
    }
  };

  const deleteHandler = async (activityId: string) => {
    try {
      await axios.delete(`${API_URL}/activities/${activityId}`);

      setActivities((prevActivites) =>
        prevActivites.filter((activity) => activity._id !== activityId)
      );
    } catch (error) {
      console.error("Error deleting event :(", error);
    }
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <div className="form-control">
          <label htmlFor="name">Title:</label>
          <input
            className="input"
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>

        <div className="form-control">
          <label htmlFor="capital">Description:</label>
          <input
            className="input"
            type="text"
            id="description"
            name="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>

        <div className="form-control">
          <label htmlFor="password">Date:</label>
          <input
            className="input"
            type="date"
            id="eventDate"
            name="eventDate"
            value={eventDate}
            onChange={(event) => setEventData(event.target.value)}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "green",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          {selectedActivityId ? "Update Event" : "Add Event"}
        </button>
      </form>

      <Container>
        {activities.map((activity) => (
          <Card key={activity._id}>
            <Title>{activity.title}</Title>
            <ButtonGroup>
              <Button
                className="btn btn-outline btn-info"
                type="button"
                onClick={() => setSelectedActivityId(activity._id)}
              >
                Edit
              </Button>
              <Button
                className="btn btn-outline btn-error"
                type="button"
                onClick={() => deleteHandler(activity._id)}
              >
                Delete
              </Button>
            </ButtonGroup>
          </Card>
        ))}
      </Container>
    </>
  );
};

export default ActivityForm;
