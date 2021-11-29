import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

import commerce from '@lib/api/commerce'
import useCustomer from '@framework/customer/use-customer'
import { useEffect, useState } from 'react'
import { Layout } from '@components/common'
import ProfileHead from '@components/common/ProfileNavlink/profile_head'

import EditAddressCompo from '@components/ShippingAddress/edit_shipping_address'
import AddAddressCompo from '@components/ShippingAddress/add_address'

import { Container, useUI } from '@components/ui'

import '@assets/css/addresses.module.css'

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
  const [refresh, setrefresh] = useState(false)

  const { data: customer } = useCustomer()
  const { openModal, setModalView } = useUI()

  // listing of all admin or users inside address tab
  useEffect(() => {
    let cid = customer?.entityId

    if (customer && customer?.entityId) {
      fetch(
        'https://www.ystore.us/sleekshop/getAddresses.php?customer_id=' + cid
      )
        .then((response) => response.json())
        .then((rs1) => {
          setaddressData(rs1)
        })
    }
    // else {
    //   setModalView('LOGIN_VIEW')
    //   return openModal()
    // }
  }, [customer, showEditAddressCompo, showAddAddressCompo, refresh])

  const handleDeleteAddress = (address_id: any) => {
    fetch('https://www.ystore.us/sleekshop/deleteAddress.php', {
      // Adding method type
      method: 'POST',

      // Adding body or contents to send
      body: JSON.stringify({
        address_id,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setrefresh(!refresh)
        }
      })
  }

  return (
    <>
      <main className="fit" style={{ minHeight: '800px' }}>
        <Container>
          <div style={{ display: 'flex', marginTop: '1%' }}>
            {/* <div className="container">
            <div className="row p-t-70"> */}
            <ProfileHead />
            {/* <div>
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
                                onClick={() => handleDeleteAddress(item.id)}
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
          </div> */}

            <div className="right-side-content">
              {/* <!-- right side div --> */}
              {/* <div className="MainContentParent"> */}
              {/* <!-- ---------------------------- component order history ---------------------------- --> */}
              <div className="MainContentInnerdiv mb-2 orderHistory d-flex justify-content-between">
                <div>
                  <p className="Heading">Order Details</p>
                  <p className="subHeading">Thanks For Your Order</p>
                </div>
                <div>
                  <p className="subHeading">
                    <span className="Heading"> Oder Id : </span>o3u49873
                  </p>
                  <p className="subHeading">
                    <span className="Heading"> Order Data :</span> 25/11/2021
                  </p>
                </div>
              </div>
              {/* <!-- ---------------------------- component order history ---------------------------- --> */}

              {/* <!-- ---------------------------- component BillingShipping ---------------------------- --> */}
              <div className="MainContentInnerdiv mb-2 BillingShipping d-flex justify-content-between">
                <div className="Billing">
                  <p className="BillingHeading Heading">Billing</p>
                  <p className="subHeading">Kanh Nguyen</p>
                  <p className="subHeading">14251 Chamber rd.</p>
                  <p className="subHeading">Tustin, CA 92780</p>
                </div>
                <div className="Shipping">
                  <p className="BillingHeading Heading">Shipping</p>
                  <p className="subHeading">Kanh Nguyen</p>
                  <p className="subHeading">14251 Chamber rd.</p>
                  <p className="subHeading">Tustin, CA 92780</p>
                </div>
              </div>
              {/* <!-- ---------------------------- component order history ---------------------------- --> */}

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
                        American Crew Defining Paste - medium hold with low
                        shine
                      </p>
                    </div>
                    <div>
                      <p className="Product-brand">Expresso</p>
                    </div>
                    <div>
                      <p className="Product-price">$ 15.99</p>
                    </div>
                  </div>
                  <div className="productCard"></div>
                  {/* <div className="productCard"></div>
                  <div className="productCard"></div>
                  <div className="productCard"></div>
                  <div className="productCard"></div>
                  <div className="productCard"></div>
                  <div className="productCard"></div>
                  <div className="productCard"></div>
                  <div className="productCard"></div>
                  <div className="productCard"></div>
                  <div className="productCard"></div>
                  <div className="productCard"></div>
                  <div className="productCard"></div>
                  <div className="productCard"></div> */}
                </div>
              </div>
              {/* <!-- ---------------------------- component buy it again ---------------------------- --> */}

              {/* <!-- ---------------------------- component Shipment ---------------------------- --> */}
              <div className="MainContentInnerdiv mb-2 BillingShipping d-flex justify-content-between">
                <div className="Billing subHeading">
                  <p className="BillingHeading Heading mb-2 shipement-p">
                    Shipment
                  </p>
                  <p>Shipping method : Standard</p>
                  <p>Shipping data : nov 25 2021</p>
                  <p>Tracking # : 485098495884598</p>
                  <p>Career : USPC</p>
                </div>
                <div
                  className="
                    Shipping
                    subHeading
                    trackOrderParent
                    d-flex
                    justify-content-around
                    align-items-center
                  "
                >
                  <button className="ButtonTrackOrder">TRACK ORDER</button>
                </div>
              </div>
              {/* <!-- ---------------------------- component Shipment---------------------------- --> */}

              {/* <!-- ---------------------------- component order card ---------------------------- --> */}
              <div className="MainContentInnerdiv mb-2 orderHistory d-flex justify-content-between">
                <div>
                  <p className="Heading">Payment Details</p>
                  <p className="subHeading d-flex align-items-center">
                    <img
                      className="cardImg"
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAclBMVEX///8AAADo6Ojc3NwaGhp0dHTX19e1tbWwsLDv7+9ZWVmWlpYjIyMwMDD19fX6+vrR0dFkZGQTExM+Pj6Ghoaenp52dnYNDQ0pKSnHx8dWVlY4ODioqKjExMR+fn7h4eFERERMTEyOjo5oaGiCgoIXFxdidBdzAAAEDklEQVR4nO2d7XqiMBBGKREQVFCKIEJpRff+b3Ht2iYBscTKGia8519R+8wpMPmQzlgWAAAAAAAAAAAAAAAAAAAAAAAoEoU+c8cK88PoETefeafD7mXc7A4nj/m/8YzyZK87emX2SX6vI6uLWHfYdxEXNbvDb11luiP+BVm1VvTznaXuYH/JLvVV/EqK5++brOx1ZBvdQT7I8f1nwflMd4QPM5v/4BdtdYc3CNubI0fkXL05K4Lay5k9Tlju1UFxnTecG4r2sfXGpVO6Yd+Nq53QLa+Sv9OZb6K0fbIJ6F0I3fbtVXWcxdYl+lpS0bsQlq99F2rzr1D15NwR8l41r8D263P51V2uI8SHyRvrIK/5oi8npM09c9gx0ZiuZI1sE8o34eaRRaVeIlnRkTNJKb2Q0BU8KyaSSSmOh9IFfKSVQ9uE0qC+Eiq1OBrQFjwrBkKm/j7IVkKbapIRdNkshPWb1uCG4U3oLC5HbCF91BvbQIiEurL/HRCD/crVHNswuOKUXdaKH9d3JnFE5vz4/NEV24a23sAGw+ZG8edVKabcle7IBkNMwreNVRPN+XYXOXc6r6Lsgg/2KpuNNPD5sF/Y1lo+ocYgbr21NFZ4/R8kgyeNF3wyvqO3rL/NO19LJGIC8EF9zi0T8kF+Y/ENnEB3VIPCU82rxbcaT7qDGpTTt9bS4hs0C91BDQpfL2UWTzpl/8cIIYYLYRikjjmk+w5D+t+ryQgbYUj1q+1uhA0MqQJD+sCQPjCkDwzpA0P6wJA+0zScvczMIetaAW+ZSXTt05i0qS9v68OQKjCkDwzpA0P6wJA+MKQPDOkDQ/rAkD4wpA8M6QND+sDwC1+FcT48rWh43Ae97Mf55K2ioVIVLOf54SugaLjqMmqTPj98BWD4BQxhqBEYfqH0eAbp0WK7UGCcsz3MS+kDQ/rAkD4wpI+ioTvcs4LP3utQnbVlAz3u+WepWuL3yYZKM28lMuMNYxjCEIYw/O+GY82lw/2TyVgNy/lgPLtQGual9IEhfWBIHxjSx3zDeYehSYUhG7W+zK/XZn7NPfPrJppf+5KfTmPrl5pfg9b8OsJm1oLmhSELewL1vM2vyT6Buvrm90aYQH8L83uUmN9nZgK9gszv92T5xvfsMrTvmtxU1sjeeWnjajS+/6G8oHoxs4flBPqQTqCXrFn9gNPObOmb3tO5sy93XATJqPtyJ0ERX0V9qy/3BHqrn5nT7+Mxm//gZ7UGTYoce6crfnl9XdMhLlW2RP2UaknhXaq65buusv5fNzqy6p6H51jdkYTHTFzU964XojzZ9//ikbBP8t8s+SKfeaeDUtUBjewOJ4/5jyxpozBk7lhhYUh3uQ4AAAAAAAAAAAAAAAAAAAAAeDp/AZk4bngcGPyAAAAAAElFTkSuQmCC"
                      alt=""
                    />
                    <span className="ml-2"> Visa </span>
                  </p>
                </div>
              </div>
              {/* <!-- ---------------------------- component order card ---------------------------- --> */}

              {/* <!-- ---------------------------- component order total ---------------------------- --> */}
              <div className="MainContentInnerdiv mb-2 orderHistory">
                <p className="Heading mb-4">Order Total</p>
                <div className="d-flex justify-content-between mb-2">
                  <div>Subtotal :</div>
                  <div>$ 150.00</div>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-2">
                  <div>Coupon :</div>
                  <div>$ 150.00</div>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-2">
                  <div>Shipping :</div>
                  <div>$ 150.00</div>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-2">
                  <div>Sales Tax :</div>
                  <div>$ 150.00</div>
                </div>
                <hr />
                <div className="Heading-grandTotal d-flex justify-content-between mb-2 mt-3">
                  <div>Grand Total :</div>
                  <div>$ 150.00</div>
                </div>
              </div>
              {/* <!-- ---------------------------- component order total ---------------------------- --> */}

              {/* <!-- ---------------------------- component View Orders ---------------------------- --> */}
              <div className="MainContentInnerdiv mb-2 orderHistory ViewOrderGparent">
                <div className="d-flex justify-content-between">
                  <div>
                    <p className="subHeading">
                      <span className="Heading"> Oder Id : </span>o3u49873
                    </p>
                    <p className="subHeading">
                      <span className="Heading"> Order Data :</span> 25/11/2021
                    </p>
                  </div>
                  <div className="trackOrderParent d-flex justify-content-around align-items-center">
                    <p className="subHeading">
                      <span className="Heading">Grand Total :</span> $ 134.00
                    </p>
                  </div>
                </div>

                <div className="OHIGPC">
                  <div className="d-flex OrderHistoryImagesContainer">
                    <div className="HistoryImagesCo">
                      <img
                        className="imgOrderHistory"
                        src="./images/image_033.webp"
                        alt=""
                      />
                    </div>
                    <div className="HistoryImagesCo">
                      <img
                        className="imgOrderHistory"
                        src="./images/image_033.webp"
                        alt=""
                      />
                    </div>
                    <div className="HistoryImagesCo">
                      <img
                        className="imgOrderHistory"
                        src="./images/image_033.webp"
                        alt=""
                      />
                    </div>
                    <div className="HistoryImagesCo">
                      <img
                        className="imgOrderHistory"
                        src="./images/image_033.webp"
                        alt=""
                      />
                    </div>
                    <div className="HistoryImagesCo">
                      <img
                        className="imgOrderHistory"
                        src="./images/image_033.webp"
                        alt=""
                      />
                    </div>
                    <div className="HistoryImagesCo">
                      <img
                        className="imgOrderHistory"
                        src="./images/image_033.webp"
                        alt=""
                      />
                    </div>
                    <div className="HistoryImagesCo">
                      <img
                        className="imgOrderHistory"
                        src="./images/image_033.webp"
                        alt=""
                      />
                    </div>
                    <div className="HistoryImagesCo">
                      <img
                        className="imgOrderHistory"
                        src="./images/image_033.webp"
                        alt=""
                      />
                    </div>
                    <div className="HistoryImagesCo">
                      <img
                        className="imgOrderHistory"
                        src="./images/image_033.webp"
                        alt=""
                      />
                    </div>
                    <div className="HistoryImagesCo">
                      <img
                        className="imgOrderHistory"
                        src="./images/image_033.webp"
                        alt=""
                      />
                    </div>
                    <div className="HistoryImagesCo">
                      <img
                        className="imgOrderHistory"
                        src="./images/image_033.webp"
                        alt=""
                      />
                    </div>
                    <div className="HistoryImagesCo">
                      <img
                        className="imgOrderHistory"
                        src="./images/image_033.webp"
                        alt=""
                      />
                    </div>
                  </div>
                </div>

                <div
                  className="
                    subHeading
                    trackOrderParent
                    d-flex
                    justify-content-around
                    align-items-center
                    mt-3
                  "
                >
                  <button className="View-Order-Button">View Order</button>
                </div>
              </div>
              {/* <!-- ---------------------------- component View Orders ---------------------------- --> */}
            </div>
            {/* </div> */}
          </div>
        </Container>
      </main>
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
