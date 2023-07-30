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
import notes from "../../assets/notes.svg";
import "./SingleVideo.css";

const SingleVideo = () => {
  const { videoID } = useParams();

  const {
    state: { allVideos },
    dispatch,
    findInWatchList,
    addToWatchLater,
    removeFromWatchLater,
    addNoteModalStatus,
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
          <div className="flex flex-gap-4 flex-space-between video-action">
            <div className="flex flex-gap-4">
              <img
                src="https://picsum.photos/200/300"
                className="user-pic"
                alt="user-pic"
              />
              <div className="fw-bold">{title}</div>
            </div>
            <div className="flex ">
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
                />
              </div>
              {/* <div> */}
              <img
                src={notes}
                className="notes-icon"
                onClick={() =>
                  dispatch({
                    type: "SET_ADD_NOTE_MODAL_STATUS",
                    payload: {
                      key: "addNoteModalStatus",
                      value: !addNoteModalStatus,
                    },
                  })
                }
              />
              {/* </div> */}
            </div>
          </div>
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
