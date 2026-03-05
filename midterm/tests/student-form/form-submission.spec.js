import { test, expect } from '@playwright/test';

test.describe('Student Form Submission', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://demoqa.com/automation-practice-form');
  });


  // TC01
  test('TC01: Submit form with required fields only', async ({ page }) => {

    await page.fill('#firstName', 'John');
    await page.fill('#lastName', 'Doe');

    await page.click('label[for="gender-radio-1"]');

    await page.fill('#userNumber', '0812345678');

    await page.click('#submit');

    await expect(page.locator('.modal-title'))
      .toHaveText('Thanks for submitting the form');

    await expect(page.locator('table')).toContainText('John Doe');
    await expect(page.locator('table')).toContainText('Male');
    await expect(page.locator('table')).toContainText('0812345678');
    await page.keyboard.press('Escape');
    await expect(page.locator('.modal')).toBeHidden();
  });



  // TC02
  test('TC02: Submit form with all fields filled', async ({ page }) => {

    await page.fill('#firstName', 'Jane');
    await page.fill('#lastName', 'Smith');

    await page.fill('#userEmail', 'jane@test.com');

    await page.click('label[for="gender-radio-2"]');

    await page.fill('#userNumber', '0899999999');

    // Date of Birth
    await page.click('#dateOfBirthInput');
    await page.click('.react-datepicker__day--015');

    // Subjects
    await page.fill('#subjectsInput', 'Maths');
    await page.keyboard.press('Enter');

    // Hobbies
    await page.click('label[for="hobbies-checkbox-1"]');

    // Picture Upload
    await page.setInputFiles('#uploadPicture', '../midterm/test-data/test-image.png');
    // Address
    await page.fill('#currentAddress', 'Bangkok Thailand');

    // State
    await page.click('#state');
    await page.click('text=NCR');

    // City
    await page.click('#city');
    await page.click('text=Delhi');

    await page.click('#submit');

    await expect(page.locator('.modal-title'))
      .toHaveText('Thanks for submitting the form');

    await expect(page.locator('table')).toContainText('Jane Smith');
    await expect(page.locator('table')).toContainText('jane@test.com');
    await expect(page.locator('table')).toContainText('Maths');
    await expect(page.locator('table')).toContainText('Sports');
    await expect(page.locator('table')).toContainText('NCR Delhi');
  });

});