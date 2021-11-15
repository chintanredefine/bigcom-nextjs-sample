import { useCallback } from 'react'
import type { MutationHook } from '@commerce/utils/types'
import { CommerceError } from '@commerce/utils/errors'
import addPaymentMethod, {
  AddPaymentMethod,
} from '@commerce/paymentmethod/add-paymentmethod'
import type { AddPaymentMethodHook } from '../types/paymentmethod'
import useCustomer from '../customer/use-customer'
import getPaymentMethod from './get-paymentmethod'

export default addPaymentMethod as AddPaymentMethod<typeof handler>

export const handler: MutationHook<AddPaymentMethodHook> = {
  fetchOptions: {
    url: '/api/addpaymentmethod',
    method: 'POST',
  },
  useHook:
    ({ fetch }) =>
    () => {
      const { data: customer } = useCustomer()
      const { revalidate } = getPaymentMethod()

      return useCallback(
        async function addItem(item) {
          console.log('payment Method addition process is going on ')

          if (!customer) {
            // A signed customer is required in order to have a wishlist
            throw new CommerceError({
              message: 'Signed customer not found',
            })
          }

          // TODO: add validations before doing the fetch
          const data = await fetch({ input: { item } })
          await revalidate()
          return data
        },
        [fetch, revalidate, customer]
      )
    },
}
