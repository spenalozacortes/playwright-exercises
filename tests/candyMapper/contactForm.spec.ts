import { test, expect } from '@playwright/test';
import { HomePage } from '../../page-objects/homePage';
import { faker } from '@faker-js/faker';
import { successMessages } from '../../test-data/commonData';

const SUCCESS_MESSAGE = successMessages.contactForm;

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
