import {user1} from "../../../webShopData/users";

describe('Login', () => {

    beforeEach(() => {
        cy.visit('https://demowebshop.tricentis.com')
        //Login
        cy.get('.ico-login').click()
        cy.get('.page-title').should('contain.text', 'Welcome, Please Sign In!')
        cy.get('#Email').type(user1.email)
        cy.get('#Password').type(user1.password)
        cy.get('.login-button').click()

        //Cleanup of wishlist
        cy.get('.header-links .ico-wishlist').click()
        cy.get('.wishlist-content').then(element => {
            if (!element.text().includes('empty')) {
                cy.get('[name="removefromcart"]').click({ multiple: true })
                cy.get('.update-wishlist-button').click();
            }
        })
    });

    it('Should verify successful adding a product to wishlist', { tags: '@smoke' }, function () {
        cy.get('.top-menu [href="/jewelry"]').click()
        cy.get('[data-productid="71"] .product-title [href]').click()

        const jewelryAttributes = {
            material: 'Gold (1 mm)',
            length: '15',
            pendant: 'Ladybug',
            qty: '3'
        }

        //Fill product form
        cy.get('[name="product_attribute_71_9_15"]').select(jewelryAttributes.material)
        cy.get('[name="product_attribute_71_10_16"]').type(jewelryAttributes.length)
        cy.get('[name="product_attribute_71_11_17"][value="48"]').click()
        cy.get('[name="addtocart_71.EnteredQuantity"]').clear().type(jewelryAttributes.qty)
        cy.get('#add-to-wishlist-button-71').click()

        //Verify added to wishlist
        cy.get('.bar-notification.success').should('be.visible')
        cy.get('.bar-notification.success .content').should('have.text', 'The product has been added to your wishlist')

        //Ensure product is on the wishlist page
        cy.get('.header-links .ico-wishlist').click()
        cy.get('.wishlist-content').should('not.contain.text', 'The wishlist is empty!')
        cy.get('.cart-item-row').should('contain.text', `Material: ${jewelryAttributes.material}`)
        cy.get('.cart-item-row').should('contain.text', `Length: ${jewelryAttributes.length}`)
        cy.get('.cart-item-row').should('contain.text', `Pendant: ${jewelryAttributes.pendant}`)
        cy.get('[name*="itemquantity"]').should('have.value', jewelryAttributes.qty)
    })
});