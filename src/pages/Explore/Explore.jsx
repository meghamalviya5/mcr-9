import React, { useContext } from "react";
import VideoCard from "../../components/VideoCard/VideoCard";
import { VideoContext } from "../../contexts/VideosContext";
import "./Explore.css";

const Explore = () => {
  const {
    state: { filteredVideos },
    searchVideoByTitle,
  } = useContext(VideoContext);

  return (
    <div className="flex flex-column flex-gap-4">
      <h3>Explore</h3>
      <div>
        <input
          type="search"
          placeholder="Search video by title"
          onChange={searchVideoByTitle}
          className="search-video"
        />
      </div>
      <div className="flex flex-wrap flex-gap-4 mt-xs ">
        {filteredVideos.map((video) => (
          <VideoCard video={video} />
        ))}
      </div>
    </div>
  );
};

export default Explore;
