import { FC, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useUI } from '@components/ui'

import useCustomer from '@framework/customer/use-customer'

const ProfileHead: FC = () => {
  const router = useRouter()
  const currentRoute = router.route
  const { data: customer } = useCustomer()
  const { openModal, setModalView } = useUI()

  useEffect(() => {
    setTimeout(() => {
      if (!customer) {
        setModalView('LOGIN_VIEW')
        return openModal()
      }
    }, 5000)
  }, [])

  return (
    <>
      <nav className="navBar navBar--sub navBar--account bg-primary">
        {/* {console.log('router profile_head file ', router)} */}
        <ul className="navBar-section">
          <li
            className={`navBar-item ${
              currentRoute === '/profile' && 'is-active'
            }`}
          >
            <Link href="/profile">Account Settings</Link>
          </li>
          <li
            className={`navBar-item ${
              currentRoute === '/orders' && 'is-active'
            }`}
          >
            <Link href="/orders">Orders</Link>
          </li>
          <li
            className={`navBar-item ${
              currentRoute === '/rewards' && 'is-active'
            }`}
          >
            <Link href="/rewards">REWARDS</Link>
          </li>
          <li
            className={`navBar-item ${
              currentRoute === '/messages' && 'is-active'
            }`}
          >
            <Link href="/messages">Messages</Link>
          </li>
          <li
            className={`navBar-item ${
              currentRoute === '/addresses' && 'is-active'
            }`}
          >
            <Link href="/addresses">Addresses</Link>
          </li>
          <li
            className={`navBar-item ${
              currentRoute === '/payments' && 'is-active'
            }`}
          >
            <Link href="/payments">Payment Methods</Link>
          </li>
          <li
            className={`navBar-item ${
              currentRoute === '/wishlist' && 'is-active'
            }`}
          >
            <Link href="/wishlist">Wish Lists</Link>
          </li>
          <li
            className={`navBar-item ${
              currentRoute === '/recentitems' && 'is-active'
            }`}
          >
            <Link href="/recentitems">Recently Viewed</Link>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default ProfileHead
