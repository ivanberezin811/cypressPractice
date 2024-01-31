describe('Form Authentication', () => {

   beforeEach(() => {
      cy.visit('/')
      cy.get('[href="/login"]').click()
   });

   it('Should verify inability to login with invalid credentials', { tags: '@smoke' },  function () {
      cy.get('#username').type('testUser123123')
      cy.get('#password').type('testPassword12313')
      cy.get('[type="submit"]').click()
      cy.get('.flash').should('contain', 'Your username is invalid!')
   });

   it('Should verify inability to login without filling in a login form',  function () {
      cy.get('[type="submit"]').click()
      cy.get('.flash').should('contain', 'Your username is invalid!')
   });

   it('Should verify ability to close invalid login message',  function () {
      cy.get('[type="submit"]').click()
      cy.get('.flash').should('contain', 'Your username is invalid!')
      cy.get('.close').click({force: true})
      cy.get('.flash').should('not.exist')
   });
});