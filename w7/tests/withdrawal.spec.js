import { test, expect } from "@playwright/test";

test.describe("ATM Withdrawal Module", () => {

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


  // TC06 - ถอนเงินสำเร็จ (500 บาท)
  test("TC06 - Withdraw successfully", async ({ page }) => {

    await page.getByText("Withdrawal").click();

    await page.getByPlaceholder("0").fill("500");

    await expect(
      page.getByRole("button", { name: "ถอนเงิน" })
    ).toBeEnabled();

    await page.getByRole("button", { name: "ถอนเงิน" }).click();

    await expect(
      page.getByText("ถอนเงินสำเร็จ", { exact: true })
    ).toBeVisible();
  });




  // TC07 - ถอนจำนวนไม่เป็นเท่าของ 100
  test("TC07 - Withdraw not multiple of 100", async ({ page }) => {

    await page.getByText("Withdrawal").click();

    await page.getByPlaceholder("0").fill("99");

    await page.getByRole("button", { name: "ถอนเงิน" }).click();

    await expect(
      page.getByText("ถอนเงินสำเร็จ")
    ).not.toBeVisible();
  });

    test("TC08 - Withdraw over 50000 limit", async ({ page }) => {

    await page.getByText("Withdrawal").click();

    await page.getByPlaceholder("0").fill("60000");

    // ปุ่มควรถูก disable
    await expect(
        page.getByRole("button", { name: /ถอนเงิน/ })
    ).toBeDisabled();

    });

    test("TC09 - Withdraw over account balance", async ({ page }) => {

    await page.getByText("Withdrawal").click();

    await page.getByPlaceholder("0").fill("20000000");

    // ปุ่มควรถูก disable
    await expect(
        page.getByRole("button", { name: /ถอนเงิน/ })
    ).toBeDisabled();

    });

});