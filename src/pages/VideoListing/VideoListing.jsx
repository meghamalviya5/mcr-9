import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { VideoContext } from "../../contexts/VideosContext";
import "./VideoListing.css";
import VideoCard from "../../components/VideoCard/VideoCard";

const VideoListing = () => {
  const { categoryName } = useParams();
  const {
    state: { allVideos, watchLaterList },
  } = useContext(VideoContext);

  const videosByCategory = allVideos.filter(
    (video) => video.category === categoryName
  );

  console.log(watchLaterList, "watchLaterList");

  return (
    <div className="flex flex-column flex-gap-4">
      <h3>{categoryName}</h3>
      <div className="flex flex-wrap flex-gap-4 mt-xs ">
        {videosByCategory.map((video, id) => (
          <VideoCard video={video} key={id} />
        ))}
      </div>
    </div>
  );
};

export default VideoListing;
