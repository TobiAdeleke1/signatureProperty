import  { test, expect } from '@playwright/test';
import path from 'path';

const UI_URL = "http://localhost:5173/";

// Declares a beforeEach hook that is executed before each test.
// also use {} to destruct the page 
test.beforeEach(async({page})=>{

    await page.goto(UI_URL);
    await page.getByRole("link", {name: "Sign In"}).click();

     // Now want to fill in form
    await page.locator("[name=email]").fill("11@errp.com");
    await page.locator("[name=password]").fill("tyup3450");

    await page.getByRole("button", {name:"SIGN IN"}).click();
    await expect(page.getByRole("link", {name: "My Properties"} )).toBeVisible();

});

/* TODO: Needs to be changed that only Admins/Staffs can add properties */
test("should allow user to add a property", async({page })=>{
    await page.goto(`${UI_URL}my-properties`);

    await page.locator('[name="name"]').fill("Test Property");
    await page.locator('[name="description"]').fill("Test for property description, to include information helpful to users");
    await page.locator('[name="address"]').fill("Test Address");
    await page.locator('[name="pricePerNight"]').fill("120");
    await page.locator('[name="adultCount"]').fill("2");
    await page.locator('[name="childCount"]').fill("4");
    await page.locator('[name="bathroom"]').fill("2");
    await page.locator('[name="bedroom"]').fill("3");
    await page.selectOption('select[name="starRating"]', "4");

    await page.getByText("Family").click();

    await page.getByLabel("Free Wifi").check();
    await page.getByLabel("Parking").check();

    // upload files using playwright api
    await page.setInputFiles('[name="imageFiles"]',[
        path.join(__dirname, 'assets', 'property_image1.png'),
        path.join(__dirname, 'assets', 'property_image2.png'),
        
    ]);

    // Click on the button to create the property
    await page.getByRole("button", {name: "Create Property"}).click(); 
    // Its has reset to add new property, instead of stuck in 'Saving ..' or redirect to page
    await expect(page.getByRole("button", {name:"Create Property"})).toBeVisible();

})