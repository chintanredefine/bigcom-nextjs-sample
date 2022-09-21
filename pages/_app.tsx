import '@assets/main.css'
import '@assets/chrome-bug.css'
import 'keen-slider/keen-slider.min.css'
import '@assets/common.css'
import '@assets/orders.css'
import '@assets/css/newfonts.css'
import '@assets/css/dummypage.css'

import { FC, useEffect } from 'react'
import type { AppProps } from 'next/app'
import { Head } from '@components/common'
import { ManagedUIContext } from '@components/ui/context'
import { useRouter } from 'next/router'
import Script from 'next/script'
import getConfig from 'next/config'

const Noop: FC = ({ children }) => <>{children}</>

export default function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop
  const router = useRouter()
  const { publicRuntimeConfig } = getConfig()

  useEffect(() => {
    document.body.classList?.remove('loading')
  }, [])

  return (
    <>
       <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            var UnbxdSiteName = "${publicRuntimeConfig.UNBXD_SITENAME}";
            var UnbxdApiKey = "${publicRuntimeConfig.UNBXD_APIKEY}";
            var a=document.createElement("script");
            a.type="text/javascript";
            a.id="unbxdScript";
            a.async=true;
            a.src="//d21gpk1vhmjuf5.cloudfront.net/unbxdAnalytics.js";
            (document.getElementsByTagName("head")[0]||document.getElementsByTagName("body")[0]).appendChild(a)
          `,
        }}
      />       

      <Head />
      <ManagedUIContext>
        <Layout pageProps={pageProps}>
          <Component {...pageProps} />
        </Layout>
      </ManagedUIContext>
    </>
  )
}
