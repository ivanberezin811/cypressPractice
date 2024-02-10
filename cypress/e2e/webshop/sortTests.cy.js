import { users } from '../../fixtures/users.js';
import *  as HeaderPage from '../../pages/headerPage';
import *  as Utils from '../../support/utils';
import *  as ComputerPage from '../../pages/computersPage';
import *  as CommonPage from '../../pages/commonPage';
import { webshopData } from '../../fixtures/webshopData';

const sortByOptions = webshopData.sortByOptions;


const user1 = users.user1;

describe('Should verify sorting functionality', () => {

    beforeEach(() => {
        Utils.loginViaAPI(user1)
        Utils.visitPage('/')
        HeaderPage.userEmailLink().should('have.text', user1.email)

    });

    it('Should verify sorting by Price: Low to High', { tags: '@smoke' }, function () {
        HeaderPage.productByName('computers').click()
        ComputerPage.productByName('desktops').click()
        CommonPage.sortByDropdown().select(sortByOptions.lowToHigh)
        CommonPage.verifySortingBy('Low to High')
    })

    it('Should verify sorting by Price: High to Low', function () {
        HeaderPage.productByName('computers').click()
        ComputerPage.productByName('desktops').click()
        CommonPage.sortByDropdown().select(sortByOptions.highToLow)
        CommonPage.verifySortingBy('High to Low')
    })

    it('Should verify sorting by Name: A to Z', { tags: '@smoke' }, function () {
        HeaderPage.productByName('computers').click()
        ComputerPage.productByName('desktops').click()
        CommonPage.sortByDropdown().select(sortByOptions.nameAtoZ)
        CommonPage.verifySortingBy('A to Z')
    })

    it('Should verify sorting by Name: Z to A', function () {
        HeaderPage.productByName('computers').click()
        ComputerPage.productByName('desktops').click()
        CommonPage.sortByDropdown().select(sortByOptions.nameZtoA)
        CommonPage.verifySortingBy('Z to A')
    })
});