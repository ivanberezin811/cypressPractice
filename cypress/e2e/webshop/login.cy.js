import *  as LogInPage from '../../pages/loginPage';
import *  as Utils from '../../support/utils';
import *  as HeaderPage from '../../pages/headerPage';
import *  as NotificationPage from '../../pages/notificationPage';
import { webshopData } from '../../fixtures/webshopData';
import { users } from '../../fixtures/users';

const invalidEmails = webshopData.invalidEmails;
const user1 = users.user1;

describe('Login', function () {

    beforeEach(function () {
        Utils.visitPage('/login')
        LogInPage.title().should('contain.text', 'Welcome, Please Sign In!')
    });

    it('Should verify successful login', { tags: '@smoke' }, function () {
        LogInPage.performLogin(user1)
        HeaderPage.userEmailLink().should('have.text', user1.email)
    });

    it('Should verify unsuccessful login with empty password', function () {
        LogInPage.performLogin({ email: user1.email})
        NotificationPage.notificationErrorText().should('contain.text', 'The credentials provided are incorrect')
    });

    it('Should verify unsuccessful login with empty email and password', function () {
        LogInPage.performLogin({})
        NotificationPage.notificationErrorText().should('contain.text', 'No customer account found')
    });

    it('Should verify error massage after invalid email is entered', function () {
        for (const elem of invalidEmails) {
            LogInPage.performLogin({ email: elem })
            NotificationPage.invalidEmailError().should('contain.text', 'Please enter a valid email address.')
            LogInPage.emailInput().clear()
        }
    });
});