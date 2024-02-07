import { user1 } from '../../fixtures/users.json';
import *  as HeaderPage from '../../pages/headerPage';
import *  as LogInPage from '../../pages/loginPage';
import *  as WishlistPage from '../../pages/wishlistPage';
import *  as JewelryPage from '../../pages/jewelryPage';
import *  as NotificationPage from '../../pages/notificationPage';
import *  as Utils from '../../support/utils';
import { webshopData } from '../../fixtures/webshopData';
const jewelryAttributes = webshopData.jewelryAttributes;

describe('Should verify wishlist functionality', () => {

    beforeEach(() => {
        Utils.visitPage('/login')
        LogInPage.title().should('contain.text', 'Welcome, Please Sign In!')
        LogInPage.performLogin(user1)

        //Cleanup of wishlist
        HeaderPage.wishlistLink().click()
        WishlistPage.wish().then(element => {
            if (!element.text().includes('empty')) {
                WishlistPage.wishCheckbox().click({ multiple: true })
                WishlistPage.updateButton().click();
            }
        })
    });

    it('Should verify successful adding a product to wishlist', { tags: '@smoke' }, function () {
        HeaderPage.jewelryLink().click()
        JewelryPage.jewelryLinkCreateOwn().click()

        //Fill product form
        JewelryPage.materialDropdown().select(jewelryAttributes.material)
        JewelryPage.lengthInCmInput().type(jewelryAttributes.length)
        JewelryPage.pendantLadybugRadioButton().click()
        JewelryPage.quantityInput().clear().type(jewelryAttributes.qty)
        JewelryPage.addToWishlistButton().click()

        //Verify added to wishlist
        NotificationPage.notificationSuccess().should('be.visible')
        NotificationPage.notificationSuccessText().should('have.text', 'The product has been added to your wishlist')

        //Ensure product is on the wishlist page
        HeaderPage.wishlistLink().click()
        WishlistPage.wish().should('not.contain.text', 'The wishlist is empty!')
        WishlistPage.wishItem().should('contain.text', `Material: ${jewelryAttributes.material}`)
        WishlistPage.wishItem().should('contain.text', `Length: ${jewelryAttributes.length}`)
        WishlistPage.wishItem().should('contain.text', `Pendant: ${jewelryAttributes.pendant}`)
        WishlistPage.quantityInput().should('have.value', jewelryAttributes.qty)
    })
});