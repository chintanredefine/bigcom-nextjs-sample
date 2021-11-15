// TODO: define this type
export type PaymentMethod = any

export type PaymentMethodItemBody = {
  variantId: string | number
  cardHolder: string
  productId: string
}

export type PaymentMethodTypes = {
  paymentmethod: PaymentMethod
  paymentmethodBody: PaymentMethodItemBody
}

export type GetPaymentMethodHook<
  T extends PaymentMethodTypes = PaymentMethodTypes
> = {
  data: T['paymentmethod'] | null
  body: { includeProducts?: boolean }
  input: { includeProducts?: boolean }
  fetcherInput: { customerId: string; includeProducts?: boolean }
  swrState: { isEmpty: boolean }
}

export type AddPaymentMethodHook<
  T extends PaymentMethodTypes = PaymentMethodTypes
> = {
  data: T['paymentmethod']
  body: { item: T['paymentmethodBody'] }
  fetcherInput: { item: T['paymentmethodBody'] }
  actionInput: T['paymentmethodBody']
}

export type RemovePaymentMethodHook<
  T extends PaymentMethodTypes = PaymentMethodTypes
> = {
  data: T['paymentmethod'] | null
  body: { itemId: string }
  fetcherInput: { itemId: string }
  actionInput: { id: string }
  input: { paymentmethod?: { includeProducts?: boolean } }
}

export type PaymentMethodSchema<
  T extends PaymentMethodTypes = PaymentMethodTypes
> = {
  endpoint: {
    options: {}
    handlers: {
      getPaymentMethod: GetPaymentMethodHook<T> & {
        data: T['paymentmethod'] | null
        body: { customerToken?: string }
      }
      addPaymentMethod: AddPaymentMethodHook<T> & {
        body: { customerToken?: string }
      }
      removePaymentMethod: RemovePaymentMethodHook<T> & {
        body: { customerToken?: string }
      }
    }
  }
}

export type GetCustomerPaymentMethodOperation<
  T extends PaymentMethodTypes = PaymentMethodTypes
> = {
  data: { paymentmethod?: T['paymentmethod'] }
  variables: { customerId: string }
}
