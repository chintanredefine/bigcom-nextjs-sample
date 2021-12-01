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
          console.log('new Order Data \n', rs1)

          setorderedItem(rs1)
        })
    }
  }, [customer])

  let initialItemCount = [
    {
      id: 0,
      val: 1,
    },
  ]
  const [itemCountState, setitemCountState] = useState(initialItemCount)

  const handleDecrement = (
    index: any,
    productQuantity: any,
    incrementData: any
  ) => {
    console.log(
      'handleDecrement \n itemCountState => ',
      itemCountState,
      ' prop -> incrementData === itemCountState => ',
      incrementData,
      'index',
      index,
      'initialItemCount',
      initialItemCount,
      'productQuantity',
      productQuantity
    )

    if (
      itemCountState[index] &&
      itemCountState[index]['id'] == index &&
      itemCountState[index]['val'] > 1
    ) {
      // newArr[index].val -= 1
      let newObj = {
        id: itemCountState[index]['id'],
        val: itemCountState[index]['val'] - 1,
      }
      let newArr = [...itemCountState, newObj] // copying the old datas array

      setitemCountState(newArr)
    }
  }

  const handleIncrement = (
    index: any,
    productQuantity: any,
    incrementData: any
  ) => {
    console.log(
      'handleIncrement \n itemCountState => ',
      itemCountState,
      ' incrementData => ',
      incrementData,
      'index',
      index,
      'initialItemCount',
      initialItemCount,
      'productQuantity',
      productQuantity
    )

    if (itemCountState[index] && itemCountState[index]['id'] == index) {
      if (itemCountState[index].val < productQuantity) {
        let newObj = {
          id: itemCountState[index]['id'],
          val: itemCountState[index]['val'] + 1,
        }
        let newArr = [...itemCountState, newObj] // copying the old datas array

        setitemCountState(newArr)
      }
    } else {
      // if (itemCountState[index].val < productQuantity) {
      let newObj = {
        id: index,
        val: 2,
      }
      let newArr = [...itemCountState, newObj] // copying the old datas array

      setitemCountState(newArr)
      // }
    }
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
                // console.log('order new have to look where \n ', order)
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
                          onClick={() =>
                            handleDecrement(
                              index,
                              productQuantity,
                              itemCountState
                            )
                          }
                        >
                          -
                        </button>

                        {/* current value of product quantity //  #input field for all subcomponents */}
                        <input
                          disabled
                          className={`${style.inputEDCartVal}`}
                          value={
                            itemCountState[index]
                              ? itemCountState[index].val
                              : 1
                          }
                        />

                        {/* ===================increment button=================== */}
                        <button
                          className={` ${style.incrementBtn} `}
                          onClick={() => {
                            handleIncrement(
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
                            quantity: itemCountState[index].val,
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
