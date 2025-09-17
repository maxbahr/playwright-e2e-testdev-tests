import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login.page";
import { RouteService } from "../../services/route.service";
import { reviewer as maksymilianBahr, reviewers as newReviewers } from "../../testdata/review.data";
import { Review } from "../../type/review.type";

test.describe("Customer reviews", () => {
  let routeService: RouteService;

  test.beforeEach(async ({ page }) => {
    routeService = new RouteService(page);
    const loginPage = new LoginPage(page);
    await loginPage.login(process.env.USER!, process.env.PASSWORD!);
  });

  test("Verify name and text", async ({ page }) => {
    await test.step("Prepare list of reviewers", async () => {
      await routeService.modifyReviewerRoute({ name: "Jane", surname: "Doe" }, maksymilianBahr);
      await routeService.refresh();
    });

    await test.step("Verify customer reviews", async () => {
      const reviewNameLocator = page
        .locator(".reviews-list")
        .getByText(`${maksymilianBahr.name} ${maksymilianBahr.surname}`)
        .locator("..");
      await reviewNameLocator.scrollIntoViewIfNeeded();
      await expect
        .soft(reviewNameLocator.locator(".review__name"))
        .toHaveText(`${maksymilianBahr.name} ${maksymilianBahr.surname}`);
      await expect.soft(reviewNameLocator).toContainText(`${maksymilianBahr.description}`);
      await expect.soft(reviewNameLocator).toContainText("5/5");
    });
  });

  test("Verify score", async ({ page }) => {
    const reviewer: Pick<Review, "name" | "surname"> = { name: "Paweł", surname: "Wojtków" };
    const score = 4;

    await test.step("Prepare list of reviewers", async () => {
      await routeService.modifyReviewerRoute(reviewer, { score });
      await routeService.refresh();
    });

    await test.step("Verify customer reviews", async () => {
      const reviewNameLocator = page
        .locator(".reviews-list")
        .getByText(`${reviewer.name} ${reviewer.surname}`)
        .locator("..");
      await reviewNameLocator.scrollIntoViewIfNeeded();
      await expect
        .soft(reviewNameLocator.locator(".review__name"))
        .toHaveText(`${reviewer.name} ${reviewer.surname}`);
      await expect.soft(reviewNameLocator).toContainText(`${score}/5`);
    });
  });

  test("Verify new customer reviews list", async ({ page }) => {
    const expectedCount = newReviewers.length + 3;
    const newReviewerNames = newReviewers.map((r) => `${r.name} ${r.surname}`);

    await test.step("Prepare list of new reviewers", async () => {
      await routeService.addReviewerRoute(newReviewers);
      await routeService.refresh();
    });

    await test.step("Verify customer reviews", async () => {
      const reviewerList = page.locator(".reviews-list");
      await expect.soft(reviewerList.locator("div.review")).toHaveCount(expectedCount);
      await expect
        .soft(reviewerList.locator(".review__name"))
        .toHaveText([...newReviewerNames, "Jane Doe", "Paweł Wojtków", "Dominik Gromadzki"]);
    });
  });
});
