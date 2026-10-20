import { test, expect } from '@playwright/test';

test('Comprar passagem, validar confirmação e valor', async ({ page }) => {
  await page.goto('https://www.blazedemo.com/');
  await page.locator('select[name="fromPort"]').selectOption('Boston');
  await page.locator('select[name="toPort"]').selectOption('Berlin');
  await page.getByRole('button', { name: 'Find Flights' }).click();
  await expect(page.getByRole('heading')).toContainText('Flights from Boston to Berlin:');
  await page.getByRole('row', { name: 'Choose This Flight 43 Virgin' }).getByRole('button').click();
  await page.getByRole('textbox', { name: 'Name', exact: true }).click();
  await page.getByRole('textbox', { name: 'Name', exact: true }).fill('Suenne');
  await page.locator('#cardType').selectOption('dinersclub');
  await page.getByRole('checkbox', { name: 'Remember me' }).check();
  await page.getByRole('button', { name: 'Purchase Flight' }).click();
  await expect(page.getByRole('heading')).toContainText('Thank you for your purchase today!');
  await expect(page.locator('tbody')).toContainText(' Amount 555 USD ');
});