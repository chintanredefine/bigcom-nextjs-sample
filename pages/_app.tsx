import '@assets/main.css'
import '@assets/chrome-bug.css'
import 'keen-slider/keen-slider.min.css'
import '@assets/common.css'
import '@assets/orders.css'

import { FC, useEffect } from 'react'
import type { AppProps } from 'next/app'
import { Head } from '@components/common'
import { ManagedUIContext } from '@components/ui/context'
import { useRouter } from 'next/router'

const Noop: FC = ({ children }) => <>{children}</>

export default function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop
  const router = useRouter()

  useEffect(() => {
    document.body.classList?.remove('loading')
  }, [])

  useEffect(() => {
    let catchRoute = '/search/products/'

    if (router.asPath.includes(catchRoute)) {
      let requiredRoute = router?.asPath?.replace('search/', '')

      router.push(requiredRoute)
      // console.log(
      //   'current Route ck 223344',
      //   router,
      //   'requiredRoute',
      //   requiredRoute
      // )
    }
  }, [router])

  return (
    <>
      <Head />
      <ManagedUIContext>
        <Layout pageProps={pageProps}>
          <Component {...pageProps} />
        </Layout>
      </ManagedUIContext>
    </>
  )
}
