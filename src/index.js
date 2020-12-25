import React ,{ lazy, Suspense }from "react";
import ReactDOM from "react-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import HomePage from "./pages/homePage";
// import MoviePage from './pages/movieDetailsPage'
import { BrowserRouter, Route, Redirect, Switch} from "react-router-dom"    // CHANGED
// import FavoriteMoviesPage from './pages/favoritesMoviesPage'       // NEW
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader'
// import UpcomingPage from"./pages/UpcomingPage";
import MoviesContextProvider from "./contexts/moviesContext";
import GenresContextProvider from "./contexts/genresContext";
import AuthContextProvider from "./contexts/authContext";
// import AddMovieReviewPage from './pages/addMovieReviewPage';
// import loginPage from './pages/loginPage';
// import register from './pages/RegisterPage';
import PrivateRoute from './components/privateRoute';
// import TopRatePage from './pages/TopRatePage';

const TopRatePage = lazy(() => import("./pages/TopRatePage"));
const PopularPage = lazy(() => import("./pages/popularPage"));
const loginPage = lazy(() => import("./pages/loginPage"));
const register = lazy(() => import("./pages/RegisterPage"));
const UpcomingPage = lazy(() => import("./pages/UpcomingPage"));
const FavoriteMoviesPage = lazy(() => import("./pages/favoritesMoviesPage"));
const AddMovieReviewPage = lazy(() => import("./pages/addMovieReviewPage"));
const MoviePage = lazy(() => import("./pages/movieDetailsPage"));




const App = () => {
  return (  
      <BrowserRouter>
         <AuthContextProvider>
         <Suspense fallback={<h1>Loading page....</h1>}>
        <div className="jumbotron">
          <SiteHeader />      {/* New Header  */}
          <div className="container-fluid">
          <MoviesContextProvider>     {/* NEW  */}
          <GenresContextProvider>    {/* NEW */}
            <Switch>
          <Route exact path="/reviews/form" component={AddMovieReviewPage} />
          <Route path="/reviews/:id" component={MovieReviewPage} />
          <Route exact path="/movies/Upcoming" component={UpcomingPage} />
          <Route exact path="/movies/favorites" component={FavoriteMoviesPage} />
          <PrivateRoute exact path="/movies/popular" component={PopularPage} />
          <PrivateRoute exact path="/movies/TopRate" component={TopRatePage}/>
          <Route path="/movies/:id" component={MoviePage} />
          <Route exact path="/login" component={loginPage} />
          <Route exact path="/register" component={register} />
          <Route path="/" component={HomePage} />
          <Redirect from="*" to="/" />
        </Switch>
        </GenresContextProvider>    {/* NEW */}
        </MoviesContextProvider>     {/* NEW */}
      </div> 
    </div> 
    </Suspense>
    </AuthContextProvider>
  </BrowserRouter>

  );
};

ReactDOM.render(<App />, document.getElementById("root"));