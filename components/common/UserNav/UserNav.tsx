import { FC } from 'react'
import Link from 'next/link'
import type { LineItem } from '@commerce/types/cart'
import useCart from '@framework/cart/use-cart'
import useCustomer from '@framework/customer/use-customer'
import { useUI } from '@components/ui/context'
import s from './UserNav.module.css'
import CartSvg from '@assets/sleekshop-new-svg/cart.svg'
import UserIconSvg from '@assets/sleekshop-new-svg/user.svg'
interface Props {
  className?: string
}

const countItem = (count: number, item: LineItem) => count + item.quantity

const UserNav: FC<Props> = ({ className }) => {
  const { data } = useCart()
  const { data: customer } = useCustomer()
  const { toggleSidebar, closeSidebarIfPresent, openModal } = useUI()
  const itemsCount = data?.lineItems.reduce(countItem, 0) ?? 0

  return (
    <div className="flex items-center justify-end flex-1 space-x-8">
      <nav className={`UserNav_root__343id`}>
        <ul className={`UserNav_list__izHGy`}>
          {process.env.COMMERCE_CART_ENABLED && (
            <li className={`UserNav_item__2sdMO`} onClick={toggleSidebar}>
              <CartSvg />

              {itemsCount > 0 && (
                <span className={s.bagCount}>{itemsCount}</span>
              )}
            </li>
          )}

          {process.env.COMMERCE_CUSTOMERAUTH_ENABLED && (
            <li className="UserNav_item__2sdMO">
              <Link href="/profile">
                <UserIconSvg />
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  )
}

export default UserNav
