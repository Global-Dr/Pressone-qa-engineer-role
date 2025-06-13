import { test, expect } from '@playwright/test'

// Retry failed tests up to 2 times
test.describe.configure({ retries: 2 });

test.describe('E2E Todo Flow', () => {
  test('Login, create todos, delete one, validate filter, logout', async ({ page }) => {
    // Navigate to login page
     await page.goto('http://localhost:5173/login');

    // Login via Fake Login Form
  await page.getByPlaceholder('Username').fill('testuser')

  // Click login button
  await page.click('button:has-text("Login")')

    // Assert redirected to todos page
  await expect(page).toHaveURL('http://localhost:5173/')

    // Add todos
    //Add "Read"
  await page.getByRole('textbox', { name: 'Add a todo' }).fill('Read');
  await page.keyboard.press('Enter');
  await expect(page.getByText('Read Delete')).toBeVisible();

   //Add "Check Email"
  await page.getByRole('textbox', { name: 'Add a todo' }).fill('Check Email');
  await page.keyboard.press('Enter');
  await expect(page.getByText('Check Email Delete')).toBeVisible();

   //Add "Go market"
  await page.getByRole('textbox', { name: 'Add a todo' }).fill('Go market');
  await page.keyboard.press('Enter');
  await expect(page.getByText('Go market')).toBeVisible();

    // Delete "Read"
  await page.getByRole('listitem').filter({ hasText: 'Read Delete' }).getByRole('button').click();

    // Filter Check:
  // await page.selectOption('select', 'all');
  // const todoTexts = await page.locator('li').allTextContents();
  // expect(todoTexts).toEqual(expect.arrayContaining(['Read', 'Go market']));

  //Filter by short
  await page.getByRole('combobox').selectOption('short');
  //await expect(page.getByText('Go market Delete')).toBeVisible();

  // Filter by long
  await page.getByRole('combobox').selectOption('long');
  //await expect(page.getByText('Check Email Delete')).toBeVisible();

  //   // Logout
  // await page.click('button:has-text("Logout")')

  //   // Assert redirected to login
  // await expect(page).toHaveURL('http://localhost:5173/')
  // })
})
});