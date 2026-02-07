/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly REACT_APP_API_BASE_URL?: string
  readonly PROVIDER_APP_BASE_URL?: string
  readonly PACT_CONSUMER?: string
  readonly PACT_PROVIDER?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
