import { BasePage } from './BasePage';
import { expect, Page } from '@playwright/test';



export class LoginPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    USERNAME_INPUT = "input[name='username']";
    PASSWORD_INPUT = "input[name='password']";
    SUBMIT_BUTTON = "button[type='submit']";
    PAGE_BRANDING = "img[alt='company-branding']";
    PAGE_HEADER = "//h5";
    LOGO_PAGE = "div.orangehrm-login-logo";
    INVALID_CREDENTIALS_MESSAGE = "p.oxd-alert-content-text";

    async fillUsername(email: string) {
        await this.page.fill(this.USERNAME_INPUT, email);
    }

    async fillPassword(password: string) {
        await this.page.fill(this.PASSWORD_INPUT, password);
    }

    async submit() {
        await this.page.click(this.SUBMIT_BUTTON);
    }


    async verifyTitle(title: string) {
        await expect(this.page).toHaveTitle(title);
    }
    async verifyBrandingDisplayed() {
        await expect(this.page.locator(this.PAGE_BRANDING)).toBeVisible();
    }
    async verifyHeaderDisplayed() {
        await expect(this.page.locator(this.PAGE_HEADER)).toBeVisible();
    }
    async verifyLogoDisplayed() {
        await expect(this.page.locator(this.LOGO_PAGE)).toBeVisible();
    }
    async verifyUsernameRequired() {
        await expect(this.page.getByText('Required').first()).toBeVisible();
    }
    async verifyPasswordRequired() {
        await expect(this.page.getByText('Required').nth(1)).toBeVisible();
    }
    async verifyInvalidCredentialsMessageDisplayed() {
        await expect(this.page.locator(this.INVALID_CREDENTIALS_MESSAGE)).toBeVisible();
    }
}

