import { useEffect, useState } from "react";
import { Video } from "../../components/types";
import { useParams } from "react-router";
import api from "../../api";

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

    return undefined;
  } catch (error) {
    console.error("Error creating embed URL:", error);

    return undefined;
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
      <h2>Pasirink lygį:</h2>
      <select onChange={(e) => setLevel(e.target.value)} value={level}>
        <option value="all">Visi</option>
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Advanced">Advanced</option>
      </select>
      <div>Subject Id {id}</div>

      <h2>Videos:</h2>
      {filteredVideos.length === 0 ? (
        <p>Videos not found.</p>
      ) : (
        <ul>
          {filteredVideos.map((video) => (
            <li key={video._id}>
              <p>{video.title}</p>
              {video.videoUrl?.includes("youtube.com") ||
              video.videoUrl?.includes("youtu.be") ? (
                <iframe
                  width="560"
                  height="315"
                  src={getEmbedUrl(video.videoUrl)}
                  frameBorder="0"
                  allowFullScreen
                  title={video.title}
                ></iframe>
              ) : (
                <img src={video.videoUrl} alt="" />
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default VideoPage;
