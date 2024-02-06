describe('Login', function () {

    beforeEach(function () {
        cy.visit('https://demowebshop.tricentis.com')
        cy.get('.ico-login').click()
        cy.get('.page-title').should('contain.text', 'Welcome, Please Sign In!')
        cy.fixture('users').as('usersData')
    });

    it('Should verify successful login', { tags: '@smoke' }, function () {
        cy.get('#Email').type(this.usersData.user1.email)
        cy.get('#Password').type(this.usersData.user1.password)
        cy.get('.login-button').click()
        cy.get('.header-links [href="/customer/info"]').should('have.text', this.usersData.user1.email)
    });

    it('Should verify unsuccessful login with empty password', function () {
        cy.get('#Email').type(this.usersData.user1.email)
        cy.get('.login-button').click()
        cy.get('.validation-summary-errors').should('contain.text', 'The credentials provided are incorrect')
    });

    it('Should verify unsuccessful login with empty email and password', function () {
        cy.get('.login-button').click()
        cy.get('.validation-summary-errors').should('contain.text', 'No customer account found')
    });

    it('Should verify error massage after invalid email is entered', function () {
        const invalidEmails = ['testUser12131@gmailcom', 'testUser12131gmail.com',
            'test@User12131@gmail.com', 't.mo,@gmail.com']
        for (const elem of invalidEmails) {
            cy.get('#Email').type(elem)
            cy.get('#Password').click()
            cy.get('[data-valmsg-for="Email"]').should('contain.text', 'Please enter a valid email address.')
            cy.get('#Email').clear()
        }
    });
});