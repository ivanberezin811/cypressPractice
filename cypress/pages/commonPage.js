export const sortByDropdown = () => cy.get('[name="products-orderby"]')
export const productPrice = () => cy.get('.actual-price')
export const productTitle = () => cy.get('.product-title')
export const displayDropdown = () => cy.get('#products-pagesize')
export const productItem = () => cy.get('.product-item')
export const filterByPriceUnder1000 = () => cy.get('[href*="-1000"]')
export const filterByPriceFrom1000To1200 = () => cy.get('[href*="1000-1200"]')
export const filterByPriceOver1200 = () => cy.get('[href*="1200-"]')
export const removeFilterLink = () => cy.get('.remove-price-range-filter')

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
            } else if (sortType === 'Z to A') {
                cy.wrap(arr1).should('have.ordered.members', arr2.sort().reverse())
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

export const getFilterOptionLocatorByPriceRange = (priceRange) => {
    switch (priceRange) {
        case 'Under1000':
            return filterByPriceUnder1000();
        case 'From1000To1200':
            return filterByPriceFrom1000To1200();
        case 'Over1200':
            return filterByPriceOver1200();
        default:
            throw Error(`'${priceRange}' price range does not exist`);
    }
}

export const verifyFilteredByPriceRange = (priceRange) => {
    productPrice().each(elem => {
        expect(parseInt(elem.text())).to.satisfy( (num) => {
            let condition;
            switch (priceRange) {
                case 'Under1000':
                    condition = num <= 1000;
                    break;
                case 'From1000To1200':
                    condition = num >= 1000 && num <= 1200;
                    break;
                case 'Over1200':
                    condition = num >= 1200;
                    break;
                default:
                    throw new Error('No available conditions found');
            }
            return condition;
        })
    })
}