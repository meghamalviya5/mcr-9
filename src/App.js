import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import VideoListing from "./pages/VideoListing/VideoListing";
import Explore from "./pages/Explore/Explore";
import Playlist from "./pages/Playlist/Playlist";
import WatchLater from "./pages/WatchLater/WatchLater";
import SingleVideo from "./pages/SingleVideo/SingleVideo";
import PlaylistVideoListing from "./pages/PlaylistVideoListing/PlaylistVideoListing";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route
            path="category-videos/:categoryName"
            element={<VideoListing />}
          />
          <Route path="explore" element={<Explore />} />
          <Route path="playlist" element={<Playlist />} />
          <Route path="watch-later" element={<WatchLater />} />
          <Route path="/single-video/:videoID" element={<SingleVideo />} />
          <Route
            path="/playlist/:playlistID"
            element={<PlaylistVideoListing />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
