import { Link } from "react-router";

const AdminPage: React.FC = () => {
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
            <Link to="/admin/categories" className="admin-button">
              Manage Events
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
