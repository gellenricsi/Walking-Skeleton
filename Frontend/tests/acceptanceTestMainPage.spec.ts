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
    await page.fill('#email', 'example@ex.com');
    await page.fill('#phone', '00000000000');
    await page.fill('#pickupAddress', 'address');
    await page.fill('#deliveryAddress', '!! address');
    
    // Datum selection
    await page.fill('#movingDate', '10-05-2025');

    // Add note
    await page.fill('#note', 'This is a note.');

    // Is there an elevator?
    await page.check('#elevator');

    //Choosing a truck type
    await page.getByLabel('Choose a truck').selectOption('Xl');

    // Which floor?
    await page.fill('#floor', '4');

    // Checkbox is checked?
    await page.check('#terms');

    // Sending the form
    await page.click('#submitBtn');

    // Is the order successful?
    await expect(page.locator('.success-message')).toHaveText('Order sent successfully!');

    // Agree Offer
    await page.click('#agreeBtn');

    // Is the acceptance successful?
    await expect(page.locator('.success-offer-message')).toHaveText('Successfully moved into your new home!');
  });

  test('Empty fields are not allowed.', async ({ page }) => {
    await page.click('#submitBtn');

    const selectedValue = await page.getByLabel('Choose a truck').inputValue();

    // Controlling the proper error messages
    await expect(page.locator('#nameError')).toHaveText('This field is required.');
    await expect(page.locator('#emailError')).toHaveText('This field is required.');
    await expect(page.locator('#phoneError')).toHaveText('This field is required.');
    await expect(page.locator('#pickupAddressError')).toHaveText('This field is required.');
    await expect(page.locator('#deliveryAddressError')).toHaveText('This field is required.');
    await expect(page.locator('#movingDateError')).toHaveText('This field is required.');
    expect(selectedValue).not.toBe('');
    await expect(page.locator('#floor')).toHaveText('This field is required.');
    await expect(page.locator('#termsError')).toHaveText('Acceptance of the terms and conditions is mandatory.');
    await page.click('#agreeBtn');
  });
});