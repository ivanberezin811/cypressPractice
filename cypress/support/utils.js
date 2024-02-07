
export const visitPage = (additionalPath) => {
    cy.visit('/' + additionalPath)
}