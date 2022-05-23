describe('Logging out tests', () => {
    beforeEach(() => {
        cy.login()
    })

    it('Logout should succeed', () => {
        // "submit" is the id for the Logout button
        cy.get('#submit').should('have.text', 'Log out').click()
        cy.location('pathname').should('eq', '/login') // user should be redirected to login page
    })
})