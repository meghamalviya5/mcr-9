import React, { useContext } from "react";
import { VideoContext } from "../../../contexts/VideosContext";
import "../Modal.css";

const AddMorePlaylist = () => {
  const { createPlaylist, dispatch } = useContext(VideoContext);
  console.log("in add more playlist");

  const closeAddMoreModal = () => {
    dispatch({
      type: "SET_MODAL_STATUS",
      payload: {
        key: "addMorePlaylistModalStatus",
        value: false,
      },
    });
  };

  return (
    <div className="modal">
      <div className="modalHeader flex flex-column">
        <p className="heading">Add To Playlist</p>
      </div>
      <button className="closeBtn" onClick={closeAddMoreModal}>
        X
      </button>
      <div>
        <form
          onSubmit={(e) => {
            closeAddMoreModal();
            createPlaylist(e);
          }}
        >
          <input type="text" placeholder="Enter title" name="title" />
          <input
            type="text"
            placeholder="Write playlist description"
            name="description"
          />
          <button>Create New Playlist</button>
        </form>
      </div>
    </div>
  );
};

export default AddMorePlaylist;
