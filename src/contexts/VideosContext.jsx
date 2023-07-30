import { createContext, useReducer } from "react";
import { videos } from "../backend/db/videos";
import { videosReducer } from "../reducers/VideosReducer";
import { categories } from "../backend/db/categories";

export const VideoContext = createContext();

const VideoContextProvider = ({ children }) => {
  const initialState = {
    categories: categories,
    allVideos: videos,
    filteredVideos: videos,
    watchLaterList: JSON.parse(
      localStorage.getItem("WatchLaterVideos") || "[]"
    ),
    playlist: JSON.parse(localStorage.getItem("Playlist") || "[]"),
    addNoteModalStatus: false,
    addPlaylistModalStatus: false,
  };

  const [state, dispatch] = useReducer(videosReducer, initialState);

  const addToWatchLater = (videoID) => {
    const video = state.allVideos.find((video) => video._id === videoID);
    //console.log(video, " --object");
    if (localStorage.getItem("WatchLaterVideos")) {
      let laterVideos = JSON.parse(localStorage.getItem("WatchLaterVideos"));
      laterVideos = [...laterVideos, video];
      localStorage.setItem("WatchLaterVideos", JSON.stringify(laterVideos));
    } else {
      localStorage.setItem("WatchLaterVideos", JSON.stringify([video]));
    }

    dispatch({ type: "ADD_TO_WATCH_LATER", payload: video });
  };

  const removeFromWatchLater = (videoID) => {
    const updateLaterVideos = state.watchLaterList.filter(
      (video) => video._id !== videoID
    );

    if (localStorage.getItem("WatchLaterVideos")) {
      const laterVideos = JSON.parse(localStorage.getItem("WatchLaterVideos"));
      const updatedLaterVideos = laterVideos.filter(
        (video) => video._id !== videoID
      );
      localStorage.setItem(
        "WatchLaterVideos",
        JSON.stringify(updatedLaterVideos)
      );
    }

    dispatch({ type: "REMOVE_FROM_WATCH_LATER", payload: updateLaterVideos });
  };

  const searchVideoByTitle = (e) => {
    const searchedVideos = state.allVideos.filter((video) =>
      video.title.toLowerCase().includes(e.target.value.toLowerCase())
    );

    dispatch({ type: "SEARCH_VIDEOS", payload: searchedVideos });
  };

  const findInWatchList = (videoID) =>
    state.watchLaterList.find((video) => video._id === videoID);

  const addNotesToVideo = (e, videoID) => {
    e.preventDefault();
    let data = new FormData(e.target);
    const userNotes = data.get("note");
    // const video = state.allVideos.find((video) => video._id === videoID);
    // const updatedVideo = {...video, notes: userNotes};
    const updatedAllVideos = state.allVideos.map((video) =>
      video._id === videoID
        ? { ...video, notes: [...video.notes, userNotes] }
        : video
    );

    dispatch({ type: "UPDATE_VIDEO_NOTES", payload: updatedAllVideos });
  };

  const valueProp = {
    state,
    dispatch,
    addToWatchLater,
    removeFromWatchLater,
    searchVideoByTitle,
    findInWatchList,
    addNotesToVideo,
  };

  return (
    <VideoContext.Provider value={valueProp}>{children}</VideoContext.Provider>
  );
};

export default VideoContextProvider;
