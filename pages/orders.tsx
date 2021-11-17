import type { GetStaticPropsContext } from 'next'
import useCustomer from '@framework/customer/use-customer'
import { useEffect, useState } from 'react'
import Image from 'next/image'

import commerce from '@lib/api/commerce'
import { Bag } from '@components/icons'
import { Layout } from '@components/common'
// import style from '@assets/css/orders.module.css'

import ProfileHead from '@components/common/ProfileNavlink/profile_head'

// orderProducts.tsx

import OrderProducts from '@components/order/orderProducts'

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

  const [isActive, setisActive] = useState<boolean>(false)

  const [showProductOrdered, setshowProductOrdered] = useState<boolean>(false)
  const { data: customer } = useCustomer()

  useEffect(() => {
    const fetchData = async () => {
      let cid = customer?.entityId

      if (customer && customer?.entityId) {
        const res = fetch(
          'https://www.ystore.us/sleekshop/getOrders.php?customer_id=' + cid
        )
          .then((response) => response.json())
          .then((rs1) => {
            setVariants(rs1)
          })
        /*const {mdata} = await res.json()
            setVariants(mdata)
            console.log(mdata, res)
*/
      }
    }

    if (customer && customer?.entityId) {
      // console.log(customer + " - " + customer?.entityId)
      fetchData()
    }
  }, [customer])

  return (
    // <Container>
    //   <div className="container">
    <div className="account account--fixed">
      <h2 className="page-heading">My Orders</h2>
      <ProfileHead />
      <div className="account-body">
        <section className="account-content">
          <ul className="tabs" data-tab>
            <li className={`tab ${isActive && 'is-active'} `}>
              <a
                className="tab-title"
                // href="/productordered"
                href="#"
                title="Reorder Products"
                onClick={() => {
                  if (!showProductOrdered) {
                    setisActive(!isActive)
                    setshowProductOrdered(!showProductOrdered)
                  }
                }}
              >
                Products Ordered
              </a>
            </li>
            <li
              className={`tab ${!isActive && 'is-active'} `}
              id="skus-tab-heading"
            >
              <a
                className="tab-title"
                href="#"
                title="All Orders"
                onClick={() => {
                  if (showProductOrdered) {
                    setisActive(!isActive)
                    setshowProductOrdered(!showProductOrdered)
                  }
                }}
              >
                Order History
              </a>
            </li>
          </ul>
          <div className="tabs-contents">
            <div className="tab-content" id="tab-reorder">
              <div
                className="account-content account-content--fixedMedium"
                id="sk-reorder"
              >
                <ul className="account-list">
                  <template id="template-reorder-product">
                    <li
                      className="account-listItem"
                      data-sku="%SKU%"
                      data-processed="false"
                    >
                      <form action="#" method="GET">
                        <div className="account-product account-product--alignMiddle">
                          <figure className="account-product-figure">
                            <span className="purchased-title">
                              Last Purchased
                            </span>
                            <span className="purchased-date"></span>
                          </figure>
                        </div>
                      </form>
                    </li>
                  </template>
                </ul>
              </div>
            </div>
            <div className="tab-content is-active" id="tab-orders">
              {!showProductOrdered ? (
                <ul className="account-list">
                  {Array.isArray(adata) && adata.length > 0 ? (
                    <>
                      {adata.map((order: any) => {
                        return (
                          <li className="account-listItem">
                            <div className="account-product">
                              <div className="account-product-figure">
                                <Image
                                  width="100"
                                  height="100"
                                  src={order?.productImage}
                                  alt="image not found"
                                ></Image>
                              </div>
                              <div className="account-product-body">
                                <div className="account-orderStatus">
                                  <h6 className="account-orderStatus-label">
                                    {order.orderStatus}
                                  </h6>
                                </div>

                                <h5 className="account-product-title">
                                  <a href="javascript:void(0)">
                                    Order #{order.orderId}
                                  </a>
                                </h5>
                                <p className="account-product-description">
                                  {order.productCnt} product totaling $
                                  {order.orderTotal}
                                </p>
                                <div className="account-product-details">
                                  <div className="account-product-detail">
                                    <h6 className="account-product-detail-heading">
                                      Order Placed
                                    </h6>
                                    <span>{order.dateCreated}</span>
                                  </div>
                                  <div className="account-product-detail">
                                    <h6 className="account-product-detail-heading">
                                      Last Update
                                    </h6>
                                    <span>{order.dateUpdated}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        )
                      })}
                    </>
                  ) : (
                    <>
                      <div className="flex-1 p-24 flex flex-col justify-center items-center ">
                        <span className="border border-dashed border-secondary rounded-full flex items-center justify-center w-16 h-16 p-12 bg-primary text-primary">
                          <Bag className="absolute" />
                        </span>
                        <h2 className="pt-6 text-2xl font-bold tracking-wide text-center">
                          No Orders found
                        </h2>
                      </div>
                    </>
                  )}
                </ul>
              ) : (
                <OrderProducts />
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

Orders.Layout = Layout
