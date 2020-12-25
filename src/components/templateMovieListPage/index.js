import React, { useState } from "react";
import Header from "../headerMovieList";
import MovieList from "../movieList";
import FilterControls from "../filterControls";

const MovieListPageTemplate = ({ movies, title, action }) => {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState([0]);
  const genre = genreFilter
  const isContained = (mom, son) => {
    if (!(mom instanceof Array) || !(son instanceof Array)) return false;
    if (mom.length < son.length) return false;
    var aStr = mom.toString();
    for (var i = 0, len = son.length; i < len; i++) {
      if (aStr.indexOf(son[i]) === -1) return false;
    }
    return true;
  }
  let displayedMovies = movies
    .filter(m => {
      return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter(m => {
      return  genre > 0||genre.length>1
        ?  isContained(m.genre_ids,genreFilter)
        : true;
    });

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else setGenreFilter(value);
  };

  return (
    <>
      <Header title={title} numMovies={displayedMovies.length} />
      <FilterControls onUserInput={handleChange} numMovies={displayedMovies.length} title={title}/>
      <MovieList
       action={action}
       movies={displayedMovies}
    />
    </>
  );
};

export default MovieListPageTemplate ;