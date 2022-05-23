import {Modal} from "./modal";

export class Profile {

    static visit(){
        cy.visit('/profile')
    }

    static userNameLabel() {
        return cy.get('#userName-value')
    }

    static deleteAllBooksButton() {
        return cy.get('.text-right.button')
    }
    static deleteAllBooks(){
        this.visit()
        this.deleteAllBooksButton().click()
        Modal.okButton().click()
    }
}