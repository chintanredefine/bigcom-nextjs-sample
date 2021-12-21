import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import style from '../../ProfileInnerPages/ProfileInner.module.css'
import useAddItem from '@framework/cart/use-add-item'
import usePrice from '@framework/product/use-price'

import CloseSvg from '@assets/sleekshop-new-svg/close.svg'

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
  const addItem = useAddItem()
  const [loading, setLoading] = useState(false)

  const { price } = usePrice({
    amount: CurrentObj.price?.value,
    baseAmount: CurrentObj.price?.retailPrice,
    currencyCode: CurrentObj.price?.currencyCode,
  })

  function closeModal(e) {
    setShowPartialProductDetailsPage(false)
    return false
  }

  const [itemCountState, setitemCountState] = useState({
    val: 1,
    status: '',
    diableAddToCart: false,
  })

  const addToCart = async () => {
    setLoading(true)

    try {
      await addItem({
        productId: String(CurrentObj.id),
        variantId: String(CurrentObj.variants[0].id),
        quantity: itemCountState.val,
      })

      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
    closeModal()
  }

  const handleDecrement = () => {
    if (itemCountState.val > 1) {
      setitemCountState((prevState) => ({
        ...prevState,
        val: itemCountState.val - 1,
      }))

      // if (itemCountState.val - 1 <= CurrentObj.quantity) {
      //   let itemStatus = 'inStock'
      //   setitemCountState((prevState) => ({
      //     ...prevState,
      //     status: itemStatus,
      //     diableAddToCart: false,
      //   }))
      // }
    }
  }

  const handleIncrement = () => {
    // if (CurrentObj.quantity > itemCountState.val) {
    if (true) {
      setitemCountState((prevState) => ({
        ...prevState,
        val: itemCountState.val + 1,
      }))
    } else {
      let itemStatus = 'outOfStock'

      setitemCountState((prevState) => ({
        ...prevState,
        val: itemCountState.val + 1,
        status: itemStatus,
        diableAddToCart: true,
      }))
    }
  }

  return (
    <div>
      <Modal
        isOpen={ShowPartialProductDetailsPage}
        onRequestClose={(e) => closeModal(e)}
        style={customStyles}
        className="ModalUpperMostParent"
      >
        <div className="d-flex align-items-center justify-content-end closeSvg">
          <button onClick={(e) => closeModal(e)}>
            <CloseSvg />
          </button>
        </div>

        <div className="detailproductCardParent justify-content-between align-items-center">
          <div className="productCard detailproductCard">
            <div className="productCardImgParent d-flex align-items-center justify-content-center">
              <img
                className="detailProductImg "
                src={CurrentObj.images[0]?.url}
                alt={CurrentObj.images[0]?.alt || 'Product Image'}
              />
            </div>
            <div className="Product-Model-Parent mt-3">
              <p className="Product-Model">SKU: {CurrentObj.id}</p>
            </div>
            <div className="mt-1 CurrentObjNameP">
              <p className="Product-Name">{CurrentObj?.name}</p>
            </div>

            {/* <p className="Product-brand mt-1">
              {CurrentObj?.options[0]?.display_value}
            </p> */}

            <p className="Product-price mt-1">{price}</p>
          </div>

          {/* there will be incrementer bottons  */}

          <div className={`${style.incrementParent} mt-2`}>
            <div className={`d-flex ${style.AddToCartOnHover_0ne}`}>
              {/* ===================Qty Text=================== */}
              <p className={`${style.detailsQtyText}`}>QTY</p>

              {/* ===================decreent button=================== */}
              <button
                className={`${style.decrementBtn}`}
                onClick={() => {
                  return handleDecrement()
                }}
              >
                -
              </button>

              {/* current value of product quantity //  #input field for all subcomponents */}
              <input
                disabled
                className={`${style.inputEDCartVal}  ${
                  itemCountState.status === 'outOfStock'
                    ? style.outOfStock
                    : itemCountState.status === 'inStock' && style.inStock
                }`}
                value={itemCountState.val}
              />

              {/* ===================increment button=================== */}
              <button
                className={` ${style.incrementBtn} `}
                onClick={() => {
                  return handleIncrement()
                }}
              >
                +
              </button>
            </div>
          </div>

          {/* add to bag button */}
          <button
            disabled={itemCountState.diableAddToCart}
            className="h6AddToCart detailsh6AddToCart"
            onClick={addToCart}
          >
            ADD TO BAG
          </button>
        </div>
      </Modal>
    </div>
  )
}

export default ModalCompo
