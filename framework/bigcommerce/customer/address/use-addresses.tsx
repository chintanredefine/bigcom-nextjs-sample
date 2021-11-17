import { useMemo } from 'react'
import useAddresses, { UseAddresses } from '@commerce/customer/address/use-addresses'
import { useCustomer } from '@framework/customer'

import { SWRHook, HookFetcherFn } from '@commerce/utils/types'

import type { GetAddressesHook } from '@commerce/types/customer/address'


import { MutationHook } from '@commerce/utils/types'

export default useAddresses as UseAddresses<typeof handler>
  
export const handler: SWRHook<GetAddressesHook> = {
  fetchOptions: {
     url: '/api/customer/address',
    method: 'GET',
  },
   useHook: ({ useData }) => (input) => {
    const { data: customer } = useCustomer()
    const response = useData({
      input: [
        ['cartId', customer?.entityId],
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
