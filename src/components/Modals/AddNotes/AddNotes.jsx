import React, { useContext, useRef } from "react";
import "../Modal.css";
import { VideoContext } from "../../../contexts/VideosContext";

const AddNotes = ({ videoID }) => {
  console.log("in add notes");

  const {
    state: { addNoteModalStatus },
    dispatch,
    addNotesToVideo,
  } = useContext(VideoContext);

  if (!addNoteModalStatus) return null;

  return (
    <div className="modal">
      <div className="modal-content relative">
        <button
          className="closeBtn"
          onClick={() =>
            dispatch({
              type: "SET_MODAL_STATUS",
              payload: {
                key: "addNoteModalStatus",
                value: false,
              },
            })
          }
        >
          X
        </button>

        <form
          onSubmit={(e) => {
            addNotesToVideo(e, videoID);
            dispatch({
              type: "SET_MODAL_STATUS",
              payload: {
                key: "addNoteModalStatus",
                value: false,
              },
            });
          }}
        >
          <div className="flex flex-column flex-gap-2">
            <div className="flex flex-column">
              <input
                type="text"
                name="note"
                className="form-input"
                placeholder="New notes"
              />
            </div>

            <button type="submit" className="btn-add">
              Add New Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNotes;
