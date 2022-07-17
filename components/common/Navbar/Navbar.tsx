import React, { FC, useState, useEffect } from 'react'
import Link from 'next/link'
import useCustomer from '@framework/customer/use-customer'
import useLogout from '@framework/auth/use-logout'
import { Logo, Container } from '@components/ui'
import { Searchbar, UserNav } from '@components/common'
import { useUI } from '@components/ui'

import Image from 'next/image'

import s from './Navbar.module.css'
import NavbarRoot from './NavbarRoot'

import FlagImg from '@assets/images/flag-icon.png'
import HelloImageSvg from '@assets/sleekshop-new-svg/hello-icon-image.svg'
import MoveForwardSvg from '@assets/sleekshop-new-svg/moveForward.svg'
import RocketSvg from '@assets/sleekshop-new-svg/rocket-icon.svg'
import SignOutSvg from '@assets/sleekshop-new-svg/signout.svg'

interface Link {
  href: string
  label: string
}
interface NavbarProps {
  links?: Link[]
  isActive?: boolean
}


const Navbar: FC<NavbarProps> = ({ links }) => {
  const [isActive, setActive] = useState(false)
  const [userName, setuserName] = useState('User')
  const { openModal, setModalView } = useUI()

  const { data } = useCustomer()
  const logout = useLogout()

  const handleToggle = () => {
    setActive(!isActive)
  }

  useEffect(() => {
    if (data) {
      const newUserName = data.firstName + ' ' + data.lastName
      setuserName(newUserName)
    } else {
      setuserName('User')
    }
  }, [data])

  const HandleLogin = () => {
    setModalView('LOGIN_VIEW')
    setActive(false)
    return openModal()
  }

  const HandleRegister = () => {
    setModalView('SIGNUP_VIEW')
    setActive(false)
    return openModal()
  }

  return (
    <NavbarRoot>
      <div className="topbarmsg">
        <Container>
          <div className="topbarmsgleft"> 337 Roncesvalles Ave, Toronto</div>
          <div className="topbarmsgright">
            <div className="currency-right">
              <Image src={FlagImg} alt="" title="" />
              &nbsp; USD
            </div>
          </div>
        </Container>
      </div>

      <Container>
        <div className={s.nav}>
          <div className="flex items-center flex-1">
            <Link href="/">
              <a className={s.logocustom} aria-label="Logo">
                <Logo />
              </a>
            </Link>
          </div>
          {process.env.COMMERCE_SEARCH_ENABLED && (
            <div className="justify-center flex-1 hidden lg:flex">
              <Searchbar />
            </div>
          )}
          <div className="flex items-center justify-end flex-1 space-x-8">
            <UserNav />
          </div>
        </div>
        <div className="flex pb-4 lg:hidden">
          <Searchbar id="mobile-search" />
        </div>
        <a
          href="javascript:void(0)"
          onClick={handleToggle}
          className={
            isActive ? 'mobileMenu-toggle mobileMenu-toggle-mobile is-open' : 'mobileMenu-toggle'
          }
          data-mobile-menu-toggle="menu"
          title="Menu"
          aria-controls="menu"
          aria-expanded="false"
          id="show"
        >
          <span className="mobileMenu-toggleIcon">&nbsp;</span>
        </a>

        <div
          className={s.mainmenudiv + (isActive ? ' menu menu-block Navbar_mainmenudiv-mobile' : ' menu')}
        >
          <nav className={s.navMenu}>

            {isActive && <div className="name-and-details">
              <div className="name-icon">
                <HelloImageSvg />
              </div>
              <div className="name-details">
                <span>
                  Hello, <strong>{userName?.toUpperCase()}</strong>
                </span>
              </div>
            </div>}

            {links?.map((l) => {
              if (l.href === '/search/recommended-for-you' || l.href === '/search/new-arrival' || l.href === '/search/top-selling-products') {
                return <></>
              } else {
                return <Link href={l.href} key={l.href} >
                  <a className={`${s.link} linkMobile`} onClick={() => setActive(false)}>
                    <span>{l.label}</span>
                    {isActive && <span><MoveForwardSvg /></span>}
                  </a>
                </Link>
              }
            })}

            {isActive && <div className={`${s.link} linkMobileBtnContainer`}>
              {
                data ? (
                  <div onClick={() => logout()} className={` linkMobileLoginBtn`}>
                    <SignOutSvg />
                    <span>Sign Out</span>
                  </div>
                ) : (
                  <>
                    <div onClick={() => HandleLogin()} className={`linkMobileLoginBtn`}>
                      <span style={{ transform: 'rotate(180deg)' }}>
                        <SignOutSvg />
                      </span>
                      <span>Sign In</span>
                    </div>
                    <div onClick={() => HandleRegister()} className={`linkMobileRegisterBtn`}>
                      <span style={{ transform: 'rotate(180deg)' }}>
                        <SignOutSvg />
                      </span>
                      <span>Register</span>
                    </div>
                  </>
                )}
            </div>
            }
          </nav>
        </div>
      </Container>

      <div className="staticmsgbelowmenu">
        <Container>
          <div className="covidAndRocket">
            <span style={{ color: 'white' }}>
              COVID 19 UPDATE: WORLDWIDE FREESHIP
            </span>
            &nbsp;
            <RocketSvg />
          </div>
        </Container>
      </div>
    </NavbarRoot>
  )
}

export default Navbar
