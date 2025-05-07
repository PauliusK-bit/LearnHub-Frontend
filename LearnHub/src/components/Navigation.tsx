import "./Navigation.css";
import LogoutButton from "./LogoutButton";
import { useAuth } from "./AuthContext";
import { Link } from "react-router";
import ROLES from "../config/roles";

const Navigation = () => {
  const { user } = useAuth();

  // return (
  //   <>
  //     <nav>
  //       <ul>
  //         {!user ? (
  //           <>
  //             <li>
  //               <Link to={"/"}>Home Page</Link>
  //             </li>
  //             <li>
  //               <Link to={"/categories"}>Categories</Link>
  //             </li>
  //             <li>
  //               <Link to={"/activities"}>Events</Link>
  //             </li>
  //             <li>
  //               <Link to={"/login"}>Login</Link>
  //             </li>
  //             <li>
  //               <Link to={"/register"}>Register</Link>
  //             </li>
  //           </>
  //         ) : (
  //           <>
  //             {user && user.role === ROLES.ADMIN && (
  //               <li>
  //                 <Link to={"/admin-dashboard"}>Admin Dashboard</Link>
  //               </li>
  //             )}
  //             {user && user.role === ROLES.LECTURER && (
  //               <ul>
  //                 <li>
  //                   <Link to={"/students-control"}>Manage Students</Link>
  //                 </li>
  //                 <li>
  //                   <Link to={"/subjects-control"}>Manage Subjects</Link>
  //                 </li>
  //                 <li>
  //                   <Link to={"/videos"}>Add Video Lesson</Link>
  //                 </li>
  //                 <li>
  //                   <Link to={"/students"}>Students</Link>
  //                 </li>
  //                 <li>
  //                   <Link to={"/lecturers"}>Lecturers</Link>
  //                 </li>
  //               </ul>
  //             )}
  //             {user && user.role === ROLES.STUDENT && (
  //               <ul>
  //                 <li>
  //                   <Link to={"/subjects/:id"}></Link>
  //                 </li>
  //                 <li>
  //                   <Link to={"/subjects"}>Subjects</Link>
  //                 </li>
  //               </ul>
  //             )}
  //             <li>
  //               <Link to={"/profile"}>Profile</Link>
  //             </li>
  //             <li>
  //               <Link to={"/"}>Home Page</Link>
  //             </li>

  //             <li>
  //               <LogoutButton />
  //             </li>
  //           </>
  //         )}
  //       </ul>
  //     </nav>
  //   </>
  // );

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/">Homepage</Link>
            </li>
            <li>
              <Link to="/portfolio">Portfolio</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="navbar-center">
        <Link className="btn btn-ghost text-xl" to="/">
          Learn Hub
        </Link>
      </div>

      <div className="navbar-end">
        {user ? (
          <>
            {user.role === ROLES.ADMIN && (
              <Link to="/admin-dashboard" className="btn btn-ghost mr-2">
                Admin Dashboard
              </Link>
            )}
            {user.role === ROLES.LECTURER && (
              <>
                <Link to="/students-control" className="btn btn-ghost mr-2">
                  Manage Students
                </Link>
                <Link to="/subjects-control" className="btn btn-ghost mr-2">
                  Manage Subjects
                </Link>
                <Link to="/videos" className="btn btn-ghost mr-2">
                  Add Video Lesson
                </Link>
              </>
            )}
            {user.role === ROLES.STUDENT && (
              <>
                <Link to="/subjects" className="btn btn-ghost mr-2">
                  Subjects
                </Link>
              </>
            )}
            <Link to="/profile" className="btn btn-ghost mr-2">
              Profile
            </Link>
            <LogoutButton />
          </>
        ) : (
          <>
            <Link to="/" className="btn btn-ghost mr-2">
              Home Page
            </Link>
            <Link to="/categories" className="btn btn-ghost mr-2">
              Categories
            </Link>
            <Link to="/activities" className="btn btn-ghost mr-2">
              Events
            </Link>
            <Link to="/login" className="btn btn-ghost mr-2">
              Login
            </Link>
            <Link to="/register" className="btn btn-ghost">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navigation;
