import React, { useContext, useRef } from "react";
import "./AddNotes.css";
import { VideoContext } from "../../../contexts/VideosContext";

const AddNotes = () => {
  const addNoteModalRef = useRef();

  const { dispatch } = useContext(VideoContext);

  return (
    <div
      className="modal"
      onClick={(e) => {
        console.log(e.currentTarget);
        if (e.target === addNoteModalRef.current)
          dispatch({
            type: "SET_ADD_NOTE_MODAL_STATUS",
            payload: {
              key: "addNoteModalStatus",
              value: !addNoteModalStatus,
            },
          });
      }}
      ref={addNoteModalRef}
    >
      <div className="modal-content relative">
        {/* <div className="modalHeader flex flex-col">
          <p className="heading">Complete your RSVP</p>
          <p className="sub-heading">Fill in your personal information.</p>
        </div> */}
        <button
          className="closeBtn"
          onClick={() =>
            dispatch({
              type: "ADD_REVIEW_MODAL_STATUS",
              payload: false,
            })
          }
        >
          X
        </button>

        <form
          onSubmit={() => {
            dispatch({ type: "SET_ADD_RSVP_MODAL_STATUS", payload: false });
            dispatch({
              type: "SET_RSVP_BUTTON_TEXT",
              payload: "Already RSVPed",
            });
            dispatch({ type: "SET_RSVP_DISABLED_STATUS", payload: true });
          }}
        >
          <div className="flex flex-col flex-row-gap-1">
            <div className="flex flex-col">
              <input
                type="text"
                className="form-input"
                placeholder="New notes"
              />
            </div>

            <button type="submit" className="btn-rsvp">
              Add New Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNotes;
