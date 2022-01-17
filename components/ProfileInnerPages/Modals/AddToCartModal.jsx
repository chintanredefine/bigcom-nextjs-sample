import React, { useState } from 'react'
import Modal from 'react-modal'
import style from '../ProfileInner.module.css'
import useAddItem from '@framework/cart/use-add-item'

import CloseSvg from '@assets/sleekshop-new-svg/close.svg'

const customStyles = {
  content: {
    top: '20%',
    left: '0px',
    right: '0px',
    bottom: '0px',
    width: '100vw',
    position: "fixed",
    inset: "0px",
    backgroundColor: "rgb(0 0 0 / 35%)",
  },
}

const ModalCompo = ({
  setShowPartialProductDetailsPage,
  ShowPartialProductDetailsPage,
  CurrentObj,
}) => {
  const addItem = useAddItem()

  function closeModal(e) {
    setShowPartialProductDetailsPage(false)
    return false
  }

  const [itemCountState, setitemCountState] = useState({
    val: 1,
    status: '',
    diableAddToCart: false,
  })

  const handleDecrement = () => {
    if (itemCountState.val > 1) {
      setitemCountState((prevState) => ({
        ...prevState,
        val: itemCountState.val - 1,
      }))

      if (itemCountState.val - 1 <= CurrentObj.quantity) {
        let itemStatus = 'inStock'
        setitemCountState((prevState) => ({
          ...prevState,
          status: itemStatus,
          diableAddToCart: false,
        }))
      }
    }
  }

  const handleIncrement = () => {
    if (CurrentObj.quantity > itemCountState.val) {
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
      <Modal
        isOpen={ShowPartialProductDetailsPage}
        onRequestClose={(e) => closeModal(e)}
        style={customStyles}
        className="ModalUpperMostParent"
      >
        <div className='maskForProductDetailsPage'>
        <div className="d-flex align-items-center justify-content-end closeSvg ">
          <button onClick={(e) => closeModal(e)}>
            <CloseSvg />
          </button>
        </div>

        <div className="detailproductCardParent align-items-center">
          <div className="detailproductCard">
            <div className="productCardImgParent productCardImgParentmodal d-flex align-items-center justify-content-center">
              <img
                className="detailProductImg "
                src={CurrentObj?.prod_image}
                alt="image not found"
              />
            </div>
            <div className='detailsParentModal'>
            <div className="Product-Model-Parent mt-3 skuFontSt">
              <p className="Product-Model">SKU: {CurrentObj?.sku}</p>
            </div>
            <div className="mt-12 CurrentObjNameP productName">
              <p className="Product-Name">{CurrentObj?.name}</p>
            </div>

            <p className="Product-brand mt-12 productBrandText">
              {CurrentObj?.product_options[0]?.display_value}
            </p>

            <p className="Product-price mt-12 productPriceAdd">$ {Number(CurrentObj?.price_inc_tax).toFixed(2)}</p>
          </div>
        </div>

  {/* there will be incrementer bottons  */}

          <div className={`${style.incrementParent} mt-2`}>
            <div className={`d-flex justify-content-center align-items-center`}>
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
            onClick={async () => {
              let productId = CurrentObj?.product_id
              let variantId = CurrentObj?.variant_id

              await addItem({
                productId,
                variantId,
                quantity: itemCountState.val,
              })

              closeModal()
            }}
          >
            ADD TO BAG
          </button>

        </div>

    </div>
      </Modal>
  )
}

export default ModalCompo
