import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.customersTableRows = page.locator('table tbody tr');
    this.customersButton = page.getByRole('button', { name: 'Customers' });
    this.deleteCustomerButton = page.getByRole('button', { name: 'Delete' });
    this.searchCustomerInput = page.getByPlaceholder('Search Customer');
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async getLastCustomerRow() {
    return this.customersTableRows.last();
  }

  async clickCustomersButton() {
    await this.customersButton.click();
  }

  async clickDeleteCustomerButtonForNameRow(firstName) {
    const customerRow = this.customersTableRows.filter({
      hasText: firstName,
    });

    await customerRow.getByRole('button', { name: 'Delete' }).click();
  }

  async fillSearchCustomerInput(firstName) {
    await this.searchCustomerInput.fill(firstName);
  }

  async assertFirstNameCustomerInLastRow(firstName) {
    const lastRow = await this.getLastCustomerRow();

    await expect(
      lastRow.locator('td').nth(0)
    ).toHaveText(firstName);
  }
  async assertLastNameCustomerInLastRow(lastName) {
    const lastRow = await this.getLastCustomerRow();
    await expect(lastRow.locator('td').nth(1)).toHaveText(lastName);
  }
  async assertPostCodeCustomerInLastRow(postCode) {
    const lastRow = await this.getLastCustomerRow();
    await expect(lastRow.locator('td').nth(2)).toHaveText(postCode);
  }
  async assertAccountNumberIsEmptyInLastRow() {
    const lastRow = await this.getLastCustomerRow();
    await expect(lastRow.locator('td').nth(3)).toHaveText('');
  }
  async assertCustomerRowIsNotPresentInTable(firstName) {
    const customerRow = this.customersTableRows.filter({
      hasText: firstName,
    });
    await expect(customerRow).toHaveCount(0);
  }

  async assertAccountNumberIsNotEmptyByFirstName(firstName) {
    const row = this.customersTableRows.filter({
      has: this.page.locator('td').nth(0).filter({
        hasText: firstName,
      }),
    });

    await expect(row.locator('td').nth(3)).not.toBeEmpty();
  }

  //Assert no other rows is present in the table.
  async assertOnlyOneRowIsPresentInTable() {
    await expect(this.customersTableRows).toHaveCount(1);
  }
}
