import  { test, expect } from '@playwright/test';


const UI_URL = "http://localhost:5173/";


// Declares a beforeEach hook that is executed before each test.
// also use {} to destruct the page 
test.beforeEach(async({ page })=>{

    await page.goto(UI_URL);
    await page.getByRole("link", {name: "Sign In"}).click();

     // Now want to fill in form
    await page.locator("[name=email]").fill("11@errp.com");
    await page.locator("[name=password]").fill("tyup3450");

    await page.getByRole("button", {name:"SIGN IN"}).click();
    await expect(page.getByRole("link", {name: "My Properties"} )).toBeVisible();

});

test("should show property search results", async({ page }) =>{
    await page.goto(UI_URL);

    await page.getByPlaceholder("Where are you going?").fill("London");
    await page.getByRole("button", {name:"Search"}).click();

    await expect(page.getByText("Properties Found in London")).toBeVisible();
    await expect(page.getByText("Salman Elegant Property")).toBeVisible();
});


test("should show property detail", async({ page })=>{

    await page.goto(UI_URL);

    await page.getByPlaceholder("Where are you going?").fill("London");
    await page.getByRole("button", {name:"Search"}).click();
    await page.getByText("Salman Elegant Property").click();
    
    await expect(page).toHaveURL(/detail/);
    await expect(page.getByRole("button", {name:"Book now"})).toBeVisible();
   
});



test("should book property", async({page})=>{
    await page.goto(UI_URL);

    await page.getByPlaceholder("Where are you going?").fill("London");

    const date = new Date(); // for checkin date
    date.setDate(date.getDate() + 3); // for checkout date
    const formattedDate = date.toISOString().split("T")[0]; 
    // checkin is automatically set to today
    await page.getByPlaceholder("Check-out Date").fill(formattedDate);


    await page.getByRole("button", {name:"Search"}).click();
    await page.getByText("Salman Elegant Property").click();
    await page.getByRole("button", {name:"Book now"}).click();

    // Now goes to confirm booking page 
    await expect(page.getByText("Total Cost: £750.00")).toBeVisible();
   
    // slightly different for using template from stripe
    const stripeFrame = page.frameLocator("iframe").first();
    await stripeFrame
        .locator('[placeholder="Card number"]')
        .fill("4242424242424242");

    await stripeFrame.locator('[placeholder="MM / YY"]').fill("05/30");
    await stripeFrame.locator('[placeholder="CVC"]').fill("395");
    await stripeFrame.locator('[placeholder="ZIP"]').fill("12121");

    await page.getByRole("button", {name:"Confirm Booking"}).click();
    await expect(page.getByText("My Bookings")).toBeVisible();

    await page.getByRole("link", {name: "My Bookings"}).click();
    await expect(page.getByText("Salman Elegant Property")).toBeVisible();

});