import { GetAPISchema, createEndpoint } from '@commerce/api'
import paymentMethodEndpoint from '@commerce/api/endpoints/paymentmethod'
import type { PaymentMethodSchema } from '../../../types/paymentmethod'
import type { BigcommerceAPI } from '../..'
import getPaymentMethod from './get-paymentmethod'
import addPaymentMethod from './add-paymentmethod'
import removePaymentMethod from './remove-paymentmethod'

export type PaymentMethodAPI = GetAPISchema<BigcommerceAPI, PaymentMethodSchema>

export type PaymentMethodEndpoint = PaymentMethodAPI['endpoint']

export const handlers: PaymentMethodEndpoint['handlers'] = {
  getPaymentMethod,
  addPaymentMethod,
  removePaymentMethod,
}

const paymentMethodApi = createEndpoint<PaymentMethodAPI>({
  handler: paymentMethodEndpoint,
  handlers,
})

export default paymentMethodApi
