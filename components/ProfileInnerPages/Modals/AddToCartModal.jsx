import React, { useState } from 'react'
import Modal from 'react-modal'
import style from '../ProfileInner.module.css'

const customStyles = {
  content: {
    top: '20%',
    left: '0px',
    right: '0px',
    bottom: '0px',
    width: '100vw',
  },
}

const ModalCompo = ({
  setShowPartialProductDetailsPage,
  ShowPartialProductDetailsPage,
  CurrentObj,
}) => {
  const [itemCount, setitemCount] = useState(1)

  function closeModal(e) {
    setShowPartialProductDetailsPage(false)
    return false
  }

  // const handleDecrement = () => {
  //   if (itemCount > 1) {
  //     let oneObjOfNewArray = 'inStock'
  //     let newItemCount = itemCount - 1
  //     setitemCount(newItemCount)
  //     return
  //   }
  // }

  // const handleIncrement = (index, productQuantity, incrementData) => {
  //   const checkExistanceFunc = (param) => {
  //     // incrementData[index]
  //     let res = false

  //     incrementData.map((oneObjOfState) => {
  //       if (param === 'id' && oneObjOfState.id === index) {
  //         res = true
  //         if (productQuantity > oneObjOfState.val) {
  //           let newArr = [...incrementData] // copying the old datas array

  //           newArr.map((oneObjOfNewArray) => {
  //             if (oneObjOfNewArray.id === index) {
  //               oneObjOfNewArray.val = oneObjOfNewArray.val + 1
  //             }
  //             return
  //           })
  //           return setitemCountState(newArr)
  //         } else {
  //           let newArr = [...incrementData] // copying the old datas array
  //           newArr.map((oneObjOfNewArray) => {
  //             if (
  //               oneObjOfNewArray.id === index &&
  //               oneObjOfNewArray.val !== productQuantity + 1
  //             ) {
  //               oneObjOfNewArray.val = oneObjOfNewArray.val + 1
  //               oneObjOfNewArray.status = 'outOfStock'
  //               oneObjOfNewArray.diableAddToCart = true
  //             }
  //             return
  //           })
  //           return setitemCountState(newArr)
  //         }
  //       }

  //       return
  //     })
  //     return [res]
  //   }

  //   if (checkExistanceFunc('id')[0]) {
  //     return
  //   } else {
  //     let newObj = {
  //       id: index,
  //       val: productQuantity >= 2 ? 2 : 1,
  //       status: '',
  //       diableAddToCart: false,
  //     }
  //     let newArr = [...incrementData, newObj] // copying the old datas array

  //     setitemCountState(newArr)
  //   }
  // }

  return (
    <div>
      <Modal
        isOpen={ShowPartialProductDetailsPage}
        onRequestClose={(e) => closeModal(e)}
        style={customStyles}
        className="ModalUpperMostParent"
      >
        <div className="d-flex align-items-center justify-content-end">
          <button onClick={(e) => closeModal(e)}>close</button>
        </div>

        <div className="detailproductCardParent justify-content-between align-items-center">
          <div className="productCard detailproductCard">
            <div className="productCardImgParent d-flex align-items-center justify-content-center">
              <img
                className="detailProductImg "
                src={CurrentObj?.prod_image}
                alt="image not found"
              />
            </div>
            <div className="Product-Model-Parent mt-3">
              <p className="Product-Model">SKU: {CurrentObj?.sku}</p>
            </div>
            <div className="mt-1 CurrentObjNameP">
              <p className="Product-Name">{CurrentObj?.name}</p>
            </div>

            <p className="Product-brand mt-1">
              {CurrentObj?.product_options[0]?.display_value}
            </p>

            <p className="Product-price mt-1">$ {CurrentObj?.price_inc_tax}</p>
          </div>

          {/* there will be incrementer bottons  */}

          <div className={`${style.incrementParent} mt-2`}>
            <div className={`d-flex ${style.AddToCartOnHover_0ne}`}>
              {/* ===================Qty Text=================== */}
              <p className={`${style.detailsQtyText}`}>QTY</p>

              {/* ===================decreent button=================== */}
              <button
                className={`${style.decrementBtn}`}
                // onClick={() => {
                //   return handleDecrement(index, itemCountState)
                // }}
              >
                -
              </button>

              {/* current value of product quantity //  #input field for all subcomponents */}
              <input
                disabled
                className={`${style.inputEDCartVal} `}
                // ${
                //   handleRenderingItemCount(index, itemCountState)[1] ===
                //   'outOfStock'
                //     ? style.outOfStock
                //     : handleRenderingItemCount(index, itemCountState)[1] ===
                //         'inStock' && style.inStock
                // }
                value={itemCount}
              />

              {/* ===================increment button=================== */}
              <button
                className={` ${style.incrementBtn} `}
                // onClick={() => {
                //   return handleIncrement(
                //     index,
                //     productQuantity,
                //     itemCountState
                //   )
                // }}
              >
                +
              </button>
            </div>
          </div>

          {/* add to bag button */}
          <button
            // disabled={Boolean(
            //   handleRenderingItemCount(index, itemCountState)[2]
            // )}
            className="h6AddToCart detailsh6AddToCart"
            onClick={async () => {
              let productId = setCurrentObj?.product_id
              let variantId = setCurrentObj?.variant_id

              // let qty = handleRenderingItemCount(index, itemCountState)[0]

              await addItem({
                productId,
                variantId,
                // quantity: Number(qty),
              })
            }}
          >
            ADD TO BAG
          </button>
        </div>
      </Modal>
    </div>
  )
}

export default ModalCompo
