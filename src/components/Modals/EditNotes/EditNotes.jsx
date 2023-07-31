import React from "react";
import "../Modal.css";

const EditNotes = () => {
  return (
    <div className="modal">
      <div className="modal-content relative">
        <button className="btn-close">X</button>
        <form>
          <input type="text" />
          <button>Edit Note</button>
        </form>
      </div>
    </div>
  );
};

export default EditNotes;
