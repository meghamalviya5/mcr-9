import React, { useContext } from "react";
import { VideoContext } from "../../contexts/VideosContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock as faSolidClock } from "@fortawesome/free-solid-svg-icons";
import { faClock as faRegularClock } from "@fortawesome/free-regular-svg-icons";
import "./VideoCard.css";
import { Link } from "react-router-dom";

const VideoCard = ({ video }) => {
  const { findInWatchList, addToWatchLater, removeFromWatchLater } =
    useContext(VideoContext);

  const { _id, title, views, thumbnail, category, creator } = video;
  return (
    <div>
      <div
        key={_id}
        className="flex flex-column flex-gap-2 relative video-card"
      >
        <div>
          <Link to={`/single-video/${_id}`} className="relative">
            <img src={thumbnail} alt="video-thumbnail" />
          </Link>
        </div>

        <div className="absolute white-bg watch-later-icon">
          {findInWatchList(_id) ? (
            <FontAwesomeIcon
              icon={faSolidClock}
              className="primary-color txt-cursor"
              onClick={() => removeFromWatchLater(_id)}
            />
          ) : (
            <FontAwesomeIcon
              icon={faRegularClock}
              className="primary-color txt-cursor"
              onClick={() => addToWatchLater(_id)}
            />
          )}
        </div>
        <div className="flex flex-gap-4">
          <img
            src="https://picsum.photos/200/300"
            className="user-pic"
            alt="user-pic"
          />
          <div className="fw-bold">{title}</div>
        </div>
        <div className="fw-bold">{category}</div>
        <small className="grey-color">
          {views} | {creator}
        </small>
      </div>
    </div>
  );
};

export default VideoCard;
