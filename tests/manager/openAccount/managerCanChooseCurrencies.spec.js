import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AccountPage } from '../../../src/pages/manager/OpenAccountPage';

test('Assert manager can choose currencies for account', async ({ page }) => {
  /* 
  Test:
  1. Open the Open account page 
    https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/openAccount
  2. Select currency Dollar
  3. Assert the drop-dwon has value Dollar
  4. Select currency Pound
  5. Assert the drop-dwon has value Pound
  6. Select currency Rupee
  7. Assert the drop-dwon has value Rupee
  */
  const addAccountPage = new AccountPage(page);

  await addAccountPage.open();
  await addAccountPage.selectCurrencyByName('Dollar');
  await addAccountPage.assertCurrencyIsSelectedByName('Dollar');
  await addAccountPage.selectCurrencyByName('Pound');
  await addAccountPage.assertCurrencyIsSelectedByName('Pound');
  await addAccountPage.selectCurrencyByName('Rupee');
  await addAccountPage.assertCurrencyIsSelectedByName('Rupee');

});
