import React, {useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import {MoviesContext} from '../contexts/moviesContext';
import  AddToLike from '../components/buttons/addToLike'

const PopularPage = () => {
  const context = useContext(MoviesContext);
  const movies = context.popular.filter((m) => {  // New
    return !("popular" in m);
  });
    return (
        <PageTemplate
          title='Popular Movies'
          movies={movies}
          action={(movie) => {
            return <AddToLike movie={movie} />;
          }}
        />      

    );
  };
  export default PopularPage;