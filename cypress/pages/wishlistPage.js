export const wish = () => cy.get('.wishlist-content')
export const wishCheckbox = () => cy.get('[name="removefromcart"]')
export const updateButton = () => cy.get('.update-wishlist-button')
export const wishItem = () => cy.get('.cart-item-row')
export const quantityInput = () => cy.get('[name*="itemquantity"]')