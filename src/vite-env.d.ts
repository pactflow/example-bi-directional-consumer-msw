/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly PROVIDER_APP_BASE_URL?: string;
  readonly PACT_CONSUMER?: string;
  readonly PACT_PROVIDER?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
