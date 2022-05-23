export class Login {

    static userNameInput() {
        return cy.get('#userName')
    }

    static passwordInput() {
        return cy.get('#password')
    }

    static loginButton() {
        return cy.get('#login')
    }
}