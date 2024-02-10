import *  as HeaderPage from '../../pages/headerPage';
import *  as Utils from '../../support/utils';
import *  as ComputerPage from '../../pages/computersPage';
import *  as CommonPage from '../../pages/commonPage';
import { users } from '../../fixtures/users.js';
import { webshopData } from '../../fixtures/webshopData';

const filterConditions = webshopData.filterByConditions;
const displayCount = '4';
const user1 = users.user1;

describe('Should verify filter functionality', () => {

    beforeEach(() => {
        Utils.loginViaAPI(user1)
        Utils.visitPage('/')
        HeaderPage.userEmailLink().should('have.text', user1.email)
        HeaderPage.productByName('computers').click()
        ComputerPage.productByName('desktops').click()
    });

    it('Should verify filtering by Display count', { tags: '@smoke' }, function () {
        CommonPage.displayDropdown().select(displayCount)
        CommonPage.productItem().should('have.length', Number(displayCount))
    })

    Object.values(filterConditions).forEach((value) => {
        it(`Should verify filtering by price '${value}'`, function () {
            CommonPage.getFilterOptionLocatorByPriceRange(value).click()
            CommonPage.verifyFilteredByPriceRange(value)
        })
    })

    it('Should verify filter deleting', { tags: '@smoke' }, function () {
        CommonPage.displayDropdown().select(displayCount)
        CommonPage.filterByPriceUnder1000().click()
        CommonPage.productItem().should('have.length.lessThan', Number(displayCount))
        CommonPage.removeFilterLink().click()
        CommonPage.productItem().should('have.length', Number(displayCount))
    })
});