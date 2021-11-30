// import type { GetStaticPropsContext } from 'next'
import useCustomer from '@framework/customer/use-customer'
import { useEffect, useState } from 'react'
import { Bag } from '@components/icons'

export default function Orders() {
  const [orderedItem, setorderedItem] = useState<string[]>([])

  const { data: customer } = useCustomer()

  useEffect(() => {
    let cid = customer?.entityId
    if (customer && customer?.entityId) {
      fetch(
        'https://www.ystore.us/sleekshop/getOrderProducts.php?customer_id=' +
          cid
      )
        .then((response) => response.json())
        .then((rs1) => {
          console.log('new Order Data \n', rs1)

          setorderedItem(rs1)
        })
    }
  }, [customer])

  return (
    <>
      {Array.isArray(orderedItem) && orderedItem.length > 0 ? (
        <>
          {/* <!-- ---------------------------- component buy it again ---------------------------- --> */}
          <div className="MainContentInnerdiv mb-2">
            {/* <!-- title of the Buy It Again Page  --> */}
            <div className="mainContentChild d-flex justify-content-between">
              <div className="Heading">Buy It Again</div>
              <div className="Heading">{orderedItem?.length} Items</div>
            </div>

            {/* <!-- product list  --> */}
            <div className="d-flex row">
              {orderedItem.map((order: any) => {
                // console.log('order ', order)

                return (
                  <div className="productCard">
                    <div className="productCardImgParent">
                      <img
                        className="ProductImg"
                        src={order?.prod_image}
                        alt="image not found"
                      />
                    </div>
                    <div className="Product-Model-Parent mt-3">
                      <p className="Product-Model">SKU: {order.sku}</p>
                    </div>
                    <div>
                      <p className="Product-Name">{order?.name}</p>
                    </div>
                    <div>
                      <p className="Product-brand">
                        {order?.product_options[0]?.display_value}
                      </p>
                    </div>
                    <div>
                      <p className="Product-price">$ {order?.price_inc_tax}</p>
                    </div>
                  </div>
                )
              })}
              {/* <!-- end product list  --> */}
            </div>
          </div>
          {/* <!-- ---------------------------- component buy it again ---------------------------- --> */}
        </>
      ) : (
        <>
          <div className="MainContentInnerdiv mb-2">
            <div className="flex-1 p-24 flex flex-col justify-center items-center ">
              <span className="border border-dashed border-secondary rounded-full flex items-center justify-center w-16 h-16 p-12 bg-primary text-primary">
                <Bag className="absolute" />
              </span>
              <h2 className="pt-6 text-2xl font-bold tracking-wide text-center">
                No Products found
              </h2>
            </div>
          </div>
        </>
      )}
    </>
  )
}
