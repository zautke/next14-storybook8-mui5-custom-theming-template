const { test, expect } = require('@playwright/test');

test('Basic test', async ({ page }) => {
  await page.goto('http://localhost:3000'); // Replace with the URL of your Next.js application
  await expect(page).toHaveTitle('Your Next.js App Title'); // Replace with the expected title of your Next.js app
});
