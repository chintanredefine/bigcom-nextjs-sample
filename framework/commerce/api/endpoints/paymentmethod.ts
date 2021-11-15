import type { PaymentMethodSchema } from '../../types/paymentmethod'
import { CommerceAPIError } from '../utils/errors'
import isAllowedOperation from '../utils/is-allowed-operation'
import type { GetAPISchema } from '..'

const paymentmethodEndpoint: GetAPISchema<
  any,
  PaymentMethodSchema<any>
>['endpoint']['handler'] = async (ctx) => {
  const { req, res, handlers, config } = ctx

  if (
    !isAllowedOperation(req, res, {
      GET: handlers['getPaymentMethod'],
      POST: handlers['addPaymentMethod'],
      DELETE: handlers['removePaymentMethod'],
    })
  ) {
    return
  }

  const { cookies } = req
  const customerToken = cookies[config.customerCookie]

  try {
    // Return current wishlist info
    if (req.method === 'GET') {
      const body = {
        customerToken,
        includeProducts: req.query.products === '1',
      }
      return await handlers['getPaymentMethod']({ ...ctx, body })
    }

    // Add an item to the wishlist
    if (req.method === 'POST') {
      const body = { ...req.body, customerToken }
      return await handlers['addPaymentMethod']({ ...ctx, body })
    }

    // Remove an item from the wishlist
    if (req.method === 'DELETE') {
      const body = { ...req.body, customerToken }
      return await handlers['removePaymentMethod']({ ...ctx, body })
    }
  } catch (error) {
    console.error(error)

    const message =
      error instanceof CommerceAPIError
        ? 'An unexpected error ocurred with the Commerce API'
        : 'An unexpected error ocurred'

    res.status(500).json({ data: null, errors: [{ message }] })
  }
}

export default paymentmethodEndpoint
