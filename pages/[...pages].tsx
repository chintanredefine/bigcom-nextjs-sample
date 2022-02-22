import type {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next'
import commerce from '@lib/api/commerce'
import { Text } from '@components/ui'
import { Layout } from '@components/common'
import getSlug from '@lib/get-slug'
import { missingLocaleInPages } from '@lib/usage-warns'
import type { Page } from '@commerce/types/page'
import { useRouter } from 'next/router'

import aboutusPageData from '@components/common/DummyPages/about_us'
import contactusPageData from '@components/common/DummyPages/contact_us'

export async function getStaticProps({
  preview,
  params,
  locale,
  locales,
}: GetStaticPropsContext<{ pages: string[] }>) {
  const config = { locale, locales }

  console.log('config ', config, preview, params)

  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const { pages } = await pagesPromise
  const { categories } = await siteInfoPromise
  const path = params?.pages.join('/')
  let s1 = `${path}`
  let p1 = s1.split('/')
  let p2 = p1[p1.length - 1].replace('.html', '')
  const slug = `${p2}`
  // const slug1 = `pages/${path}`
  console.log('pages ', pages)

  const pageItem = pages.find((p: Page) =>
    p.url ? changePath(p.url) === slug : false
  )

  console.log('slug', slug)
  // console.log('slug1', slug1)

  // console.log('pageItem 123456', pageItem)

  const data =
    pageItem &&
    (await commerce.getPage({
      variables: { id: pageItem.id! },
      config,
      preview,
    }))

  let page =
    (data?.page && data?.page.body.length > 50 && data?.page) ||
    (slug === 'about-us' && aboutusPageData) ||
    (slug === 'contact-us' && contactusPageData)

  if (!page) {
    // We throw to make sure this fails at build time as this is never expected to happen
    throw new Error(`Page with slug '${slug}' not found`)
  }

  return {
    props: { pages, page, categories },
    revalidate: 60 * 60, // Every hour
  }
}

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const config = { locales }
  const { pages }: { pages: Page[] } = await commerce.getAllPages({ config })
  const [invalidPaths, log] = missingLocaleInPages()
  const paths = pages
    .map((page: any) => page.url.replace('.html', ''))
    .filter((url) => {
      if (!url || !locales) return url
      // If there are locales, only include the pages that include one of the available locales
      if (locales.includes(getSlug(url).split('/')[0])) return url

      invalidPaths.push(url)
    })
  log()

  return {
    paths,
    fallback: 'blocking',
  }
}

export default function Pages({
  page,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()
  return router.isFallback ? (
    <h1>Loading...</h1> // TODO (BC) Add Skeleton Views
  ) : (
    <div className="py-20">{page?.body && <Text html={page.body} />}</div>
  )
}

function changePath(path: string) {
  let s1 = path
  let s2 = s1.split('/')
  let s3 = s2[s2.length - 1].replace('.html', '')
  // console.log(s3 + ' - ' + path)
  return s3
}

Pages.Layout = Layout
