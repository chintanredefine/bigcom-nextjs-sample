import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import s from './index.module.css'
import { ProductCard } from '@components/product'
import { ProductSlider } from '@components/product'
import type { Product } from '@commerce/types/product'
import Img from 'next/image'
import Image from 'next/image'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { Container } from '@components/ui'

interface HomeProps {
  products1: Product[]
  products2: Product[]
  data: []
}

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }
  const productsPromise = commerce.getAllProducts({
    variables: { bestSellingProducts: true },
    config,
    preview,
    // Saleor provider only
    ...({ featured: false } as any),
  })

  const featuredProducts = commerce.getAllProducts({
    variables: { featuredProducts: true },
    config,
    preview,
    // Saleor provider only
    ...({ featured: true } as any),
  })
  const res = await fetch('https://www.ystore.us/sleekshop/get_banner.php')
  const data = await res.json()
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const { products: products1 } = await productsPromise
  const { products: products2 } = await featuredProducts
  const { pages } = await pagesPromise
  const { categories, brands } = await siteInfoPromise

  return {
    props: {
      products1,
      products2,
      data,
      categories,
      brands,
      pages,
    },
    revalidate: 60,
  }
}

export default function Home({
  products1,
  products2,
  data,
  pages,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <ul id="customUL" className="SearchBrandList">
        {pages.map(({ node }: any) => (
          <>
            {node?.id && (
              <>
                <li key={node.id} className="SearchBrandItem">
                  <a className="SearchBrandLinks" href="">
                    {node.url + ' - ' + node.name}
                  </a>
                  <br />
                </li>
              </>
            )}
          </>
        ))}
      </ul>

      <ProductSlider viewCount={1}>
        {data.slice(0, 5).map((photo: any, index: number) => (
          <div key={photo.id} className="banner-display">
            <Img alt="The guitarist in the concert." src={photo.image} />
          </div>
        ))}
      </ProductSlider>

      <Container>
        <div className="pt-50">
          <Image
            src="https://cdn8.bigcommerce.com/s-hmhnh4h9/product_images/uploaded_images/topsellhdline.png"
            width="1143"
            height="23"
          ></Image>
          <div className="unbxd-view-all-button">
            <a
              href="https://www.sleekshop.com/top-selling-products"
              className="btn btn-info"
              role="button"
            >
              View All
            </a>
          </div>

          <ProductSlider viewCount={4}>
            {products1.slice(0, 10).map((product: any, i: number) => (
              <div key={product.id} className="ken_slide">
                <ProductCard product={product} variant="slim" />
              </div>
            ))}
          </ProductSlider>
        </div>
        <div className="pt-50">
          <Image
            src="https://cdn8.bigcommerce.com/s-hmhnh4h9/product_images/uploaded_images/recomendhdline.png"
            width="1143"
            height="23"
          ></Image>
          <div className="unbxd-view-all-button">
            <a
              href="https://www.sleekshop.com/top-selling-products"
              className="btn btn-info"
              role="button"
            >
              View All
            </a>
          </div>

          <ProductSlider viewCount={4}>
            {products2.slice(0, 10).map((product: any, i: number) => (
              <div key={product.id} className="ken_slide">
                <ProductCard product={product} variant="slim" />
              </div>
            ))}
          </ProductSlider>
        </div>
      </Container>
      <Container>
        <div className="pt-50 HomeInstagramWidget-Section">
          <h2 className="page-heading">
            <a
              href="https://www.instagram.com/sleekshop_com/"
              title="Sleekshop on Instagram"
            >
              @sleekshop_com
            </a>
          </h2>

          <iframe
            src="//lightwidget.com/widgets/5a82391a068b5b14b401c0f2994b3973.html"
            width="100%"
          ></iframe>
        </div>
      </Container>
    </>
  )
}

Home.Layout = Layout
