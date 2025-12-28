import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;

    this.customersRows = page.locator('table tbody tr');
    this.searchInput = page.locator('input[ng-model="searchCustomer"]');
    this.rows = page.locator('table tbody tr');
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async waitForOpened() {
    await this.page.waitForURL('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async assertLastRowAccountNumberNotEmpty() {
    const lastRow = this.customersRows.last();
    const accountNumberCell = lastRow.locator('td').nth(3);

    await expect(accountNumberCell).not.toHaveText('');
  }

    async searchBy(value) {
    await this.searchInput.fill(value);
  }

  async assertSingleRowIsVisible() {
    await expect(this.rows).toHaveCount(1);
  }

  async assertRowContainsText(text) {
    await expect(this.rows.first()).toContainText(text);
  }
}
