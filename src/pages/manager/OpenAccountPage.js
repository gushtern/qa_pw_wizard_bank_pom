import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;

    this.customerDropDown = page.locator('#userSelect');
    this.currencyDropDown = page.locator('#currency');
    this.processButton = page.getByRole('button', { name: 'Process' });
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/openAccount');
  }

  async waitForOpened() {
    await this.page.waitForURL('**/angularJs-protractor/BankingProject/#/manager/openAccount');
    await expect(this.processButton).toBeVisible();
  }

  async selectCustomer(customerName) {
    await this.customerDropDown.selectOption(customerName);
  }

  async selectCurrency(currencyName) {
    await this.currencyDropDown.selectOption(currencyName);
  }

  async clickProcessButton() {
    await this.processButton.click();
  }

  async assertCurrencyDropdownHasValue(label) {
    await expect(this.currencyDropDown).toHaveValue(label);
  }
}