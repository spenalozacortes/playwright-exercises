import { test as base } from '@playwright/test';
import { LoginPage } from '../page-objects/loginPage';
import { HomePage } from '../page-objects/homePage';
import { email, password } from '../test-data/commonData';

type MyFixtures = {
  loginPage: LoginPage;
  homePage: HomePage;
  loggedInPage: import('@playwright/test').Page;
  loggedInLoginPage: LoginPage;
  loggedInHomePage: HomePage;
};

export const test = base.extend<MyFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  loggedInPage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    await homePage.goto();
    await homePage.closePopupIfVisible();
    await homePage.openLoginForm();
    await loginPage.login(email, password);
    await use(page);
  },
  loggedInLoginPage: async ({ loggedInPage }, use) => {
    await use(new LoginPage(loggedInPage));
  },
  loggedInHomePage: async ({ loggedInPage }, use) => {
    await use(new HomePage(loggedInPage));
  },
});

export { expect } from '@playwright/test'; 