# Assignment 1 - ReactJS app.

Name: Gong Xiaofeng

## Features.

- Multiple Genre - allow user choose **more than 1** genre to filter the movie. user can add or delete genre 

- Language - after user select one language in radio box, the page will **automatically rerender** itself by re-fetching selected language api movies.

- private route - user has to login before accessing the corresponding page ,otherwise user will be **redirected to login page**.

- auth Context - check authentication status,provide context for different passage of the ME button/loginPage.

- login check - support **useform** to simply verify validate email address and password length ,etc. Alert when inappropriate

- login DB - support **firebase** to store user email and password. Alert when incorrect. Register if not having an account.

- popular Page - an endpoint of  popular movies. add to Like array

- Carousel - **automatically show** different movie posters, user can select a specific one by clicking the select bar

- rate - show message when user hover his/her mouse on it, when user click one of it, it will send a **POST/DELETE/PUT** function to rate the corresponding movie by  **temporary session** . Alert the response.

- Blur - blur the backdrop poster of the movie and set it as the **background** in movieDetails and concentrate the elaboration

  ## Setup requirements

  ```
  npm install
  ```

  

  Create  individual firebase configuration.

  Create private TMDB_KEY

  Create private username and password for TMDB

  ![](https://github.com/copyninnja/wad2-moviesApp/blob/master/public/image-20201209004957215.png)

  ## API Data Model.

  ..... List the additional TMDB endpoints used in your assignment, e.g.
  
  1. https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_KEY}&page=5&language=${language} *--Get popular movies*
  2. https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_KEY}&page=1*--Get TopRate movies*
  3. https://api.themoviedb.org/3/authentication/token/new?api_key=${process.env.REACT_APP_TMDB_KEY} *--Get request token*
  4. https://api.themoviedb.org/3/authentication/session/new?api_key=${process.env.REACT_APP_TMDB_KEY} *--Post request token to get session_id*
