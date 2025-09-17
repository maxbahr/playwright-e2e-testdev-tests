import { Page } from "@playwright/test";
import { Review } from "../type/review.type";

export class RouteService {
  constructor(private page: Page) {}

  async addReviewerRoute(newReviewer: Review[]) {
    await this.page.route("**/api/reviews", async (route) => {
      const upstreamResponse = await route.fetch();
      const prevBody = (await upstreamResponse.json()) as Review[];
      const modifiedBody = [...newReviewer, ...prevBody];
      await route.fulfill({
        status: upstreamResponse.status(),
        headers: {
          ...upstreamResponse.headers(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(modifiedBody),
      });
    });
  }

  async modifyReviewerRoute(
    reviewer: Pick<Review, "name" | "surname">,
    newReviewer: Partial<Review>
  ) {
    await this.page.route("**/api/reviews", async (route) => {
      const upstreamResponse = await route.fetch();
      const prevBody = (await upstreamResponse.json()) as Review[];
      const modifiedBody = this.prepareModifiedReviewerList(prevBody, reviewer, newReviewer);
      await route.fulfill({
        status: upstreamResponse.status(),
        headers: {
          ...upstreamResponse.headers(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(modifiedBody),
      });
    });
  }

  async refresh() {
    await this.page.reload();
  }

  private prepareModifiedReviewerList(
    prevBody: Review[],
    reviewer: Pick<Review, "name" | "surname">,
    newReviewer: Partial<Review>
  ) {
    return Array.isArray(prevBody)
      ? prevBody.map((row: Review) =>
          row?.name === reviewer.name && row?.surname === reviewer.surname
            ? {
                ...row,
                ...newReviewer,
              }
            : row
        )
      : prevBody;
  }
}
