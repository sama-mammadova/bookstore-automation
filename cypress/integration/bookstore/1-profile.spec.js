import {Books} from "../../components/books";
import {Login} from "../../components/login";
import {Profile} from "../../components/profile";
import {Modal} from "../../components/modal";

describe('Profile view tests', () => {

    beforeEach(() => {
        cy.login()
    })

    it('Should show username on profile view', () => {
        let username = Cypress.env('username')
        Profile.userNameLabel().should('be.visible').should('contain.text', 'temp_user')
    });


    it('Should add books to profile', () => {
        Books.list().should('have.length', 0)
        Books.visitStore()
        Books.list().eq(0).click()
        Books.addToCollectionButton().click({force: true})
        // add one more
        Books.backToBookStoreButton().click({force: true})
        Books.list().eq(1).click({force: true})
        Books.addToCollectionButton().click({force: true})

        Profile.visit()
        Books.list().should('have.length', 2)
    })

    it('Should remove book from list', () => {
        Books.list().should('have.length', 0)
        Books.visitStore()
        Books.list().eq(0).click()
        Books.addToCollectionButton().click({force: true})

        Profile.visit()
        Books.list().should('have.length', 1)
        Books.deleteColumn().click()
        Modal.okButton().click()
        Books.list().should('have.length', 0)

    });

})