import '@percy/cypress';
import 'cypress-layout-inspector/add-support';
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
Cypress.Commands.add('login', () => {
    cy.visit("/");
    cy.get("svg").eq(2).click();
    cy.get('[data-cy="SignIn"]').click();
    cy.get('input[name="email"]').click()
    cy.get('input[name="email"]').type("123@qq.com");
    cy.get('[data-cy="userpassword"]').type("123123");
    cy.get('button[data-cy="Sign In"]').click()
})
Cypress.Commands.add('logout', () => {
    cy.visit("/");
    cy.get("svg").eq(2).click();
    cy.get('[data-cy="SignIn"]').click();
    cy.wait(1000)
    cy.get("svg").eq(-1).click()
    cy.get('[data-cy="SignOut"]').click()
})