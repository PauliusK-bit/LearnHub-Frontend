import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../config/config";
import { useAuth } from "./AuthContext";
import styled from "styled-components";

const FormWrapper = styled.form`
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #1f2937;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: #fff;
`;

const Title = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: none;
  background-color: #374151;
  color: #fff;
  font-size: 1rem;

  &:focus {
    outline: none;
    background-color: #4b5563;
  }
`;

const Select = styled.select`
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: none;
  background-color: #374151;
  color: #fff;
  font-size: 1rem;

  &:focus {
    outline: none;
    background-color: #4b5563;
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #3b82f6;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2563eb;
  }
`;

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
    <FormWrapper onSubmit={handleSubmit}>
      <Title>Add new Lesson</Title>
      <Input
        type="text"
        placeholder="Pavadinimas"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <Input
        type="url"
        placeholder="Video URL"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        required
      />

      <Select value={level} onChange={(e) => setLevel(e.target.value)}>
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Advanced">Advanced</option>
      </Select>

      <Select value={subjectId} onChange={(e) => setSubjectId(e.target.value)}>
        {subjects.map((subject) => (
          <option key={subject._id} value={subject._id}>
            {subject.name}
          </option>
        ))}
      </Select>

      <Button type="submit">Add Subject Video</Button>
    </FormWrapper>
  );
};

export default VideoForm;
