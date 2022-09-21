import s from './ProductSidebar.module.css'
import cn from 'classnames'
import { useAddItem } from '@framework/cart'
import { FC, useEffect, useState } from 'react'
import { ProductOptions } from '@components/product'
import type { Product } from '@commerce/types/product'
import { Button, Text, Rating, useUI } from '@components/ui'
import usePrice from '@framework/product/use-price'
import ProductTag from '../ProductTag'
import { WishlistButton } from '@components/wishlist'
// import {unbxdTrack} from './../../common/Unbxd/track';
import { CheckMark } from '@components/icons'

import {
  getProductVariant,
  selectDefaultOptionFromProduct,
  SelectedOptions,
} from '../helpers'

interface ProductSidebarProps {
  product: Product
  className?: string
  variants: any
  currentVariant: any
  skuChange: any
  reviews: any
}

// declare global {
//   interface Window {
//     Unbxd: any
//   }
// }

const ProductSidebar: FC<ProductSidebarProps> = ({
  product,
  className,
  variants,
  currentVariant,
  skuChange,
  reviews,
}) => {
  const addItem = useAddItem()
  const { openSidebar } = useUI()
  const [loading, setLoading] = useState(false)
  const [afterCartText, setAfterCartText] = useState(false)  
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({})

  useEffect(() => {
    selectDefaultOptionFromProduct(product, setSelectedOptions)
  }, [])

  const variant = getProductVariant(product, selectedOptions)

  const addToCart = async (inputSearch: any, itemQty: any) => {
    inputSearch = document.getElementById('selected_variant')
    let variant_id = inputSearch.value

    itemQty = document.getElementById('qty')
    let qty = itemQty.value

    setLoading(true)
    try {
      // console.log("Adding To Cart ......................");
      await addItem({
        quantity: Number(qty),
        productId: String(product.id),
        variantId: String(variant_id ? variant_id : product.variants[0].id),
        //variantId: String(variant ? variant : product.variants[0].id),
      })
      openSidebar()
      setLoading(false)
      setAfterCartText(true)
      setTimeout(() => {
        setAfterCartText(false)
      }, 5000);
      // unbxdTrack(product.id,itemQty);
      // window.Unbxd.track("cart",{"pid":product.id,"qty":itemQty})
    } catch (err) {
      setLoading(false)
    }
  }

  const { price } = usePrice({
    amount: product.price.value,
    baseAmount: product.price.retailPrice,
    currencyCode: product.price.currencyCode!,
  })

  var minVal = 1, maxVal = 20 // Set Max and Min values

  function increaseQty(element: any) {
    element = document.getElementById('qty')
    var qtyVal = element.value
    if (qtyVal < maxVal) {
      qtyVal++
    }
    element.value = qtyVal
  }
  function decreaseQty(element: any) {
    element = document.getElementById('qty')
    var qtyVal = element.value
    if (qtyVal > 1) {
      qtyVal--
    }
    element.value = qtyVal
  }

  const productSku = currentVariant.sku.toLowerCase()
 

  return (
    <div className={className}>
      <h1 className="productView-title">
        {product.name} -{' '}
        <span className="product_option_title">
          {currentVariant.option_values
            ? currentVariant.option_values[0].label
            : ''}
        </span>
      </h1>

      <div className="flex flex-row items-center reviews-section">
        <Text
          className="product-reviews-top"
          html={reviews.topContent || reviews.topContent}
        />
      </div>
      <div className="product-sku">SKU: {productSku}</div>
      <div className="product-price">{`${price}`}</div>

      <ProductOptions
        options={product.options}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
        product={product}
        variants={variants}
        currentVariant={currentVariant}
        skuChange={skuChange}
      />
      {/* <Text
        className="pb-4 break-words w-full max-w-xl"
        html={product.descriptionHtml || product.description}
      />*/}

      <div className="mobile_price">
        <div className="product-price">{`${price}`}</div>
      </div>

      <div className="add_to_cart">
        <div className="d-block h-9 qtyInput">
          <label className="form-label form-label--alternate" htmlFor="qty">
            Quantity
          </label>

          <button
            type="button"
            className="Quantity_actions__wWpcD qtyLeft"
            onClick={(event) => {
              decreaseQty(event)
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12H19"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </button>
          <label className="w-full border-accent-2 border qtyField">
            <input
              className="Quantity_input__3q7WP qtyValue"
              id="qty"
              type="text"
              max="6"
              min="0"
              defaultValue="1"
            />
          </label>
          <button
            type="button"
            className="Quantity_actions__wWpcD qtyRight"
            onClick={(event) => {
              increaseQty(event)
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 5V19"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M5 12H19"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </button>
        </div>

        <div className="wishlist">
          {process.env.COMMERCE_WISHLIST_ENABLED && (
            <WishlistButton
              className={cn(s.wishlistButton, 'wishBtn')}
              productId={product.id}
              variant={product.variants[0]}
              aria-label="Add to Wishlist"
            />
          )}
        </div>
        
        <div className="action to_cart">
          {process.env.COMMERCE_CART_ENABLED && (
            <Button
              data-product-id = {product.id}
              aria-label="Add to Bag"
              type="button"
              className={afterCartText ? 'added-to-bag-button ' +  s.button : s.button }
              onClick={(event) => {
                addToCart(event, null)
              }}
              loading={loading}
              afterCartText={afterCartText}
              disabled={variant?.inventory.isInStock === false}
            >
              {variant?.inventory.isInStock === false
                ? 'Not Available'
                : afterCartText?<span className="added-to-bag">ADDED TO BAG <CheckMark /></span>:'ADD TO BAG'}
            </Button>
          )}


        </div>

        {variant?.inventory.isInStock === false
          ?<div className='out_of_stock_modal'>
            <div className="notify-section inline-page">
              <form className="notify-form">
                <input
                  type="text"
                  placeholder="Youremail@mail.com"
                  className="form-input"
                />
                <button
                  type="submit"
                  placeholder="Youremail@mail.com"
                  className="form-input"
                >
                  Notify Me When Available
                </button>
                <p>Be notified when this Item is back in stock</p>
              </form>
            </div> 
          </div> 
          :" "
        }

      </div>
    </div>
  )
}

export default ProductSidebar
