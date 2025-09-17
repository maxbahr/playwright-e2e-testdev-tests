import { expect, Page } from "@playwright/test";

export class LoginPage {
  constructor(private page: Page) {}

  async login(email: string, password: string): Promise<void> {
    if (!email || !password) {
      throw new Error("Email and password must be provided for login.");
    }

    await this.page.goto("/");
    await this.page.getByRole("textbox", { name: "Email" }).fill(email);
    await this.page.getByRole("textbox", { name: "Password" }).fill(password);
    await this.page.getByRole("button", { name: "Login" }).click();
    await expect(this.page).toHaveURL(/.*shop/);
  }
}
