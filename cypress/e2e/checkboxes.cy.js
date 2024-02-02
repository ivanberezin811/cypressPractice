describe('Checkboxes', () => {

    beforeEach(() => {
        cy.visit('/')
        cy.get('[href="/checkboxes"]').click()
        cy.get('h3').should('have.text', 'Checkboxes');
    });

    it('Should verify default checkboxes state', { tags: '@smoke' }, function () {
        cy.get('[type="checkbox"]').first().should('not.be.checked')
        cy.get('[type="checkbox"]').last().should('be.checked')
    });

    it('Should verify ability to check the checkbox',  function () {
        cy.get('[type="checkbox"]').first().click().should('be.checked')
    });

    it('Should verify all checkbox are checked',  function () {
        cy.get('[type="checkbox"]').first().click()
        cy.get('[type="checkbox"]').each(($element) => {
            cy.wrap($element).should('be.checked');
        })
    });

    it('Should verify all checkbox are unchecked',  function () {
        cy.get('[type="checkbox"]').last().click()
        cy.get('[type="checkbox"]').each(($element) => {
            cy.wrap($element).should('not.be.checked');
        })
    });
});