import { useHook, useMutationHook } from '../utils/use-hook'
import { mutationFetcher } from '../utils/default-fetcher'
import type { HookFetcherFn, MutationHook } from '../utils/types'
import type { RemovePaymentMethodHook } from '../types/paymentmethod'
import type { Provider } from '..'

export type UseRemoveItem<
  H extends MutationHook<
    RemovePaymentMethodHook<any>
  > = MutationHook<RemovePaymentMethodHook>
> = ReturnType<H['useHook']>

export const fetcher: HookFetcherFn<RemovePaymentMethodHook> = mutationFetcher

const fn = (provider: Provider) => provider.wishlist?.useRemoveItem!

const useRemoveItem: UseRemoveItem = (...args) => {
  const hook = useHook(fn)
  return useMutationHook({ fetcher, ...hook })(...args)
}

export default useRemoveItem
