import { FC } from 'react'
import cn from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { Page } from '@commerce/types/page'
import getSlug from '@lib/get-slug'
import { Github, Vercel } from '@components/icons'
import { Logo, Container } from '@components/ui'
import { I18nWidget } from '@components/common'
import s from './Footer.module.css'

interface Props {
  className?: string
  children?: any
  pages?: Page[]
}

const links = [
  {
    name: 'WHO WE ARE',
    url: '/pages/about-us.html',
  },
  {
    name: 'CONTACT US',
    url: '/pages/contact-us.html',
  },
  {
    name: 'PARTNERSHIPS',
    url: '/pages/partnership.html',
  },
  {
    name: 'VIEW ALL BRANDS',
    url: '/brands',
  },
  {
    name: 'NEW ARRIVALS',
    url: '/search.php?search_query_adv=new%20arrivals&section=content',
  },
  {
    name: 'WEBSITE ACCESSIBILITY',
    url: '/pages/website-accessibility.html',
  },
]

const links2 = [
  {
    name: 'MY ACCOUNT',
    url: '/account.php',
  },
  {
    name: 'LIVE CHAT',
    url: '/pages/contact-us.html',
  },
  {
    name: 'CUSTOMER SERVICE',
    url: '/pages/customer-service.html',
  },
  {
    name: 'RETURN POLICY',
    url: '/pages/return-policy.html',
  },
  {
    name: 'SHIPPING POLICY',
    url: '/pages/shipping-policy.html',
  },
  {
    name: 'CURBSIDE PICK UP',
    url: '/pages/curbside-pickup.html',
  },
  {
    name: 'HOME',
    url: '/',
  },
]

const termlinks = [
  {
    name: 'TERMS OF USE',
    url: '/pages/policies-terms-of-use.html',
  },
  {
    name: 'PRIVACY POLICY',
    url: '/pages/policies-terms-of-use.html',
  },
]



const Footer: FC<Props> = ({ className, pages }) => {
  const { sitePages } = usePages(pages)
  const rootClassName = cn(s.root, className)

  return (
    <footer className={rootClassName}>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-b border-accent-2 py-12 text-primary bg-primary transition-colors duration-150">
          <div className="col-span-1 lg:col-span-8">
            <div className="grid md:grid-rows-4 md:grid-cols-3 md:grid-flow-col main-footer-social-connect">
              <div className="social-footer">
                  <div className="klaviyo-form-W2TX3f"></div>
                  <h5 className="footer-info-heading">Connect With Us</h5>
                  <h5 className="mobile-soc footer-info-heading">let's connect!</h5>
                  <Link href="https://www.instagram.com/sleekshop_com/">Instagram</Link>
              </div>
            </div>
            <div className="grid md:grid-rows-7 md:grid-flow-col main-footer-links-section1">
              {[...links, ...sitePages].map((page) => (
                <span key={page.url} className="py-3 md:py-0 md:pb-4">
                  <Link href={page.url!}>
                    <a className="text-accent-9 hover:text-accent-6 transition ease-in-out duration-150">
                      {page.name}
                    </a>
                  </Link>
                </span>
              ))}
              </div>
              <div className="grid md:grid-rows-7 md:grid-flow-col main-footer-links-section2 ">
              {[...links2, ...sitePages].map((page) => (
                <span key={page.url} className="py-3 md:py-0 md:pb-4">
                  <Link href={page.url!}>
                    <a className="text-accent-9 hover:text-accent-6 transition ease-in-out duration-150">
                      {page.name}
                    </a>
                  </Link>
                </span>
              ))}
            </div>
          </div>
          <div className="col-span-1 lg:col-span-2 flex items-start lg:justify-end text-primary">
            <div className="flex space-x-6 items-center h-10">
              
              
            </div>
          </div>
        </div>
        
        <div className="pt-6 pb-6 flex flex-col md:flex-row justify-between items-center space-y-4 text-accent-6 text-sm">
          <div className="footertermslink">
            {[...termlinks, ...sitePages].map((page) => (
                <span key={page.url} className="py-3 md:py-0 md:pb-4">
                  <Link href={page.url!}>
                    <a className="text-accent-9 hover:text-accent-6 transition ease-in-out duration-150">
                      {page.name}
                    </a>
                  </Link>
                </span>
            ))}
          </div>
          <div className="flex items-center text-primary text-sm">
              SleekShop includes a comprehensive listing of both professional-use and professional quality products that are found in salons and spas. We strongly advise that professional-use products are solely used by professional stylists.
          </div>
        </div>
        <div className="pt-6 pb-6 flex flex-col md:flex-row justify-between items-center space-y-4 text-accent-6 text-sm">
          <div>
            <span>&copy; 2021 SleekShop, Inc. All rights reserved.</span>
          </div>
          <div className="flex items-center text-primary text-sm">
            <span className="text-primary">
           {/*<img src={ require('./images/credit-cards.png') } />*/}
            </span>
          </div>
        </div>

      </Container>
    </footer>
  )
}

function usePages(pages?: Page[]) {
  const { locale } = useRouter()
  const sitePages: Page[] = []

  if (pages) {
    pages.forEach((page) => {
      const slug = page.url && getSlug(page.url)
      if (!slug) return
      if (locale && !slug.startsWith(`${locale}/`)) return
      sitePages.push(page)
    })
  }

  return {
    sitePages: sitePages.sort(bySortOrder),
  }
}

// Sort pages by the sort order assigned in the BC dashboard
function bySortOrder(a: Page, b: Page) {
  return (a.sort_order ?? 0) - (b.sort_order ?? 0)
}

export default Footer
