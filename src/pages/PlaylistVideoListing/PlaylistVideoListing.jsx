import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import VideoCard from "../../components/VideoCard/VideoCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { VideoContext } from "../../contexts/VideosContext";

const PlaylistVideoListing = () => {
  const { playlistID } = useParams();
  const { deletePlaylistVideo } = useContext(VideoContext);

  const playlist = JSON.parse(localStorage.getItem("Playlists")).find(
    (playlist) => playlist.id === playlistID
  );

  const playlistVideos = playlist?.videos;

  return (
    <div>
      {playlistVideos?.map((video, id) => (
        <div>
          <FontAwesomeIcon
            icon={faTrash}
            onClick={() => deletePlaylistVideo(playlistID, video._id)}
          />
          <VideoCard video={video} key={id} />
        </div>
      ))}
    </div>
  );
};

export default PlaylistVideoListing;
