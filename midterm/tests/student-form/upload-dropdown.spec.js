import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('Upload / Special Fields', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://demoqa.com/automation-practice-form', { waitUntil: 'domcontentloaded' });
  });

  // TC09
  test('TC09 – Upload picture file', async ({ page }) => {

    const filePath = path.join(process.cwd(), 'test-data/test-image.png');

    await page.fill('#firstName', 'John');
    await page.fill('#lastName', 'Doe');
    await page.click('label[for="gender-radio-1"]');
    await page.fill('#userNumber', '0812345678');

    await page.setInputFiles('#uploadPicture', filePath);

    await page.click('#submit');

    await expect(page.locator('.modal-title'))
      .toHaveText('Thanks for submitting the form');

    await expect(page.locator('.table')).toContainText('test-image.png');

    
    await page.keyboard.press('Escape');
  });


  // TC10
  test('TC10 – Select state and city dropdown', async ({ page }) => {

    await page.fill('#firstName', 'Jane');
    await page.fill('#lastName', 'Smith');
    await page.click('label[for="gender-radio-2"]');
    await page.fill('#userNumber', '0898765432');

    // เลือก State
    await page.click('#state');
    await page.click('div[id^="react-select"][id$="-option-0"]'); // NCR

    // เลือก City
    await page.click('#city');
    await page.click('div[id^="react-select"][id$="-option-0"]'); // Delhi

    await page.click('#submit');

    await expect(page.locator('.modal-title'))
      .toHaveText('Thanks for submitting the form');

    await expect(page.locator('.table')).toContainText('NCR Delhi');

    await page.keyboard.press('Escape');
  });

});