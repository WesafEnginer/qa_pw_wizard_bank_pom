import { expect } from '@playwright/test';

export class AccountPage {
  constructor(page) {
    this.page = page;
    this.customerSelect = page.getByRole('combobox').first();
    this.currencySelect = page.getByRole('combobox').nth(1);
    this.processButton = page.getByRole('button', { name: 'Process' });
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/openAccount',
    );
  }

  async clickProcessButton() {
    await this.processButton.click();
  }

  async selectCustomerByName(name, lastName) {
    await this.customerSelect.selectOption({ label: `${name} ${lastName}` });
  }

  async selectCurrencyByName(name) {
    await this.currencySelect.selectOption({ label: name });
  }

  async assertCurrencyIsSelectedByName(name) {
    await expect(this.currencySelect).toHaveValue(name);
  }

  async assertCustomerIsSelectedByName(name) {
    await expect(this.customerSelect).toHaveValue(name);
  }
}
