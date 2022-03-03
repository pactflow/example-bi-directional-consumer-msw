// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

import { server } from './mocks/server'
import { setupMswPact } from "msw-pact";

const mswPact = setupMswPact({
  server,
  options: {
    consumer: process.env.PACT_CONSUMER ? process.env.PACT_CONSUMER : 'pactflow-example-consumer-msw',
    providers: {
      [process.env.PACT_PROVIDER ? process.env.PACT_PROVIDER : 'pactflow-example-provider']: ['products']
    },
    pactOutDir: './pacts'
  },
});


beforeAll(() => {
  // Enable the mocking in tests.
  server.listen()
})

beforeEach(() => {
  // mswPact.newTest();
});

afterEach(() => {
  // mswPact.verifyTest();
  // Reset any runtime handlers tests may use.
  server.resetHandlers()
})

afterAll(async () => {
  await mswPact.writeToFile(); // writes the pacts to a file
  mswPact.clear();
  // Clean up once the tests are done.
  server.close()
})
