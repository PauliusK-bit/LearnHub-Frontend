import { useEffect, useState } from "react";
import { Video } from "../../components/types";
import { useParams } from "react-router";
import api from "../../api";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 30px;
  max-width: 900px;
  margin: 0 auto;
  background-color: #294c60;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
`;

const Heading = styled.h2`
  font-size: 24px;
  color: #2c3e50;
  margin-bottom: 12px;
`;

const SelectStyled = styled.select`
  padding: 10px 14px;
  margin-bottom: 20px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #294c60;
  background-color: #001b2e;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    border-color: #3498db;
    box-shadow: 0 0 8px rgba(52, 152, 219, 0.3);
  }
`;

const VideoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const VideoItem = styled.li`
  background-color: #193221;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 600px) {
    padding: 10px;
  }
`;

const VideoTitle = styled.p`
  font-size: 20px;
  font-weight: 600;
  color: #34495e;
  margin-bottom: 12px;
  text-align: center;
`;

const MediaContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  iframe,
  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

function getEmbedUrl(url: string) {
  try {
    const urlObj = new URL(url);
    let videoId = "";

    if (urlObj.hostname === "youtu.be") {
      videoId = urlObj.pathname.slice(1);
    } else if (urlObj.hostname.includes("youtube.com")) {
      videoId = urlObj.searchParams.get("v") || "";
    }
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
  } catch (error) {
    console.error("Error creating embed URL:", error);
  }
}

const VideoPage = () => {
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState<Video[]>([]);
  const [level, setLevel] = useState("all");

  const { id } = useParams();

  useEffect(() => {
    const fetchSubjectVideos = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/subjects/${id}/videos`);
        setVideos(data);
      } catch (error) {
        console.log("Something went wrong", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSubjectVideos();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const filteredVideos =
    level === "all" ? videos : videos.filter((video) => video.level === level);

  return (
    <>
      <Wrapper>
        <Heading>Choose level:</Heading>
        <SelectStyled onChange={(e) => setLevel(e.target.value)} value={level}>
          <option value="all">Visi</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </SelectStyled>

        <div>Subject Id: {id}</div>

        <Heading>Videos:</Heading>
        {filteredVideos.length === 0 ? (
          <p style={{ textAlign: "center", fontSize: "18px", color: "#777" }}>
            Videos not found.
          </p>
        ) : (
          <VideoList>
            {filteredVideos.map((video) => (
              <VideoItem key={video._id}>
                <VideoTitle>{video.title}</VideoTitle>
                <MediaContainer>
                  {video.videoUrl?.includes("youtube.com") ||
                  video.videoUrl?.includes("youtu.be") ? (
                    <iframe
                      src={getEmbedUrl(video.videoUrl)}
                      frameBorder="0"
                      allowFullScreen
                      title={video.title}
                    ></iframe>
                  ) : (
                    <img src={video.videoUrl} alt={video.title} />
                  )}
                </MediaContainer>
              </VideoItem>
            ))}
          </VideoList>
        )}
      </Wrapper>
    </>
  );
};

export default VideoPage;
