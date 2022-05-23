import type {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next'
import { useRouter } from 'next/router'
import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import { ProductView } from '@components/product'
import getConfig from "next/config";
import React, { useState, useEffect } from "react"

const { publicRuntimeConfig } = getConfig()
export async function getStaticProps({
  params,
  locale,
  locales,
  preview,
}: GetStaticPropsContext<{ slug: string }>) {
  const config = { locale, locales }
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  let slg = 'products/' + params!.slug + '.html'
  const productPromise = commerce.getProduct({
    variables: { slug: slg },
    config,
    preview,
  })

  const allProductsPromise = commerce.getAllProducts({
    variables: { first: 4 },
    config,
    preview,
  })
  const { pages } = await pagesPromise
  const { categories } = await siteInfoPromise
  const { product } = await productPromise
  const { products: relatedProducts } = await allProductsPromise

  if (!product) {
    throw new Error(`Product with slug '${params!.slug}' not found`)
  }

  return {
    props: {
      pages,
      product,
      relatedProducts,
      categories,
    },
    revalidate: 200,
  }
}

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const { products } = await commerce.getAllProductPaths()

  return {
    paths: locales
      ? locales.reduce<string[]>((arr, locale) => {
        // Add a product path for every locale
        products.forEach((product: any) => {
          let p = product.path.replace('.html', '')
          arr.push(`/${locale}${p}`)
        })
        return arr
      }, [])
      : products.map((product: any) => product.path.replace('.html', '')),
    fallback: 'blocking',
  }
}

export default function Slug({
  product,
  relatedProducts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()
  const [sku, setSku] = useState<string>('')
  const [result, setResult] = useState<string>('')
  const [variants, setVariants] = useState<string>('')
  const [reviews, setReviews] = useState<string>('')
  const [ratings, setRatings] = useState<string>('')

  useEffect(() => {
    console.log("this is Product page component , ");

    if (!sku) {
      let skusearch = window.location.search
      let psku = skusearch.replace("?sku=", "")
      setSku(psku)
    }

    let pid = product ? product.id : ''
    if (pid) {

      fetch(`${publicRuntimeConfig.BASE_URL}/api/catalog/variants?id=${pid}`)
        .then(response => response.json())
        .then(response => setVariants(response))
        .catch(error => setVariants(error));

      if (sku) {
        fetch(`${publicRuntimeConfig.BASE_URL}/api/catalog/variant?id=${pid}&sku=${sku}`)
          .then(response => response.json())
          .then(response => setResult(response))
          .catch(error => setResult(error));
      } else {
        fetch(`${publicRuntimeConfig.BASE_URL}/api/catalog/variants?id=${pid}`)
          .then(response => response.json())
          .then(response => setResult(response))
          .catch(error => setResult(error));
      }

      fetch(`${publicRuntimeConfig.BASE_URL}/api/catalog/getReviews?id=${pid}`)
        .then(response => response.json())
        .then(response => setReviews(response))
        .catch(error => setReviews(error));

      let pUrl = product ? product.path : ''
      if (pUrl && sku) {
        pUrl = pUrl.replace('.html', '')
        router.push(`${pUrl}?sku=${sku}`)
      }
    }
  }, [sku])

  const skuChange = (testSku: string) => {
    setSku(testSku)
  }

  return router.isFallback ? (
    <h1>Loading...</h1>
  ) : (
    // <ProductView product={product} relatedProducts={relatedProducts} variants={variants} currentVariant={result} skuChange={skuChange} reviews={reviews} ratings={ratings} />
    <></>
  )
}

Slug.Layout = Layout
