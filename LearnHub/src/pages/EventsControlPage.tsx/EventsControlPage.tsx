import ActivityForm from "../../components/ActivityForm";
import { useAuth } from "../../components/AuthContext";

const EventsControlPage = () => {
  const { user } = useAuth();

  const allowedRoles = ["ADMIN"];

  if (!user || !allowedRoles.includes(user.role)) {
    return <p>This page can see only Admin and Lecturer</p>;
  }

  return (
    <>
      <ActivityForm />
    </>
  );
};

export default EventsControlPage;
