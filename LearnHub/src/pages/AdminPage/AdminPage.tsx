import { Link } from "react-router";
import { useAuth } from "../../components/AuthContext";

const AdminPage: React.FC = () => {
  const { user } = useAuth();

  if (!user || user.role !== "ADMIN") {
    return <div>This page can see only ADMIN</div>;
  }
  return (
    <>
      <div className="admin-panel">
        <h1>Administravimo puslapis</h1>

        <div className="admin-buttons">
          <div className="admin-button-wrapper">
            <Link to="/lecturers-control" className="admin-button">
              Manage Lecturers
            </Link>
          </div>
          <div className="admin-button-wrapper">
            <Link to="/students-control" className="admin-button">
              Manage Students
            </Link>
          </div>
          <div className="admin-button-wrapper">
            <Link to="/categories-control" className="admin-button">
              Manage Categories
            </Link>
          </div>
          <div className="admin-button-wrapper">
            <Link to="/subjects-control" className="admin-button">
              Manage Subjects
            </Link>
          </div>
          <div className="admin-button-wrapper">
            <Link to="/events-control" className="admin-button">
              Manage Events
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
