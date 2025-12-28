import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';

import { BankHomePage } from '../../../src/pages/BankHomePage';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

  /* 
  Pre-conditons:
  1. Open Add Customer page.
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  */

test.describe('Manager - delete customer', () => {
  let firstName;
  let lastName;
  let postCode;

   test.beforeEach(async ({ page }) => {
    firstName = faker.person.firstName();
    lastName = faker.person.lastName();
    postCode = faker.location.zipCode();

    const bankHomePage = new BankHomePage(page);
    const bankManagerMainPage = new BankManagerMainPage(page);
    const addCustomerPage = new AddCustomerPage(page);

    await bankHomePage.open();
    await bankHomePage.clickBankManagerLoginButton();

    await bankManagerMainPage.clickAddCustomerButton();

    await addCustomerPage.fillFirstName(firstName);
    await addCustomerPage.fillLastName(lastName);
    await addCustomerPage.fillPostCode(postCode);

    await addCustomerPage.submitAddCustomer();
  });

  /* 
  Test:
  1. Open Customers page.
  2. Click [Delete] for the row with customer name.
  3. Assert customer row is not present in the table. 
  4. Reload the page.
  5. Assert customer row is not present in the table. 
  */ 

  test('Assert manager can delete customer', async ({ page }) => {
    const bankHomePage = new BankHomePage(page);
    const bankManagerMainPage = new BankManagerMainPage(page);
    const customersListPage = new CustomersListPage(page);

    await bankHomePage.open();
    await bankHomePage.clickBankManagerLoginButton();

    await bankManagerMainPage.clickCustomersButton();

    await customersListPage.assertCustomerRowIsVisible(firstName, lastName);
    await customersListPage.deleteCustomer(firstName, lastName);
    await customersListPage.assertCustomerRowIsNotVisible(firstName, lastName);

    await page.reload();

    await customersListPage.assertCustomerRowIsNotVisible(firstName, lastName);
  });
});  
 