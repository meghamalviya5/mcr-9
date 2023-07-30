import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { VideoContext } from "../../contexts/VideosContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faClock as faSolidClock,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { faClock as faRegularClock } from "@fortawesome/free-regular-svg-icons";
import playlistAdd from "../../assets/playlistAdd.svg";
import notesAdd from "../../assets/notesAdd.svg";
import "./SingleVideo.css";

import AddPlayList from "../../components/Modals/AddPlaylist/AddPlayList";
import AddNotes from "../../components/Modals/Notes/AddNotes";

const SingleVideo = () => {
  const { videoID } = useParams();

  const {
    state: { allVideos, addNoteModalStatus, addPlaylistModalStatus },
    dispatch,
    findInWatchList,
    addToWatchLater,
    removeFromWatchLater,
  } = useContext(VideoContext);

  console.log("videoID in single: ", videoID);

  const { _id, title, src, notes } = allVideos.find(
    (video) => video._id === Number(videoID)
  );

  return (
    <div className="container">
      <div className="single-video-main">
        <div>
          <iframe
            width="800"
            height="427"
            src={src}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
          />
          <div className="flex flex-gap-4 flex-space-between video-info">
            <div className="flex flex-gap-4">
              <img
                src="https://picsum.photos/200/300"
                className="user-pic"
                alt="user-pic"
              />
              <div className="fw-bold">{title}</div>
            </div>
            <div className="flex video-action">
              <div>
                {findInWatchList(_id) ? (
                  <FontAwesomeIcon
                    icon={faSolidClock}
                    className="txt-cursor"
                    onClick={() => removeFromWatchLater(_id)}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faRegularClock}
                    className="txt-cursor"
                    onClick={() => addToWatchLater(_id)}
                  />
                )}
              </div>
              <div>
                <img
                  src={playlistAdd}
                  alt="playlist"
                  className="playlist-icon"
                  onClick={() =>
                    dispatch({
                      type: "SET_MODAL_STATUS",
                      payload: {
                        key: "addNoteModalStatus",
                        value: !addNoteModalStatus,
                      },
                    })
                  }
                />
              </div>
              <div>
                <img
                  src={notesAdd}
                  className="notes-icon"
                  onClick={() =>
                    dispatch({
                      type: "SET_MODAL_STATUS",
                      payload: {
                        key: "addNoteModalStatus",
                        value: !addNoteModalStatus,
                      },
                    })
                  }
                />
              </div>
            </div>
          </div>
          {addNoteModalStatus ? <AddNotes videoID={_id} /> : null}
          {addPlaylistModalStatus ? <AddPlayList videoID={_id} /> : null}
        </div>
        <div>
          <h3 className="mt-m">My Notes</h3>
          {notes.map((note) => (
            <div className="flex flex-space-between">
              <div>{note}</div>
              <div>
                <FontAwesomeIcon icon={faEdit} />
                <FontAwesomeIcon icon={faTrash} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="more-videos-sidebar">More Videos</div>
    </div>
  );
};

export default SingleVideo;
