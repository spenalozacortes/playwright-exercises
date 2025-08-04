import { test, expect } from '@playwright/test';

test('Test case 1', async ({ page }) => {
  const agreeAndCloseBtn = page.getByRole('button', { name: 'Agree and close' });
  await page.goto('https://www.euronews.com/');
  expect(page.url()).toContain('euronews');
  if(await agreeAndCloseBtn.isVisible()) {
    await agreeAndCloseBtn.click();
  }
  await page.locator('header').getByRole('link', { name: 'Newsletters' }).click();
  expect(page.url()).toContain('newsletters');
  await page.getByText('Select this newsletter').first().click();
  await expect(page.locator('.checked-label').first()).toBeVisible();
  await expect(page.locator('section.sticky input[type="email"]')).toBeVisible();
});
