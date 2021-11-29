import type { GetStaticPropsContext } from 'next'
import { useEffect, useState } from 'react'
import useCustomer from '@framework/customer/use-customer'
import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import { useUI, Container } from '@components/ui'

import LeftMenu from '@components/common/ProfileNavlink/profile_head'

// inner components
import Order from '@components/ProfileInnerPages/orders'
// import OrderHistory from '@components/ProfileInnerPages/ordershistory'
import Payment from '@components/ProfileInnerPages/payments'
import Recentitems from '@components/ProfileInnerPages/recentitems'
import OrderHistory from '@components/ProfileInnerPages/OrderHistory'
import Wishlist from '@components/ProfileInnerPages/wishlist'
import Addresses from '@components/ProfileInnerPages/addresses'
import EditProfile from '@components/ProfileInnerPages/editProfile'
import Message from '@components/ProfileInnerPages/messages'

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

export default function Profile() {
  const { data } = useCustomer()
  const { openModal, setModalView } = useUI()

  // Buy it again (1)  // Order History (2)  // SleekVault (3)  // Wishlist (4)
  // Recently Viewed (5)  // Messages (6)  // Edit Info (7)   // Addresses (8)
  // Payment Methods (9)
  const [ShowPage, setShowPage] = useState(1)
  const [userName, setuserName] = useState('User')
  // const [Refresh, setRefresh] = useState(false)

  useEffect(() => {
    if (data) {
      const newUserName = data.firstName + ' ' + data.lastName
      setuserName(newUserName)
    }
  }, [data])

  return (
    <Container>
      {/* left menu */}
      <div className="row p-t-30">
        <LeftMenu
          userName={userName}
          setShowPage={setShowPage}
          ShowPage={ShowPage}
          // setRefresh={setRefresh}
        />
        <div className="right-side-content">
          {data && (
            // all components are going to be here //
            <>
              {ShowPage === 1 ? (
                <Order />
              ) : ShowPage === 2 ? (
                <OrderHistory />
              ) : ShowPage === 3 ? (
                <>Sleek vault</>
              ) : ShowPage === 4 ? (
                <Wishlist />
              ) : ShowPage === 5 ? (
                <Recentitems />
              ) : ShowPage === 6 ? (
                <Message />
              ) : ShowPage === 7 ? (
                <EditProfile />
              ) : ShowPage === 8 ? (
                <Addresses />
              ) : (
                ShowPage === 9 && <Payment />
              )}
            </>
          )}
        </div>
      </div>
    </Container>
  )
}

Profile.Layout = Layout
