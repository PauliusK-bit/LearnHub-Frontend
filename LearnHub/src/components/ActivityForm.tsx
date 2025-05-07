import { useEffect, useState } from "react";
import { Activity } from "./types";
import axios from "axios";
import { API_URL } from "../config/config";

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

      <ul>
        {activities.map((activity) => (
          <li key={activity._id}>
            <span>{activity.title}</span>
            <button
              type="button"
              onClick={() => setSelectedActivityId(activity._id)}
            >
              Edit
            </button>
            <button type="button" onClick={() => deleteHandler(activity._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ActivityForm;
