// import type { GetStaticPropsContext } from 'next'
import useCustomer from '@framework/customer/use-customer'
import { useEffect, useState } from 'react'
import Link from 'next/link'

import { Bag } from '@components/icons'
import useAddItem from '@framework/cart/use-add-item'
import { useUI } from '@components/ui/context'

import style from './ProfileInner.module.css'

import AddToCartPlus from '@assets/sleekshop-new-svg/addToCartPlus.svg'

import Modals from './Modals/AddToCartModal'

export default function Orders() {
  const [orderedItem, setorderedItem] = useState<string[]>([])
  const { openSidebar } = useUI()

  const [itemCountState, setitemCountState] = useState([
    { id: 0, val: 1, status: '', diableAddToCart: false },
  ])

  const [ShowPartialProductDetailsPage, setShowPartialProductDetailsPage] =
    useState(false)

  const { data: customer } = useCustomer()

  const addItem = useAddItem()

  const [CurrentObj, setCurrentObj] = useState(null)

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

          // rs1.map((order: any, index: any) => {
          //   let productQuantity = order?.quantity || 0

          //   let newObj = {
          //     id: index,
          //     val: productQuantity >= 2 ? 2 : 1,
          //     status: '',
          //     diableAddToCart: false,
          //   }
          //   let newArr = [...itemCountState, newObj] // copying the old datas array
          //   setitemCountState(newArr)
          // })
        })
    }
  }, [customer])

  const handleDecrement = (index: number, incrementData: any) => {
    let newArr = [...incrementData] // copying the old datas array

    newArr.map((oneObjOfNewArray: any) => {
      if (oneObjOfNewArray.id === index) {
        if (oneObjOfNewArray.val > 1) {
          oneObjOfNewArray.val = oneObjOfNewArray.val - 1
          let newArr = [...incrementData] // copying the old datas array
          newArr.map((oneObjOfNewArray) => {
            if (oneObjOfNewArray.id === index) {
              oneObjOfNewArray.status = 'inStock'
              oneObjOfNewArray.diableAddToCart = false
            }
            return
          })
          return setitemCountState(newArr)
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
            let newArr = [...incrementData] // copying the old datas array
            newArr.map((oneObjOfNewArray) => {
              if (
                oneObjOfNewArray.id === index &&
                oneObjOfNewArray.val !== productQuantity + 1
              ) {
                oneObjOfNewArray.val = oneObjOfNewArray.val + 1
                oneObjOfNewArray.status = 'outOfStock'
                oneObjOfNewArray.diableAddToCart = true
              }
              return
            })
            return setitemCountState(newArr)
          }
        }

        return
      })
      return [res]
    }

    if (checkExistanceFunc('id')[0]) {
      return
    } else {
      let newObj = {
        id: index,
        val: productQuantity >= 2 ? 2 : 1,
        status: '',
        diableAddToCart: false,
      }
      let newArr = [...incrementData, newObj] // copying the old datas array

      setitemCountState(newArr)
    }
  }

  const handleRenderingItemCount = (index: number, incrementData: any) => {
    let val = 1
    let stockStatus = ''
    let diableAddToCart = false

    incrementData.map((eachObjOfState: any) => {
      if (eachObjOfState.id === index) {
        val = eachObjOfState.val
        stockStatus = eachObjOfState.status
        diableAddToCart = eachObjOfState.diableAddToCart
      }
    })
    return [val, stockStatus, diableAddToCart]
  }

  return (
    <>
      {ShowPartialProductDetailsPage && (
        <Modals
          setShowPartialProductDetailsPage={setShowPartialProductDetailsPage}
          ShowPartialProductDetailsPage={ShowPartialProductDetailsPage}
          CurrentObj={CurrentObj}
        />
      )}

      {Array.isArray(orderedItem) && orderedItem.length > 0 ? (
        <>
          {/* {console.log('itemCountState abcXyz ==>> ', itemCountState)} */}
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
                    <div className="Product-Model-Parent mt-3 skuParent">
                      <p className="Product-Model skuFontSt">
                        SKU: {order.sku}
                      </p>
                    </div>
                    <div className="mt-2 orderNameP ">
                      <Link
                        href={`/products/${order?.name
                          .split(' ')
                          .join('-')
                          .split('(')
                          .join('')
                          .split(')')
                          .join('')}`}
                      >
                        <a>
                          <p className="Product-Name productName">
                            {order?.name}
                          </p>
                        </a>
                      </Link>
                    </div>
                    <div className="productBrandP mt-2">
                      <p className="Product-brand productBrandText">
                        {order?.product_options[0]?.display_value}
                      </p>
                    </div>
                    <div className="mt-2 d-flex align-items-center justify-content-between pPrice_AddToCart ">
                      <p className="Product-price productPriceAdd">
                        $ {Number(order?.price_inc_tax).toFixed(2)}
                      </p>
                      <p
                        className="addToCartButton"
                        onClick={() => {
                          setCurrentObj(order)
                          setShowPartialProductDetailsPage(true)
                        }}
                      >
                        <AddToCartPlus />
                      </p>
                    </div>

                    <div className="AddToCartOnHover">
                      <div className={`${style.incrementParent}`}>
                        {/* ===================Qty Text=================== */}
                        <span className={`${style.QtyText}`}>QTY</span>

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
                          className={`${style.inputEDCartVal} ${
                            handleRenderingItemCount(
                              index,
                              itemCountState
                            )[1] === 'outOfStock'
                              ? style.outOfStock
                              : handleRenderingItemCount(
                                  index,
                                  itemCountState
                                )[1] === 'inStock' && style.inStock
                          }`}
                          value={Number(
                            handleRenderingItemCount(index, itemCountState)[0]
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
                      <button
                        disabled={Boolean(
                          handleRenderingItemCount(index, itemCountState)[2]
                        )}
                        className={`h6AddToCart`}
                        onClick={async () => {
                          let productId = order?.product_id
                          let variantId = order?.variant_id

                          let qty = handleRenderingItemCount(
                            index,
                            itemCountState
                          )[0]

                          await addItem({
                            productId,
                            variantId,
                            quantity: Number(qty),
                          })
                          openSidebar()
                        }}
                      >
                        ADD TO BAG
                      </button>
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
