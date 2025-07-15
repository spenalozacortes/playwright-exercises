import { test, expect } from '@playwright/test';

test('Test case 5', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/');
  await expect(page).toHaveTitle('The Internet');
  await page.getByText('Dynamic Controls').click();
  await expect(page).toHaveURL(/.*dynamic_controls/);
  await page.getByRole('button', { name: 'Remove' }).click();
  await expect(page.locator('input[type="checkbox"]')).not.toBeAttached();
  await expect(page.locator('#message')).toHaveText('It\'s gone!');
});
