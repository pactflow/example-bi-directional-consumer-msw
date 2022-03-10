import { rest } from 'msw'

export const handlers = [
  // Need to use absolute URL's for matching
  // https://mswjs.io/docs/getting-started/integrate/node#direct-usage
  rest.get(process.env.PROVIDER_APP_BASE_URL +'/products', (req, res, ctx) => {
    return res(
      ctx.json(
        [
          {
            "id": "09",
            "type": "CREDIT_CARD",
            "name": "Gem Visa",
            // "version": "v1",
            // "price": 99.99
          },
          {
            "id": "10",
            "type": "CREDIT_CARD",
            "name": "28 Degrees",
            // "version": "v1",
            // "price": 49.49
          },
          {
            "id": "11",
            "type": "PERSONAL_LOAN",
            "name": "MyFlexiPay",
            // "version": "v2",
            // "price": 16.5
          }
        ]

      ),
    )
  }),
    rest.get(process.env.PROVIDER_APP_BASE_URL +'/product/10', (req, res, ctx) => {
    return res(
      ctx.json(
        {
          "id": "10",
          "type": "CREDIT_CARD",
          "name": "28 Degrees",
          // "version": "v1",
          // "price": 49.49
        }

      ),
    )
  }),
]

