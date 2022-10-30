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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import {Login} from "../components/login";

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

Cypress.Commands.add('login', () => {
    let username = 'temp_user_' + Date.now()
    let password = Cypress.env('default_password')
    let body = {"userName": username, "password": password}
    let requestInfo = {
        method: 'POST',
        url: '/Account/v1/User',
        body: body,
        failOnStatusCode: false
    };
    cy.request(requestInfo).its('status').should('eq', 201)
    cy.visit('/login')
    Login.userNameInput().type(username)
    Login.passwordInput().type(password)
    Login.loginButton().click()
    cy.location('pathname').should('eq', '/profile')
})

