describe("login", function () {
    before(() => {
        cy.visit("/");
        cy.wait(1000)
        cy.percySnapshot();
    });
    afterEach(() => {
        cy.get('input[name="email"]').clear();
        cy.get('input[name="password"]').clear();
    })

    it("invalid email", () => {
        // test exeption
        cy.get(`[data-cy="emailinput"]`).click({
            force: true
        })
        cy.get(`[data-cy="emailinput"]`).type("123");
        cy.get(`[data-cy="userpassword"]`).type("123");

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


    });


})
//    Cypress.Cookies.preserveOnce("cypressId", "cypressToken");
//         // 判断存在cookie值
//         cy.getCookie("cypressId").should("cypressToken")