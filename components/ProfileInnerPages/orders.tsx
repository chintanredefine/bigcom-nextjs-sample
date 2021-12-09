// import type { GetStaticPropsContext } from 'next'
import useCustomer from '@framework/customer/use-customer'
import { useEffect, useState } from 'react'
import { Bag } from '@components/icons'
import useAddItem from '@framework/cart/use-add-item'

import style from './ProfileInner.module.css'

export default function Orders() {
  const [orderedItem, setorderedItem] = useState<string[]>([])

  const { data: customer } = useCustomer()

  const addItem = useAddItem()

  useEffect(() => {
    let cid = customer?.entityId
    if (customer && customer?.entityId) {
      fetch(
        'https://www.ystore.us/sleekshop/getOrderProducts.php?customer_id=' +
          cid
      )
        .then((response) => response.json())
        .then((rs1) => {
          setorderedItem(rs1)
        })
    }
  }, [customer])

  const [itemCountState, setitemCountState] = useState([{ id: 0, val: 1 }])

  const handleDecrement = (index: number, incrementData: any) => {
    let newArr = [...incrementData] // copying the old datas array

    newArr.map((oneObjOfNewArray: any) => {
      if (oneObjOfNewArray.id === index) {
        if (oneObjOfNewArray.val > 1) {
          oneObjOfNewArray.val = oneObjOfNewArray.val - 1
        }
      }
    })
    return setitemCountState(newArr)
  }

  const handleIncrement = (
    index: number,
    productQuantity: number,
    incrementData: any
  ) => {
    const checkExistanceFunc = (param: any) => {
      // incrementData[index]
      let res = false

      incrementData.map((oneObjOfState: any) => {
        if (param === 'id' && oneObjOfState.id === index) {
          res = true
          if (productQuantity > oneObjOfState.val) {
            let newArr = [...incrementData] // copying the old datas array

            newArr.map((oneObjOfNewArray) => {
              if (oneObjOfNewArray.id === index) {
                oneObjOfNewArray.val = oneObjOfNewArray.val + 1
              }
              return
            })
            return setitemCountState(newArr)
          } else {
            return
          }
        }

        return
      })
      return [res]
    }

    if (checkExistanceFunc('id')[0]) {
    } else {
      let newObj = {
        id: index,
        val: productQuantity >= 2 ? 2 : 1,
      }
      let newArr = [...incrementData, newObj] // copying the old datas array

      setitemCountState(newArr)
    }
  }

  const handleRenderingItemCount = (index: number, incrementData: any) => {
    let val = 1
    incrementData.map((eachObjOfState: any) => {
      if (eachObjOfState.id === index) {
        val = eachObjOfState.val
      }
    })
    return val
  }

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
              {orderedItem.map((order: any, index) => {
                let productQuantity = order?.quantity || 0

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

                    <div className="AddToCartOnHover">
                      <div className={`${style.incrementParent}`}>
                        {/* ===================decreent button=================== */}
                        <button
                          className={`${style.decrementBtn}`}
                          onClick={() => {
                            return handleDecrement(index, itemCountState)
                          }}
                        >
                          -
                        </button>

                        {/* current value of product quantity //  #input field for all subcomponents */}
                        <input
                          disabled
                          className={`${style.inputEDCartVal}`}
                          value={handleRenderingItemCount(
                            index,
                            itemCountState
                          )}
                        />

                        {/* ===================increment button=================== */}
                        <button
                          className={` ${style.incrementBtn} `}
                          onClick={() => {
                            return handleIncrement(
                              index,
                              productQuantity,
                              itemCountState
                            )
                          }}
                        >
                          +
                        </button>
                      </div>
                      <h6
                        className="h6AddToCart"
                        onClick={async () => {
                          let productId = order?.product_id
                          let variantId = order?.variant_id
                          await addItem({
                            productId,
                            variantId,
                            quantity: handleRenderingItemCount(
                              index,
                              itemCountState
                            ),
                          })
                        }}
                      >
                        Add to Cart
                      </h6>
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
