// // TODO: define this type
// export type GetPaymentMethod = any

// export type PaymentMethodBody = {
//   variantId: string | number
//   productId: string
// }

// export type GetPaymentMethodTypes = {
//   paymentmethod: GetPaymentMethod
//   paymentMethodBody: PaymentMethodBody
// }

// export type GetPaymentMethodHook<T extends GetPaymentMethodTypes = GetPaymentMethodTypes> = {
//   data: T['paymentmethod'] | null
//   body: { includeProducts?: boolean }
//   input: { includeProducts?: boolean }
//   fetcherInput: { customerId: string; includeProducts?: boolean }
//   swrState: { isEmpty: boolean }
// }

// export type AddPaymentMethodHook<T extends GetPaymentMethodTypes = GetPaymentMethodTypes> = {
//   data: T['paymentmethod']
//   body: { item: T['paymentMethodBody'] }
//   fetcherInput: { paymentmethod: T['paymentMethodBody'] }
//   actionInput: T['paymentMethodBody']
// }

// export type RemovePaymentMethodHook<T extends PaymentMethodTypes = PaymentMethodTypes> = {
//   data: T['paymentmethod'] | null
//   body: { paymentmethodId: string }
//   fetcherInput: { paymentmethodId: string }
//   actionInput: { id: string }
//   input: { paymentmethod?: { includeProducts?: boolean } }
// }

// export type PaymentMethodSchema<T extends PaymentMethodTypes = PaymentMethodTypes> = {
//   endpoint: {
//     options: {}
//     handlers: {
//       getWishlist: GetPaymentMethodHook<T> & {
//         data: T['paymentmethod'] | null
//         body: { customerToken?: string }
//       }
//       addItem: AddItemHook<T> & {
//         body: { customerToken?: string }
//       }
//       removeItem: RemoveItemHook<T> & {
//         body: { customerToken?: string }
//       }
//     }
//   }
// }

// export type GetCustomerPaymentMethodOperation<
//   T extends PaymentMethodTypes = PaymentMethodTypes
// > = {
//   data: { wishlist?: T['paymentmethod'] }
//   variables: { customerId: string }
// }

import * as Core from '@commerce/types/paymentmethod'
import { definitions } from '../api/definitions/paymentmethod'
import type { ProductEdge } from '../api/operations/get-all-products'

export * from '@commerce/types/paymentmethod'

export type GetProductItem = NonNullable<
  definitions['paymentmethod_Full']['items']
>[0] & {
  product?: ProductEdge['node']
}

export type PaymentMethod = Omit<definitions['paymentmethod_Full'], 'items'> & {
  items?: GetProductItem[]
}

export type PaymentMethodTypes = {
  paymentmethod: PaymentMethod
  paymentmethodBody: Core.PaymentMethodItemBody
}

export type PaymentMethodSchema = Core.PaymentMethodSchema<PaymentMethodTypes>
export type GetCustomerPaymentMethodOperation =
  Core.GetCustomerPaymentMethodOperation<PaymentMethodTypes>
