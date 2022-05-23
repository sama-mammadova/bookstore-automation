export class Modal {
    static okButton() {
        return cy.get('#closeSmallModal-ok')
    }

    static cancelButton() {
        return cy.get('#closeSmallModal-cancel')
    }
}