import { test, expect } from '@playwright/test';

// Retry failed tests up to 2 times
test.describe.configure({ retries: 2 });

test.describe('E2E Todo Flow', () => {
  test('Login, create todos, delete one, validate filter, logout', async ({ page }) => {
    // Navigate to login page
    await page.goto('http://localhost:5173/login');

    // Login via Fake Login Form
    await page.getByPlaceholder('Username').fill('testuser');
    await page.getByRole('button', { name: 'Login' }).click();

    // Assert redirected to todos page
    await expect(page).toHaveURL('http://localhost:5173/');

    // Add "Read"
    await page.getByRole('textbox', { name: 'Add a todo' }).fill('Read');
    await page.keyboard.press('Enter');
    await expect(page.getByText('Read Delete')).toBeVisible();

    // Add "Check Email"
    await page.getByRole('textbox', { name: 'Add a todo' }).fill('Check Email');
    await page.keyboard.press('Enter');
    await expect(page.getByText('Check Email Delete')).toBeVisible();

    // Add "Go market"
    await page.getByRole('textbox', { name: 'Add a todo' }).fill('Go market');
    await page.keyboard.press('Enter');
    await expect(page.getByText('Go market Delete')).toBeVisible();

    // Delete "Read"
    const readItem = page.getByRole('listitem').filter({ hasText: 'Read Delete' });
    await readItem.getByRole('button', { name: /delete/i }).click();

    //Assert "Read" is no longer visible"
    await expect(page.getByText('Read Delete')).toHaveCount(0);

    // Filter by short
    await page.getByRole('combobox').selectOption('short');
    await expect(page.getByText('Go market Delete')).toBeVisible();
    await expect(page.getByText('Check Email Delete')).toHaveCount(0);

    // Filterby long
    await page.getByRole('combobox').selectOption('long');
    await expect(page.getByText('Check Email Delete')).toBeVisible();
    await expect(page.getByText('Go market Delete')).toHaveCount(0);

    // Reset filter to "all"
    await page.getByRole('combobox').selectOption('all');
    const visibleTodos = await page.getByRole('listitem').allTextContents();
    expect(visibleTodos).toEqual(expect.arrayContaining(['Go market Delete', 'Check Email Delete']));

    // Logout
    await page.getByRole('button', { name: 'Logout' }).click();

    // Assert redirected to login
    await expect(page).toHaveURL('http://localhost:5173/login');
  });
});