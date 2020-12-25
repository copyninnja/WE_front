const { ArrowLeftRounded } = require("@material-ui/icons");

let movies;


describe("top-Rate", () => {
  before(() => {
    cy.request(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${Cypress.env(
        "TMDB_KEY"
      )}&page=1`
      )
      .its("body")
      .then((response) => {
        movies = response.results;
      });
  });

  describe("private route", () => {
    beforeEach(() => {
      cy.visit("/");
      cy.get("nav").find("li").eq(4).find("a").click();
      cy.wait(1000);
    });
    it("should navigate to the login page due to private route", () => {
      cy.url().should("include", `/login`)
      cy.login()
      cy.wait(2000)
      cy.get('a[href="/"]').eq(-1).contains("You've already loginin, Back to HomePage")
      cy.get('a[href="/"]').eq(-1).click().then(() => {
        cy.url().should("include", `/`)
      })
      cy.wait(1000)
      cy.percySnapshot();
    });

  });

  describe("check toprate movies ", () => {
    beforeEach(() => {
      cy.visit("/");
      cy.get("nav").find("li").eq(4).find("a").click();
      cy.wait(3000);
      cy.get("nav").find("li").eq(4).find("a").click();
      cy.wait(2000)
    });
    after(()=>{
      cy.logout()

    })
    it("check star hover hint", () => {
      cy.get(".ant-rate")
        .eq(0)
        .within(() => {
          cy.get("li").eq(0).trigger('mouseover')
        });
      cy.wait(500)
      cy.get(`.ant-tooltip-inner`).should("contain", "terrible")

    })
    
    it.skip("check cards layout", () => {
      cy.wait(1000)
      cy.get('[data-cy="761053"]').should('be.horizontallyAligned',
        "#761053", "top");
      cy.wait(1000)
      cy.percySnapshot();
    });

    it("check post function", () => {
      cy.window().then(win => {
        cy.spy(win, 'confirm').as('winConfirmSpy')
      })
      Cypress.on('window:alert', cy.spy())
      cy.get(".ant-rate")
        .eq(0)
        .within(() => {
          cy.get("li").eq(0).click()
            .then(() => {
              cy.on('window:alert', (str) => {
                expect(str).to.equal(`"The item/record was updated successfully."`)
              })
            })
        })


    });
    
  });

});