import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { BasePage } from '../pages/BasePage';
import { HomePage } from '../pages/HomePage';

test('OrangeHRM', async ({ page }) => {


  const basePage = new BasePage(page);
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);

  await basePage.navigate('https://opensource-demo.orangehrmlive.com/');

  // Expect a title "to contain" a substring.
  await loginPage.verifyTitle('OrangeHRM');
  await loginPage.verifyBrandingDisplayed();
  await loginPage.verifyHeaderDisplayed();
  await loginPage.verifyLogoDisplayed();

  // Expect all inputs are required
  await loginPage.submit();
  await loginPage.verifyUsernameRequired();
  await loginPage.verifyPasswordRequired();

  // Expect unable to login with invalid username
  await loginPage.fillUsername('abcdef');
  await loginPage.fillPassword('admin123');
  await loginPage.submit();
  await loginPage.verifyInvalidCredentialsMessageDisplayed();


  // Expect unable to login with invalid password
  await loginPage.fillUsername('Admin');
  await loginPage.fillPassword('abcdef');
  await loginPage.submit();
  await loginPage.verifyInvalidCredentialsMessageDisplayed();

  // Expect log in successfully with valid creadentials and dashboard is displayed
  await loginPage.fillUsername('Admin');
  await loginPage.fillPassword('admin123');
  await loginPage.submit();
  await homePage.verifyHeaderDisplayed();

  // Search for the page and the header of the page is displayed

  await homePage.searchPage('My Info');
  await homePage.clickPage();

  await expect(page.getByRole('heading', { name: 'PIM' }), 'Verify PIM page is displayed').toBeVisible();

  var a = 1;
});

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
