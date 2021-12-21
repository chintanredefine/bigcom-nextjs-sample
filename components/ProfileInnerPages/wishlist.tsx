import { useEffect, useState } from 'react'

import { Heart } from '@components/icons'
// import { useCustomer } from '@framework/customer'
import { WishlistCard } from '@components/wishlist'
import useWishlist from '@framework/wishlist/use-wishlist'

export default function Wishlist() {
  // const { data: customer } = useCustomer()

  const [dataState, setdataState] = useState({
    data: [],
    isLoading: '',
    isEmpty: '',
    update: true,
  })

  useEffect(() => {
    // @ts-ignore Shopify - Fix this types
    const { data, isLoading, isEmpty } = useWishlist({ includeProducts: true })
    setdataState({
      ...data,
      data: data,
      isLoading: isLoading,
      isEmpty: isEmpty,
    })
  }, [dataState.update])

  return (
    <div className="MainContentInnerdiv mb-2 orderHistory d-flex justify-content-between">
      <div className="mt-3 mb-20">
        <div className="group flex flex-col">
          {dataState.isLoading || dataState.isEmpty ? (
            // <div className="flex-1 px-12 py-24 flex flex-col justify-center items-center ">
            //   <span className="border border-dashed border-secondary flex items-center justify-center w-16 h-16 bg-primary p-12 rounded-lg text-primary">
            //     <Heart className="absolute" />
            //   </span>
            //   <h2 className="pt-6 text-2xl font-bold tracking-wide text-center">
            //     Your wishlist is empty
            //   </h2>
            //   <p className="text-accent-6 px-10 text-center pt-2">
            //     Biscuit oat cake wafer icing ice cream tiramisu pudding cupcake.
            //   </p>
            // </div>

            <div className="flex-1 p-24 flex flex-col justify-center items-center ">
              <span className="border border-dashed border-secondary rounded-full flex items-center justify-center w-16 h-16 p-12 bg-primary text-primary">
                <Heart className="absolute" />
              </span>
              <h2 className="pt-6 text-2xl font-bold tracking-wide text-center">
                Your wishlist is empty
              </h2>
              <p className="text-accent-6 px-10 text-center pt-2">
                Biscuit oat cake wafer icing ice cream tiramisu pudding cupcake.
              </p>
            </div>
          ) : (
            <>
              <div className="d-flex row">
                {console.log('dataState.data', dataState)}
                {dataState.data &&
                  dataState.data.map((item: any) => (
                    <WishlistCard
                      key={item.id}
                      product={item.product! as any}
                      Update={dataState.update}
                      setUpdate={setdataState}
                    />
                  ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
