import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
    test('should login successfully with valid credentials', async ({ page }) => {
        await page.goto('/login');

        // Check if login page is loaded
        await expect(page.getByRole('heading', { name: /Hospital Management System/i })).toBeVisible();

        // Fill credentials
        await page.getByLabel(/Username/i).fill('admin');
        await page.getByLabel(/Password/i).fill('Admin123');

        // Submit form
        await page.getByRole('button', { name: /Sign In/i }).click();

        // Verify redirection to dashboard
        await expect(page).toHaveURL('/');
        await expect(page.getByText(/Welcome back/i)).toBeVisible();
    });

    test('should show error with invalid credentials', async ({ page }) => {
        await page.goto('/login');

        // Fill invalid credentials
        await page.getByLabel(/Username/i).fill('wronguser');
        await page.getByLabel(/Password/i).fill('wrongpass');

        // Submit form
        await page.getByRole('button', { name: /Sign In/i }).click();

        // Verify error message
        await expect(page.getByText(/Invalid username or password/i)).toBeVisible();
    });
});
