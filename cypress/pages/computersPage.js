export const productByName = (productName) => cy.get(`.title [href="/${productName}"]`)