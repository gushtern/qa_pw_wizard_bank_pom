import { expect } from '@playwright/test';

export class AddCustomerPage {
  constructor(page) {
    this.page = page;

    this.firstNameInput = page.locator('input[ng-model="fName"]');
    this.lastNameInput = page.locator('input[ng-model="lName"]');
    this.postCodeInput = page.locator('input[ng-model="postCd"]');

    this.addCustomerButton = page.locator('form').getByRole('button', { name: 'Add Customer' });
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/addCust');
  }

  async waitForOpened() {
    await this.page.waitForURL('/angularJs-protractor/BankingProject/#/manager/addCust');
  }

  async fillFirstName(firstName) {
    await this.firstNameInput.fill(firstName);
  }

  async fillLastName(lastName) {
    await this.lastNameInput.fill(lastName);
  }

  async fillPostCode(postCode) {
    await this.postCodeInput.fill(postCode);
  }

  async clickAddCustomerButton() {
    this.page.once('dialog', async (dialog) => {
      await dialog.accept();
    });

    await expect(this.addCustomerButton).toBeVisible();
    await expect(this.addCustomerButton).toBeEnabled();

    await this.addCustomerButton.click();
  }

  async reloadPage() {
    await this.page.reload();
  }
}