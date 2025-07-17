const { test, expect } = require('@playwright/test');
const { HomePage } = require('../page-objects/homePage').default;
const { randomString, randomEmail, randomPhoneNumber } = require('../utils/randomUtils').default;

test('Fill the contact form with random data', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.goto();
  await homePage.closePopupIfVisible();
  await homePage.scrollToContactForm();

  await homePage.fillContactForm({
    firstName: randomString(6),
    lastName: randomString(8),
    email: randomEmail(),
    phone: randomPhoneNumber(),
    message: randomString(30),
  });

  await homePage.submitContactForm();

  expect(await homePage.getSuccessMessage()).toContain('Thank you for your inquiry! We will get back to you within 48 Years.');
}); 