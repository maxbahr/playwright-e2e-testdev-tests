import { expect, test } from "@playwright/test";
import { Product } from "../../type/product.type";
import { Review } from "../../type/review.type";

test.describe("Products", () => {
  let cookie: string;

  test.beforeEach(async ({ request }) => {
    const resLogin = await request.post("/api/auth/login", {
      data: { email: process.env.USER!, password: process.env.PASSWORD! },
    });
    expect(resLogin.status()).toBe(201);
    const setCookieHeader = resLogin.headers()["set-cookie"];
    cookie = setCookieHeader.split(";")[0];
  });

  test("Verify GET products api", async ({ request }) => {
    const resProducts = await request.get("/api/products", {
      headers: {
        cookie: cookie,
      },
    });

    expect(resProducts.status()).toBe(200);
    expect(resProducts.json()).not.toBeNull();

    const productData = (await resProducts.json()) as Product[];
    console.log(JSON.stringify(productData, null, 2).slice(0, 500));

    expect(productData.length).toBe(32);
    expect(productData[0].name).toBe("Street Runner");
    expect(productData[0].description).toContain("Street Runner");
    expect(productData[0].brand).toBe("Adidas");
    expect(productData[0].price).toBe(50);
  });

  test("Verify GET reviews api", async ({ request }) => {
    const resReviews = await request.get("/api/reviews", {
      headers: {
        cookie: cookie,
      },
    });

    expect(resReviews.status()).toBe(200);
    expect(resReviews.json()).not.toBeNull();

    const reviewData = (await resReviews.json()) as Review[];
    console.log(JSON.stringify(reviewData, null, 2).slice(0, 500));

    expect(reviewData.length).toBe(3);

    expect(reviewData[0].name).toBe("Jane");
    expect(reviewData[0].surname).toBe("Doe");
    expect(reviewData[0].description).toContain("Lorem ipsum dolor sit amet");
    expect(reviewData[0].score).toBe(5);
  });
});
