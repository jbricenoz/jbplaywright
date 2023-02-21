import { Locator, Page } from '@playwright/test';

class LoginPage {

    readonly page: Page;
    readonly txtUsername: Locator;
    readonly txtPassword: Locator;
    readonly btnLogin: Locator;
    readonly lblErrorMessage: Locator;
    readonly lblLoadingMessage: Locator;
    readonly lblErrorMessageWith: (errorMessage?: string) => any;
    

    constructor(page: Page) {
        this.page = page;
        this.txtUsername = page.locator('//input[@data-test="username"]');
        this.txtPassword = page.locator('#password');
        this.btnLogin = page.locator('//input[@value="Login"]');
        this.lblErrorMessage = page.locator('text=Your sample data is loading. Please check again shortly');
        this.lblErrorMessage = page.locator('//h3[@data-test="error"]');
        this.lblErrorMessageWith = (errorMessage?: string) => errorMessage ? page.locator(`//h3[text()='${errorMessage}']`) : page.locator('text="Epic sadface: Username is required"');
   
    }

    errorMessages = {
        usernameRequired: 'Epic sadface: Username is required',
        passwordRequired: 'Epic sadface: Password is required',
        invalidUserPassword: 'Epic sadface: Username and password do not match any user in this service',
        lockoutUser: 'Epic sadface: Sorry, this user has been locked out.'
    }

    isLoading = async () => {
        let isElementVisible = false;
        let retries = 0;
        do {
            await this.page.reload();
            isElementVisible = await this.lblLoadingMessage.isVisible();
            console.log("Inside:" + retries + isElementVisible);
            retries++;
        } while (isElementVisible == false && retries == 10)
        return isElementVisible;
    }


    delay = async (ms: number | undefined) => await new Promise(resolve => setTimeout(resolve, ms))

    reloading = async () => {
        await this.page.waitForTimeout(3000);
        await this.page.reload();
        await this.page.waitForLoadState();
        await this.page.waitForTimeout(3000);
    }

    loginWith = async (username: string, password: string) => {
        await this.txtUsername.fill(username);
        await this.txtPassword.fill(password);
        await this.btnLogin.click();
        await this.page.waitForTimeout(500);
    }


}
export default LoginPage;