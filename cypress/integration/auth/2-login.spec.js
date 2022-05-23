import {Login} from "../../components/login";

describe('Login tests', () => {
        beforeEach(() => {
            cy.visit('login')
        })

        it('Login with invalid credentials', () => {
            let username = 'this_user_does_not_exists'
            let password = 'hopefully'
            Login.userNameInput().type(username)
            Login.passwordInput().type(password)
            Login.loginButton().click()
            let red = 'rgb(255, 0, 0)'
            cy.get('#output p')
                .should('be.visible')
                .should('have.css', 'color', red)
                .should('have.text', 'Invalid username or password!')
        })

    }
)