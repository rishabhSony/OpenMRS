import { test, expect } from '@playwright/test';

test.describe('Language Switching Flow', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/login');
    });

    test('should switch language to Hindi', async ({ page }) => {
        // Check initial English text
        await expect(page.getByRole('heading', { name: /Hospital Management System/i })).toBeVisible();

        // Open language switcher
        // Assuming the select/dropdown is accessible
        await page.locator('select').selectOption('hi');

        // Verify Hindi text
        await expect(page.getByRole('heading', { name: /अस्पताल प्रबंधन प्रणाली/i })).toBeVisible();
        await expect(page.getByRole('button', { name: /साइन इन करें/i })).toBeVisible();
    });

    test('should persist language preference', async ({ page }) => {
        // Switch to Hindi
        await page.locator('select').selectOption('hi');
        await expect(page.getByRole('heading', { name: /अस्पताल प्रबंधन प्रणाली/i })).toBeVisible();

        // Reload page
        await page.reload();

        // Verify Hindi text persists
        await expect(page.getByRole('heading', { name: /अस्पताल प्रबंधन प्रणाली/i })).toBeVisible();
    });
});
