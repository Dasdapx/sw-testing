import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('Student Form Submission', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://demoqa.com/automation-practice-form');
  });


  test('TC09: Select gender option', async ({ page }) => {

    await page.click('label[for="gender-radio-1"]');

    await expect(page.locator('#gender-radio-1')).toBeChecked();

  });


  test('TC10: Select hobbies checkbox', async ({ page }) => {

    await page.locator('#hobbies-checkbox-1').scrollIntoViewIfNeeded();

    await page.click('label[for="hobbies-checkbox-1"]'); // Sports
    await page.click('label[for="hobbies-checkbox-2"]'); // Reading

    await expect(page.locator('#hobbies-checkbox-1')).toBeChecked();
    await expect(page.locator('#hobbies-checkbox-2')).toBeChecked();

  });

  test('TC11: Add subject from autocomplete', async ({ page }) => {

    await page.fill('#subjectsInput', 'Math');

    await page.keyboard.press('Enter');

    await expect(page.locator('.subjects-auto-complete__multi-value'))
        .toContainText('Maths');

  });

  test('TC12: User can select Date of Birth from calendar', async ({ page }) => {

    await page.click('#dateOfBirthInput');

    await page.selectOption('.react-datepicker__month-select', '5'); // June
    await page.selectOption('.react-datepicker__year-select', '2000');

    await page.click('.react-datepicker__day--015');

    await expect(page.locator('#dateOfBirthInput'))
      .toHaveValue('15 Jun 2000');

  });

  test('TC13: Add multiple subjects and remove subject tag', async ({ page }) => {

    const subject = page.locator('#subjectsInput');

    await subject.fill('Math');
    await page.keyboard.press('Enter');

    await subject.fill('Physics');
    await page.keyboard.press('Enter');

    await expect(page.locator('.subjects-auto-complete__multi-value')).toHaveCount(2);

    await page.locator('.subjects-auto-complete__multi-value__remove').first().click();

    await expect(page.locator('.subjects-auto-complete__multi-value')).toHaveCount(1);

  });

  test('TC14 – Upload picture file', async ({ page }) => {

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


  
  test('TC15 – Select state and city dropdown', async ({ page }) => {

    await page.fill('#firstName', 'Jane');
    await page.fill('#lastName', 'Smith');
    await page.click('label[for="gender-radio-2"]');
    await page.fill('#userNumber', '0898765432');

    
    await page.click('#state');
    await page.click('div[id^="react-select"][id$="-option-0"]'); // NCR

    
    await page.click('#city');
    await page.click('div[id^="react-select"][id$="-option-0"]'); // Delhi

    await page.click('#submit');

    await expect(page.locator('.modal-title'))
      .toHaveText('Thanks for submitting the form');

    await expect(page.locator('.table')).toContainText('NCR Delhi');

    await page.keyboard.press('Escape');
  });

  test('TC16 – City options change based on selected state', async ({ page }) => {

    await page.locator('#state').scrollIntoViewIfNeeded();

    // เลือก NCR
    await page.click('#state');
    await page.click('text=NCR');

    // เปิด city dropdown
    await page.click('#city');

    // ตรวจว่า Delhi อยู่ใน list
    await expect(page.getByText('Delhi')).toBeVisible();

    // เปลี่ยน state
    await page.click('#state');
    await page.click('text=Uttar Pradesh');

    await page.click('#city');

    // ตรวจว่า Agra อยู่ใน list
    await expect(page.getByText('Agra')).toBeVisible();

  });

  test('TC17: City dropdown should not work before selecting state', async ({ page }) => {

    
    await page.locator('#state').scrollIntoViewIfNeeded();

    await expect(page.locator('#city input')).toBeDisabled();

    
    await page.click('#state');
    await page.click('text=NCR');

    
    await expect(page.locator('#city input')).toBeEnabled();

   
    await page.click('#city');
    await page.click('text=Delhi');

  });
});