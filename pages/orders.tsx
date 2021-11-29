import type { GetStaticPropsContext } from 'next'
import useCustomer from '@framework/customer/use-customer'
import { useEffect, useState } from 'react'

import commerce from '@lib/api/commerce'
import { Bag } from '@components/icons'
import { Layout } from '@components/common'

import ProfileHead from '@components/common/ProfileNavlink/profile_head'
import { useUI, Container } from '@components/ui'

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

export default function Orders() {
  const [adata, setVariants] = useState<string[]>([])

  const { data: customer } = useCustomer()

  const { openModal, setModalView } = useUI()

  useEffect(() => {
    let cid = customer?.entityId
    if (customer && customer?.entityId) {
      fetch('https://www.ystore.us/sleekshop/getOrders.php?customer_id=' + cid)
        .then((response) => response.json())
        .then((rs1) => {
          setVariants(rs1)
        })
    }
  }, [customer])

  return (
    <>
      <main className="fit" style={{ minHeight: '800px' }}>
        <Container>
          <div style={{ display: 'flex', marginTop: '1%' }}>
            <ProfileHead />

            {/* <!-- ---------------------------- component buy it again ---------------------------- --> */}
            <div className="MainContentInnerdiv mb-2">
              {/* <!-- title of the Buy It Again Page  --> */}
              <div className="mainContentChild d-flex justify-content-between">
                <div className="Heading">Buy It Again</div>
                <div className="Heading">6 Items</div>
              </div>

              {/* <!-- product list  --> */}
              <div className="d-flex justify-content-between row">
                <div className="productCard">
                  <div className="productCardImgParent">
                    <img
                      className="ProductImg"
                      src="./images/image_033.webp"
                      alt=""
                    />
                  </div>
                  <div className="Product-Model-Parent">
                    <p className="Product-Model">SKU: 16025</p>
                  </div>
                  <div>
                    <p className="Product-Name">
                      American Crew Defining Paste - medium hold with low shine
                    </p>
                  </div>
                  <div>
                    <p className="Product-brand">Expresso</p>
                  </div>
                  <div>
                    <p className="Product-price">$ 15.99</p>
                  </div>
                </div>
                {/* <!-- end product list  --> */}
              </div>
            </div>
            {/* <!-- ---------------------------- component buy it again ---------------------------- --> */}
          </div>
        </Container>
      </main>
    </>
  )
}

Orders.Layout = Layout
