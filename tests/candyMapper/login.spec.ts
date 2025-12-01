import { test, expect } from '../fixtures';
import { successMessages } from '../../test-data/commonData';

const SUCCESS_MESSAGE = successMessages.login;

test.describe('smoke', () => {
  test('Login to CandyMapper and assert user is logged in', async ({ loggedInLoginPage }) => {
    expect(await loggedInLoginPage.getLoginMessage()).toContain(SUCCESS_MESSAGE);
  }); 
  
  test('Login to CandyMapper and assert user is not logged in', async ({ loggedInLoginPage }) => {
    expect(await loggedInLoginPage.getLoginMessage()).not.toContain(SUCCESS_MESSAGE);
  }); 
});
