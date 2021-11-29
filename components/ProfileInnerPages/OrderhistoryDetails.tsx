// import { Bag } from '@components/icons'
import useCustomer from '@framework/customer/use-customer'
import { useEffect, useState } from 'react'

export default function Reward(propData: any) {
  console.log('OrderHistoryDetails.tsx propData', propData)
  const { data: customer } = useCustomer()
  const [orderedItem, setorderedItem] = useState({
    order_products: [],
    date_created: '',
    date_shipped: '',
    billing_address: {
      first_name: '',
      last_name: '',
      street_1: '',
      country: '',
      country_iso2: '',
      zip: '',
    },
    shipping_addresses: [
      {
        first_name: '',
        last_name: '',
        street_1: '',
        country: '',
        country_iso2: '',
        zip: '',
        shipping_method: '',
        status: '',
      },
    ],
  })

  useEffect(() => {
    let cid = propData?.data?.orderId
    if (customer && customer?.entityId) {
      fetch('https://www.ystore.us/sleekshop/getAnOrder.php?order_id=' + cid)
        .then((response) => response.json())
        .then((rs1) => {
          console.log("detailed orderRecord 'OrderHistoryDetails.tsx", rs1)
          setorderedItem(rs1)
        })
    }
  }, [customer])

  return (
    <>
      {/* <!-- ---------------------------- component order history ---------------------------- --> */}
      <div className="MainContentInnerdiv mb-2 orderHistory d-flex justify-content-between">
        {console.log('orderedItem 123456789 ==>> ', orderedItem)}
        <div>
          <p className="Heading">Order Details</p>
          <p className="subHeading">Thanks For Your Order</p>
        </div>
        <div>
          <p className="subHeading">
            <span className="Heading"> Oder Id : </span>
            {orderedItem?.order_products[0] &&
              orderedItem?.order_products[0]['order_id']}
          </p>
          <p className="subHeading">
            <span className="Heading"> Order Data :</span>
            {orderedItem.date_created}
          </p>
        </div>
      </div>
      {/* <!-- ---------------------------- component order history ---------------------------- --> */}

      {/* <!-- ---------------------------- component BillingShipping ---------------------------- --> */}
      <div className="MainContentInnerdiv mb-2 BillingShipping d-flex justify-content-between">
        <div className="Billing">
          <p className="BillingHeading Heading">Billing</p>
          <p className="subHeading">
            {orderedItem.billing_address.first_name +
              ' ' +
              orderedItem.billing_address.last_name}
          </p>
          <p className="subHeading">{orderedItem.billing_address.street_1}</p>
          <p className="subHeading">
            {orderedItem.billing_address.country},
            {orderedItem.billing_address.country_iso2}
            {orderedItem.billing_address.zip}
          </p>
        </div>
        <div className="Shipping">
          <p className="BillingHeading Heading">Shipping</p>
          <p className="subHeading">
            {orderedItem.shipping_addresses[0].first_name +
              ' ' +
              orderedItem.shipping_addresses[0].last_name}
          </p>
          <p className="subHeading">
            {orderedItem.shipping_addresses[0].street_1}
          </p>
          <p className="subHeading">
            {orderedItem.shipping_addresses[0].country},
            {orderedItem.shipping_addresses[0].country_iso2}
            {orderedItem.shipping_addresses[0].zip}
          </p>
        </div>
      </div>
      {/* <!-- ---------------------------- component order history ---------------------------- --> */}

      {/* <!-- ---------------------------- component buy it again ---------------------------- --> */}
      <div className="MainContentInnerdiv mb-2">
        {/* <!-- title of the Buy It Again Page  --> */}
        <div className="mainContentChild d-flex justify-content-between">
          <div className="Heading">Products Ordered</div>
          <div className="Heading">
            {orderedItem.order_products.length} Items
          </div>
        </div>

        {/* <!-- product list  --> */}
        <div className="d-flex justify-content-between row">
          {/* product card */}
          {orderedItem?.order_products.map((ordPro) => {
            return (
              <>
                <div className="productCard">
                  <div className="productCardImgParent">
                    <img
                      className="ProductImg"
                      src={ordPro && ordPro['product_image']}
                      alt=""
                    />
                  </div>
                  <div className="Product-Model-Parent">
                    <p className="Product-Model">
                      SKU: {ordPro && ordPro['sku']}
                    </p>
                  </div>
                  <div>
                    <p className="Product-Name">{ordPro && ordPro['name']}</p>
                  </div>
                  <div>
                    <p className="Product-brand">{ordPro && ordPro['name']}</p>
                  </div>
                  <div>
                    <p className="Product-price">
                      $ {ordPro && ordPro['base_total']}
                    </p>
                  </div>
                </div>
              </>
            )
          })}
        </div>
      </div>
      {/* <!-- ---------------------------- component buy it again ---------------------------- --> */}

      {/* <!-- ---------------------------- component Shipment ---------------------------- --> */}
      <div className="MainContentInnerdiv mb-2 BillingShipping d-flex justify-content-between">
        <div className="Billing subHeading">
          <p className="BillingHeading Heading mb-2 shipement-p">Shipment</p>
          <p>
            Shipping method :{orderedItem.shipping_addresses[0].shipping_method}
          </p>
          <p>Shipping data : {orderedItem.date_shipped}</p>
          <p>Tracking # : 485098495884598</p>
          {/* <p>Career : USPC</p> */}
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
          {orderedItem.shipping_addresses[0].status !== 'Cancelled' ? (
            <button className="ButtonTrackOrder">TRACK ORDER</button>
          ) : (
            <button
              className="ButtonTrackOrder "
              style={{ border: '2px solid rgba(255, 71, 15, 0.767)' }}
            >
              Canceled
            </button>
          )}
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
    </>
  )
}
