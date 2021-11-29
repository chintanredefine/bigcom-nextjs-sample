import { FC } from 'react'
import React, { useState } from 'react'
import Link from 'next/link'
import s from './Navbar.module.css'
import NavbarRoot from './NavbarRoot'
import { Logo, Container } from '@components/ui'
import { Searchbar, UserNav } from '@components/common'
import FlagImg from '@assets/images/flag-icon.png'
import Image from 'next/image'

import RocketSvg from '@assets/sleekshop-new-svg/rocket-icon.svg'

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

  const handleToggle = () => {
    setActive(!isActive)
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
            isActive ? 'mobileMenu-toggle is-open' : 'mobileMenu-toggle'
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
          className={s.mainmenudiv + (isActive ? ' menu menu-block ' : ' menu')}
        >
          <nav className={s.navMenu}>
            <Link href="/search">
              <a className={s.link}>All</a>
            </Link>
            {links?.map((l) => (
              <Link href={l.href} key={l.href}>
                <a className={s.link}>{l.label}</a>
              </Link>
            ))}
          </nav>
        </div>
      </Container>

      <div className="staticmsgbelowmenu">
        <Container>
          <div className="covidAndRocket">
            <span>COVID 19 UPDATE: WORLDWIDE FREESHIP</span> &nbsp;
            <RocketSvg />
          </div>
        </Container>
      </div>
    </NavbarRoot>
  )
}

export default Navbar
