export const videosReducer = (state, action) => {
  console.log("hi in reducer");
  switch (action.type) {
    case "ADD_TO_WATCH_LATER":
      return {
        ...state,
        watchLaterList: [...state.watchLaterList, action.payload],
      };

    case "REMOVE_FROM_WATCH_LATER":
      return { ...state, watchLaterList: [...action.payload] };

    case "SEARCH_VIDEOS":
      return { ...state, filteredVideos: action.payload };

    case "SET_MODAL_STATUS":
      return { ...state, [action.payload.key]: action.payload.value };

    case "UPDATE_VIDEO_NOTES":
      return { ...state, allVideos: action.payload };

    case "SET_EDIT_NOTE":
      return { ...state, selectedEditNote: action.payload };

    case "UPDATE_PLAYLIST":
      return { ...state, playlist: action.payload };

    default:
      return { state };
  }
};
