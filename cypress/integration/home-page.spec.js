let movies; // List of movies from TMDB

// Utility functions
const filterByTitle = (movieList, string) =>
    movieList.filter((m) => m.title.toLowerCase().search(string) !== -1);

   const isContained = (mom, son) => {
        if (mom.length < son.length) return false;
        var aStr = mom.toString();
        for (var i = 0, len = son.length; i < len; i++) {
          if (aStr.indexOf(son[i]) === -1) return false;
        }
        return true;
      }

      const filterByGenre = (movieList, genreId) =>
      movieList.filter((m) =>{
        return  genreId > 0||genreId.length>1
        ? isContained(m.genre_ids,genreId)
        : true;
    });
 

describe("Home Page ", () => {
    before(() => {
        // Get movies from TMDB and store in movies variable.
        cy.request(
                `https://api.themoviedb.org/3/discover/movie?api_key=${Cypress.env(
        "TMDB_KEY"
      )}&language=en-US&include_adult=false&include_video=false&page=1`
            )
            .its("body") // Take the body of HTTP response from TMDB
            .then((response) => {
                movies = response.results
            })
    })
    beforeEach(() => {
        cy.visit("/")
    });

    describe("Base test", () => {
        it("displays page header", () => {
            cy.get("h2").contains("No. Movies");
            cy.get(".badge").contains(20);
        });
    })
    describe("Filtering", () => {
        describe("By movie title", () => {
            it("should display movies with 'p ' in the title", () => {
                const searchString = 'p'
                const matchingMovies = filterByTitle(movies, searchString);
                cy.get(`[data-cy="title_search"]`).clear().type(searchString);
                cy.get(".card").should("have.length", matchingMovies.length);
                cy.get(".card").each(($card, index) => {
                    cy.wrap($card)
                        .find(".card-title")
                        .should("have.text", matchingMovies[index].title);
                });
            })
            it("should display movies with 'o' in the title", () => {
                const searchString = "o";
                const matchingMovies = filterByTitle(movies, searchString);
                cy.get(`[data-cy="title_search"]`).clear().type(searchString);
                cy.get(".card").should("have.length", matchingMovies.length);
                cy.get(".card").each(($card, index) => {
                    cy.wrap($card)
                        .find(".card-title")
                        .should("have.text", matchingMovies[index].title);
                })
            })
            //test excep
            it("should display movies with 'xyz' in the title", () => {
                const searchString = "xyz";
                const matchingMovies = filterByTitle(movies, searchString);
                cy.get(`[data-cy="title_search"]`).clear().type(searchString);
                cy.get(".movies").children().should("have.length", 0);

            })
        })
    })
    describe("By movie genre", () => {
        it("should display movies with the specified genre only", () => {
            const selectedGenreId = [35];
            const selectedGenreText = "Comedy";
            const matchingMovies = filterByGenre(movies, selectedGenreId);
            cy.wait(500)
            cy.get(`[data-cy="genre_select"]`).click();
            cy.get(`[title=${selectedGenreText}]`).click();
            cy.get(".card").should("have.length", matchingMovies.length);
            cy.get(".card").each(($card, index) => {
                cy.wrap($card)
                    .find(".card-title")
                    .should("have.text", matchingMovies[index].title);
            });
        });
        it("should display movies with the specified genre and title", () => {
            const searchString = "f";
            const selectedGenreId = [35];
            const selectedGenreText = "Comedy";
            const matchingMovies = filterByTitle(filterByGenre(movies, selectedGenreId), searchString);
            console.log(matchingMovies);
            cy.get(`[data-cy="genre_select"]`).click();
            cy.get(`[title=${selectedGenreText}]`).click();
            cy.get(`[data-cy="title_search"]`).clear().type(searchString);
            cy.get(".card").should("have.length", matchingMovies.length);
            cy.get(".card").each(($card, index) => {
                cy.wrap($card)
                    .find(".card-title")
                    .should("have.text", matchingMovies[index].title);
            });
            cy.wait(1000)
            cy.percySnapshot();
        });
        //test excep
        it("should display movies with a number of genres", () => {
            const selectedGenreId = [28,12,35];
            const selectedGenreText = ["Action","Adventure","Comedy"];
            const matchingMovies = filterByGenre(movies, selectedGenreId);
            console.log(matchingMovies)
            cy.get(`[data-cy="genre_select"]`).click();
            cy.get(`[title=${selectedGenreText[0]}]`).click();
            cy.get(`[title=${selectedGenreText[1]}]`).click();
            cy.get(`[title=${selectedGenreText[2]}]`).click();

            cy.get(".card").should("have.length", matchingMovies.length);
            cy.get(".movies").children().should("have.length", 0);


        });
    });
    describe("By movie language", () => {
        it("should display movies with english by default", () => {
            const selectedMovieId = 577922;
            const selectedMovieText = "Tenet";
            cy.get(`[data-cy="english"]`).click({
                force: true
            });
            cy.get(`[data-cy="${selectedMovieId}"]`).within(() => {
                cy.get("h4").should("contain", selectedMovieText)
            })

        });
        it("should display movies with japanese language", () => {
            const selectedMovieId = 577922;
            const selectedMovieText = "TENET テネット";
            cy.get(`[data-cy="japanese"]`).click({
                force: true
            });
            cy.get(`[data-cy="${selectedMovieId}"]`).within(() => {
                cy.get("h4").should("contain", selectedMovieText)
            })

        });
        it("should display movies with chinese language", () => {
            const selectedMovieId = 577922;
            const selectedMovieText = "信条";
            cy.get(`[data-cy="chinese"]`).click({
                force: true
            });
            cy.get(`[data-cy="${selectedMovieId}"]`).within(() => {
                cy.get("h4").should("contain", selectedMovieText)
            })
            cy.wait(1000)
            cy.percySnapshot();
        });

    });
});