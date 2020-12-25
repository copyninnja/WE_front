describe("login", function () {
    before(() => {
        cy.visit("/");
        cy.get("svg").eq(2).click();
        cy.get('[data-cy="SignIn"]').click();
        // cy.wait(1000)
        // if (cy.get('a[href="/"]').contains()) { 
        //     cy.get("svg").eq(-1).click()
        //     cy.get('[data-cy="SignOut"]').click()
        // }
        cy.wait(1000)
        cy.percySnapshot();
    });
    // const getForm = () => {
    //     return cy
    //         .get('form')
    //         .children().should('not.be.empty')
    //         .then(cy.wrap)
    // }
    afterEach(() => {
        cy.get('input[name="email"]').clear();
        cy.get('input[name="password"]').clear();
    })

    it("invalid email", () => {
        // test exeption
        cy.get('input[name="email"]').click({
            force: true
        })
        cy.get('input[name="email"]').type("123");
        cy.get('[data-cy="userpassword"]').type("123");

        Cypress.on('window:alert', cy.spy())
        cy.get('button[data-cy="Sign In"]').click()
            .then(() => {
                cy.on('window:alert', (str) => {
                    expect(str).to.equal(`The email address is badly formatted.`)
                })
            });
    });
    it("missing password", () => {
        // test exeption
        cy.get('input[name="email"]').click()
        cy.get('input[name="email"]').type("1234@qq.com");

        Cypress.on('window:alert', cy.spy())

        cy.get('button[data-cy="Sign In"]').click()
            .then(() => {
                cy.on('window:alert', (str) => {
                    expect(str).to.equal(`Wrong password.`)
                })
            });
    });

    it("right login", () => {
        // test exeption
        cy.get('input[name="email"]').click()
        cy.get('input[name="email"]').type("1234@qq.com");
        cy.get('[data-cy="userpassword"]').type("123123");


        const stub = cy.stub()
        cy.on('window:alert', stub)
        cy.get('button[data-cy="Sign In"]').click()
        cy.wait(2000);
        cy.get('a[href="/"]').eq(-1).contains("You've already loginin, Back to HomePage")
        cy.get("svg").eq(-1).click()
        console.log("fine")
        cy.get('[data-cy="SignOut"]').click()

    });


})
//    Cypress.Cookies.preserveOnce("cypressId", "cypressToken");
//         // 判断存在cookie值
//         cy.getCookie("cypressId").should("cypressToken")