import { test, expect } from '@playwright/test';

test.describe('Moving Company Order Form', () => {
  
  // Go to this site
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200');
  });

  //Checking if this h1 exists
  test('Loading the page..', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('Order Moving');
  });

  test('Fill in the fields correctly and submit', async ({ page }) => {
    await page.fill('#name', 'John Wick');
    await page.fill('#email', 'example@gmail.com');
    await page.fill('#phone', '06308792592');
    await page.fill('#pickupAddress', 'address');
    await page.fill('#deliveryAddress', 'address');
    
    // Datum selection
    await page.fill('#movingDate', '10/05/2222');

    // Add note
    await page.fill('#note', 'This is a note.');

    // Is there an elevator?
    await page.locator('#elevator').click();

    //Choosing a truck type
    const truckSelect = page.locator('mat-select[formcontrolname="truckType"]');
    await truckSelect.click();
    await page.locator('mat-option[value="Xl"]').click();

    // Which floor?
    await page.fill('#floor', '4');

    // Checkbox is checked?
    await page.locator('#terms-input').click();

    // Sending the form
    await page.getByRole('button', { name: 'Submit' }).click();
  });
});