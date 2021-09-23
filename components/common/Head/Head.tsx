import { FC } from 'react'
import NextHead from 'next/head'
import { DefaultSeo } from 'next-seo'
import config from '@config/seo.json'
import { useRouter } from 'next/router'

const Head: FC = () => {
  const router = useRouter()
  return (
    <>
      <DefaultSeo {...config} />
      <NextHead>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/site.webmanifest" key="site-manifest" />
        {router.pathname == "/demo-header-footer"  &&
              <>
              <script type="text/javascript"src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/3.0.3/handlebars.js"></script>  
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
      <link href="//libraries.unbxdapi.com/search-sdk/v2.0.1/vanillaSearch.min.css" rel="stylesheet"/>
      <script src="//libraries.unbxdapi.com/search-sdk/v2.0.1/vanillaSearch.min.js"></script>
      <script type="text/javascript" src="https://libraries.unbxdapi.com/unbxdAutosuggest_v1.js"> </script>
      <script src="//sandbox.unbxd.io/sleekhair_mybigcommerce_stage_autosuggest.css"></script>
      <script src="//sandbox.unbxd.io/sleekhair_mybigcommerce_stage_autosuggest.js"></script>
      <script src="//sandbox.unbxd.io/sleekhair_mybigcommerce_stage_search.css"></script>
      <script src="//sandbox.unbxd.io/sleekhair_mybigcommerce_stage_search.js"></script>
          </>
            }
      </NextHead>
    </>
  )
}

export default Head
