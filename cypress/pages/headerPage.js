// Top menu
export const wishlistLink = () => cy.get('.header-links .ico-wishlist')
export const userEmailLink = () => cy.get('.header-links [href="/customer/info"]')

// Products menu
export const productByName = (productName) => cy.get(`.top-menu [href="/${productName}"]`)