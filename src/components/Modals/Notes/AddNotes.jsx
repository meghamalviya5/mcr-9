import React, { useContext, useRef } from "react";
import "../Modal.css";
import { VideoContext } from "../../../contexts/VideosContext";

const AddNotes = ({ videoID }) => {
  const addNoteModalRef = useRef();

  const { dispatch, addNotesToVideo } = useContext(VideoContext);

  return (
    <div
      className="modal"
      onClick={(e) => {
        console.log(e.currentTarget);
        if (e.target === addNoteModalRef.current)
          dispatch({
            type: "SET_MODAL_STATUS",
            payload: {
              key: "addNoteModalStatus",
              value: false,
            },
          });
      }}
      ref={addNoteModalRef}
    >
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
          <div className="flex flex-col flex-row-gap-1">
            <div className="flex flex-col">
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
