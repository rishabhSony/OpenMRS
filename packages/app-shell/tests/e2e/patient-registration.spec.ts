import { test, expect } from '@playwright/test';

test.describe('Patient Registration Flow', () => {
    test.beforeEach(async ({ page }) => {
        // Login before each test
        await page.goto('/login');
        await page.getByLabel(/Username/i).fill('admin');
        await page.getByLabel(/Password/i).fill('Admin123');
        await page.getByRole('button', { name: /Sign In/i }).click();
        await expect(page.getByText(/Welcome back/i)).toBeVisible();
    });

    test('should navigate to patient registration page', async ({ page }) => {
        await page.getByRole('link', { name: /Patients/i }).click();
        await expect(page).toHaveURL('/patients');

        await page.getByRole('button', { name: /\+ Register Patient/i }).click();
        await expect(page.getByText(/Register New Patient/i)).toBeVisible();
    });

    test('should validate required fields', async ({ page }) => {
        await page.goto('/patients');
        await page.getByRole('button', { name: /\+ Register Patient/i }).click();

        // Try to submit empty form
        await page.getByRole('button', { name: 'Register Patient', exact: true }).click();

        // Check for validation errors (assuming HTML5 validation or UI error messages)
        // Adjust selectors based on actual implementation
        // For now, just checking if we are still on the same page (registration not successful)
        await expect(page.getByText(/Register New Patient/i)).toBeVisible();
    });
});
