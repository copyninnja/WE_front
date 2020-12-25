import React, { useEffect, createContext, useReducer, useState } from "react";
import { getMovies, getUpcomingMovies ,getPopularMovies, getTopRtedMovies} from "../api/tmdb-api";

export const MoviesContext = createContext(null);

const reducer = (state, action) => {
  switch (action.type) {
    case "add-favorite":
      return {
        movies: state.movies.map((m) =>
          m.id === action.payload.movie.id ? { ...m, favorite: true } : m
        ),
        upcoming: [...state.upcoming],
        popular: [...state.popular]
      };
      case "add-watchList":
      return {
        upcoming: state.upcoming.map((m) =>
          m.id === action.payload.movie.id ? { ...m, watchList: true } : m
        ),
        movies : [...state.movies],
        popular: [...state.popular]
      };
      case "add-popular":
        return {
          popular: state.popular.map((m) =>
            m.id === action.payload.movie.id ? { ...m, popular: true } : m
          ),
          movies : [...state.movies],
          upcoming: [...state.upcoming]
        };
    case "load":
      return { movies: action.payload.movies, upcoming: [...state.upcoming],popular: [...state.popular],toprate: [...state.toprate]};
    case "load-upcoming":
      return { upcoming: action.payload.movies, movies: [...state.movies],popular: [...state.popular] ,toprate: [...state.toprate]};
    case "load-popular":
      return { popular: action.payload.movies ,upcoming: [...state.upcoming], movies: [...state.movies] ,toprate: [...state.toprate] };
    case "load-toprate":
      return { toprate: action.payload.movies,popular: [...state.popular] ,upcoming: [...state.upcoming] , movies: [...state.movies]};
    case "add-review":
      return {
        movies: state.movies.map((m) =>
          m.id === action.payload.movie.id
            ? { ...m, review: action.payload.review }
            : m
        ),
        upcoming: [...state.upcoming],
      };
    default:
      return state;
  }
};

const MoviesContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, { movies: [], upcoming: [], popular: [],toprate:[]});
  const [language,setLanguage]=useState("en");
  const seLanguage=(props)=>{
    setLanguage(props)
  }
  const addToFavorites = (movieId) => {
    const index = state.movies.map((m) => m.id).indexOf(movieId);
    dispatch({ type: "add-favorite", payload: { movie: state.movies[index] } });
  };
  const addToWatchList = (movieId) => {
    const index = state.upcoming.map((m) => m.id).indexOf(movieId);
    dispatch({ type: "add-watchList", payload: { movie: state.upcoming[index] } });
  };
  const addToLike = (movieId) => {
    const index = state.popular.map((m) => m.id).indexOf(movieId);
    dispatch({ type: "add-popular", payload: { movie: state.popular[index] } });
  };

  const addReview = (movie, review) => {
    dispatch({ type: "add-review", payload: { movie, review } });
  };

  useEffect(() => {
    getMovies(language).then((movies) => {
      dispatch({ type: "load", payload: { movies } });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  useEffect(() => {
    getUpcomingMovies(language).then((movies) => {
      dispatch({ type: "load-upcoming", payload: { movies } });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  useEffect(() => {
    getPopularMovies(language).then((movies) => {
      dispatch({ type: "load-popular", payload: { movies } });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  useEffect(() => {
    getTopRtedMovies().then((movies) => {
      dispatch({ type: "load-toprate", payload: { movies } });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


 

  return (
    <MoviesContext.Provider
      value={{
        movies: state.movies,
        upcoming: state.upcoming,
        popular: state.popular,
        toprate:state.toprate,
        seLanguage: seLanguage,
        addToFavorites: addToFavorites,
        addReview: addReview,
        addToWatchList: addToWatchList,
        addToLike : addToLike
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;