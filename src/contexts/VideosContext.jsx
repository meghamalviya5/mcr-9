import { createContext, useReducer } from "react";
import { v4 as uuid } from "uuid";
import { videos } from "../backend/db/videos";
import { videosReducer } from "../reducers/VideosReducer";
import { categories } from "../backend/db/categories";

export const VideoContext = createContext();

const VideoContextProvider = ({ children }) => {
  const initialState = {
    categories: categories,
    allVideos: JSON.parse(localStorage.getItem("AllVideos")) || videos,
    filteredVideos: videos,
    watchLaterList: JSON.parse(
      localStorage.getItem("WatchLaterVideos") || "[]"
    ),
    playlist: JSON.parse(localStorage.getItem("Playlists") || "[]"),
    addNoteModalStatus: false,
    addPlaylistModalStatus: false,
    addMorePlaylistModalStatus: false,
    editNoteModalStatus: false,
    selectedEditNote: {},
  };

  const [state, dispatch] = useReducer(videosReducer, initialState);

  const addToWatchLater = (videoID) => {
    const video = state.allVideos.find((video) => video._id === videoID);

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
    const data = new FormData(e.target);
    const userNotes = data.get("note");
    const noteToAdd = { noteId: uuid(), note: userNotes };

    let updatedAllVideos = state.allVideos.map((video) =>
      video._id === videoID
        ? { ...video, notes: [...video.notes, noteToAdd] }
        : video
    );

    localStorage.setItem("AllVideos", JSON.stringify(updatedAllVideos));

    dispatch({ type: "UPDATE_VIDEO_NOTES", payload: updatedAllVideos });
  };

  const deleteNote = (userNote, videoID) => {
    let updatedAllVideos = state.allVideos.map((video) =>
      video._id === videoID
        ? {
            ...video,
            notes: video.notes.filter(({ note }) => note !== userNote),
          }
        : video
    );

    localStorage.setItem("AllVideos", JSON.stringify(updatedAllVideos));

    dispatch({ type: "UPDATE_VIDEO_NOTES", payload: updatedAllVideos });
  };

  const createPlaylist = (e, video) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const newPlaylist = {
      id: uuid(),
      title: data.get("title"),
      description: data.get("description"),
      videos: video ? [video] : [],
    };

    localStorage.setItem(
      "Playlists",
      JSON.stringify([...state.playlist, newPlaylist])
    );

    dispatch({
      type: "UPDATE_PLAYLIST",
      payload: [...state.playlist, newPlaylist],
    });
  };

  const saveToPlaylist = (e, playlistId, video) => {
    const allPlaylists = JSON.parse(localStorage.getItem("Playlists"));
    const updatedPlaylist = allPlaylists.map((playlist) =>
      playlist.id === playlistId
        ? { ...playlist, videos: [...playlist.videos, video] }
        : playlist
    );

    localStorage.setItem("Playlists", JSON.stringify(updatedPlaylist));

    dispatch({
      type: "UPDATE_PLAYLIST",
      payload: updatedPlaylist,
    });
  };

  const deletePlaylistVideo = (playlistId, videoId) => {
    const updatedPlaylistVideos = state.playlist.map((list) =>
      list.id === playlistId
        ? {
            ...list,
            videos: list.videos.filter((video) => video._id !== videoId),
          }
        : list
    );

    localStorage.setItem("Playlists", JSON.stringify(updatedPlaylistVideos));

    dispatch({ type: "UPDATE_PLAYLIST", payload: updatedPlaylistVideos });
  };

  const deletePlaylist = (e, id) => {
    const updatedPlaylist = state.playlist.filter(
      (singleList) => singleList.id !== id
    );

    localStorage.setItem("Playlists", JSON.stringify(updatedPlaylist));

    dispatch({ type: "UPDATE_PLAYLIST", payload: updatedPlaylist });
  };

  const valueProp = {
    state,
    dispatch,
    addToWatchLater,
    removeFromWatchLater,
    searchVideoByTitle,
    findInWatchList,
    addNotesToVideo,
    deleteNote,
    createPlaylist,
    saveToPlaylist,
    deletePlaylistVideo,
    deletePlaylist,
  };

  return (
    <VideoContext.Provider value={valueProp}>{children}</VideoContext.Provider>
  );
};

export default VideoContextProvider;
