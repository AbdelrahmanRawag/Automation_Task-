import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object Model for the Login functionality on demoblaze.com
 */
export class LoginPage {
    readonly page: Page;
    readonly loginNavLink: Locator;
    readonly loginModal: Locator;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly closeButton: Locator;
    readonly welcomeUser: Locator;
    readonly logoutLink: Locator;

    constructor(page: Page) {
        this.page = page;
        // Navigation link to open login modal
        this.loginNavLink = page.locator('#login2');
        // Modal elements
        this.loginModal = page.locator('#logInModal');
        this.usernameInput = page.locator('#loginusername');
        this.passwordInput = page.locator('#loginpassword');
        this.loginButton = page.locator('#logInModal button.btn-primary');
        this.closeButton = page.locator('#logInModal button.btn-secondary');
        // Logged in state elements
        this.welcomeUser = page.locator('#nameofuser');
        this.logoutLink = page.locator('#logout2');
    }

    /**
     * Navigate to the home page
     */
    async goto(): Promise<void> {
        await this.page.goto('https://www.demoblaze.com/');
    }

    /**
     * Open the login modal by clicking the nav link
     */
    async openLoginModal(): Promise<void> {
        await this.loginNavLink.click();
        // Wait for modal to be visible
        await expect(this.loginModal).toBeVisible();
    }

    /**
     * Fill in the login form
     * @param username - The username to login with
     * @param password - The password to use
     */
    async fillLoginForm(username: string, password: string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
    }

    /**
     * Click the login button to submit the form
     */
    async submitLogin(): Promise<void> {
        await this.loginButton.click();
    }

    /**
     * Complete login flow with provided credentials
     * @param username - The username to login with
     * @param password - The password to use
     */
    async login(username: string, password: string): Promise<void> {
        await this.openLoginModal();
        await this.fillLoginForm(username, password);
        await this.submitLogin();
    }

    /**
     * Close the login modal
     */
    async closeModal(): Promise<void> {
        await this.closeButton.click();
        await expect(this.loginModal).toBeHidden();
    }

    /**
     * Check if the login modal is visible
     */
    async isModalVisible(): Promise<boolean> {
        return await this.loginModal.isVisible();
    }

    /**
     * Check if user is logged in by verifying welcome message is visible
     */
    async isLoggedIn(): Promise<boolean> {
        return await this.welcomeUser.isVisible();
    }

    /**
     * Get the welcome message text (contains username)
     */
    async getWelcomeText(): Promise<string> {
        return await this.welcomeUser.textContent() || '';
    }

    /**
     * Logout the current user
     */
    async logout(): Promise<void> {
        await this.logoutLink.click();
        // Wait for login link to reappear (indicates logged out state)
        await expect(this.loginNavLink).toBeVisible();
    }

    /**
     * Verify user is logged in with expected username
     * @param username - The expected username in welcome message
     */
    async verifyLoggedInAs(username: string): Promise<void> {
        await expect(this.welcomeUser).toBeVisible();
        await expect(this.welcomeUser).toContainText(username);
    }
}
