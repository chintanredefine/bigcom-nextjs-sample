import { useHook, useMutationHook } from '../utils/use-hook'
import { mutationFetcher } from '../utils/default-fetcher'
import type { MutationHook } from '../utils/types'
import type { AddPaymentMethodHook } from '../types/paymentmethod'
import type { Provider } from '..'

export type AddPaymentMethod<
  H extends MutationHook<
    AddPaymentMethodHook<any>
  > = MutationHook<AddPaymentMethodHook>
> = ReturnType<H['useHook']>

export const fetcher = mutationFetcher

const fn = (provider: Provider) => provider.paymentmethod?.useAddPaymentMethod!

const addPaymentMethod: AddPaymentMethod = (...args) => {
  const hook = useHook(fn)
  return useMutationHook({ fetcher, ...hook })(...args)
}

export default addPaymentMethod
