import { useEffect, useState } from "react";
import { useAuth } from "../../components/AuthContext";
import api from "../../api";

interface UserProfile {
  username: string;
  email: string;
  name: string;
  surname: string;
  role: string;
}

const ProfilePage = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get("/users");
        const currentUser = data.find(
          (user: { _id: string }) => user._id === user?._id
        );
        setProfile(currentUser);
      } catch {
        setError("Something went wrong with user information");
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === "ADMIN") {
      fetchProfile();
    } else {
      setError("Only administrator can see this profile");
      setLoading(false);
    }
  }, [user]);

  if (loading) return <div>Kraunama...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div className="navigation-bar"></div>
      <div className="profile-page">
        <h2>Naudotojo profilis</h2>
        {profile && (
          <div className="profile-card">
            <p>
              <strong>Username:</strong> {profile.username}
            </p>
            <p>
              <strong>Email:</strong> {profile.email}
            </p>
            <p>
              <strong>Name:</strong> {profile.name}
            </p>

            <p>
              <strong>Rolė:</strong> {profile.role}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfilePage;
