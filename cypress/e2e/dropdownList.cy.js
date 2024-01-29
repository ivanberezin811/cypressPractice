describe('Dropdown List', () => {

    beforeEach(() => {
        cy.visit('/')
        cy.get('[href="/dropdown"]').click()
        cy.get('h3').should('have.text', 'Dropdown List')
    });

    it('Should verify default selection',  function () {
        cy.get('#dropdown option[selected]').should('have.text', 'Please select an option')
    });

    it('Should verify selected option',  function () {
        cy.get('select#dropdown').select('Option 1')
        cy.get('#dropdown option[selected]').should('have.text', 'Option 1')
    });

});