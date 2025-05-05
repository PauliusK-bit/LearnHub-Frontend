import { useEffect, useState } from "react";

import { useParams } from "react-router";
import api from "../../api";
import { Activity } from "../../components/types";

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
      <ul>
        <li key={activity._id}>
          <h3>{activity.title}</h3>
          <p>{activity.description}</p>
          <p>{activity.eventDate}</p>
        </li>
      </ul>
    </>
  );
};

export default ActivityPage;
