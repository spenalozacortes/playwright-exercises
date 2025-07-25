import { test, expect } from '../fixtures';
import { LoginPage } from '../../page-objects/loginPage';
import { successMessages } from '../../test-data/commonData';

const SUCCESS_MESSAGE = successMessages.login;

test('Login to CandyMapper and assert user is logged in', async ({ loggedInPage }) => {
  const loginPage = new LoginPage(loggedInPage);
  expect(await loginPage.getLoginMessage()).toContain(SUCCESS_MESSAGE);
}); 
