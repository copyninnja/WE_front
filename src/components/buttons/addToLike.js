import React, { useContext } from "react";
import {MoviesContext} from "../../contexts/moviesContext";

const AddToLike = ({ movie }) => {
  const context = useContext(MoviesContext);

  const handleAddToLike = e => {
    e.preventDefault();
    context.addToLike(movie.id);
  };
  return (
    <button
      type="button"
      className="btn w-100 btn-primary"
      onClick={handleAddToLike}
    >
      Add to Like
    </button>
  );
};

export default AddToLike;