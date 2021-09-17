import type { GetStaticPropsContext } from 'next'
import useCustomer from '@framework/customer/use-customer'
import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import { Container, Text } from '@components/ui'

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

export default function Profile() {
  const { data } = useCustomer()
  return (
    <Container>
      <div id="mainpagecontent">PLEASE INSERT DYNAMIC DATA HERE - CATEGORY/SUB-CATEGORY/PRODUCT/SEARCH</div>
      <script type="text/javascript"src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/3.0.3/handlebars.js"></script>  
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<link href="//libraries.unbxdapi.com/search-sdk/v2.0.1/vanillaSearch.min.css" rel="stylesheet">
<script src="//libraries.unbxdapi.com/search-sdk/v2.0.1/vanillaSearch.min.js"></script>
<script type="text/javascript" src="https://libraries.unbxdapi.com/unbxdAutosuggest_v1.js"> </script>
<script src="//sandbox.unbxd.io/sleekhair_mybigcommerce_stage_autosuggest.css"></script>
<script src="//sandbox.unbxd.io/sleekhair_mybigcommerce_stage_autosuggest.js"></script>
<script src="//sandbox.unbxd.io/sleekhair_mybigcommerce_stage_search.css"></script>
<script src="//sandbox.unbxd.io/sleekhair_mybigcommerce_stage_search.js"></script>
    </Container>
  )
}

Profile.Layout = Layout
