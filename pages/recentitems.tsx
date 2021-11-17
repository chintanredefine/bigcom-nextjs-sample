import ProfileHead from '@components/common/ProfileNavlink/profile_head'
import { Layout } from '@components/common'
import type { GetStaticPropsContext } from 'next'
import commerce from '@lib/api/commerce'

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const { pages } = await pagesPromise
  const { categories } = await siteInfoPromise

  return {
    props: { pages, categories },
  }
}

export default function RecentItems() {
  return (
    <div className="account account--fixed">
      <h2 className="page-heading">Recent Items</h2>
      <ProfileHead />
      <div className="flex-1 p-24 flex flex-col justify-center items-center">
        This is recent items page "We are working on this page " so come on this
        later on
      </div>
    </div>
  )
}

RecentItems.Layout = Layout
