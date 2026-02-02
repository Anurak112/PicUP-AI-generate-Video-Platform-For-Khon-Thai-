import { test, expect } from '@playwright/test';

test.describe('Upload Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/en/upload');
    });

    test('should display the upload page with all key elements', async ({ page }) => {
        // Wait for page to load
        await page.waitForLoadState('networkidle');

        // Check page header
        await expect(page.locator('h1')).toContainText('Upload');

        // Check step indicator dots are present
        const stepDots = page.locator('.step-dot');
        await expect(stepDots).toHaveCount(4);

        // Check first step is active
        await expect(stepDots.first()).toHaveClass(/active/);

        // Check drop zone is visible
        const dropZone = page.locator('.drop-zone');
        await expect(dropZone).toBeVisible();

        // Check drop zone text
        await expect(page.locator('.drop-zone-title')).toContainText('Drag and drop your video here');

        // Check browse button text
        await expect(page.locator('.drop-zone-browse')).toContainText('Select video file');

        // Check continue button exists and is disabled
        const continueButton = page.locator('button:has-text("Continue")');
        await expect(continueButton).toBeVisible();
        await expect(continueButton).toBeDisabled();
    });

    test('should display supported formats info', async ({ page }) => {
        await expect(page.locator('.drop-zone-formats')).toContainText('MP4');
        await expect(page.locator('.drop-zone-formats')).toContainText('WebM');
        await expect(page.locator('.drop-zone-formats')).toContainText('500MB');
    });

    test('should show error for invalid file type', async ({ page }) => {
        // Create a mock file input change with an invalid file
        const fileInput = page.locator('input[type="file"]');

        // Intercept and test with an invalid file type
        await fileInput.setInputFiles({
            name: 'test.txt',
            mimeType: 'text/plain',
            buffer: Buffer.from('test content'),
        });

        // Should show error message
        await expect(page.locator('.upload-error-message')).toBeVisible();
        await expect(page.locator('.upload-error-message')).toContainText('Invalid file type');
    });

    test('should accept valid video file and show file info', async ({ page }) => {
        const fileInput = page.locator('input[type="file"]');

        // Create a small test video buffer (minimal MP4 header)
        // This is just for testing the UI - actual video would be larger
        const mp4Header = Buffer.from([
            0x00, 0x00, 0x00, 0x1C, 0x66, 0x74, 0x79, 0x70,
            0x69, 0x73, 0x6F, 0x6D, 0x00, 0x00, 0x02, 0x00,
            0x69, 0x73, 0x6F, 0x6D, 0x69, 0x73, 0x6F, 0x32,
            0x61, 0x76, 0x63, 0x31
        ]);

        await fileInput.setInputFiles({
            name: 'test-video.mp4',
            mimeType: 'video/mp4',
            buffer: mp4Header,
        });

        // Should show file info
        await expect(page.locator('.file-info-name')).toContainText('test-video.mp4');

        // Continue button should now be enabled
        const continueButton = page.locator('button:has-text("Continue")');
        await expect(continueButton).toBeEnabled();
    });

    test('should navigate to step 2 when Continue is clicked', async ({ page }) => {
        const fileInput = page.locator('input[type="file"]');

        const mp4Header = Buffer.from([
            0x00, 0x00, 0x00, 0x1C, 0x66, 0x74, 0x79, 0x70,
            0x69, 0x73, 0x6F, 0x6D, 0x00, 0x00, 0x02, 0x00,
            0x69, 0x73, 0x6F, 0x6D, 0x69, 0x73, 0x6F, 0x32,
            0x61, 0x76, 0x63, 0x31
        ]);

        await fileInput.setInputFiles({
            name: 'test-video.mp4',
            mimeType: 'video/mp4',
            buffer: mp4Header,
        });

        // Click continue
        await page.locator('button:has-text("Continue")').click();

        // Should now see step 2 - video details form
        await expect(page.locator('.form-section-title')).toContainText('Video Details');

        // Title input should have the filename as default
        const titleInput = page.locator('input.form-input').first();
        await expect(titleInput).toHaveValue('test-video');

        // Description textarea should be present
        await expect(page.locator('textarea.form-textarea')).toBeVisible();

        // Tags input container should be present
        await expect(page.locator('.tags-input-container')).toBeVisible();
    });

    test('should show AI metadata form when Add AI Info is clicked', async ({ page }) => {
        const fileInput = page.locator('input[type="file"]');

        const mp4Header = Buffer.from([
            0x00, 0x00, 0x00, 0x1C, 0x66, 0x74, 0x79, 0x70,
            0x69, 0x73, 0x6F, 0x6D, 0x00, 0x00, 0x02, 0x00,
            0x69, 0x73, 0x6F, 0x6D, 0x69, 0x73, 0x6F, 0x32,
            0x61, 0x76, 0x63, 0x31
        ]);

        await fileInput.setInputFiles({
            name: 'test-video.mp4',
            mimeType: 'video/mp4',
            buffer: mp4Header,
        });

        // Go to step 2
        await page.locator('button:has-text("Continue")').click();

        // Click Add AI Info
        await page.locator('button:has-text("Add AI Info")').click();

        // Should see AI metadata section
        await expect(page.locator('.ai-metadata-section')).toBeVisible();
        await expect(page.locator('.form-section-title')).toContainText('AI Generation Details');

        // Should see model options
        await expect(page.locator('.model-grid')).toBeVisible();
        await expect(page.locator('.model-option')).toHaveCount(7); // 6 models + Other

        // Check for specific models
        await expect(page.locator('.model-option-name:has-text("Runway Gen-3")')).toBeVisible();
        await expect(page.locator('.model-option-name:has-text("Pika Labs")')).toBeVisible();
    });
});
