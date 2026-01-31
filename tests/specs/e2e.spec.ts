import { test, expect } from '@playwright/test';
import { SignUpPage, LoginPage, ProductPage, CartPage } from '../pages';

test.describe('End-to-End: Complete User Journey', () => {

    test('Complete flow: Register -> Login -> Order Apple Monitor -> Logout', async ({ page }) => {
        const signUpPage = new SignUpPage(page);
        const loginPage = new LoginPage(page);
        const productPage = new ProductPage(page);
        const cartPage = new CartPage(page);

        // Generate unique credentials
        const testUsername = SignUpPage.generateUniqueUsername();
        const testPassword = 'Test@123';

        // Listen for dialog (alert) events
        let alertMessage = '';
        page.on('dialog', async (dialog) => {
            alertMessage = dialog.message();
            await dialog.accept();
        });

        // ==================== STEP 1: REGISTRATION ====================
        console.log('Step 1: Registering new user...');

        // Navigate to the site
        await signUpPage.goto();

        // Open the sign up modal
        await signUpPage.openSignUpModal();

        // Fill in valid registration data
        await signUpPage.fillSignUpForm(testUsername, testPassword);

        // Submit the registration
        await signUpPage.submitSignUp();

        // Wait for alert response
        await page.waitForTimeout(2000);

        // Verify successful registration
        expect(alertMessage).toContain('Sign up successful');
        console.log(`Registered user: ${testUsername}`);

        // ==================== STEP 2: LOGIN ====================
        console.log('Step 2: Logging in with registered credentials...');

        // Open the login modal
        await loginPage.openLoginModal();

        // Fill in login credentials
        await loginPage.fillLoginForm(testUsername, testPassword);

        // Submit login
        await loginPage.submitLogin();

        // Wait for login to complete
        await page.waitForTimeout(2000);

        // Verify user is logged in
        await expect(loginPage.welcomeUser).toBeVisible({ timeout: 5000 });
        await expect(loginPage.welcomeUser).toContainText(testUsername);
        console.log(`Successfully logged in as: ${testUsername}`);

        // ==================== STEP 3: ORDER APPLE MONITOR 24 ====================
        console.log('Step 3: Creating order for Apple monitor 24...');

        // Navigate to Monitors category
        await productPage.selectMonitorsCategory();
        await page.waitForTimeout(3000);

        // Select Apple monitor 24
        await productPage.selectProduct('Apple monitor 24');
        await page.waitForTimeout(3000);

        // Add to cart
        await productPage.addToCart();
        await page.waitForTimeout(3000);

        // Go to cart
        await cartPage.goto();
        await page.waitForTimeout(2000);

        // Verify product is in cart
        const isInCart = await cartPage.isProductInCart('Apple monitor 24');
        expect(isInCart).toBeTruthy();

        // Complete checkout
        await cartPage.completeCheckout({
            name: 'Abdelrahman Rawag',
            country: 'Egypt',
            city: 'Cairo',
            creditCard: '4111111111111111',
            month: '12',
            year: '2026'
        });
        console.log('Successfully created order for Apple monitor 24');

        // ==================== STEP 4: LOGOUT ====================
        console.log('Step 4: Logging out...');

        // Navigate to home page first
        await page.goto('https://www.demoblaze.com/');
        await page.waitForTimeout(2000);

        // Logout
        await loginPage.logout();

        // Verify user is logged out
        await expect(loginPage.loginNavLink).toBeVisible();
        await expect(loginPage.welcomeUser).toBeHidden();
        console.log('Successfully logged out');

        console.log('✓ Complete E2E flow finished successfully!');

        // Stay on home page for 30 seconds before closing
        console.log('Waiting 30 seconds before closing...');
        await page.waitForTimeout(3000);
    });
});
