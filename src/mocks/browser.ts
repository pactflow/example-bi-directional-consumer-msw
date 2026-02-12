import { setupWorker } from "msw/browser";
import { handlers } from "./handlers.ts";

// Setup requests interception using the given handlers for browser
export const worker = setupWorker(...handlers);
