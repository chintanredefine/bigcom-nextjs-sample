import { FC } from 'react'

import HelloImageSvg from '@assets/sleekshop-new-svg/hello-icon-image.svg'
import BuyItAgainSvg from '@assets/sleekshop-new-svg/shopping-bag.svg'
import OrderHistorySvg from '@assets/sleekshop-new-svg/sticky-note-2.svg'
import SleekVaultSvg from '@assets/sleekshop-new-svg/SleekVault.svg'
import WhishlistSvg from '@assets/sleekshop-new-svg/wishlist.svg'
import RecentlyViewedSvg from '@assets/sleekshop-new-svg/recently-viewed.svg'
import MessageSvg from '@assets/sleekshop-new-svg/message.svg'
import EditInfoSvg from '@assets/sleekshop-new-svg/edit-info.svg'
import AddressSvg from '@assets/sleekshop-new-svg/addresses-icon.svg'
import PaymentMethodSvg from '@assets/sleekshop-new-svg/payment-methods.svg'
import SignOutSvg from '@assets/sleekshop-new-svg/signout.svg'

import useLogout from '@framework/auth/use-logout'

import useCustomer from '@framework/customer/use-customer'

import { useUI } from '@components/ui'

interface Props {
  userName?: string
  setShowPage?: any
  ShowPage?: any
  setRefresh?: any
}

const ProfileHead: FC<Props> = ({ userName, setShowPage, ShowPage }) => {
  const logout = useLogout()
  const { openModal, setModalView } = useUI()

  const { data } = useCustomer()

  const HandleLogin = () => {
    setModalView('LOGIN_VIEW')
    return openModal()
  }

  return (
    <>
      <div className="left-menu">
        <div className="name-and-details">
          <div className="name-icon">
            <HelloImageSvg />
          </div>
          <div className="name-details">
            <span>
              Hello, <strong>{userName?.toUpperCase()}</strong>
            </span>
          </div>
        </div>
        <div className="status-and-point">
          <div className="status-details">
            <span>
              Your Status, <strong>Mogul</strong>
            </span>
          </div>
          <div className="points-details">
            <span>
              Your Points, <strong>325</strong>
            </span>
          </div>
        </div>
        <div className="order-details">
          <div className="order-details-title">Orders</div>
          <ul>
            <li
              className={`${ShowPage === 1 && 'active'}`}
              onClick={() => setShowPage(1)}
            >
              <BuyItAgainSvg />
              <span>Buy it again</span>
            </li>
            <li
              onClick={() => {
                setShowPage(2)
              }}
              className={`${ShowPage === 2 && 'active'}`}
            >
              <OrderHistorySvg />
              <span>Order History</span>
            </li>
          </ul>
        </div>
        <div className="order-details">
          <div className="order-details-title">Rewards</div>
          <ul>
            <li
              onClick={() => setShowPage(3)}
              className={`${ShowPage === 3 && 'active'}`}
            >
              <SleekVaultSvg />
              <span>SleekVault</span>
            </li>
          </ul>
        </div>
        <div className="order-details">
          <div className="order-details-title">My Account</div>
          <ul>
            <li
              onClick={() => setShowPage(4)}
              className={`${ShowPage === 4 && 'active'}`}
            >
              <WhishlistSvg />
              <span>Wishlist</span>
            </li>
            <li
              onClick={() => setShowPage(5)}
              className={`${ShowPage === 5 && 'active'}`}
            >
              <RecentlyViewedSvg />
              <span>Recently Viewed</span>
            </li>
            <li
              onClick={() => setShowPage(6)}
              className={`${ShowPage === 6 && 'active'}`}
            >
              <MessageSvg />
              <span>Messages</span>
            </li>
          </ul>
        </div>
        <div className="order-details">
          <div className="order-details-title">Account Settings</div>
          <ul>
            <li
              onClick={() => setShowPage(7)}
              className={`${ShowPage === 7 && 'active'}`}
            >
              <EditInfoSvg />
              <span>Edit Info</span>
            </li>
            <li
              onClick={() => setShowPage(8)}
              className={`${ShowPage === 8 && 'active'}`}
            >
              <AddressSvg />
              <span>Addresses</span>
            </li>
            <li
              onClick={() => setShowPage(9)}
              className={`${ShowPage === 9 && 'active'}`}
            >
              <PaymentMethodSvg />
              <span>Payment Methods</span>
            </li>
            {data ? (
              <li onClick={() => logout()}>
                <SignOutSvg />
                <span>Log off</span>
              </li>
            ) : (
              <li onClick={() => HandleLogin()}>
                <div style={{ transform: 'rotate(180deg)' }}>
                  <SignOutSvg />
                </div>
                <span>Sign In</span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  )
}

export default ProfileHead
