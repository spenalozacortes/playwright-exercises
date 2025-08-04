import { test, expect } from '@playwright/test';
import { newsletters } from '../test-data/euronewsData';

test.beforeEach(async ({ page }) => {
  const agreeAndCloseBtn = page.getByRole('button', { name: 'Agree and close' });
  await page.goto('https://www.euronews.com/');
  expect(page.url()).toContain('euronews');
  if(await agreeAndCloseBtn.isVisible()) {
    await agreeAndCloseBtn.click();
  }
  await page.locator('header').getByRole('link', { name: 'Newsletters' }).click();
  expect(page.url()).toContain('newsletters');
});

test('Test case 1', async ({ page }) => {
  await page.getByText('Select this newsletter').first().click();
  await expect(page.locator('.checked-label').first()).toBeVisible();
  await expect(page.locator('section.sticky input[type="email"]')).toBeVisible();
});

test.only('Test case 2', async ({ page }) => {
  newsletters.forEach(async (newsletter) => {
    const title = page.getByText(newsletter.name);
    const card = page.locator('.p-8').filter({ has: title });
    await expect(card).toContainText(newsletter.frequency);
    await expect(card).toContainText(newsletter.description);
  });
  let title = page.getByText('Special Coverage');
  let card = page.locator('.p-8').filter({ has: title });
  await card.getByRole('link', { name: 'See preview '}).click();
  await expect(page.locator('#special-coverage_previews')).toContainText('No preview available for this newsletter.');
  await page.locator('.close-modal').click();
  title = page.getByText('Travel');
  card = page.locator('.p-8').filter({ has: title });
  await card.getByRole('link', { name: 'See preview '}).click();
  await expect(page.locator('#travel_previews')).toBeVisible();
});
