import { Link } from "react-router";
import { ActivityProps } from "./types";

const ActivityItem = ({ data }: ActivityProps) => {
  const { title, _id } = data;

  return (
    <>
      <div>
        <h2>
          <Link to={`/activities/${_id}`}>{title}</Link>
        </h2>
      </div>
    </>
  );
};

export default ActivityItem;
