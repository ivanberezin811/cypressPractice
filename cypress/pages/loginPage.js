export const title = () => cy.get('.page-title')
export const emailInput = () => cy.get('#Email')
export const passwordInput = () => cy.get('#Password')
export const loginButton = () => cy.get('.login-button')

// Actions
export const performLogin = (user, clickLogin = true) => {
        if(user.email) emailInput().type(user.email)
        if(user.password) passwordInput().type(user.password)
        if(clickLogin) loginButton().click()
}