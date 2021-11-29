// import type { GetStaticPropsContext } from 'next'
import useCustomer from '@framework/customer/use-customer'
import { useEffect, useState } from 'react'

export default function Orders() {
  const [orderedItem, setorderedItem] = useState<string[]>([])

  const { data: customer } = useCustomer()

  useEffect(() => {
    let cid = customer?.entityId
    if (customer && customer?.entityId) {
      fetch('https://www.ystore.us/sleekshop/getOrders.php?customer_id=' + cid)
        .then((response) => response.json())
        .then((rs1) => {
          setorderedItem(rs1)
        })
    }
  }, [customer])

  return (
    <>
      {/* <!-- ---------------------------- component buy it again ---------------------------- --> */}
      <div className="MainContentInnerdiv mb-2">
        {/* <!-- title of the Buy It Again Page  --> */}
        <div className="mainContentChild d-flex justify-content-between">
          <div className="Heading">Buy It Again</div>
          <div className="Heading">6 Items</div>
        </div>

        {/* <!-- product list  --> */}
        <div className="d-flex justify-content-between row">
          {orderedItem.map((order: any) => {
            console.log('order ', order)

            return (
              <div className="productCard">
                <div className="productCardImgParent">
                  <img
                    className="ProductImg"
                    src={order?.productImage}
                    alt="image not found"
                  />
                </div>
                <div className="Product-Model-Parent">
                  <p className="Product-Model">
                    {/* SKU: 16025 */}
                    {order.orderId}
                  </p>
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
                  <p className="Product-price">$ {order.orderTotal}</p>
                </div>
              </div>
            )
          })}
          {/* <!-- end product list  --> */}
        </div>
      </div>
      {/* <!-- ---------------------------- component buy it again ---------------------------- --> */}
    </>
  )
}
