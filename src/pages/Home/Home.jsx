import React, { useContext } from "react";
import { VideoContext } from "../../contexts/VideosContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { state } = useContext(VideoContext);

  return (
    <div className="flex flex-column flex-gap-4">
      <h3>Categories</h3>
      <div className="flex flex-gap-4 flex-wrap mt-xs">
        {state.categories.map(({ id, thumbnail, category }) => (
          <div key={id} className="flex flex-column flex-gap-4">
            <Link to={`category-videos/${category}`}>
              <img src={thumbnail} alt="video-thumbnail" />
            </Link>
            <h4>{category}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
