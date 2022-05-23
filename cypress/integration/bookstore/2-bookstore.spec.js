import {Books} from "../../components/books";

describe('Book store tests', () => {
    beforeEach(() => {
        cy.login()
        cy.visit('/books')
    })

    it('Shows book list', () => {
        Books.list().should('have.length.greaterThan', 0)
    })

    it('Filters books by a search term', () => {
        let searchTerm = 'javascript'
        Books.searchInput().type(searchTerm)
        Books.searchButton().click()

        Books.list().then(books => {
            for (let book of books) {
                cy.wrap(book).invoke('text').then(text => {
                    text = text.trim().toLowerCase()
                    cy.wrap(text).should("contain", searchTerm.toLowerCase())
                })
            }
        })
    })

    it('Navigate between pages', () => {
        Books.searchInput().clear()
        // due to css issues on fronted, sometimes components are not visible on default viewport
        // force: true is used to click on those components
        // ideally, we shouldn't do that, and the tests should fail
        // but for the sake of demonstration, I'm using force:true to be able to test other parts

        Books.currentPage().should('have.value', 1)
        Books.previousPage().should('be.disabled')

        // set small page size to get multiple pages
        Books.pageSize().scrollIntoView().select("5", {force: true})

        Books.nextPage().should('be.enabled')
        Books.nextPage().click()
        Books.currentPage().should('have.value', 2)
        Books.previousPage().should('be.enabled')
        Books.previousPage().click()
        Books.currentPage().should('have.value', 1)
        Books.previousPage().should('be.disabled')
        Books.nextPage().should('be.enabled')
    })

    it('Should show book detail when click on a book title from book list', () => {
        Books.list().eq(0).then(link => {
            let clickedBook = link.text()
            cy.wrap(link).click()
            Books.bookName().should('have.text', clickedBook)
        })
    })


})