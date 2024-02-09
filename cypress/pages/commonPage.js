export const sortByDropdown = () => cy.get('[name="products-orderby"]')
export const productPrice = () => cy.get('.actual-price')
export const productTitle = () => cy.get('.product-title')

// Actions
export const verifySortingBy = (sortType) => {
    let arr1 = [];
    getSortingLocatorBySortingType(sortType).each(elem => arr1.push(elem.text()))
        .then(() => {
            const arr2 = new Array(...arr1)
            if (sortType === 'Low to High') {
                cy.wrap(arr1).should('have.ordered.members', arr2.sort(function(a, b) {
                    return a - b;
                }))
            } else if (sortType === 'High to Low') {
                cy.wrap(arr1).should('have.ordered.members', arr2.sort(function(a, b) {
                    return a - b;
                }).reverse())
            } else if (sortType === 'A to Z') {
                cy.wrap(arr1).should('have.ordered.members', arr2.sort())
            } else {
                throw new Error(`Verification for '${sortType}' does not exist`)
            }
        })
}

export const getSortingLocatorBySortingType = (sortType) => {
    if (sortType === 'Low to High' || sortType === 'High to Low') {
        return productPrice();
    } else if (sortType === 'A to Z' || sortType === 'Z to A') {
        return productTitle();
    } else {
        throw Error(`'${sortType}' sort type does not exist`)
    }
}