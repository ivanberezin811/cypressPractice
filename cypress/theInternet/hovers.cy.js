describe('Hovers', () => {

    beforeEach(() => {
        cy.visit('https://the-internet.herokuapp.co')
        cy.get('[href="/hovers"]').click()
    });

    it('Should verify hovering over user icons',  function () {
        cy.get('.figcaption').each(usernameElem => {
            cy.wrap(usernameElem.children('h5')).should('not.be.visible')
            cy.wrap(usernameElem.children('a')).should('not.be.visible')
        })
        cy.get('.figure').each(icon => {
            cy.wrap(icon).realHover('mouse').then((iconElem) => {
                cy.wrap(iconElem.find('h5')).should('be.visible').and('contain', 'name: user')
                cy.wrap(iconElem.find('a')).should('be.visible').and('have.text', 'View profile')
            })
        })
    });
});