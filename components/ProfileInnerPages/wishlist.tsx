import { Heart } from '@components/icons'
// import { useCustomer } from '@framework/customer'
import { WishlistCard } from '@components/wishlist'
import useWishlist from '@framework/wishlist/use-wishlist'

export default function Wishlist() {
  // const { data: customer } = useCustomer()

  // @ts-ignore Shopify - Fix this types
  const { data, isLoading, isEmpty } = useWishlist({ includeProducts: true })

  return (
    <div className="MainContentInnerdiv mb-2 orderHistory d-flex justify-content-between">
      {isLoading || isEmpty ? (
        <div className="mt-3 mb-20 w-100">
          <div className="group flex flex-col">
            <div className="flex-1 PaddingForNoItemForDeskTopView flex flex-col justify-center items-center ">
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
          </div>
        </div>
      ) : (
        <>
          <div className="d-flex row">
            <div className="mainContentChild d-flex justify-content-between">
              <div className="Heading buyItAgainHeading">Wishlist</div>
              <div className="Heading itemQuantity">
                {data.items?.length} Items
              </div>
            </div>
            {data &&
              // @ts-ignore Shopify - Fix this types
              data.items?.map((item) => (
                <WishlistCard
                  key={item.id}
                  product={item.product! as any}
                  color={item?.product?.options[0]?.values[0]! as any}
                />
              ))}
          </div>
        </>
      )}
    </div>
  )
}
