import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../page-objects/loginPage';
import { HomePage } from '../page-objects/homePage';
import { userCredentials } from '../test-data/commonData';

type MyFixtures = {
  loginPage: LoginPage;
  homePage: HomePage;
  loggedInPage: Page;
  loggedInLoginPage: LoginPage;
};

export const test = base.extend<MyFixtures, { userRole: string }>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  loggedInPage: async ({ page }, use, testInfo) => {
    const role = (testInfo.project.use as any).userRole;
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    await homePage.goto();
    await homePage.closePopupIfVisible();
    await homePage.openLoginForm();
    const credentials = userCredentials[role as keyof typeof userCredentials];
    await loginPage.login(credentials.email, credentials.password);
    await use(page);
  },
  loggedInLoginPage: async ({ loggedInPage }, use) => {
    await use(new LoginPage(loggedInPage));
  },
});

export { expect } from '@playwright/test'; 
