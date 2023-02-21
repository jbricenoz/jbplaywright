import { test, expect } from '@playwright/test';
import { users } from '../fixtures/faker.data';
import LoginPage from '../pages/auth/login.page';
import ProductsPage from '../pages/products/products.page';

test.describe('Registration', () => {

    let login: LoginPage;
    let products: ProductsPage;

    test.beforeEach(async ({ page }) => {
        login = new LoginPage(page);
        products = new ProductsPage(page);
    })

    test.afterEach(async ({ page }) => {
        await page.close();
    })
 
    test('JIRA-5647 - Auth > Verify the app loads the correct after valid credentials @auth @critical', async ({ page }) => {
        await page.goto('/');
        await login.loginWith(users.STANDARD, users.PASSWORD);
        let items = await products.getTotalOfInventoryItems();
        expect(items, 'System recipes were not loaded correctly :(').toBeGreaterThanOrEqual(4);
    });

    test('JIRA-5648 - Auth > Verify the app loads the items correctly after valid credentials @auth @critical', async ({ page }) => {
        await page.goto('/');
        await login.loginWith(users.STANDARD, users.PASSWORD);
        let items = await products.getItemsNameList();
        expect(items, 'System recipes were not loaded correctly :(').toMatchObject(
            ["Sauce Labs Backpack", "Sauce Labs Bike Light", "Sauce Labs Bolt T-Shirt", "Sauce Labs Fleece Jacket", "Sauce Labs Onesie", "Test.allTheThings() T-Shirt (Red)"]
        );
    });

    test('JIRA-5649 - Auth > Verify the app show error message after invalid credentials @auth @critical', async ({ page }) => {
        await page.goto('/');
        await login.loginWith(users.INVALID_USER, users.INVALID_PASSWORD);
        expect(await login.lblErrorMessage.innerText()).toBe(login.errorMessages.invalidUserPassword)
    });

    test.skip('JIRA-5650 - Auth > Verify the app skip the test @auth @critical', async ({ page }) => {
        await page.goto('/');
        await login.loginWith(users.INVALID_USER, users.INVALID_PASSWORD);
        expect(login.lblErrorMessage.textContent).toBe(login.errorMessages.invalidUserPassword)
    });

    test('JIRA-5651 - Auth > Verify the app show error message after locked_out_user credentials @auth @critical', async ({ page }) => {
        await page.goto('/');
        await login.loginWith(users.LOCKED_USER, users.PASSWORD);
        await login.lblErrorMessage.waitFor();
        expect(await login.lblErrorMessage.innerText()).toBe(login.errorMessages.lockoutUser)
    });


})