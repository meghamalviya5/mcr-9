import React, { useContext } from "react";
import "../Modal.css";
import { VideoContext } from "../../../contexts/VideosContext";

const AddPlayList = () => {
  // const addPlaylistModalRef = useRef();

  const {
    state: { playlist },
    dispatch,
    createPlaylist,
    deletePlaylist,
  } = useContext(VideoContext);

  return (
    <div className="modal">
      <div className="modal-content relative">
        <div className="modalHeader flex flex-column">
          <p className="heading">Add to Playlist</p>
        </div>
        <button
          className="closeBtn"
          onClick={() =>
            dispatch({
              type: "SET_MODAL_STATUS",
              payload: {
                key: "addPlaylistModalStatus",
                value: false,
              },
            })
          }
        >
          X
        </button>

        <form
          onSubmit={(e) => {
            dispatch({
              type: "SET_MODAL_STATUS",
              payload: {
                key: "addPlaylistModalStatus",
                value: false,
              },
            });
            createPlaylist(e);
          }}
        >
          <div className="flex flex-column flex-row-gap-1">
            <div className="flex flex-column">
              <input
                type="text"
                className="form-input"
                name="title"
                placeholder="Enter title of your playlist"
              />
            </div>
            <div className="flex flex-col">
              <input
                type="text"
                className="form-input"
                name="description"
                placeholder="Write a description"
              />
            </div>

            <button type="submit" className="btn-rsvp">
              Create New Playlist
            </button>
            {playlist.map(({ id, title }) => (
              <div className="flex flex-space-between" key={id}>
                <p>{title}</p>
                <span onClick={(e) => deletePlaylist(e, id)}>X</span>
              </div>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPlayList;
