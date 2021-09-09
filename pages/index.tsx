import commerce from '@lib/api/commerce'
import s from './index.module.css'
import Link from 'next/link'
import loadable from "@loadable/component"
import { Layout } from '@components/common'
import { ProductCard } from '@components/product'
import { Grid, Marquee, Hero } from '@components/ui'
// import HomeAllProductsGrid from '@components/common/HomeAllProductsGrid'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

interface Link {
  href: string
  label: string
  target: string
  rel: string
  title: string
}

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }
  const productsPromise = commerce.getAllProducts({
    variables: { first: 6 },
    config,
    preview,
    // Saleor provider only
    ...({ featured: true } as any),
  })
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const { products } = await productsPromise
  const { pages } = await pagesPromise
  const { categories, brands } = await siteInfoPromise

const MyFrame = loadable(() => import("./MyFrame"), {
  fallback: <div>Loading...</div>
});

  return {
    props: {
      products,
      categories,
      brands,
      pages,
    },
    revalidate: 60,
  }
}

export default function Home({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Grid variant="filled">
        {products.slice(0, 10).map((product: any, i: number) => (
          <ProductCard
            key={product.id}
            product={product}
            imgProps={{
              width: i === 0 ? 1080 : 540,
              height: i === 0 ? 1080 : 540,
            }}
          />
        ))}
      </Grid>
      <Marquee variant="secondary">
        {products.slice(0, 10).map((product: any, i: number) => (
          <ProductCard key={product.id} product={product} variant="slim" />
        ))}
      </Marquee>
      <Hero
        headline="Headline Here"
        description="This is the details section under main headline section. You can add the text over here. Soufflé bonbon caramels jelly beans."
      />

      <Grid layout="B" variant="filled">
        {products.slice(0, 3).map((product: any, i: number) => (
          <ProductCard
            key={product.id}
            product={product}
            imgProps={{
              width: i === 0 ? 1080 : 540,
              height: i === 0 ? 1080 : 540,
            }}
          />
        ))}
      </Grid>
      <Marquee>
        {products.slice(3).map((product: any, i: number) => (
          <ProductCard key={product.id} product={product} variant="slim" />
        ))}
      </Marquee>
      <div className={s.HomeInstagramWidgetSection}>
        <h2 className={s.pageheading}>
          <a href="https://www.instagram.com/sleekshop_com/" target="_blank" rel="nofollow" title="Sleekshop on Instagram">@sleekshop_com</a>
        </h2>
        <MyFrame src="//lightwidget.com/widgets/5a82391a068b5b14b401c0f2994b3973.html" width="" height="" style="width: 100%; border: 0; overflow: hidden;" myid="lightwidget-widget" allowtransparency="allowtransparency" />
      </div>
      {/* <HomeAllProductsGrid
        newestProducts={products}
        categories={categories}
        brands={brands}
      /> */}
    </>
  )
}

Home.Layout = Layout
