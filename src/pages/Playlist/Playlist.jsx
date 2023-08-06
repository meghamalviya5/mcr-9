import React, { useContext } from "react";
import { VideoContext } from "../../contexts/VideosContext";
import "./Playlist.css";
import OutsideClickHandler from "react-outside-click-handler";
import AddMorePlaylist from "../../components/Modals/AddMorePlaylist/AddMorePlaylist";
import { Link } from "react-router-dom";

const Playlist = () => {
  const {
    state: { playlist, addMorePlaylistModalStatus },
    dispatch,
    deletePlaylist,
  } = useContext(VideoContext);

  return (
    <div>
      {playlist.map((singleList) => (
        <Link to={`/playlist/${singleList.id}`} className="link">
          <div className="flex flex-dir-col playlist-card" key={singleList.id}>
            <div
              className="txt-cursor"
              onClick={(e) => deletePlaylist(e, singleList.id)}
            >
              X
            </div>
            <img
              src="https://picsum.photos/290/174"
              alt="playlist-thumbnail"
              className="playlist-pic"
            />
            <h4>{singleList.title}</h4>
            <small>{singleList.description}</small>
          </div>
        </Link>
      ))}
      <h2 className="txt-cursor">
        <i
          className="bi bi-plus-circle"
          onClick={() => {
            dispatch({
              type: "SET_MODAL_STATUS",
              payload: { key: "addMorePlaylistModalStatus", value: true },
            });
          }}
        ></i>
      </h2>
      {addMorePlaylistModalStatus ? (
        <OutsideClickHandler
          onOutsideClick={() =>
            dispatch({
              type: "SET_MODAL_STATUS",
              payload: { key: "addMorePlaylistModalStatus", value: false },
            })
          }
        >
          <AddMorePlaylist />
        </OutsideClickHandler>
      ) : null}
    </div>
  );
};

export default Playlist;
