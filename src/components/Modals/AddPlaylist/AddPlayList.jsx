import React, { useContext, useRef } from "react";
import "../Modal.css";
import { VideoContext } from "../../../contexts/VideosContext";

const AddPlayList = () => {
  const addPlaylistModalRef = useRef();

  const {
    state: { addPlaylistModalStatus },
    dispatch,
  } = useContext(VideoContext);

  return (
    <div
      className="modal"
      onClick={(e) => {
        console.log(e.currentTarget);
        if (e.target === addPlaylistModalRef.current)
          dispatch({
            type: "SET_MODAL_STATUS",
            payload: {
              key: "addPlaylistModalStatus",
              value: !addPlaylistModalStatus,
            },
          });
      }}
      ref={addPlaylistModalRef}
    >
      <div className="modal-content relative">
        <div className="modalHeader flex flex-col">
          <p className="heading">Add to Playlist</p>
          <p className="sub-heading">Fill in your personal information.</p>
        </div>
        <button
          className="closeBtn"
          // onClick={() =>
          //   dispatch({
          //     type: "ADD_REVIEW_MODAL_STATUS",
          //     payload: false,
          //   })
          // }
        >
          X
        </button>

        <form
          onSubmit={() => {
            // dispatch({ type: "SET_ADD_RSVP_MODAL_STATUS", payload: false });
            // dispatch({
            //   type: "SET_RSVP_BUTTON_TEXT",
            //   payload: "Already RSVPed",
            // });
          }}
        >
          <div className="flex flex-col flex-row-gap-1">
            <div className="flex flex-col">
              <input
                type="text"
                className="form-input"
                placeholder="New Playlists"
              />
            </div>

            <button type="submit" className="btn-rsvp">
              Add New Playlist
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPlayList;
