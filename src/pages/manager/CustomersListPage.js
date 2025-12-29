import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;

    this.searchInput = page.locator('input[ng-model="searchCustomer"]');
    this.rows = page.locator('table tbody tr');
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async waitForOpened() {
    await this.page.waitForURL('/angularJs-protractor/BankingProject/#/manager/list');
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

  async assertLastRowHasCustomerData(firstName, lastName, postCode) {
    const lastRow = this.rows.last();

    await expect(lastRow.locator('td').nth(0)).toHaveText(firstName);
    await expect(lastRow.locator('td').nth(1)).toHaveText(lastName);
    await expect(lastRow.locator('td').nth(2)).toHaveText(postCode);
  }

  async assertLastRowHasNoAccountNumber() {
    const lastRow = this.rows.last();
    const accountNumberCell = lastRow.locator('td').nth(3);

    await expect(accountNumberCell).toHaveText('');
  }

  getCustomerRow(firstName, lastName) {
    return this.rows.filter({
      has: this.page.locator('td', { hasText: firstName }),
    }).filter({
      has: this.page.locator('td', { hasText: lastName }),
    });
  }

  async assertCustomerRowIsVisible(firstName, lastName) {
    const row = this.getCustomerRow(firstName, lastName).first();
    await expect(row).toBeVisible();
  }

  async deleteCustomer(firstName, lastName) {
    const row = this.getCustomerRow(firstName, lastName).first();
    const deleteButton = row.getByRole('button', { name: 'Delete' });

    await expect(deleteButton).toBeVisible();
    await deleteButton.click();
  }

  async assertCustomerRowIsNotVisible(firstName, lastName) {
    const row = this.getCustomerRow(firstName, lastName);
    await expect(row).toHaveCount(0);
  }

  async assertLastRowAccountNumberNotEmpty() {
    const lastRow = this.rows.last();
    const accountNumberCell = lastRow.locator('td').nth(3);

    await expect(accountNumberCell).not.toHaveText('');
  } 
}