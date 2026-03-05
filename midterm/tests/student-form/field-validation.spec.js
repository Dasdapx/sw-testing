import { test, expect } from '@playwright/test';

test.describe('Student Form Submission', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://demoqa.com/automation-practice-form');
  });

    

  test('TC04: Validate email format', async ({ page }) => {
    await page.fill('#firstName', 'John');
    await page.fill('#lastName', 'Doe');
    await page.fill('#userEmail', 'invalid-email'); 
    await page.click('label[for="gender-radio-1"]');
    await page.fill('#userNumber', '0812345678');
    await page.click('#submit');

    
    await expect(page.locator('.modal-title')).not.toBeVisible();

  });

    
  test('TC05: Validate phone number length', async ({ page }) => {

    await page.fill('#firstName', 'John');
    await page.fill('#lastName', 'Doe');
    await page.click('label[for="gender-radio-1"]');
    await page.fill('#userNumber', '12345'); // invalid

    await page.click('#submit');

    await expect(page.locator('.modal-title')).not.toBeVisible();

    });

  test('TC06: Mobile number should not accept alphabet characters', async ({ page }) => {
    await page.fill('#firstName', 'John');
    await page.fill('#lastName', 'Doe');
    await page.click('label[for="gender-radio-1"]');
    await page.fill('#userNumber', 'abcd123456');

    await page.click('#submit');
    await expect(page.locator('.modal-title')).not.toBeVisible();

  });


  test('TC07: Mobile number should not accept special characters', async ({ page }) => {
    await page.fill('#firstName', 'John');
    await page.fill('#lastName', 'Doe');
    await page.click('label[for="gender-radio-1"]');
    await page.fill('#userNumber', '08123@#456');

    await page.click('#submit');
    await expect(page.locator('.modal-title')).not.toBeVisible();

  });

  

  test('TC08: Verify Date of Birth default value', async ({ page }) => {

    const dob = page.locator('#dateOfBirthInput');

    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = today.toLocaleString('en-US', { month: 'short' });
    const year = today.getFullYear();

    const expectedDate = `${day} ${month} ${year}`;

    await expect(dob).toHaveValue(expectedDate);

});


});