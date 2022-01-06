import { FC, useEffect, useState } from 'react'
import cn from 'classnames'
import Image from 'next/image'
import useCustomer from '@framework/customer/use-customer'

import { useRouter } from 'next/router'
import type { Page } from '@commerce/types/page'
import getSlug from '@lib/get-slug'

import s from './Footer.module.css'

import PaymentMethodPng from './images/payment-methods-icon.png'
import Pinterrest from './images/pinterest-icon.png'
import Instagram from './images/instagram-icon.png'
import Facebook from './images/facebook-icon.png'
import { Console } from 'console'

interface Props {
  className?: string
  children?: any
  pages?: Page[]
}

declare global {
  interface Window {
    sa_emailid: String
  }
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

  const { data } = useCustomer()

  useEffect(() => {
    if (data) {
      window['sa_emailid'] = data.email
    }
  }, [data])

  let site_id = process.env.site_id || 7870040

  return (
    <footer className="footer-main">
      <div className="footer-pt-1">
        <div className="container">
          <div className="footer-coloum">
            <div className="footer-links-title">Help</div>
            <div className="footer-links">
              <span className="">
                <a className="" href="/pages/shipping-policy.html">
                  Shipping &amp; Returns
                </a>
              </span>
              <span className="">
                <a className="" href="#">
                  Track Your Order
                </a>
              </span>
              <span className="">
                <a className="" href="#">
                  Store Finder
                </a>
              </span>
              <span className="">
                <a className="" href="#">
                  FAQs
                </a>
              </span>
            </div>
          </div>
          <div className="footer-coloum">
            <div className="footer-links-title">About</div>
            <div className="footer-links">
              <span className="">
                <a className="" href="/pages/about-us.html">
                  About Us
                </a>
              </span>
              <span className="">
                <a className="" href="/pages/contact-us.html">
                  Contact Us
                </a>
              </span>
              <span className="">
                <a className="" href="/pages/career.html">
                  Careers
                </a>
              </span>
              <span className="">
                <a className="" href="/pages/partnership.html">
                  Become an Affiliate
                </a>
              </span>
            </div>
          </div>
          <div className="footer-coloum">
            <div className="footer-links-title">CATEGORIES</div>
            <div className="footer-links">
              <span className="">
                <a className="" href="#">
                  Shirts
                </a>
              </span>
              <span className="">
                <a className="" href="#">
                  Jeans
                </a>
              </span>
              <span className="">
                <a className="" href="#">
                  Footwear
                </a>
              </span>
              <span className="">
                <a className="" href="#">
                  Accessories
                </a>
              </span>
            </div>
          </div>
          <div className="footer-coloum">
            <div className="footer-links-title">
              JOIN THE LIST AND RECEIVE 15% OFF YOUR FIRST ORDER
            </div>
            <div className="newsletter-form">
              <div className="klaviyo-form-W2TX3f"></div>
            </div>
            <div className="social-links">
              <ul className="social-links-ul">
                <li className="social-links-item">
                  <a
                    className="icon icon--facebook"
                    title="Connect with Sleekshop on facebook"
                    href="https://www.facebook.com/sleekshopcom/?business_id=887407754647488"
                    target="_blank"
                  >
                    <Image src={Facebook} alt="" />
                  </a>
                </li>
                <li className="social-links-item">
                  <a
                    className="icon icon--instagram"
                    title="Connect with Sleekshop on instagram"
                    href="https://www.instagram.com/sleekshop_com/"
                    target="_blank"
                  >
                    <Image src={Instagram} alt="" />
                  </a>
                </li>
                <li className="social-links-item">
                  <a
                    className="icon icon--pinterest"
                    title="Connect with Sleekshop on pinterest"
                    href="https://www.pinterest.com/sleekshop/"
                    target="_blank"
                  >
                    <Image src={Pinterrest} alt="" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-pt-2">
        <div className="container">
          <div className="copy-rights">
            <span>
              © 2021 <a href="#">SleekShop</a>, Inc. All rights reserved.
            </span>
            <span>
              <a href={termlinks[1].url}>Privacy Policy</a>
            </span>
            <span>
              <a href={termlinks[0].url}>Terms &amp; Conditions</a>
            </span>
          </div>
          <div className="payment-methods">
            <Image src={PaymentMethodPng && PaymentMethodPng} alt="" />
          </div>
        </div>
      </div>

      <script
        type="text/javascript"
        src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/3.0.3/handlebars.js"
      ></script>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>

      <script src="//libraries.unbxdapi.com/search-sdk/v2.0.4/vanillaSearch.min.js"></script>

      <script src="//sandbox.unbxd.io/sleekhair_mybigcommerce_stage_autosuggest.js"></script>
      <script src="//sandbox.unbxd.io/sleekhair_mybigcommerce_stage_search.js"></script>
      <script src="https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=MpJPGK"></script>
      <script src="https://a.klaviyo.com/media/js/onsite/onsite.js"></script>

      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
              var sa_uni = sa_uni || [];
              sa_uni.push(['sa_pg', '5']);
              (function() {function sa_async_load() 
              { var sa = document.createElement('script');
              sa.type = 'text/javascript';
              sa.async = true;
              sa.src = '//cdn.socialannex.com/partner/${site_id}/universal.js';
              var sax = document.getElementsByTagName('script')[0];
              sax.parentNode.insertBefore(sa, sax); 
              }if (window.attachEvent) 
              {window.attachEvent('onload', sa_async_load);
              }else {window.addEventListener('load', sa_async_load,false);
              }})();
          `,
        }}
      />
    </footer>
  )
}

function usePages(pages?: Page[]) {
  const { locale } = useRouter()
  const sitePages: Page[] = []

  if (pages) {
    pages.forEach((page) => {
      const slug = page.url && getSlug(page.url)
      if (!slug) return alert('page not found' + slug)
      if (locale && !slug.startsWith(`${locale}/`)) return
      console.info('locale ', locale, 'slug ', slug)
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
