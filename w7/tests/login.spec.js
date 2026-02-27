import { test, expect } from "@playwright/test";

test.describe("ATM Login Module", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("https://atm-buddy-lite.lovable.app/");
  });

  // TC01: PIN ผิด
  test("TC01 - Login with incorrect PIN", async ({ page }) => {
    await page.getByPlaceholder("ตัวอย่าง: 123456").fill("123456");
    await page.getByPlaceholder("รหัส PIN 4 หลัก").fill("0000");
    await page.getByRole("button", { name: "เข้าสู่ระบบ" }).click();

    await expect(page.getByText("เข้าสู่ระบบสำเร็จ")).not.toBeVisible();
  });


  test("TC02 - Login successfully", async ({ page }) => {
    await page.getByPlaceholder("ตัวอย่าง: 123456").fill("123456");
    await page.getByPlaceholder("รหัส PIN 4 หลัก").fill("1234");
    await page.getByRole("button", { name: "เข้าสู่ระบบ" }).click();

    await expect( page.getByText("เข้าสู่ระบบสำเร็จ", { exact: true })).toBeVisible();
  });
    
});