import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object Model for the Sign Up functionality on demoblaze.com
 */
export class SignUpPage {
    readonly page: Page;
    readonly signUpNavLink: Locator;
    readonly signUpModal: Locator;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly signUpButton: Locator;
    readonly closeButton: Locator;

    constructor(page: Page) {
        this.page = page;
        // Navigation link to open sign up modal
        this.signUpNavLink = page.locator('#signin2');
        // Modal elements
        this.signUpModal = page.locator('#signInModal');
        this.usernameInput = page.locator('#sign-username');
        this.passwordInput = page.locator('#sign-password');
        this.signUpButton = page.locator('#signInModal button.btn-primary');
        this.closeButton = page.locator('#signInModal button.btn-secondary');
    }

    /**
     * Navigate to the home page
     */
    async goto(): Promise<void> {
        await this.page.goto('https://www.demoblaze.com/');
    }

    /**
     * Open the sign up modal by clicking the nav link
     */
    async openSignUpModal(): Promise<void> {
        await this.signUpNavLink.click();
        // Wait for modal to be visible
        await expect(this.signUpModal).toBeVisible();
    }

    /**
     * Fill in the registration form
     * @param username - The username to register
     * @param password - The password to use
     */
    async fillSignUpForm(username: string, password: string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
    }

    /**
     * Click the sign up button to submit the form
     */
    async submitSignUp(): Promise<void> {
        await this.signUpButton.click();
    }

    /**
     * Complete registration flow with provided credentials
     * @param username - The username to register
     * @param password - The password to use
     */
    async register(username: string, password: string): Promise<void> {
        await this.openSignUpModal();
        await this.fillSignUpForm(username, password);
        await this.submitSignUp();
    }

    /**
     * Close the sign up modal
     */
    async closeModal(): Promise<void> {
        await this.closeButton.click();
        await expect(this.signUpModal).toBeHidden();
    }

    /**
     * Check if the sign up modal is visible
     */
    async isModalVisible(): Promise<boolean> {
        return await this.signUpModal.isVisible();
    }

    /**
     * Generate a unique username for testing
     * @returns A unique username string
     */
    static generateUniqueUsername(): string {
        const timestamp = Date.now();
        const randomNum = Math.floor(Math.random() * 10000);
        return `testuser_${timestamp}_${randomNum}`;
    }
}
