import "./Navigation.css";
import LogoutButton from "./LogoutButton";
import { useAuth } from "./AuthContext";
import { Link } from "react-router";
import ROLES from "../config/roles";

const Navigation = () => {
  const { user } = useAuth();

  return (
    <>
      <nav>
        <ul>
          {!user ? (
            <>
              <li>
                <Link to={"/"}>Home Page</Link>
              </li>
              <li>
                <Link to={"/categories"}>Categories</Link>
              </li>
              <li>
                <Link to={"/activities"}>Events</Link>
              </li>
              <li>
                <Link to={"/login"}>Login</Link>
              </li>
              <li>
                <Link to={"/register"}>Register</Link>
              </li>
            </>
          ) : (
            <>
              {user && user.role === ROLES.ADMIN && (
                <li>
                  <Link to={"/admin-dashboard"}>Admin Dashboard</Link>
                </li>
              )}
              <li>
                <Link to={"/profile"}>Profile</Link>
              </li>
              <li>
                <Link to={"/"}>Home Page</Link>
              </li>
              <li>
                <Link to={"/students"}>Students</Link>
              </li>
              <li>
                <Link to={"/lecturers"}>Lecturers</Link>
              </li>

              <li>
                <Link to={"/subjects"}>Subjects</Link>
              </li>
              <li>
                <LogoutButton />
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
