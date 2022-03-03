import { API } from "./api";

describe("API msw Tests", () => {
  test("msw replay tests", async () => {
    // reuse the msw fixture

        const api = new API("http://localhost:3000");

        // Test 1
        const products = await api.getAllProducts();
        expect(products.length).toBeGreaterThan(0);

        // // Test 2
        // // Comment this out, and the test should fail, not serialising the contract
        const product = await api.getProduct("10");
        expect(product.id).toBe("10");

  });
});
