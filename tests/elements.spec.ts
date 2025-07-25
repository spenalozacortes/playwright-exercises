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
  await expect(page).toHaveURL(/.*dynamic_controls/);
  await page.getByRole('button', { name: 'Enable' }).click();
  await page.locator('input[type="text"]').fill('some text');
  await expect(page.locator('#message')).toHaveText(`It's enabled!`);
});

test('Test case 7', async ({ page }) => {
  await page.getByText('File Upload').click();
  await expect(page).toHaveURL(/.*upload/);
  await page.locator('#file-upload').setInputFiles('test.txt');
  await page.locator('#file-submit').click();
  expect(page.locator('#uploaded-files')).toContainText('test.txt');
});

test('Test case 8', async ({ page }) => {
  await page.getByText('JavaScript Alerts').click();
  await expect(page).toHaveURL(/.*javascript_alerts/);
  page.on('dialog', dialog => dialog.accept('Hello'));
  await page.getByRole('button', { name: 'Click for JS Prompt' }).click();
  await expect(page.locator('#result')).toHaveText('You entered: Hello');
});

test('Test case 9', async ({ page }) => {
  await page.getByText('JavaScript Alerts').click();
  await expect(page).toHaveURL(/.*javascript_alerts/);
  page.on('dialog', dialog => dialog.dismiss());
  await page.getByRole('button', { name: 'Click for JS Confirm' }).click();
  await expect(page.locator('#result')).toHaveText('You clicked: Cancel');
});

test('Test case 10', async ({ page }) => {
  await page.getByText('JavaScript Alerts').click();
  await expect(page).toHaveURL(/.*javascript_alerts/);
  page.on('dialog', dialog => dialog.accept());
  await page.getByRole('button', { name: 'Click for JS Alert' }).click();
  await expect(page.locator('#result')).toHaveText('You successfully clicked an alert');
});

test('Test case 11', async ({ page }) => {
  await page.getByText('Nested Frames').click();
  await expect(page).toHaveURL(/.*nested_frames/);
  const frameTop = page.frameLocator('[name="frame-top"]');
  const frameMiddle = frameTop.frameLocator('[name="frame-middle"]');
  await expect(frameMiddle.locator('#content')).toHaveText('MIDDLE');
  const frameRight = frameTop.frameLocator('[name="frame-right"]');
  await expect(frameRight.locator('body')).toContainText('RIGHT');
});

test('Test case 12', async ({ page }) => {
  await page.getByText('Multiple Windows').click();
  await expect(page).toHaveURL(/.*windows/);
  const [newPage] = await Promise.all([
    page.context().waitForEvent('page'),
    page.getByRole('link', { name: 'Click Here' }).click()
  ]);
  await expect(newPage).toHaveURL(/.*windows\/new/);
  await expect(newPage.locator('h3')).toContainText('New Window');
});
