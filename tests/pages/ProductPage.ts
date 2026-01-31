import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object Model for Product browsing and selection on demoblaze.com
 */
export class ProductPage {
    readonly page: Page;
    readonly monitorsCategory: Locator;
    readonly addToCartButton: Locator;
    readonly cartLink: Locator;
    readonly homeLink: Locator;

    constructor(page: Page) {
        this.page = page;
        // Category links
        this.monitorsCategory = page.locator('a[onclick="byCat(\'monitor\')"]');
        // Product page elements
        this.addToCartButton = page.locator('a.btn-success:has-text("Add to cart")');
        // Navigation
        this.cartLink = page.locator('#cartur');
        this.homeLink = page.locator('a.nav-link:has-text("Home")');
    }

    /**
     * Navigate to the home page
     */
    async goto(): Promise<void> {
        await this.page.goto('https://www.demoblaze.com/');
    }

    /**
     * Click on Monitors category
     */
    async selectMonitorsCategory(): Promise<void> {
        await this.monitorsCategory.click();
        await this.page.waitForTimeout(1000);
    }

    /**
     * Select a product by its name
     * @param productName - The name of the product to select
     */
    async selectProduct(productName: string): Promise<void> {
        await this.page.locator('xpath=/html/body/div[5]/div/div[2]/div/div[1]/div/a/img').click();
        // Wait for product page to load by checking for Add to cart button
        await expect(this.addToCartButton).toBeVisible({ timeout: 10000 });
    }

    /**
     * Add the current product to cart
     */
    async addToCart(): Promise<void> {
        await this.addToCartButton.click();
    }

    /**
     * Navigate to the cart page
     */
    async goToCart(): Promise<void> {
        await this.cartLink.click();
        await this.page.waitForTimeout(2000);
    }

    /**
     * Complete flow to add Apple monitor 24 to cart
     */
    async addAppleMonitorToCart(): Promise<void> {
        await this.selectMonitorsCategory();
        await this.page.waitForTimeout(1000);
        await this.selectProduct('Apple monitor 24');
        await this.page.waitForTimeout(1000);
        await this.addToCart();
    }
}
