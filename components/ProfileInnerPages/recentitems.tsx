import Link from 'next/link'

import useCustomer from '@framework/customer/use-customer'
import { useEffect, useState } from 'react'
import { Bag } from '@components/icons'
import useAddItem from '@framework/cart/use-add-item'
import Cookies from 'js-cookie'

import style from './ProfileInner.module.css'

export default function RecentItems() {
  const [orderedItem, setorderedItem] = useState<string[]>([])

  const { data: customer } = useCustomer()

  const addItem = useAddItem()

  useEffect(() => {
    if (customer && customer?.entityId) {
      let productCookie = Cookies.get('recently_viewed_products') || '[]'
      const parsedCookie = JSON.parse(productCookie)

      if (parsedCookie.length > 0) {
        fetch('https://www.ystore.us/sleekshop/getProducts.php', {
          // Adding method type
          method: 'POST',
          // Adding body or contents to send
          body: JSON.stringify([...parsedCookie]),
        })
          .then((res) => {
            console.log('recent 001 viewed products', res)

            return res.json()
          })
          .then((res) => {
            if (res.success) {
              console.log('recent viewed products', res)
              setorderedItem(res.data)
              //  setrefresh(!refresh)
            }
          })
      }
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

      console.log('Index Increment = ', index)
      console.log('param', param, 'productQuantity', productQuantity)

      incrementData.map((oneObjOfState: any) => {
        console.log('oneObjOfState', oneObjOfState)

        if (param === 'id' && oneObjOfState.id === index) {
          res = true
          console.log('oneObjOfState by id ', oneObjOfState)
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
      console.log('id and value existance => ', [res])

      return [res]
    }

    if (checkExistanceFunc('id')[0]) {
      console.log(" checkExistanceFunc('id')[0] ")
    } else {
      console.log(
        'grand parent else got called, means did not returned from last return func >'
      )
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
    // <>
    //   <div className="MainContentInnerdiv mb-2 orderHistory d-flex justify-content-between">
    //     <h1>
    //       View Some Products First. <Link href="/">Go to Home</Link>
    //     </h1>
    //   </div>
    // </>

    <>
      {Array.isArray(orderedItem) && orderedItem.length > 0 ? (
        <>
          {/* <!-- ---------------------------- component recently view items ---------------------------- --> */}
          <div className="MainContentInnerdiv mb-2">
            {/* <!-- title of the Buy It Again Page  --> */}
            <div className="mainContentChild d-flex justify-content-between">
              <div className="Heading">Recently Viewed Products</div>
              <div className="Heading">{orderedItem?.length} Items</div>
            </div>

            {/* <!-- product list  --> */}
            <div className="d-flex row">
              {orderedItem.map((order: any, index) => {
                console.log('recently View Single Product \n ', order)
                // let productQuantity = order?.quantity || 0
                let productQuantity = 2
                return (
                  <div className="productCard">
                    <div className="productCardImgParent">
                      <img
                        className="ProductImg"
                        src={order?.custom_url?.url}
                        alt="image not found"
                      />
                    </div>
                    <div className="Product-Model-Parent mt-3">
                      <p className="Product-Model">SKU: {order?.sku}</p>
                    </div>
                    <div>
                      <p className="Product-Name">{order?.name}</p>
                    </div>

                    <div>
                      <p className="Product-price">$ {order?.price}</p>
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
                          // await addItem({
                          //   productId,
                          //   variantId,
                          // })
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
