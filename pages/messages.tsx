import type { GetStaticPropsContext } from 'next'
import useCustomer from '@framework/customer/use-customer'
import { useEffect, useState } from 'react'
import Image, { ImageProps } from 'next/image'

import commerce from '@lib/api/commerce'
import { Bag } from '@components/icons'
import { Layout } from '@components/common'
import { Container, Text } from '@components/ui'

import ProfileHead from '@components/common/ProfileNavlink/profile_head'

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
      }
    }

    if (customer && customer?.entityId) {
      fetchData()
    }
  }, [customer])

  return (
    <div className="account account--fixed">
      <h2 className="page-heading">Message</h2>
      <ProfileHead />
      <div className="flex-1 p-24 flex flex-col justify-center items-center">
        <div className="account-body">
          <section className="account-content">
            <h3>Send a Message</h3>
            <div className="form-field form-field--select">
              <label className="form-label">
                Order:
                <small>Required</small>
              </label>
              <select
                className="form-select"
                name="message_order_id"
                id="message_order_id"
              >
                {Array.isArray(adata) && adata.length > 0 ? (
                  <>
                    {adata.map((order: any) => {
                      return (
                        <option value={order.orderId}>
                          Order #{order.orderId} - Placed on {order.dateCreated}{' '}
                          for ${order.orderTotal}
                        </option>
                      )
                    })}
                  </>
                ) : (
                  ''
                )}
              </select>
            </div>

            <div className="form-field form-field--input form-field--inputText">
              <label className="form-label">
                Subject
                <small>Required</small>
              </label>
              <input
                type="text"
                className="form-input"
                name="message_subject"
                id="message_subject"
              />
            </div>

            <div className="form-field form-field--textarea">
              <label className="form-label">
                Message
                <small>Required</small>
              </label>

              <textarea
                className="form-input"
                name="message_content"
                id="message_content"
                rows={7}
              ></textarea>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

Orders.Layout = Layout