5. https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${process.env.REACT_APP_TMDB_KEY}&username=${process.env.REACT_APP_USERNAME}&password=${process.env.REACT_APP_PASSWORD} *-- Post username/password/request token to Login TMDB*
  6. https://api.themoviedb.org/3/movie/${movie.id}/rating?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${session_id} *-- Post movie id/session_id to rate/cancel_rate the movie*

  ## App Design.

  ### Component catalogue 

  ![image-20201209010526829](https://github.com/copyninnja/wad2-moviesApp/blob/master/public/image-20201209010526829.png)

  

  ## UI Design.

  ![image-20201209010731333](https://github.com/copyninnja/wad2-moviesApp/blob/master/public/image-20201209010731333.png)

> filter multiple genres

![image-20201209114745982](https://github.com/copyninnja/wad2-moviesApp/blob/master/public/image-20201209114745982.png)

> show different languages

![image-20201209115250349](https://github.com/copyninnja/wad2-moviesApp/blob/master/public/image-20201209115250349.png)

> fontawesome  icon button

![image-20201209115440297](https://github.com/copyninnja/wad2-moviesApp/blob/master/public/image-20201209115440297.png)

![image-20201209115700527](https://github.com/copyninnja/wad2-moviesApp/blob/master/public/image-20201209115700527.png)

> Show different contents according to authContext

![image-20201209123622717](https://github.com/copyninnja/wad2-moviesApp/blob/master/public/image-20201209123622717.png)

![image-20201209123926715](https://github.com/copyninnja/wad2-moviesApp/blob/master/public/image-20201209123926715.png)

> Login page and alert function

![image-20201209120459875](https://github.com/copyninnja/wad2-moviesApp/blob/master/public/image-20201209120459875.png)

> Register page

![image-20201209115942652](https://github.com/copyninnja/wad2-moviesApp/blob/master/public/image-20201209115942652.png)

> popular page

![image-20201209120026336](https://github.com/copyninnja/wad2-moviesApp/blob/master/public/image-20201209120026336.png)

![image-20201209123841420](https://github.com/copyninnja/wad2-moviesApp/blob/master/public/image-20201209123841420.png)

![image-20201209123814921](https://github.com/copyninnja/wad2-moviesApp/blob/master/public/image-20201209123814921.png)

![image-20201209123752400](https://github.com/copyninnja/wad2-moviesApp/blob/master/public/image-20201209123752400.png)

> shows a gallery automatically switch poster. Give hint when user hovers on the stars.

![image-20201209120258899](https://github.com/copyninnja/wad2-moviesApp/blob/master/public/image-20201209120258899.png)

> Blur the backdrop poster as background

### Routing.

------

/movies/popular -- private -- user must login before accessing

/movies/TopRate -- private -- user must login before accessing

/login --public -- user login

/register --public --user register

### Data hyperlinking.

------

![image-20201209124404901](https://github.com/copyninnja/wad2-moviesApp/blob/master/public/image-20201209124404901.png)

All buttons added represent an individual page

![image-20201209124244545](https://github.com/copyninnja/wad2-moviesApp/blob/master/public/image-20201209124244545.png)

Link to login page

![image-20201209124312764](https://github.com/copyninnja/wad2-moviesApp/blob/master/public/image-20201209124312764.png)

the link in login page redirect to register page

### Independent learning .

------

1. 3rd party components -- 
   - src/components/Carousel/index.js
   - src/components/CarouselCard/index.js
   - src/components/filterControls/index.js
   - src/components/HeaderUser/index.js
   - src/components/radioBox/index.js
   - src/components/rate/index.js
   - src/components/templateMoviePage/index.js
2. firebase authentication -- 
   - src/contexts/authContext.js
   - src/pages/loginPage.js
   - src/pages/RegisterPage.js
   - src/components/Firebase/firebase.js
3. POST/DELETE/PUT request --
   - src/components/rate/index.js
   - src/pages/TopRatePage.js
4. useForm hook --
   - src/pages/loginPage.js
   - src/pages/RegisterPage.js
5. session technology --
   - src/pages/TopRatePage.js

------

### 	References

1. 3rd party components -- 

   - Material UI  -- https://material-ui.com/zh/
   - ant -design -- https://github.com/ant-design/ant-design
   - Blur -- https://www.npmjs.com/package/react-blur

2. firebase authentication --  https://react-firebase-js.com/docs/react-firebase-realtime-database/getting-started#setup-react-firebasedatabase

3. POST/DELETE/PUT request

4. useForm hook -- https://react-hook-form.com/api/

5. session technology -- https://developers.themoviedb.org/3/authentication/how-do-i-generate-a-session-id

   

------

# Assignment 1 - Agile Software Practice.

Name : Xiaofeng Gong

## App Features.

+ filter_Genre : allow user to choose multiple genres to filter the movies

Tests: cypress/integration/home-page.spec.js

![image-20201209190620400](https://github.com/copyninnja/wad2-moviesApp/blob/master/public/image-20201209190620400.png)

- language : will re-fetch corresponding language of movies from TMDB api and re-render the movie list.

Tests: cypress/integration/home-page.spec.js

![image-20201209200700728](https://github.com/copyninnja/wad2-moviesApp/blob/master/public/image-20201209200700728.png)

- login page/register page : display a form that collects user data 

Tests : cypress/integration/login-page.spec.js

![image-20201209223310943](https://github.com/copyninnja/wad2-moviesApp/blob/master/public/image-20201209223310943.png)

![image-20201209223323295](https://github.com/copyninnja/wad2-moviesApp/blob/master/public/image-20201209223323295.png)

- login navigation : check the login/logOut function, useform hook availability

Tests : cypress/integration/navigation.spec.js

![image-20201209223826453](https://github.com/copyninnja/wad2-moviesApp/blob/master/public/image-20201209223826453.png)



- popular page : show popular movies. Test private route, layout

Tests : cypress/integration/popular-page.spec.js

![image-20201209224054211](https://github.com/copyninnja/wad2-moviesApp/blob/master/public/image-20201209224054211.png)

- Top-rate page : allow user to automatically browse Top-rated movies,  allow user to rate movies

Tests : cypress/integration/toprate-page.spec.js

![image-20201209231019656](https://github.com/copyninnja/wad2-moviesApp/blob/master/public/image-20201209231019656.png)

## Testing.

Cypress Dashboard URL: https://dashboard.cypress.io/projects/fekvo5/runs?branches=%5B%5D&committers=%5B%5D&flaky=%5B%5D&page=1&status=%5B%5D&tags=%5B%5D&timeRange=%7B%22startDate%22%3A%221970-01-01%22%2C%22endDate%22%3A%222038-01-19%22%7D

## Advanced Testing 

boundary and/or error/exceptional test case

+ cypress/integration/home-page.spec.js - test the movies when choose too many genres, incorrect titles
+ cypress/integration/login-page.spec.js - test invalid username and too short password
+ cypress/integration/navigation.spec.js - test unauthorized navigate to prrivate routes.

## Independent learning

- Custom commands -- cypress/support/commands.js 



- Layout-inspector -- cypress/integration/popular-page.spec.js

-- cypress/integration/toprate-page.spec.js

```
describe("check layout", () => {
    beforeEach(() => {
      cy.visit("/");
      cy.get("nav").find("li").eq(3).find("a").click();
      cy.wait(1000)
      cy.get("nav").find("li").eq(3).find("a").click();
      cy.wait(1000)
    });
    it("check cards layout", () => {
      cy.get(`[data-cy=${movies[0].id}]`).find("img").should('be.horizontallyAligned',
        `[data-cy=${movies[1].id}] img`, "top");
      cy.get(`[data-cy=${movies[4].id}]`).find("img").should('be.verticallyAligned',
        `[data-cy=${movies[0].id}] img`, "left");

      cy.wait(1000)
      cy.percySnapshot();
      cy.logout()
    });

  });
```

```
  it.skip("check cards layout", () => {

   cy.wait(1000)

   cy.get('[data-cy="761053"]').should('be.horizontallyAligned',

    "#761053", "top");

   cy.wait(1000)

   cy.percySnapshot();

  });
```

- code-coverage --  all by @cypress/instrument![image-20201210225041871](https://github.com/copyninnja/wad2-moviesApp/blob/master/public/image-20201210225041871.png)
- Percy -- a snapshot per test  https://percy.io/02d31275/movieApp![image-20201210230259417](https://github.com/copyninnja/wad2-moviesApp/blob/master/public/image-20201210230259417.png)

- code-splitting -- src/index.js

```
const TopRatePage = lazy(() => import("./pages/TopRatePage"));
const PopularPage = lazy(() => import("./pages/popularPage"));
const loginPage = lazy(() => import("./pages/loginPage"));
const register = lazy(() => import("./pages/RegisterPage"));
const UpcomingPage = lazy(() => import("./pages/UpcomingPage"));
const FavoriteMoviesPage = lazy(() => import("./pages/favoritesMoviesPage"));
const AddMovieReviewPage = lazy(() => import("./pages/addMovieReviewPage"));
const MoviePage = lazy(() => import("./pages/movieDetailsPage"));
```


------

### References

- Custom commands -- https://docs.cypress.io/api/cypress-api/custom-commands.html
- Layout-inspector -- https://www.npmjs.com/package/cypress-layout-inspector
- code-coverage -- https://docs.cypress.io/guides/tooling/code-coverage.html
- percy -- https://percy.io/
- code-splitting -- https://reactjs.org/docs/code-splitting.html

