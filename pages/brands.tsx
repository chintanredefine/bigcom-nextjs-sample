import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import s from './index.module.css'
import { ProductCard } from '@components/product'
import { ProductSlider } from '@components/product'
import type { Product } from '@commerce/types/product'
import Img, { ImageProps } from 'next/image'
import Image from 'next/image'
import { Grid, Marquee, Hero } from '@components/ui'
// import HomeAllProductsGrid from '@components/common/HomeAllProductsGrid'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import Head from 'next/head'

interface BrandsProps {}

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }

  const siteInfoPromise = commerce.getSiteInfo()
  const { brands } = await siteInfoPromise
  return {
    props: {
      brands,
    },
    revalidate: 60,
  }
}

export default function Brands({
  brands,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const brandintial = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '0',
    'A',
    'B',
    'C',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ]

  return (
    <>
      <Head>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
      </Head>
      <div className="filter_list sticky">
        <ul>
          <li className="pagination-item SearchIcon">
            <a
              className="pagination-link"
              href="javascript:void(0)"
              title="Search"
            >
              <img
                src="https://cdn11.bigcommerce.com/s-vuxfopmsyg/product_images/uploaded_images/brand-search-icon.png"
                width="20"
                height="20"
              ></img>
            </a>

            <div
              className="SearchBrandWrap"
              style={{
                display: 'none',
              }}
            >
              <form autoComplete="on">
                <div className="awesomplete">
                  <input
                    className="BrandSearchInput"
                    id="BrandSearchInput"
                    type="text"
                    name="search"
                  />
                  <ul id="customUL" className="SearchBrandList">
                    {brands.map(({ node }: any) => (
                      <>
                        <li key={node.path} className="SearchBrandItem">
                          <a className="SearchBrandLinks" href={`${node.path}`}>
                            {node.name}
                          </a>
                        </li>
                      </>
                    ))}
                  </ul>
                </div>
              </form>
            </div>
          </li>
        </ul>
      </div>

      <div className="container" style={{ margin: '0 auto' }}>
        <div className="viewbrands" id="viewbrands">
          <div className="brand_inner">
            <ul className="brand_list">
              {brandintial.map((charfirst) => (
                <>
                  {brands.map(({ node }: any) => (
                    <>
                      {node.name.charAt(0) == charfirst && (
                        <>
                          <a href={`${node.path}`}>
                            <li
                              key={node.path}
                              className="brand-item"
                              data-sort={charfirst}
                              data-name={node.name}
                            >
                              <a
                                className="navPage-subMenu-action navPages-action"
                                href={`${node.path}`}
                              >
                                {node.name}
                              </a>
                            </li>
                          </a>
                        </>
                      )}
                    </>
                  ))}
                </>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <script src="https://www.ystore.us/sleekshop/awesomeplete.js"></script>
      <script src="https://www.ystore.us/sleekshop/brands.js"></script>
    </>
  )
}

Brands.Layout = Layout
