import type { GetStaticPropsContext } from 'next'
import commerce from '@lib/api/commerce'
import { Heart } from '@components/icons'
import { Layout } from '@components/common'
import { Text, Container } from '@components/ui'
import { useCustomer } from '@framework/customer'
import { WishlistCard } from '@components/wishlist'
import useWishlist from '@framework/wishlist/use-wishlist'

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  // Disabling page if Feature is not available
  if (!process.env.COMMERCE_WISHLIST_ENABLED) {
    return {
      notFound: true,
    }
  }

  const config = { locale, locales }
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const { pages } = await pagesPromise
  const { categories } = await siteInfoPromise

  return {
    props: {
      pages,
      categories,
    },
  }
}

export default function Wishlist() {
  const { data: customer } = useCustomer()

  
  // @ts-ignore Shopify - Fix this types
  const { data, isLoading, isEmpty } = useWishlist({ includeProducts: true })

  return (
    <Container>
    <div className="container">
    <div className="account account--fixed">
    <h2 className="page-heading">My Wishlist</h2>
       <nav className="navBar navBar--sub navBar--account">
    <ul className="navBar-section">
     <li className="navBar-item">
                <a className="navBar-action" href="/profile">Account Settings</a>
            </li>
                <li className="navBar-item"><a href="/orders" className="navBar-action">Orders</a></li>
            <li className="navBar-item is-active">
                <a className="navBar-action" href="/rewards">REWARDS</a>
            </li>
        <li className="navBar-item">
            <a className="navBar-action" href="/messages">Messages</a>
        </li>
            <li className="navBar-item">
                <a className="navBar-action" href="/addresses">Addresses</a>
            </li>
                <li className="navBar-item">
                    <a className="navBar-action" href="/payments">Payment Methods</a>
                </li>
                <li className="navBar-item is-active">
                    <a className="navBar-action" href="javascript:void(0)">Wish Lists</a>
                </li>

            <li className="navBar-item">
                <a className="navBar-action" href="/account.php?action=recent_items">Recently Viewed</a>
            </li>
           
    </ul>
</nav>
      <div className="mt-3 mb-20">
        <div className="group flex flex-col">
          {isLoading || isEmpty ? (
            <div className="flex-1 px-12 py-24 flex flex-col justify-center items-center ">
              <span className="border border-dashed border-secondary flex items-center justify-center w-16 h-16 bg-primary p-12 rounded-lg text-primary">
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
            data &&
            // @ts-ignore Shopify - Fix this types
            data.items?.map((item) => (
              <WishlistCard key={item.id} product={item.product! as any} />
            ))
          )}
        </div>
      </div>

      </div>
</div>

    </Container>
  )
}

Wishlist.Layout = Layout
