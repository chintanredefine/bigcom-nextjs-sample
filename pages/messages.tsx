import type { GetStaticPropsContext } from 'next'
import useCustomer from '@framework/customer/use-customer'
import { useEffect, useState } from 'react'

import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'

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
  //    const [adata, setVariants] = useState<string[]>([])
  const [adata, setVariants] = useState<string[]>([])
  const { data: customer } = useCustomer()

  let [formData, setformData] = useState({
    message_order_id: '',
    message_subject: '',
    message_content: '',
  })

  useEffect(() => {
    const fetchData = async () => {
      //console.log(data)
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

  const handleSendMessage = (newMessage: any) => {
    console.log('formdata', newMessage)

    fetch('https://www.ystore.us/sleekshop/sendMessage.php', {
      // Adding method type
      method: 'POST',

      // Adding body or contents to send
      body: JSON.stringify({
        newMessage,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          console.log('message send successfully ', res)
        }
      })
  }

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
                onChange={(e) => {
                  setformData({ ...formData, message_order_id: e.target.value })
                }}
              >
                {Array.isArray(adata) && adata.length > 0 && (
                  <>
                    {adata.map((order: any) => {
                      return (
                        <option value={order.orderId}>
                          Order #{order.orderId} - Placed on {order.dateCreated}
                          for $ {order.orderTotal}
                        </option>
                      )
                    })}
                  </>
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
                onChange={(e) => {
                  setformData({ ...formData, message_subject: e.target.value })
                }}
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
                onChange={(e) => {
                  setformData({ ...formData, message_content: e.target.value })
                }}
              ></textarea>
            </div>

            <button
              type="submit"
              className="button secondary button--small"
              onClick={() => handleSendMessage(formData)}
            >
              Send Message
            </button>
          </section>
        </div>
      </div>
    </div>
  )
}

Orders.Layout = Layout
