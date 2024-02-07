import *  as LogInPage from "../../pages/loginPage";
import *  as Utils from "../../support/utils";

describe('Login', function () {

    beforeEach(function () {
        Utils.visitPage('/login')
        cy.get('.page-title').should('contain.text', 'Welcome, Please Sign In!')
        cy.fixture('users').as('usersData')
    });

    it('Should verify successful login', { tags: '@smoke' }, function () {
        LogInPage.performLogin(this.usersData.user1)

        cy.get('.header-links [href="/customer/info"]').should('have.text', this.usersData.user1.email)
    });

    it('Should verify unsuccessful login with empty password', function () {
        this.usersData.user1.password = undefined
        LogInPage.performLogin(this.usersData.user1)

        cy.get('.validation-summary-errors').should('contain.text', 'The credentials provided are incorrect')
    });

    it('Should verify unsuccessful login with empty email and password', function () {
        this.usersData.user1.email = undefined
        this.usersData.user1.password = undefined
        LogInPage.performLogin(this.usersData.user1)

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