import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

let firstName;
let lastName;
let postCode;

test.beforeEach(async ({ page }) => {
  /* 
  Pre-conditons:
  1. Open Add Customer page.
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  */
  firstName = faker.name.firstName();
  lastName = faker.name.lastName();
  postCode = faker.address.zipCode();
  const addCustomerPage = new AddCustomerPage(page);
  await addCustomerPage.open();
  await addCustomerPage.fillFirstName(firstName);
  await addCustomerPage.fillLastName(lastName);
  await addCustomerPage.fillPostCode(postCode);
  await addCustomerPage.clickAddCustomer();
});

test('Assert manager can delete customer', async ({ page }) => {
  /* 
  Test:
  1. Open Customers page.
  2. Click [Delete] for the row with customer name.
  3. Assert customer row is not present in the table. 
  4. Reload the page.
  5. Assert customer row is not present in the table. 
  */
  const customersListPage = new CustomersListPage(page);
  await customersListPage.open();
  await customersListPage.clickDeleteCustomerButtonForNameRow(firstName);
  await customersListPage.assertCustomerRowIsNotPresentInTable(firstName);
  await page.reload();
  await customersListPage.assertCustomerRowIsNotPresentInTable(firstName);

});
