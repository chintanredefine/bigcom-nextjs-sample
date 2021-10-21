import { useMemo } from 'react'
import useAddresses, { UseAddresses } from '@commerce/customer/address/use-addresses'
import type { GetWishlistHook } from '../types/wishlist'


import { MutationHook } from '@commerce/utils/types'

export default useAddresses as UseAddresses<typeof handler>

export const handler: MutationHook<any> = {
  fetchOptions: {
     url: '/api/customer/address',
    method: 'GET',
  },
  async fetcher({ input: { customerId }, options, fetch }) {

    if (!customerId) return null
       const url = new URL(options.url!, 'http://a')
    return fetch({
      url: url.pathname + url.search,
      method: options.method,
    })
  },
   useHook: ({ useData }) => (input) => {
    const { data: customer } = useCustomer()
    const response = useData({
      input: [
        ['customerId', customer?.entityId],
      ],
      swrOptions: {
        revalidateOnFocus: false,
        ...input?.swrOptions,
      },
    })

     return useMemo(
      () =>
        Object.create(response, {}),
      [response]
    )

},
}
