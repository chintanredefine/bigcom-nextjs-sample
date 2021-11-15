import { useHook, useSWRHook } from '../utils/use-hook'
import { SWRFetcher } from '../utils/default-fetcher'
import type { HookFetcherFn, SWRHook } from '../utils/types'
import type { GetPaymentMethodHook } from '../types/paymentmethod'
import type { Provider } from '..'

export type GetPaymentMethod<
  H extends SWRHook<GetPaymentMethodHook<any>> = SWRHook<GetPaymentMethodHook>
> = ReturnType<H['useHook']>

export const fetcher: HookFetcherFn<GetPaymentMethodHook> = SWRFetcher

const fn = (provider: Provider) => provider.wishlist?.useWishlist!

const getPaymentMethod: GetPaymentMethod = (...args) => {
  const hook = useHook(fn)
  return useSWRHook({ fetcher, ...hook })(...args)
}

export default getPaymentMethod
