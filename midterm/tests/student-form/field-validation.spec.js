import { test, expect } from '@playwright/test';

test.describe('Student Form Submission', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://demoqa.com/automation-practice-form');
  });

    

  test('TC03: Validate email format', async ({ page }) => {
    await page.fill('#firstName', 'John');
    await page.fill('#lastName', 'Doe');

    await page.fill('#userEmail', 'invalid-email'); // invalid format

    await page.click('label[for="gender-radio-1"]');

    await page.fill('#userNumber', '0812345678');

    await page.click('#submit');

    
    await expect(page.locator('.modal-title')).not.toBeVisible();

  });

    
  test('TC04: Validate phone number length', async ({ page }) => {

    await page.fill('#firstName', 'John');
    await page.fill('#lastName', 'Doe');

    await page.click('label[for="gender-radio-1"]');

    await page.fill('#userNumber', '12345'); // invalid

    await page.click('#submit');

    await expect(page.locator('.modal-title')).not.toBeVisible();

    });



  test('TC05: Prevent submission when required fields are empty', async ({ page }) => {

    await page.click('#submit');

    await expect(page.locator('.modal-title')).not.toBeVisible();

  });
});