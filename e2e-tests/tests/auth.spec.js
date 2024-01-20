// @ts-check
import  { test, expect } from '@playwright/test';

const UI_URL = "http://localhost:5173/";

// First test for the frontend, allow user to go to home page
test('should allow the user to sign in', async ({ page }) => {
  await page.goto(UI_URL);

  // get the sign in button, using 'getByRole' method
  await page.getByRole("link", {name: "Sign In"}).click();
  
  // assert that something existing by checking it is .Visible()
  await expect(page.getByRole("heading", {name: "Sign In"})).toBeVisible();

  // Now want to fill in form
  await page.locator("[name=email]").fill("11@errp.com");
  await page.locator("[name=password]").fill("tyup3450");

  // Now push button
  await page.getByRole("button", {name:"SIGN IN"}).click();
  await expect(page.getByRole("link", {name: "My Bookings"} )).toBeVisible();
  await expect(page.getByRole("link", {name: "My Properties"} )).toBeVisible();
  await expect(page.getByRole("button", {name: "Sign out"})).toBeVisible();

});

test("should allow user to register", async({ page })=>{
  const testEmail = `test_register_${(Math.random()*9000) + 10000}@test.com`
  await page.goto(UI_URL);
  
  await page.getByRole("link", {name: "Sign In"}).click();
  await page.getByRole("link", {name: "Sign Up"}).click();
  await expect(page.getByRole("heading", {name: "Create An Account"})).toBeVisible();
  
  // Now want to fill in form
  await page.locator("[name='firstName']").fill("test_firstName");
  await page.locator("[name='lastName']").fill("test_lastName");
  await page.locator("[name='email']").fill(testEmail);
  await page.locator("[name='password']").fill("321password");
  await page.locator("[name='confirmPassword']").fill("321password");

  await page.getByRole("button", {name: "SIGN UP"}).click();

  await expect(page.getByRole("link", {name: "My Bookings"})).toBeVisible();
  await expect(page.getByRole("button", {name: "Sign out"})).toBeVisible();





});

