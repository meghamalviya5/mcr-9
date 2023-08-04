import React, { useContext } from "react";
import "../Modal.css";
import { VideoContext } from "../../../contexts/VideosContext";

const EditNotes = ({ video }) => {
  const {
    state: { allVideos, selectedEditNote },
    dispatch,
  } = useContext(VideoContext);

  // if (!editNoteModalStatus) return null;

  const handleEditNote = (e) => {
    dispatch({
      type: "SET_EDIT_NOTE",
      payload: { ...selectedEditNote, note: e.target.value },
    });
  };

  const handleEditNoteSubmit = (e) => {
    e.preventDefault();
    const editedNote = e.target.editedNote;
    console.log(editedNote.value, " --edit note");

    const updatedNotes = video.notes.map((note) =>
      selectedEditNote.noteId === note.noteId
        ? { ...note, note: editedNote.value }
        : note
    );

    const updatedVideos = allVideos.map((vid) =>
      vid._id === video._id ? { ...video, notes: updatedNotes } : vid
    );

    localStorage.setItem("AllVideos", JSON.stringify(updatedVideos));

    dispatch({ type: "UPDATE_VIDEO_NOTES", payload: updatedVideos });
  };

  return (
    <div className="modal">
      <div className="modal-content relative">
        <button
          className="closeBtn"
          onClick={() =>
            dispatch({
              type: "SET_MODAL_STATUS",
              payload: {
                key: "editNoteModalStatus",
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
                key: "editNoteModalStatus",
                value: false,
              },
            });
            handleEditNoteSubmit(e);
          }}
        >
          <input
            type="text"
            name="editedNote"
            value={selectedEditNote.note}
            onChange={handleEditNote}
          />
          <button className="btn-submit">Edit Note</button>
        </form>
      </div>
    </div>
  );
};

export default EditNotes;
