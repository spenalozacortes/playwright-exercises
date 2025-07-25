import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/loginPage';
import { HomePage } from '../../page-objects/homePage';
import { email, password } from '../../test-data/loginData';

const SUCCESS_MESSAGE = 'Account Login';

test('Login to CandyMapper and assert user is logged in', async ({ page }) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);

  await homePage.goto();
  await homePage.closePopupIfVisible();
  await homePage.openLoginForm();
  await loginPage.login(email, password);
  expect(await loginPage.getLoginMessage()).toContain(SUCCESS_MESSAGE);
}); 
