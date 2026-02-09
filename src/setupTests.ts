// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import { setupPactMswAdapter } from "@pactflow/pact-msw-adapter";
import { afterAll, afterEach, beforeAll, beforeEach } from "vitest";
import { server } from "./mocks/server.ts";

const mswPact = setupPactMswAdapter({
  server,
  options: {
    consumer: import.meta.env.PACT_CONSUMER
      ? import.meta.env.PACT_CONSUMER
      : "pactflow-example-bi-directional-consumer-msw",
    providers: {
      [import.meta.env.PACT_PROVIDER
        ? import.meta.env.PACT_PROVIDER
        : "pactflow-example-bi-directional-provider-dredd"]: [
        "products",
        "product",
      ],
    },
    pactOutDir: "./pacts",
    excludeHeaders: ["x-powered-by"],
  },
});

beforeAll(() => {
  // Enable the mocking in tests.
  server.listen();
});

beforeEach(() => {
  mswPact.newTest();
});

afterEach(() => {
  mswPact.verifyTest();
  // Reset any runtime handlers tests may use.
  server.resetHandlers();
});

afterAll(async () => {
  await mswPact.writeToFile(); // writes the pacts to a file
  mswPact.clear();
  // Clean up once the tests are done.
  server.close();
});
