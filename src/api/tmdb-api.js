export const getMovies = language => {
    return fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=${language}&include_adult=false&page=1`
    )
      .then(res => res.json())
      .then(json => json.results);
  };
  
  export const getMovie = id => {
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
    ).then(res => res.json());
  };
  
  export const getGenres = () => {
    return fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
        process.env.REACT_APP_TMDB_KEY +
        "&language=en-US"
    )
      .then(res => res.json())
      .then(json => json.genres);
  };
  export const getMovieReviews = id => {
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.REACT_APP_TMDB_KEY}`
    )
      .then(res => res.json())
      .then(json => json.results);
  };
  export const getUpcomingMovies= language =>{
    return fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_KEY}&language=${language}&include_adult=false&page=1`
    )
      .then(res => res.json())
      .then(json => json.results);
  };
  export const getPopularMovies= language=>{
    return fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_KEY}&page=5&language=${language}`
    )
      .then(res => res.json())
      .then(json => json.results);
  };
  export const getTopRtedMovies= ()=>{
    return fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_KEY}&page=1`
    )
      .then(res => res.json())
      .then(json => json.results);
  };
  export const getRequstToken=()=>{
    return fetch(
      `https://api.themoviedb.org/3/authentication/token/new?api_key=${process.env.REACT_APP_TMDB_KEY}`
    )
    .then(res => res.json())
    .then(json => json.request_token);
  }

  export const postAuthentication=(request_token)=>{
    let data = new FormData();
    data.append("request_token",request_token);
    return fetch(
      `https://api.themoviedb.org/3/authentication/session/new?api_key=${process.env.REACT_APP_TMDB_KEY}`,
      {
        method: 'POST',
        body:data
      }
    )
    .then(res => res.json())
    .then(json => json.session_id);  
  }

  export const postLogin=(request_token)=>{
    let data = new FormData();
    data.append("request_token",request_token);
    console.log(process.env.REACT_APP_USER_NAME);
    return fetch(
      `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${process.env.REACT_APP_TMDB_KEY}&username=${process.env.REACT_APP_USERNAME}&password=${process.env.REACT_APP_PASSWORD}`,
      {
        method: 'POST',
        body: data,
      }
    )
    .then(res => res.json())
    .then(json => json.success);
    
  }


  
