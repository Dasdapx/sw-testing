import { test, expect } from '@playwright/test';

test.describe('Student Form Submission', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://demoqa.com/automation-practice-form');
  });

  // TC06
  test('TC06: Select gender option', async ({ page }) => {

    await page.click('label[for="gender-radio-1"]');

    await expect(page.locator('#gender-radio-1')).toBeChecked();

  });

  // TC07
  test('TC07: Select hobbies checkbox', async ({ page }) => {

    await page.locator('#hobbies-checkbox-1').scrollIntoViewIfNeeded();

    await page.click('label[for="hobbies-checkbox-1"]'); // Sports
    await page.click('label[for="hobbies-checkbox-2"]'); // Reading

    await expect(page.locator('#hobbies-checkbox-1')).toBeChecked();
    await expect(page.locator('#hobbies-checkbox-2')).toBeChecked();

  });

  // TC08
  test('TC08: Add subject from autocomplete', async ({ page }) => {

    await page.fill('#subjectsInput', 'Math');

    await page.keyboard.press('Enter');

    await expect(page.locator('.subjects-auto-complete__multi-value'))
        .toContainText('Maths');

  });



});