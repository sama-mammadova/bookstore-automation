// Provides methods for book list both on book store and profile pages
export class Books {

    static visitStore() {
        cy.visit('/books')
    }

    static list() {
        return cy.get('.ReactTable .rt-tbody .action-buttons a')
    }

    static deleteColumn() {
        return cy.get('.ReactTable #delete-record-undefined')
    }

    static searchInput() {
        return cy.get('#searchBox')
    }

    static searchButton() {
        return cy.get('#searchBox-wrapper .input-group-append')
    }

    static pageSize() {
        return cy.get('.-pageSizeOptions select')
    }

    static nextPage() {
        return cy.get('.pagination-bottom .-next button')
    }

    static previousPage() {
        return cy.get('.pagination-bottom .-previous button')
    }

    static currentPage() {
        return cy.get('.pagination-bottom .-pageJump input')
    }

    static bookName() {
        return cy.get('#title-wrapper #userName-value')
    }

    static addToCollectionButton() {
        return cy.get('.text-right #addNewRecordButton')
    }

    static backToBookStoreButton() {
        return cy.get('.text-left #addNewRecordButton')
    }

}