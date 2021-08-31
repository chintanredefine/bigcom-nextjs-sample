import s from './ProductSidebar.module.css'
import { useAddItem } from '@framework/cart'
import { FC, useEffect, useState } from 'react'
import { ProductOptions } from '@components/product'
import type { Product } from '@commerce/types/product'
import { Button, Text, Rating, Collapse, useUI } from '@components/ui'
import usePrice from '@framework/product/use-price'
import ProductTag from '../ProductTag'

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
}

const ProductSidebar: FC<ProductSidebarProps> = ({ product, className, variants, currentVariant, skuChange }) => {
  const addItem = useAddItem()
  const { openSidebar } = useUI()
  const [loading, setLoading] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({})

  useEffect(() => {
    selectDefaultOptionFromProduct(product, setSelectedOptions)
  }, [])

  const variant = getProductVariant(product, selectedOptions)

  const addToCart = async (inputSearch: any) => {
    inputSearch = document.getElementById("selected_variant")
    let variant_id =  inputSearch.value
    console.log(variant_id)
    setLoading(true)
    try {
      await addItem({
        productId: String(product.id),
        variantId: String(variant_id ? variant_id : product.variants[0].id),
      })
      openSidebar()
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }

  const { price } = usePrice({
    amount: product.price.value,
    baseAmount: product.price.retailPrice,
    currencyCode: product.price.currencyCode!,
  })

  var minVal = 1, maxVal = 20; // Set Max and Min values

  function increaseQty(element: any) {
      element = document.getElementById("qty")
      var qtyVal = element.value
      if (qtyVal < maxVal) {
        qtyVal++
      }
      element.value = qtyVal
  }
  function decreaseQty(element: any) {
    element = document.getElementById("qty")
    var qtyVal = element.value
    if (qtyVal > 1) {
      qtyVal--
    }
    element.value = qtyVal
  }

  const productSku = (currentVariant.sku).toLowerCase()

  return (
    <div className={className}>

      <div className="brandLogo">
        <a href="https://sleekshop.com/brands/Schwarzkopf-Professional.html">
          <div className="BrandImageDiv">
              <img className="brandlogo" src="https://cdn11.bigcommerce.com/s-hmhnh4h9/images/stencil/100x100/x/brand-image_1486972733__66079.original.jpg" />
          </div>
        </a>
      </div>
      <h2 className="productView-brand">
          <a href="https://sleekshop.com/brands/Schwarzkopf-Professional.html">
              View all products by <span>Schwarzkopf Professional</span>
          </a>
      </h2>
      <h1 className="productView-title">{product.name} - <span className="product_option_title">{currentVariant.option_values ? currentVariant.option_values[0].label : ''}</span></h1>

      <div className="flex flex-row justify-between items-center reviews-section">
        <Rating value={4} />
        <div className="text-accent-6 pr-1 font-medium text-sm">203 reviews</div>
      </div>
      <div className="product-sku">
        SKU: {productSku}
      </div>

      <div className="add_to_cart">
        <div className="product-price">
          {`${price}`}
        </div>

        <div className="flex flex-row h-9 qtyInput">
            <label className="form-label form-label--alternate" htmlFor="qty">Qty</label>

            <button type="button" className="Quantity_actions__wWpcD qtyLeft" onClick={(event) => {decreaseQty(event)}}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </button>
            <label className="w-full border-accent-2 border qtyField">
              <input className="Quantity_input__3q7WP qtyValue" id="qty" type="text" max="6" min="0" defaultValue="1" />
            </label>
            <button type="button" className="Quantity_actions__wWpcD qtyRight" onClick={(event) => {increaseQty(event)}}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 5V19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M5 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </button>
           <div className="form-field StockLevelWrap" style={{display: (currentVariant.inventory_level > 5 ? "none" : "block" ) }}>
              <p className="StockTest">ORDER SOON</p>
              <label className="form-field--stock form-label form-label--alternate">
                  <span className="current_opt_stock">{currentVariant.inventory_level}</span> Left in Stock
              </label>
          </div>
        </div>

        <div className="action">
          {process.env.COMMERCE_CART_ENABLED && (
            <Button
              aria-label="Add to Cart"
              type="button"
              className={s.button}
              onClick={addToCart}
              loading={loading}
              disabled={variant?.availableForSale === false}
            >
              {variant?.availableForSale === false
                ? 'Not Available'
                : 'Add To Cart'}
            </Button>
          )}
        </div>
      </div>


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
      
      <div className="mt-2">
        <Collapse title="Care">
          This is a limited edition production run. Printing starts when the
          drop ends.
        </Collapse>
        <Collapse title="Details">
          This is a limited edition production run. Printing starts when the
          drop ends. Reminder: Bad Boys For Life. Shipping may take 10+ days due
          to COVID-19.
        </Collapse>
      </div>
    </div>
  )
}

export default ProductSidebar
