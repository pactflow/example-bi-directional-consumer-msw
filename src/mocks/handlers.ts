import { type HttpHandler, HttpResponse, http } from "msw";

export const handlers: HttpHandler[] = [
  // Need to use absolute URL's for matching
  // https://mswjs.io/docs/getting-started/integrate/node#direct-usage
  http.get(`${import.meta.env.PROVIDER_APP_BASE_URL}/products`, () => {
    return HttpResponse.json([
      {
        id: "09",
        type: "CREDIT_CARD",
        name: "Gem Visa",
        // "version": "v1",
        // "price": 99.99
      },
      {
        id: "10",
        type: "CREDIT_CARD",
        name: "28 Degrees",
        // "version": "v1",
        // "price": 49.49
      },
      {
        id: "11",
        type: "PERSONAL_LOAN",
        name: "MyFlexiPay",
        // "version": "v2",
        // "price": 16.5
      },
    ]);
  }),
  http.get(`${import.meta.env.PROVIDER_APP_BASE_URL}/product/10`, () => {
    return HttpResponse.json({
      id: "10",
      type: "CREDIT_CARD",
      name: "28 Degrees",
      // "version": "v1",
      // "price": 49.49
    });
  }),
];
