import { BasePage } from './BasePage';
import { expect, Page } from '@playwright/test';

export class HomePage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    PAGE_HEADER = "//h6";
    SEARCH_INPUT = "input[placeholder='Search']";
    TARGET_PAGE = "(//a[@class='oxd-main-menu-item'])[1]";

    async verifyHeaderDisplayed() {
        await expect(this.page.locator(this.PAGE_HEADER)).toBeVisible();
    }

    async searchPage(pageName: string): Promise<void> {
        await this.page.fill(this.SEARCH_INPUT, pageName.toLowerCase());
    }

    async clickPage(): Promise<void> {
        await this.page.click(this.TARGET_PAGE);
    }
}