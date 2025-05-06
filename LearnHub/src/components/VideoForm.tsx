import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../config/config";

import { useAuth } from "./AuthContext";

const VideoForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [level, setLevel] = useState("Beginner");
  const [subjectId, setSubjectId] = useState("");
  const [subjects, setSubjects] = useState<{ _id: string; name: string }[]>([]);

  const { user } = useAuth();

  const allowedRoles = ["LECTURER", "ADMIN"];

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const { data } = await axios(`${API_URL}/subjects`);
        setSubjects(data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    fetchSubjects();
  }, []);

  if (!user || !allowedRoles.includes(user.role)) {
    return <p>This page can see only Lecturer and Admin</p>;
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const newVideo = { title, videoUrl, level, subjectId };

    try {
      await axios.post(`${API_URL}/videos`, newVideo);

      alert("Video added successfully!");

      setTitle("");
      setVideoUrl("");
      setLevel("Beginner");
      setSubjectId(subjects[0]?._id || "");
    } catch (error) {
      console.error("Error adding video:", error);
      alert("Failed to add video. See console for details.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Pridėti naują video</h3>
      <input
        type="text"
        placeholder="Pavadinimas"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <input
        type="url"
        placeholder="Video URL"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        required
      />

      <select value={level} onChange={(e) => setLevel(e.target.value)}>
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Advanced">Advanced</option>
      </select>

      <select value={subjectId} onChange={(e) => setSubjectId(e.target.value)}>
        {subjects.map((subject) => (
          <option key={subject._id} value={subject._id}>
            {subject.name}
          </option>
        ))}
      </select>

      <button type="submit">Add Subject Video</button>
    </form>
  );
};

export default VideoForm;
