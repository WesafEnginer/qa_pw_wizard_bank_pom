import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { AccountPage } from '../../../src/pages/manager/OpenAccountPage';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

let firstName;
let lastName;
let postCode;

test.beforeEach(async ({ page }) => {
  /* 
  Pre-conditons:
  1. Open Add Customer page
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  6. Reload the page (This is a simplified step to close the popup).
  */
  const addCustomerPage = new AddCustomerPage(page);
  await addCustomerPage.open();
  firstName = faker.name.firstName();
  lastName = faker.name.lastName();
  postCode = faker.address.zipCode();
  await addCustomerPage.fillFirstName(firstName);
  await addCustomerPage.fillLastName(lastName);
  await addCustomerPage.fillPostCode(postCode);
  await addCustomerPage.clickAddCustomer();
  await page.reload();
});

test('Assert manager can add new customer', async ({ page }) => {
  /* 
  Test:
  1. Click [Open Account].
  2. Select Customer name you just created.
  3. Select currency.
  4. Click [Process].
  5. Reload the page (This is a simplified step to close the popup).
  6. Click [Customers].
  7. Assert the customer row has the account number not empty.

  Tips:
  1. Do not rely on the customer row id for the step 13. 
    Use the ".last()" locator to get the last row.
  */
  const accountPage = new AccountPage(page);
  await accountPage.open();
  await accountPage.selectCustomerByName(firstName, lastName);
  await accountPage.selectCurrencyByName('Dollar');
  await accountPage.clickProcessButton();
  await page.reload();
  const bankManagerMainPage = new BankManagerMainPage(page);
  await bankManagerMainPage.clickCustomerButton();
  const customerListPage = new CustomersListPage(page);
  await customerListPage.assertAccountNumberIsNotEmptyByFirstName(firstName);
});
