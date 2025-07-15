import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/');
  await expect(page).toHaveTitle('The Internet');
});

test('Test case 5', async ({ page }) => {
  await page.getByText('Dynamic Controls').click();
  await expect(page).toHaveURL(/.*dynamic_controls/);
  await page.getByRole('button', { name: 'Remove' }).click();
  await expect(page.locator('input[type="checkbox"]')).not.toBeAttached();
  await expect(page.locator('#message')).toHaveText(`It's gone!`);
});

test('Test case 6', async ({ page }) => {
  await page.getByText('Dynamic Controls').click();
  await page.getByRole('button', { name: 'Enable' }).click();
  await page.locator('input[type="text"]').fill('some text');
  await expect(page.locator('#message')).toHaveText(`It's enabled!`);
});
