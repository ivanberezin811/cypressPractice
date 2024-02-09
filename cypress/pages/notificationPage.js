export const notificationSuccess = () => cy.get('.bar-notification.success')
export const notificationSuccessText = () => cy.get('.bar-notification.success .content')
export const notificationErrorText = () => cy.get('.validation-summary-errors')
export const invalidEmailError = () => cy.get('[data-valmsg-for="Email"]')