import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

import commerce from '@lib/api/commerce'
import useCustomer from '@framework/customer/use-customer'
import { useCommerce } from '@commerce'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Bag } from '@components/icons'
import { Layout } from '@components/common'
import { Container, Text } from '@components/ui'
import ProfileHead from '@components/common/ProfileNavlink/profile_head'

import EditAddressCompo from '@components/ShippingAddress/edit_shipping_address'
import AddAddressCompo from '@components/ShippingAddress/add_address'

import Cookies from 'js-cookie'

import style from '@assets/css/addresses.module.css'

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

export default function Orders({}: InferGetStaticPropsType<
  typeof getStaticProps
>) {
  const [addressData, setaddressData] = useState<string[]>([])
  const [FormData, setFormData] = useState<string[]>([])
  const [showEditAddressCompo, setshowEditAddressCompo] = useState(false)
  const [showAddAddressCompo, setshowAddAddressCompo] = useState(false)

  // const [fetchAgain, setfetchAgain] = useState(null)

  // const { data, isLoading, isEmpty } = useAddresses({ })

  const { data: customer } = useCustomer()

  // listing of all admin or users inside address tab
  useEffect(() => {
    let cid = customer?.entityId

    if (cid) {
      ;(() => {
        // console.log('fresh started fetching.... >>>> ', fetchAgain)
        fetch(
          'https://www.redefinesolutions.com/sleekshop/getAddresses.php?customer_id=' +
            cid
        )
          .then((response) => response.json())
          .then((rs1) => {
            setaddressData(rs1)
          })
      })()
    }
  }, [customer, showEditAddressCompo, showAddAddressCompo])

  return (
    <>
      <div className="account account--fixed">
        <h2 className="page-heading">Addresses</h2>
        <ProfileHead />
        <div>
          <ul className={`flex justify-center items-center ${style.ulParen}`}>
            {Array.isArray(addressData) && addressData.length > 0 ? (
              <>
                {addressData.map((item: any) => {
                  return (
                    <li key={item.id} className={`${style.panelbodyCo} `}>
                      <div className="panel panel--address">
                        <div className={`${style.panelbody} panel-body`}>
                          <h5 className="address-title">
                            {item?.first_name} {item?.last_name}
                          </h5>
                          <ul
                            className="address-details address-details--postal"
                            style={{ height: '120px' }}
                          >
                            <li>{item?.company}</li>
                            <li>{item?.street_1}</li>
                            <li>{item?.street_2}</li>
                            <li>
                              {item?.city}, {item?.state} {item?.zip}
                            </li>
                            <li>{item?.country}</li>
                          </ul>
                          <dl className="address-details">
                            <dt className="address-label">Phone:</dt>
                            <dd className="address-description">
                              {item?.phone}
                            </dd>
                          </dl>
                          <div className="form-actions">
                            <a
                              className="button button--primary button--small"
                              href="#editAddressForm"
                              onClick={() => {
                                setFormData(item)
                                setshowEditAddressCompo(true)
                                setshowAddAddressCompo(false)
                              }}
                            >
                              Edit
                            </a>
                            <button
                              type="submit"
                              className="button secondary button--small"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </>
            ) : (
              <div className="flex-1 flex flex-col justify-center items-center">
                <h1 className={`p-20`}>LOADING ...</h1>
              </div>
            )}

            <li className="address">
              <a
                className="panel panel--address panel--newAddress"
                href="#addAddressForm"
                onClick={() => {
                  setshowAddAddressCompo(true)
                  setshowEditAddressCompo(false)
                }}
              >
                <span className="panel-body">
                  <span className="address-addNew">
                    <span className="address-symbol">+</span>
                    <h5 className="address-title">New Address</h5>
                  </span>
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      {showEditAddressCompo ? (
        <EditAddressCompo
          setshowEditAddressCompo={setshowEditAddressCompo}
          FormData={FormData}
        />
      ) : (
        showAddAddressCompo && (
          <AddAddressCompo setshowAddAddressCompo={setshowAddAddressCompo} />
        )
      )}
    </>
  )
}

Orders.Layout = Layout
