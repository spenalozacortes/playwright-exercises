const { test, expect } = require('@playwright/test');
const { HomePage } = require('../../page-objects/homePage').default;
const { faker } = require('@faker-js/faker');

const SUCCESS_MESSAGE = 'Thank you for your inquiry! We will get back to you within 48 Years.';

test('Fill the contact form with random data', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.goto();
  await homePage.closePopupIfVisible();
  await homePage.scrollToContactForm();

  await homePage.fillContactForm({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    message: faker.lorem.sentence(20),
  });

  await homePage.submitContactForm();

  expect(await homePage.getSuccessMessage()).toContain(SUCCESS_MESSAGE);
}); 
