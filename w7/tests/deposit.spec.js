import { test, expect } from "@playwright/test";

test.describe("ATM Deposit Module", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("https://atm-buddy-lite.lovable.app/");

    // Login ก่อน
    await page.getByPlaceholder("ตัวอย่าง: 123456").fill("123456");
    await page.getByPlaceholder("รหัส PIN 4 หลัก").fill("1234");
    await page.getByRole("button", { name: "เข้าสู่ระบบ" }).click();

    await expect(
      page.getByRole("button", { name: "ออกจากระบบ" })
    ).toBeVisible();
  });

  // TC03 - ฝากเงินสำเร็จ (ใช้ปุ่มด่วน)
  test("TC03 - Deposit successfully using quick button", async ({ page }) => {

    await page.getByText("Deposit").click();

    // กดปุ่มด่วน ฿500
    await page.getByRole("button", { name: "฿500.00" }).click();

    // กด submit
    await page.getByRole("button", { name: "ฝากเงิน" }).click();

    await expect( page.getByText("ฝากเงินสำเร็จ", { exact: true })).toBeVisible();
    
  });


  // TC04 - ฝากเงินเกิน 100,000
  test("TC04 - Deposit over limit", async ({ page }) => {

    await page.getByText("Deposit").click();

    // กรอกเองเกิน max
    await page.getByPlaceholder("0").fill("150000");

    await page.getByRole("button", { name: "ฝากเงิน" }).click();

    await expect(page.getByText("ฝากเงินสำเร็จ")).not.toBeVisible();

  });

  // TC05 - Deposit successfully by entering amount manually
  test("TC05 - Deposit successfully with manual input", async ({ page }) => {

    await page.getByText("Deposit").click();

    // กรอกจำนวนเงินเอง (อยู่ในวงเงิน)
    await page.getByPlaceholder("0").fill("25000");

    // ตรวจสอบว่าปุ่มไม่ disabled
    await expect(
        page.getByRole("button", { name: "ฝากเงิน" })
    ).toBeEnabled();

    // กดฝากเงิน
    await page.getByRole("button", { name: "ฝากเงิน" }).click();

    // ตรวจสอบข้อความสำเร็จ
    await expect(
        page.getByText("ฝากเงินสำเร็จ", { exact: true })
    ).toBeVisible();

  });

});