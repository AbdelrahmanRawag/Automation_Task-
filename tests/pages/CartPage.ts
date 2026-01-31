import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object Model for Cart and Checkout functionality on demoblaze.com
 */
export class CartPage {
    readonly page: Page;
    readonly cartTable: Locator;
    readonly placeOrderButton: Locator;
    readonly orderModal: Locator;
    readonly nameInput: Locator;
    readonly countryInput: Locator;
    readonly cityInput: Locator;
    readonly creditCardInput: Locator;
    readonly monthInput: Locator;
    readonly yearInput: Locator;
    readonly purchaseButton: Locator;
    readonly confirmationModal: Locator;
    readonly confirmationOkButton: Locator;
    readonly totalPrice: Locator;

    constructor(page: Page) {
        this.page = page;
        // Cart elements
        this.cartTable = page.locator('#tbodyid');
        this.placeOrderButton = page.locator('button.btn-success:has-text("Place Order")');
        this.totalPrice = page.locator('#totalp');
        // Order modal elements
        this.orderModal = page.locator('#orderModal');
        this.nameInput = page.locator('#name');
        this.countryInput = page.locator('#country');
        this.cityInput = page.locator('#city');
        this.creditCardInput = page.locator('#card');
        this.monthInput = page.locator('#month');
        this.yearInput = page.locator('#year');
        this.purchaseButton = page.locator('#orderModal button.btn-primary:has-text("Purchase")');
        // Confirmation elements
        this.confirmationModal = page.locator('.sweet-alert');
        this.confirmationOkButton = page.locator('.sweet-alert button.confirm');
    }

    /**
     * Navigate to the cart page
     */
    async goto(): Promise<void> {
        await this.page.goto('https://www.demoblaze.com/cart.html');
        // Wait for Place Order button to be visible instead of networkidle
        await expect(this.placeOrderButton).toBeVisible({ timeout: 10000 });
    }

    /**
     * Check if a product is in the cart
     * @param productName - The name of the product to check
     */
    async isProductInCart(productName: string): Promise<boolean> {
        await this.page.waitForTimeout(1000);
        const product = this.cartTable.locator(`tr:has-text("${productName}")`);
        return await product.isVisible();
    }

    /**
     * Click the Place Order button
     */
    async clickPlaceOrder(): Promise<void> {
        await this.placeOrderButton.click();
        await expect(this.orderModal).toBeVisible();
    }

    /**
     * Fill in the order form
     * @param orderDetails - Object containing order details
     */
    async fillOrderForm(orderDetails: {
        name: string;
        country: string;
        city: string;
        creditCard: string;
        month: string;
        year: string;
    }): Promise<void> {
        await this.nameInput.fill(orderDetails.name);
        await this.countryInput.fill(orderDetails.country);
        await this.cityInput.fill(orderDetails.city);
        await this.creditCardInput.fill(orderDetails.creditCard);
        await this.monthInput.fill(orderDetails.month);
        await this.yearInput.fill(orderDetails.year);
    }

    /**
     * Click the Purchase button to complete the order
     */
    async clickPurchase(): Promise<void> {
        await this.purchaseButton.click();
    }

    /**
     * Verify order confirmation is displayed
     */
    async verifyOrderConfirmation(): Promise<void> {
        await expect(this.confirmationModal).toBeVisible({ timeout: 10000 });
        await expect(this.confirmationModal).toContainText('Thank you for your purchase!');
    }

    /**
     * Click OK on the confirmation dialog
     */
    async confirmOrder(): Promise<void> {
        await this.confirmationOkButton.click();
    }

    /**
     * Complete the full checkout process
     * @param orderDetails - Object containing order details
     */
    async completeCheckout(orderDetails: {
        name: string;
        country: string;
        city: string;
        creditCard: string;
        month: string;
        year: string;
    }): Promise<void> {
        await this.clickPlaceOrder();
        await this.fillOrderForm(orderDetails);
        await this.clickPurchase();
        await this.verifyOrderConfirmation();
        await this.confirmOrder();
        // Wait for confirmation modal to close and navigate to home page
        await expect(this.confirmationModal).toBeHidden({ timeout: 5000 });
        await this.page.waitForTimeout(1000);
    }

    /**
     * Delete a product from the cart
     * @param productName - The name of the product to delete
     */
    async deleteProduct(productName: string): Promise<void> {
        const deleteLink = this.cartTable.locator(`tr:has-text("${productName}") a:has-text("Delete")`);
        await deleteLink.click();
        await this.page.waitForTimeout(1000);
    }

    /**
     * Get the total price from the cart
     */
    async getTotalPrice(): Promise<string> {
        return await this.totalPrice.textContent() || '0';
    }
}
