describe('Form Authentication', () => {
   it('Should verify inability to login with invalid credentials',  function () {
      cy.visit('https://the-internet.herokuapp.com')
      cy.get('[href="/login"]').click()
      cy.get('#username').type('testUser123123')
      cy.get('#password').type('testPassword12313')
      cy.get('[type="submit"]').click()
      cy.get('.flash').should('contain', 'Your username is invalid!')
   });
});