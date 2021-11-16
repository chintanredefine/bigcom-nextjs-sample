import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useCustomer from '@framework/customer/use-customer'
import Image from 'next/image'
import { Bag } from '@components/icons'

import useAddItem from '@framework/cart/use-add-item'

const OrderProductCompo = () => {
  const router = useRouter()

  const [products, setProducts] = useState([])

  const { data: customer } = useCustomer()

  const addItem = useAddItem()

  useEffect(() => {
    let cid = customer?.entityId
    // console.log('router ', router, '\n', customer, '\n', customer?.entityId)
    if (customer && customer?.entityId) {
      fetch(
        'https://www.ystore.us/sleekshop/getOrderProducts.php?customer_id=' +
          // 'http://10.0.10.59/webProjects/sleekshop/api/getOrderProducts.php?customer_id=' +
          cid
      )
        .then((res) => res.json())
        .then((orderProducts) => {
          setProducts(orderProducts)
        })
    }
  }, [])

  return (
    <>
      <ul className="account-list">
        {Array.isArray(products) && products.length > 0 ? (
          <>
            {products.map((product: any) => {
              console.log('product console', product)

              return (
                <li className="account-listItem">
                  <div className="account-product">
                    <figure className="account-product-figure">
                      <Image
                        width="100"
                        height="100"
                        src={product?.prod_image[0]?.data[0]?.url_standard}
                      ></Image>
                      <span className="purchased-title">Last Purchased</span>
                      <span className="purchased-date">
                        {product?.last_purchased}
                      </span>
                    </figure>
                    <div className="account-product-body">
                      <div className="account-product-body-part">
                        <a href="#">
                          <h5 className="account-product-title">
                            {product?.name}
                          </h5>

                          <span
                            className="variant-name"
                            style={{ paddingLeft: '185px' }}
                          >
                            {product?.product_options[0]?.display_value}
                          </span>
                          <span className="variant-sku">{product?.sku}</span>
                        </a>
                      </div>

                      <div className="account-product-body-part">
                        <span className="account-product-price">
                          $ {product?.prod_price}
                        </span>
                      </div>

                      <div className="add-to-cart-but">
                        <div className="form-action">
                          <h6
                            className="account-orderStatus-label cursor-pointer"
                            onClick={async () => {
                              let productId = product.product_id
                              let variantId = product.variant_id
                              await addItem({
                                productId,
                                variantId,
                              })
                            }}
                          >
                            Add to Cart
                          </h6>
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
                No Products found
              </h2>
            </div>
          </>
        )}
      </ul>
    </>
  )
}

export default OrderProductCompo
