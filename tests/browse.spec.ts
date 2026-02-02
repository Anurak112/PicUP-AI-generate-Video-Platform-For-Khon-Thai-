import { test, expect } from '@playwright/test';

test.describe('Browse Page', () => {
    test.beforeEach(async ({ page }) => {
        // Go to the browse page before each test
        // Assuming 'en' locale is default
        await page.goto('/en/browse');
    });

    test('should load the browse page correctly', async ({ page }) => {
        await expect(page).toHaveTitle(/Browse Videos/i); // Adjust based on actual title if needed
        await expect(page.locator('h1')).toContainText('Browse Videos');

        // Check if video grid is present
        const VideoGrid = page.locator('.video-grid');
        await expect(VideoGrid).toBeVisible();

        // Check if videos are loaded (mock data has videos)
        const videos = page.locator('.video-card');
        await expect(videos.first()).toBeVisible();
        const count = await videos.count();
        expect(count).toBeGreaterThan(0);
    });

    test('should filter videos by category', async ({ page }) => {
        // Click on a category (e.g., 'Nature')
        const categoryButton = page.getByRole('button', { name: /Nature/i }).first();
        // Note: Dropdown logic might require opening it first depending on implementation
        // If it's a dropdown, we click the trigger first
        const dropdownTrigger = page.locator('.dropdown-trigger');
        if (await dropdownTrigger.isVisible()) {
            await dropdownTrigger.click();
            await page.locator('.dropdown-item').filter({ hasText: 'Nature' }).click();
        } else {
            await categoryButton.click();
        }

        // Wait for filtered results
        await page.waitForTimeout(500); // Simulate network/filtering delay if needed

        // Verify filtered results
        const videos = page.locator('.video-card');
        const categories = await videos.locator('.video-card-tags').allInnerTexts();

        // Note: Since tags on card are what we check, ensure logic matches
        // Or check the results info text
        await expect(page.locator('.results-count')).toContainText('Nature');
    });

    test('should search videos by text', async ({ page }) => {
        const searchInput = page.locator('.search-input');
        await searchInput.fill('Sunset');
        await searchInput.press('Enter');

        // Wait for search results
        await page.waitForTimeout(600);

        // Verify search results
        const videos = page.locator('.video-card');
        await expect(videos.first()).toBeVisible();

        const titles = await videos.locator('.video-card-title').allInnerTexts();
        const hasSunset = titles.some(title => title.toLowerCase().includes('sunset'));
        expect(hasSunset).toBeTruthy();

        await expect(page.locator('.search-term')).toContainText('"Sunset"');
    });

    test('should toggle semantic search mode', async ({ page }) => {
        const toggleBtn = page.locator('.semantic-toggle');
        const searchInput = page.locator('.search-input');

        // Initial state (Semantic is default true in code)
        await expect(toggleBtn).toHaveClass(/active/);
        await expect(searchInput).toHaveAttribute('placeholder', /Describe the video/i);

        // Click toggle
        await toggleBtn.click();

        // Verify state change
        await expect(toggleBtn).not.toHaveClass(/active/);
        await expect(searchInput).toHaveAttribute('placeholder', /Search details/i);
    });
});
