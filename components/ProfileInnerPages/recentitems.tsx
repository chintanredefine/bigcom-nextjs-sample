import Link from 'next/link'

import useCustomer from '@framework/customer/use-customer'
import { useEffect, useState } from 'react'
import { Bag } from '@components/icons'
import Cookies from 'js-cookie'

export default function RecentItems() {
  const [orderedItem, setorderedItem] = useState<string[]>([])

  const { data: customer } = useCustomer()

  useEffect(() => {
    if (customer && customer?.entityId) {
      let productCookie =
        Cookies.get('recently_viewed_products') || '["181986"]'
      const parsedCookie = JSON.parse(productCookie)

      if (parsedCookie.length > 0) {
        fetch('https://www.ystore.us/sleekshop/getProducts.php', {
          // Adding method type
          method: 'POST',
          // Adding body or contents to send
          body: JSON.stringify([...parsedCookie]),
        })
          .then((res) => {
            return res.json()
          })
          .then((res) => {
            if (res.success) {
              setorderedItem(res.data)
            }
          })
      }
    }
  }, [customer])

  return (
    <>
      {Array.isArray(orderedItem) && orderedItem.length > 0 ? (
        <>
          {/* <!-- ---------------------------- component recently view items ---------------------------- --> */}
          <div className="MainContentInnerdiv mb-2">
            {/* <!-- title of the Buy It Again Page  --> */}
            <div className="mainContentChild d-flex justify-content-between">
              <div className="Heading buyItAgainHeading">Recently Viewed </div>
              <div className="Heading itemQuantity">
                {orderedItem?.length} Items
              </div>
            </div>

            {/* <!-- product list  --> */}
            <div className="d-flex row">
              {orderedItem.map((order: any) => {
                let RedirectUrl = order?.custom_url?.url?.replace('.html', '')
                return (
                  <div className="productCard">
                    <div className="productCardImgParent">
                      <img
                        className="ProductImg"
                        src={order?.product_image}
                        alt="image not found"
                      />
                    </div>
                    <div className="Product-Model-Parent mt-3 skuParent">
                      <p className="Product-Model skuFontSt">
                        SKU: {order?.sku}
                      </p>
                    </div>
                    <div className="mt-2 orderNameP">
                      <Link href={RedirectUrl}>
                        <a>
                          <p className="Product-Name productName">
                            {order?.name}
                          </p>
                        </a>
                      </Link>
                    </div>

                    <div className="productBrandP mt-2">
                      <p className="Product-brand productBrandText">
                        {order.brand_id}
                      </p>
                    </div>

                    <div className="mt-2 d-flex align-items-center justify-content-between pPrice_AddToCart ">
                      <p className="Product-price productPriceAdd">
                        $ {Number(order?.price).toFixed(2)}
                      </p>
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
            <div className="flex-1 PaddingForNoItemForDeskTopView flex flex-col justify-center items-center ">
              <span className="border border-dashed border-secondary rounded-full flex items-center justify-center w-16 h-16 p-12 bg-primary text-primary">
                <Bag className="absolute" />
              </span>
              <h2 className="pt-6 text-2xl font-bold tracking-wide text-center">
                No Products found
              </h2>
              <h1>
                View Some Products. <Link href="/">Go to Home</Link>
              </h1>
            </div>
          </div>
        </>
      )}
    </>
  )
}
