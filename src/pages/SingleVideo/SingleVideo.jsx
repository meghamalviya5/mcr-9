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
import OutsideClickHandler from "react-outside-click-handler";
import playlistAdd from "../../assets/playlistAdd.svg";
import notesAdd from "../../assets/notesAdd.svg";
import "./SingleVideo.css";

import AddPlayList from "../../components/Modals/AddPlaylist/AddPlayList";
import AddNotes from "../../components/Modals/AddNotes/AddNotes";
import EditNotes from "../../components/Modals/EditNotes/EditNotes";

const SingleVideo = () => {
  const { videoID } = useParams();

  const {
    state: {
      allVideos,
      addNoteModalStatus,
      addPlaylistModalStatus,
      editNoteModalStatus,
    },
    dispatch,
    findInWatchList,
    addToWatchLater,
    removeFromWatchLater,
    editNote,
    deleteNote,
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
            <div className="flex flex-gap-4 flex-align-center">
              <img
                src="https://picsum.photos/200/300"
                className="user-pic"
                alt="user-pic"
              />
              <div className="fw-bold">{title}</div>
            </div>
            <div className="flex video-action relative">
              <div>
                {findInWatchList(_id) ? (
                  <FontAwesomeIcon
                    icon={faSolidClock}
                    className="txt-cursor txt-cursor"
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
                  className="playlist-icon txt-cursor"
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
                  className="notes-icon txt-cursor"
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
              <OutsideClickHandler
                onOutsideClick={() =>
                  dispatch({
                    type: "SET_MODAL_STATUS",
                    payload: {
                      key: "addNoteModalStatus",
                      value: false,
                    },
                  })
                }
              >
                {addNoteModalStatus ? <AddNotes videoID={_id} /> : null}
                {addPlaylistModalStatus ? <AddPlayList videoID={_id} /> : null}
              </OutsideClickHandler>
            </div>
          </div>
        </div>
        <div>
          <h3 className="mt-m">My Notes</h3>
          {notes.map((note) => (
            <div className="flex flex-space-between">
              <div>{note}</div>
              <div>
                <FontAwesomeIcon
                  icon={faEdit}
                  onClick={(e) => {
                    dispatch({
                      type: "SET_MODAL_STATUS",
                      payload: {
                        key: "editNoteModalStatus",
                        value: !editNoteModalStatus,
                      },
                    });
                    editNote(note, _id);
                  }}
                  className="txt-cursor"
                />

                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={() => deleteNote(note, _id)}
                  className="txt-cursor"
                />
                <OutsideClickHandler
                  onOutsideClick={() =>
                    dispatch({
                      type: "SET_MODAL_STATUS",
                      payload: {
                        key: "editNoteModalStatus",
                        value: false,
                      },
                    })
                  }
                >
                  {editNoteModalStatus ? <EditNotes /> : null}
                </OutsideClickHandler>
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
