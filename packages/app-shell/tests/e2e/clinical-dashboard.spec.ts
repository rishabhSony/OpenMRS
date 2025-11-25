import { test, expect } from '@playwright/test';

test.describe('Clinical Dashboard Flow', () => {
    test.beforeEach(async ({ page }) => {
        // Login before each test
        await page.goto('/login');
        await page.getByLabel(/Username/i).fill('admin');
        await page.getByLabel(/Password/i).fill('Admin123');
        await page.getByRole('button', { name: /Sign In/i }).click();
        await expect(page.getByText(/Welcome back/i)).toBeVisible();
    });

    test('should navigate to clinical dashboard', async ({ page }) => {
        await page.getByRole('link', { name: /Clinical/i }).click();
        await expect(page).toHaveURL('/clinical');
        await expect(page.getByText(/Clinical Dashboard/i)).toBeVisible();
    });

    test('should show patient selection prompt', async ({ page }) => {
        await page.goto('/clinical');
        await expect(page.getByText(/Select a patient to view clinical data/i)).toBeVisible();
    });
});
