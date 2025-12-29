import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';

import { BankHomePage } from '../../../src/pages/BankHomePage';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

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

    // 1) Go to home page
    await bankHomePage.open();

    // 2) Login as Bank Manager
    await bankHomePage.clickBankManagerLoginButton();

    // 3) Wait manager main page opened
    await bankManagerMainPage.waitForOpened();

    // 4) Open Add Customer page
    await bankManagerMainPage.clickAddCustomerButton();

    // 5) Wait Add Customer page opened
    await addCustomerPage.waitForOpened();

    // 6) Fill customer data and submit
    await addCustomerPage.fillFirstName(firstName);
    await addCustomerPage.fillLastName(lastName);
    await addCustomerPage.fillPostCode(postCode);
    await addCustomerPage.submitAddCustomer();
  });

  test('Assert manager can delete customer', async ({ page }) => {
    const bankManagerMainPage = new BankManagerMainPage(page);
    const customersListPage = new CustomersListPage(page);

    // 1) Open Customers page from manager main page
    await bankManagerMainPage.clickCustomersButton();

    // 2) Wait Customers page opened
    await customersListPage.waitForOpened();

    // 3) Delete customer row and assert it disappears
    await customersListPage.assertCustomerRowIsVisible(firstName, lastName);
    await customersListPage.deleteCustomer(firstName, lastName);
    await customersListPage.assertCustomerRowIsNotVisible(firstName, lastName);

    // 4) Reload and assert it is still deleted
    await page.reload();
    await customersListPage.waitForOpened();
    await customersListPage.assertCustomerRowIsNotVisible(firstName, lastName);
  });
});