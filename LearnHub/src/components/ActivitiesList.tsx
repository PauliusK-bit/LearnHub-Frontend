import { useEffect, useState } from "react";
import api from "../api";
import { Activity } from "./types";
import ActivityItem from "./ActivityItem";

const ActivitiesList = () => {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchActivitiesData = async () => {
      try {
        const { data } = await api.get("/activities");

        setActivities(data);
      } catch (err) {
        console.log("Failed to fetching activities", err);
      }
    };
    fetchActivitiesData();
  }, []);

  return (
    <>
      <div>
        {activities.map((activity, index) => (
          <ActivityItem key={index} data={activity} />
        ))}
      </div>
    </>
  );
};

export default ActivitiesList;
