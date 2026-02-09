import { describe, expect, test } from "vitest";
import { Api } from "./api.ts";

describe("API msw Tests", () => {
  test("msw replay tests", async () => {
    const api = new Api("http://localhost:3000");

    // Test 1
    const products = await api.getAllProducts();
    expect(products.length).toBeGreaterThan(0);

    // Test 2
    // Comment this out, and the test should fail, not serialising the contract
    const product = await api.getProduct("10");
    expect(product.id).toBe("10");
  });
});
