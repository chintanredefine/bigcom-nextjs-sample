import type { GetStaticPropsContext } from 'next'
import commerce from '@lib/api/commerce'
import useCustomer from '@framework/customer/use-customer'

import { Bag } from '@components/icons'
import { Layout } from '@components/common'
import { Container, Text } from '@components/ui'

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const { pages } = await pagesPromise
  const { categories } = await siteInfoPromise

  return {
    props: { pages, categories },
  }
}


export default function Orders() {
    const { data } = useCustomer()
    const custaddr = fetch(
      'https://api.bigcommerce.com/stores/hmhnh4h9/v2/customers/317418/addresses',
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': 'qfhjgach3ewzkvhx47be9yy4m5tvbtw'
        },
        method: 'GET'
      }
    )
        console.log(custaddr)
  return (
    <Container>
     <div className="container">
    <div className="account account--fixed">
      <h2 className="page-heading">Addresses</h2>
       <nav className="navBar navBar--sub navBar--account">
            <ul className="navBar-section">
                <li className="navBar-item"><a className="navBar-action" href="/profile">Account Settings</a></li>
                <li className="navBar-item"><a href="/orders" className="navBar-action">Orders</a></li>
                <li className="navBar-item"><a className="navBar-action" href="/rewards">REWARDS</a></li>
                <li className="navBar-item"><a className="navBar-action" href="/messages">Messages</a></li>
                <li className="navBar-item is-active"><a className="navBar-action" href="javascript:void(0)">Addresses</a></li>
                <li className="navBar-item"><a className="navBar-action" href="/payments">Payment Methods</a></li>
                <li className="navBar-item"><a className="navBar-action" href="/wishlist">Wish Lists</a></li>
                <li className="navBar-item"><a className="navBar-action" href="/account.php?action=recent_items">Recently Viewed</a></li>
            </ul>
        </nav>
      <div className="flex-1 p-24 flex flex-col justify-center items-center ">
        <span className="border border-dashed border-secondary rounded-full flex items-center justify-center w-16 h-16 p-12 bg-primary text-primary">
          <Bag className="absolute" />
        </span>
        <h2 className="pt-6 text-2xl font-bold tracking-wide text-center">
          No Addresses found
        </h2>
        
      </div>
      </div>
      </div>
    </Container>
  )
}

Orders.Layout = Layout
