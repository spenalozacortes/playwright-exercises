import { test as base } from '@playwright/test';
import { LoginPage } from '../page-objects/loginPage';
import { HomePage } from '../page-objects/homePage';
import { email, password } from '../test-data/commonData';

export const test = base.extend<{ loggedInPage: import('@playwright/test').Page }>({
  loggedInPage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    await homePage.goto();
    await homePage.closePopupIfVisible();
    await homePage.openLoginForm();
    await loginPage.login(email, password);
    await use(page);
  },
});

export { expect } from '@playwright/test'; 