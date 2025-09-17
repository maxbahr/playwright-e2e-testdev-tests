import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login.page";

test.describe("Shopping", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(process.env.USER!, process.env.PASSWORD!);
  });

  test("Verify buying product", async ({ page }) => {
    await test.step("Add to cart a new product", async () => {
      await page.getByText("New Balance (12)").click();
      await page.getByRole("heading", { name: "Terrain Master" }).click();
      await page.getByRole("listitem").filter({ hasText: /^$/ }).locator("label").click();
      await page.getByText("40").click();
      await page.getByRole("button", { name: "Add to cart" }).click();
      await page.getByRole("button", { name: "Checkout" }).click();
    });
    await test.step("Payment method", async () => {
      const cardIframe = page.locator('iframe[name*="__privateStripeFrame"]').contentFrame();

      await cardIframe.getByRole("textbox", { name: "Credit or debit card number" }).click();
      await cardIframe
        .getByRole("textbox", { name: "Credit or debit card number" })
        .fill("4444 3333 2222 1111");
      await cardIframe
        .getByRole("textbox", { name: "Credit or debit card expiration date" })
        .fill("11 / 25");
      await cardIframe.getByRole("textbox", { name: "Credit or debit card CVC/CVV" }).fill("1111");
      await page.getByRole("button", { name: "Place Your Order and Pay" }).click();
    });

    await test.step("Verify order success", async () => {
      await expect.soft(page.getByText("check_circle")).toBeVisible();
      await expect.soft(page.getByRole("heading", { name: "Thank you" })).toBeVisible();
      await expect.soft(page.getByText("Your order has been placed")).toBeVisible();
    });
  });
});
