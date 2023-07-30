import React, { useContext } from "react";
import { VideoContext } from "../../contexts/VideosContext";
import VideoCard from "../../components/VideoCard/VideoCard";

const WatchLater = () => {
  const {
    state: { watchLaterList },
  } = useContext(VideoContext);

  return (
    <div className="flex flex-column flex-gap-4">
      <h3>Watch Later</h3>
      <div className="flex flex-wrap flex-gap-4 mt-xs ">
        {watchLaterList.map((video) => (
          <VideoCard video={video} />
        ))}
      </div>
    </div>
  );
};

export default WatchLater;
