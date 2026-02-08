# Example TypeScript/React Consumer - Mock Service Worker (BYO Adapter)

<!-- Build Badge -->

[![Build](https://github.com/pactflow/example-bi-directional-consumer-msw/actions/workflows/build.yml/badge.svg)](https://github.com/pactflow/example-bi-directional-consumer-msw/actions/workflows/build.yml)

<!-- Can I Deploy Badge -->

[![Can I deploy Status](https://testdemo.pactflow.io/pacticipants/pactflow-example-bi-directional-consumer-msw/branches/master/latest-version/can-i-deploy/to-environment/production/badge)](https://testdemo.pactflow.io/pacticipants/pactflow-example-bi-directional-consumer-msw/branches/master/latest-version/can-i-deploy/to-environment/production/badge)

1. [Example TypeScript/React Consumer - Mock Service Worker (BYO Adapter)](#example-typescriptreact-consumer---mock-service-worker-byo-adapter)
   1. [Overview of Example](#overview-of-example)
      1. [Key points with Mock Service Worker](#key-points-with-mock-service-worker)
      2. [Modern Tech Stack](#modern-tech-stack)
   2. [Overview of Part of Bi-Directional Contract Testing Flow](#overview-of-part-of-bi-directional-contract-testing-flow)
   3. [Compatible with Providers](#compatible-with-providers)
   4. [Pre-requisites](#pre-requisites)
      1. [Environment variables](#environment-variables)
   5. [Usage](#usage)
      1. [Steps](#steps)
      2. [Use case with pact-msw-adapter](#use-case-with-pact-msw-adapter)
   6. [OS/platform-specific considerations](#osplatform-specific-considerations)
      1. [Windows](#windows)
   7. [Caveats](#caveats)
   8. [Related topics / posts / discussions](#related-topics--posts--discussions)
   9. [Other examples of how to do this form of testing](#other-examples-of-how-to-do-this-form-of-testing)
   10. [Found an issue?](#found-an-issue)

## Overview of Example

<!-- Consumer Overview -->

This is an example of a TypeScript/React "Product" API consumer that uses Mock-Service-Worker, Pact, [PactFlow](https://pactflow.io) and GitHub Actions to generate and publish Pact consumer contracts.

It performs pre-deployment cross-compatibility checks to ensure that it is compatible with specified providers using the Bi-Directional contract capability of PactFlow.

<!-- General -->

See the full [PactFlow Bi-Directional Workshop](https://docs.pactflow.io/docs/workshops/bi-directional-contract-testing) for which this can be substituted in as the "consumer".

### Key points with Mock Service Worker

This example:

- Implements a React-based "Product" website built with Vite and TypeScript
- Utilizes [MSW](https://mswjs.io/) to mock out the Product API provider
- Utilizes [pact-msw-adapter](https://www.npmjs.com/package/@pactflow/pact-msw-adapter) to transform MSW mocks into Pact consumer contracts

### Modern Tech Stack

This project uses modern web development tools:

- **TypeScript** - Full type safety with ESNext target
- **Vite** - Fast build tool and dev server
- **Vitest** - Modern test runner with native ESM support
- **ESLint** - Flat config format with TypeScript support
- **React Router v7** - Latest routing library
- **MSW v2** - Modern API mocking

## Overview of Part of Bi-Directional Contract Testing Flow

<!-- Consumer Overview -->

In the following diagram, you can see how the consumer testing process works - it's the same as the current Pact process.

When we call "can-i-deploy" the cross-contract validation process kicks off on PactFlow, to ensure any consumer consumes a valid subset of the OAS for the provider.

```mermaid
graph LR
    Consumer[Consumer]
    Mock[Mock<br/>e.g. Pact]
    PactFlow[PactFlow performs check<br/>to confirm that the Pact<br/>contract is compatible with<br/>Provider OAS]
    Contract[Consumer<br/>Contract]
    Provider[Provider]
    ProviderTest[Provider Testing<br/>Tool BYO]
    Validation{Cross Contract<br/>Validation}

    Consumer -->|1. Run tests| Mock
    Consumer -->|2. Produces| Contract
    Contract -->|3. Upload| PactFlow
    Provider -->|Provider<br/>Contract| ProviderTest
    ProviderTest -->|OAS| PactFlow
    PactFlow -->|4. Validates| Validation

    style Consumer fill:#9f6ce6
    style Provider fill:#9f6ce6
    style PactFlow fill:#1eb5a0
    style Validation fill:#5cb85c
```

The project uses a Makefile to simulate a very simple build pipeline with two stages - test and deploy.

When you run the CI pipeline (see below for doing this), the pipeline should perform the following activities (simplified):

- Test
  - Run tests (including the pact tests that generate the contract)
  - Publish pacts, tagging the consumer version with the name of the current branch
  - Check if we are safe to deploy to Production with `can-i-deploy` (i.e., has the cross-contract validation been successfully performed)
- Deploy (only from master)
  - Deploy app to Production
  - Record the Production deployment in the Pact Broker

```mermaid
graph TB
    subgraph CP["Consumer Pipeline"]
        RunTests[Run tests]
        Publish[Publish contract]
        CanDeploy[can-i-deploy]
        Deploy[Deploy!]

        RunTests -->|Generate contract| Publish
        Publish --> CanDeploy
        CanDeploy -->|Approved| Deploy
    end

    subgraph PF["PactFlow Server"]
        Broker[(Contract Broker)]
        Validation[Cross-Contract<br/>Validation]
        ProviderOAS[Provider OAS<br/>in Production]

        Broker -->|Compare| Validation
        ProviderOAS -->|Against| Validation
    end

    Publish -.->|Upload contract| Broker
    CanDeploy <-.->|Request validation| Validation

    style RunTests fill:#9f6ce6
    style Publish fill:#9f6ce6
    style CanDeploy fill:#9f6ce6
    style Deploy fill:#9f6ce6
    style Validation fill:#5cb85c
    style CP fill:#2d2d2d,stroke:#9f6ce6,stroke-width:3px
    style PF fill:#2d2d2d,stroke:#1eb5a0,stroke-width:3px
```

> [!NOTE]
> The cross-contract validation happens on PactFlow's server when `can-i-deploy` is called. It compares the consumer contract against the provider's OAS that's already in production to ensure compatibility before deployment.

## Compatible with Providers

<!-- Provider Compatibility -->

This project is currently compatible with the following provider(s):

- [pactflow-example-bi-directional-provider-dredd](https://github.com/pactflow/example-bi-directional-provider-dredd)
- [pactflow-example-bi-directional-provider-restassured](https://github.com/pactflow/example-provider-restassured)
- [pactflow-example-bi-directional-provider-postman](https://github.com/pactflow/example-bi-directional-provider-postman)
- [pactflow-example-bi-directional-provider-dotnet](https://github.com/pactflow/example-bi-directional-provider-dotnet)

See [Environment variables](#environment-variables) on how to set these up.

## Pre-requisites

**Software**:

- Tools listed at: <https://docs.pactflow.io/docs/workshops/ci-cd/set-up-ci/prerequisites/>
- Modern Node.js (with ESNext support)
- A pactflow.io account with a valid [API token](https://docs.pactflow.io/docs/getting-started/#configuring-your-api-token)

### Environment variables

To be able to run some of the commands locally, you will need to export the following environment variables into your shell:

- `PACT_BROKER_TOKEN`: a valid [API token](https://docs.pactflow.io/docs/getting-started/#configuring-your-api-token) for PactFlow
- `PACT_BROKER_BASE_URL`: a fully qualified domain name with protocol to your pact broker e.g. <https://testdemo.pactflow.io>

<!-- CONSUMER env vars -->

Set `PACT_PROVIDER` to one of the following:

- `PACT_PROVIDER=pactflow-example-bi-directional-provider-dredd`: Dredd - (<https://github.com/pactflow/example-bi-directional-provider-dredd>)
- `PACT_PROVIDER=pactflow-example-bi-directional-provider-postman`: Postman - (<https://github.com/pactflow/example-bi-directional-provider-postman>)
- `PACT_PROVIDER=pactflow-example-bi-directional-provider-restassured`:  Rest Assured - (<https://github.com/pactflow/example-bi-directional-provider-restassured>)

## Usage

### Steps

- `npm install` - install dependencies
- `npm run dev` - start the Vite development server
- `npm test` - run tests with Vitest
- `npm run build` - build for production with TypeScript and Vite
- `npm run lint` - run ESLint
- `npm run type-check` - run TypeScript type checking
- `make clean` - ensure previous pacts are cleared
- `make test` - run msw test locally
- `make fake_ci` - emulate the CI process locally

### Use case with pact-msw-adapter

Check out the pact-msw-adapter repo [here](https://github.com/pactflow/pact-msw-adapter) for more details in the readme.

Key implementation files:

- [`src/mocks/handlers.ts`](src/mocks/handlers.ts) - Defines MSW request handlers
- [`src/mocks/server.ts`](src/mocks/server.ts) - Sets up the MSW server for Node.js testing
- [`src/setupTests.ts`](src/setupTests.ts) - Configures test mocking and records MSW interactions as Pact contracts

## OS/platform-specific considerations

The Makefile is configured to run on Unix-based systems such as you would find in most common CI/CD pipelines.

Commands can be run locally on Unix/Mac, or on Windows via [WSL2](https://docs.microsoft.com/en-us/windows/wsl/install).

### Windows

You can still try this example locally on Windows using PowerShell and running commands manually.

<details>
  <summary>Click to see Windows-specific instructions here</summary>

  These will be the same commands that are used in the Makefile with a few manual tweaks.

1. Make sure you have set all of the environment variables. In PowerShell, they can be set like so:

    ```
     $env:GIT_BRANCH="main"
    ```

1. Publish the pact that was generated. The step uses the pact-cli docker image to publish the pact to your pactflow account.
  The path for `<path_to_project_root>` needs to be converted from Windows paths to UNIX ones as the Docker container is using UNIX. Either hard code this or set it as another environment variable.

      `C:\Users\Person\Documents\example-bi-directional-consumer-dotnet`

      becomes

      `/c/Users/Candy/Documents/PactFlow/example-bi-directional-consumer-dotnet`

      `$env:VARIABLE_NAME` refers to environment variables in Windows.

      ```
      docker run --rm -v <path_to_project_root>:<path_to_project_root> -e PACT_BROKER_BASE_URL -e PACT_BROKER_TOKEN pactfoundation/pact-cli publish <path_to_pacts_folder> --consumer-app-version $env:GIT_COMMIT --branch $env:GIT_BRANCH

      ```

1. Check can-i-deploy to see if your provider is compatible with your pact.

      ```
      docker run --rm -v <path_to_project_root>:<path_to_project_root> -e PACT_BROKER_BASE_URL -e PACT_BROKER_TOKEN pactfoundation/pact-cli  broker can-i-deploy --pacticipant pactflow-example-bi-directional-consumer-dotnet --version $env:GIT_COMMIT --to-environment production  --retry-while-unknown 0 --retry-interval 10
      ```

1. Have a look at what other commands are available in the Makefile. All of them can be run locally from PowerShell by changing the Windows paths to UNIX format and replacing the environment variable references. Any variable referenced as `${VARIABLE}` can be changed to `$env:VARIABLE` to reference environment variables in PowerShell.

</details>

## Caveats

- [OAS considerations](https://docs.pactflow.io/docs/bi-directional-contract-testing/contracts/oas#considerations)

## Related topics / posts / discussions

- [Consumer Side Bi-Directional Contract Testing Guide](https://docs.pactflow.io/docs/bi-directional-contract-testing/consumer)
- [Provider Side Bi-Directional Contract Testing Guide](https://docs.pactflow.io/docs/bi-directional-contract-testing/provider)

## Other examples of how to do this form of testing

- TBC

## Found an issue?

Reach out via a GitHub Issue, or reach us over in the [Pact foundation Slack](https://slack.pact.io)
