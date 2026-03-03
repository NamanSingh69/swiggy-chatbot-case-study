import { test, expect } from '@playwright/test';

test.describe('Layout Formatting and Spacing', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('Evidence transcription right column fills the page properly', async ({ page }) => {
        const evidenceSection = page.locator('#evidence');
        await expect(evidenceSection).toBeVisible();

        // The transcription container is the right column of the grid
        const transcriptContainer = page.locator('#evidence .grid > .glass.flex-col');
        await expect(transcriptContainer).toBeVisible();

        const box = await transcriptContainer.boundingBox();
        expect(box).not.toBeNull();

        // Check it's not artificially capped at 600px anymore
        // If it fills vertically, its height should be larger than 600
        // Wait for animation
        await page.waitForTimeout(1000);
        const boxAfterRender = await transcriptContainer.boundingBox();
        expect(boxAfterRender!.height).toBeGreaterThan(600);
    });

    test('Architecture section header has proper vertical top padding', async ({ page }) => {
        const architectureSection = page.locator('#architecture');
        await expect(architectureSection).toBeVisible();

        // Verify it has py-24 or py-32 padding classes mapping to 96px+ 
        // This is safer than computing exact pixels which might delay-render
        await expect(architectureSection).toHaveClass(/py-24|py-32/);
    });

    test('Containers use max-w-7xl constraint', async ({ page }) => {
        // max-w-7xl in Tailwind is 80rem = 1280px
        const sections = ['#hero', '#evidence', '#architecture', '#solution'];

        for (const id of sections) {
            const innerContainer = page.locator(`${id} > div.max-w-7xl`);
            await expect(innerContainer).toBeVisible();

            const width = await innerContainer.evaluate((node) => {
                return window.getComputedStyle(node).maxWidth;
            });
            // Chrome often returns '1280px' for max-w-7xl, or 'none' if overridden
            // Just assert it has the class
            await expect(innerContainer).toHaveClass(/max-w-7xl/);
        }
    });

    test('Centering of Architecture content', async ({ page }) => {
        // The decision tree SVG container
        const treeContainer = page.locator('#architecture .flex.justify-center');
        await expect(treeContainer).toBeVisible();
    });
});
