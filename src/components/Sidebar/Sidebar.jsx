import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faCompass } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import playlistAdd from "../../assets/playlistAdd.svg";
import "./Sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="flex flex-column flex-gap-4 mt-l">
      <div className="fw-bold mt-xs">
        <Link to="/">
          <FontAwesomeIcon icon={faHouse} />
          Home
        </Link>
      </div>
      <div className="fw-bold mt-xs">
        <Link to="explore">
          <FontAwesomeIcon icon={faCompass} />
          Explore
        </Link>
      </div>
      <div className="fw-bold mt-xs">
        <Link to="playlist">
          <img src={playlistAdd} alt="playlist" className="playlist-icon" />
          Playlists
        </Link>
      </div>
      <div className="fw-bold mt-xs">
        <Link to="watch-later">
          <FontAwesomeIcon icon={faClock} />
          Watch Later
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
