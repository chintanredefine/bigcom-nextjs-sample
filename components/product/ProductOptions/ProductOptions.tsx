import s from '../ProductSidebar/ProductSidebar.module.css'
import cn from 'classnames'
import { Swatch } from '@components/product'
import { useAddItem } from '@framework/cart'
import type { Product } from '@commerce/types/product'
import type { ProductOption } from '@commerce/types/product'
import { SelectedOptions } from '../helpers'
import React, { useState } from 'react'
import getConfig from 'next/config'
import { Cross } from '@components/icons'
import { Button } from '@components/ui'
import { WishlistButton } from '@components/wishlist'
import useCart from '@framework/cart/use-cart'

interface ProductOptionsProps {
  options: ProductOption[]
  selectedOptions: SelectedOptions
  setSelectedOptions: React.Dispatch<React.SetStateAction<SelectedOptions>>
  product: any
  variants: any
  currentVariant: any
  skuChange: any
}

const { publicRuntimeConfig } = getConfig()

const ProductOptions: React.FC<ProductOptionsProps> = React.memo(
  ({
    options,
    selectedOptions,
    setSelectedOptions,
    product,
    variants,
    currentVariant,
    skuChange,
  }) => {
    const { data } = useCart()

    const cartItems = data ? data.lineItems : []

    let items: any = []
    for (const item of cartItems) {
      items[item.variantId] = item.quantity
    }

    const addItem = useAddItem()
    const [loading, setLoading] = useState(false)

    const addToCart = async (
      element: any,
      inputSearch: any,
      varientQty: any
    ) => {
      inputSearch = document.getElementById('selected_variant')

      element = document.getElementById('option_cart_btn')
      element.classList.add('cart-checked')

      varientQty = document.getElementById('varient_qty')
      var cartQty = varientQty.value

      let variant_id = inputSearch.value
      setLoading(true)

      try {
        await addItem({
          quantity: Number(cartQty),
          productId: String(product.id),
          variantId: String(variant_id ? variant_id : product.variants[0].id),
        })
        setLoading(false)
      } catch (err) {
        setLoading(false)
      }
    }

    const customclass = 'color-swatch'

    function loadOptions(va: any) {
      let sku = va.sku.toLowerCase()
      skuChange(sku)
    }

    function handleSearch(input: any, ul: any, li: any) {
      var filter, a, i, txtValue
      input = document.getElementById('shade_search')
      filter = input.value.toUpperCase()
      ul = document.getElementById('alloptions')
      if (filter) {
        ul.classList.add('search_start')
      } else {
        ul.classList.remove('search_start')
      }
      li = ul.getElementsByTagName('button')
      for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName('div')[0]
        txtValue = a.textContent || a.innerText
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = ''
          li[i].classList.add('filter_result')
        } else {
          li[i].style.display = 'none'
          li[i].classList.remove('filter_result')
        }
      }
    }

    function handleSearchModal(
      input: any,
      ul: any,
      li: any,
      f: any,
      ftype: any
    ) {
      var filter, a, i, txtValue
      input = document.getElementById('shade_search_modal')
      filter = input.value.toUpperCase()

      ul = document.getElementById('alloptions_modal')
      if (filter) {
        ul.classList.add('search_start')
      } else {
        ul.classList.remove('search_start')
      }

      f = document.getElementById('filter_type')
      ftype = f.value

      if (ftype == 'instock') {
        li = ul.getElementsByClassName('color_enabled')
      } else {
        li = ul.getElementsByClassName('color_disabled')
      }
      for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName('div')[0]
        txtValue = a.textContent || a.innerText
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = ''
          li[i].classList.add('filter_result')
        } else {
          li[i].style.display = 'none'
          li[i].classList.remove('filter_result')
        }
      }
    }

    function filterInStockOptions(
      element: any,
      stockEvent: any,
      ul: any,
      li: any,
      f: any
    ) {
      var i

      stockEvent = document.getElementById('out_of_stock_filter')
      stockEvent.classList.remove('active')
      element = document.getElementById('in_stock_filter')
      element.classList.add('active')

      f = document.getElementById('filter_type')
      f.value = 'instock'

      ul = document.getElementById('alloptions_modal')
      li = ul.getElementsByTagName('button')
      for (i = 0; i < li.length; i++) {
        var isDisabled = li[i].classList.contains('color_disabled')
        if (!isDisabled) {
          li[i].style.display = ''
        } else {
          li[i].style.display = 'none'
        }
      }
    }

    function filterOutOfStockOptions(
      element: any,
      stockEvent: any,
      ul: any,
      li: any,
      f: any
    ) {
      var i

      stockEvent = document.getElementById('in_stock_filter')
      stockEvent.classList.remove('active')
      element = document.getElementById('out_of_stock_filter')
      element.classList.add('active')

      f = document.getElementById('filter_type')
      f.value = 'outofstock'

      ul = document.getElementById('alloptions_modal')
      li = ul.getElementsByTagName('button')
      for (i = 0; i < li.length; i++) {
        var isDisabled = li[i].classList.contains('color_disabled')
        if (isDisabled) {
          li[i].style.display = ''
        } else {
          li[i].style.display = 'none'
        }
      }
    }

    function viewMoreShow(element: any, x: any) {
      x = document.getElementById('all_options_list')
      x.style.display = 'block'

      element = document.getElementById('modal_overlay')
      element.style.display = 'block'

      filterInStockOptions(element, null, null, null, null)
    }

    function viewLessShow(element: any, x: any, y: any) {
      element = document.getElementById('alloptions')
      element.classList.remove('show_all_options')

      x = document.getElementById('view_more')
      x.style.display = 'block'

      y = document.getElementById('view_less')
      y.style.display = 'none'
    }

    function changeToList(element: any) {
      element = document.getElementById('options_list')
      element.classList.remove('grid')
      element.classList.add('list')
    }

    function changeToGid(element: any) {
      element = document.getElementById('options_list')
      element.classList.remove('list')
      element.classList.add('grid')
    }

    function changeToListModal(element: any, x: any, y: any) {
      element = document.getElementById('all_options_list')
      element.classList.remove('grid')
      element.classList.add('list')

      x = document.getElementById('modal_grid_btn')
      x.classList.remove('active')
      y = document.getElementById('modal_list_btn')
      y.classList.add('active')
    }

    function changeToGridModal(element: any, x: any, y: any) {
      element = document.getElementById('all_options_list')
      element.classList.remove('list')
      element.classList.add('grid')

      x = document.getElementById('modal_grid_btn')
      x.classList.add('active')
      y = document.getElementById('modal_list_btn')
      y.classList.remove('active')
    }

    function modalClose(element: any, x: any, y: any, z: any) {
      element = document.getElementById('all_options_list')
      element.style.display = 'none'
      element.classList.remove('modal_option_fix')

      x = document.getElementById('modal_overlay')
      x.style.display = 'none'

      y = document.getElementById('selected_color_options')
      y.style.display = 'none'

      z = document.getElementById('disabled_color_options')
      z.style.display = 'none'
    }

    function pickColor(
      va: any,
      x: any,
      y: any,
      cimg: any,
      element: any,
      z: any,
      inputSearch: any,
      catbtn: any
    ) {
      let sku = va.sku.toLowerCase()
      let colorTitle = va.option_values ? va.option_values[0].label : ''

      inputSearch = document.getElementById('selected_variant')
      inputSearch.value = va.id

      catbtn = document.getElementById('option_cart_btn')
      catbtn.classList.remove('cart-checked')

      z = document.getElementById('all_options_list')
      z.classList.add('modal_option_fix')

      let cid = va.option_values ? va.option_values[0].id : ''
      let colorimg = va.image_url

      if (va.inventory_level > 0) {
        x = document.getElementById('selected_color_title')
        x.innerText = colorTitle

        y = document.getElementById('selected_color_sku')
        y.innerText = 'SKU: ' + sku

        cimg = document.getElementById('selected_color_img')
        cimg.src = colorimg

        element = document.getElementById('selected_color_options')
        element.style.display = 'block'
      } else {
        x = document.getElementById('disabled_color_title')
        x.innerText = colorTitle

        cimg = document.getElementById('disabled_color_img')
        cimg.src = colorimg

        element = document.getElementById('disabled_color_options')
        element.style.display = 'block'
      }
    }

    var minVal = 1,
      maxVal = 20 // Set Max and Min values

    function increaseQty(element: any) {
      element = document.getElementById('varient_qty')
      var qtyVal = element.value
      if (qtyVal < maxVal) {
        qtyVal++
      }
      element.value = qtyVal
    }
    function decreaseQty(element: any) {
      element = document.getElementById('varient_qty')
      var qtyVal = element.value
      if (qtyVal > 1) {
        qtyVal--
      }
      element.value = qtyVal
    }

    const totalVariants = variants.data ? variants.data.length : 0

    return (
      <div className="product-options">
        <div className="pb-6 grid" key="Options" id="options_list">
          <div className="flex justify-between">
            <h2 className="uppercase font-medium text-sm tracking-wide">
              Color
              <span className="option-title">
                {currentVariant.option_values
                  ? currentVariant.option_values[0].label
                  : ''}
              </span>
            </h2>
            <span id="shade_search_block">
              <input
                type="text"
                id="shade_search"
                placeholder="Shade Search"
                onKeyUp={(event) => {
                  handleSearch(event, null, null)
                }}
              />
            </span>
            <div className="mobile_options">
              <span
                className="grid_btn"
                onClick={(event) => {
                  changeToGid(event)
                }}
              >
                Grid
              </span>
              <span className="seperator">/</span>
              <span
                className="list_btn"
                onClick={(event) => {
                  changeToList(event)
                }}
              >
                List
              </span>
            </div>
          </div>
          <div className="option-section">
            <div
              id="alloptions"
              className="flex_div flex justify-between flex-wrap flex-row py-4"
            >
              <input
                id="selected_variant"
                type="hidden"
                value={currentVariant.id}
              />
              {variants.data.map((v: any, i: number) => {
                let pUrl = product.path.replace('.html', '')
                const opt = v.option_values[0]
                const active =
                  selectedOptions[opt.option_display_name.toLowerCase()]
                const swatch =
                  publicRuntimeConfig.COLOR_SWATCH_URL +
                  '/product_images/attribute_value_images/' +
                  opt.id +
                  '.preview.jpg'
                const isDisabled =
                  v.inventory_level == 0 ? ' color_disabled' : ' color_enabled'
                const itemQty = items ? items[v.id] : 0
                return (
                  <Swatch
                    key={`${opt.id}-${i}`}
                    active={currentVariant.sku == v.sku}
                    variant={opt.option_display_name}
                    color={v.hexColors ? v.hexColors[0] : ''}
                    image={swatch ? swatch : ''}
                    label={opt.label}
                    id={itemQty}
                    className={customclass + isDisabled}
                    onClick={(event) => {
                      loadOptions(v)
                    }}
                  />
                )
              })}
              {totalVariants > 17 ? (
                <div
                  className="moreOption expanderButton view-more-section innerOption"
                  id="view_more"
                >
                  <div
                    className="a-section a-spacing-none expanderBullet"
                    onClick={(event) => {
                      viewMoreShow(event, null)
                    }}
                  >
                    View All
                    <br /> Shades
                  </div>
                </div>
              ) : (
                ''
              )}
            </div>
            {totalVariants > 17 ? (
              <div
                className="moreOption expanderButton view-more-section"
                id="view_more"
              >
                <div
                  className="a-section a-spacing-none expanderBullet"
                  onClick={(event) => {
                    viewMoreShow(event, null)
                  }}
                >
                  View All
                  <br /> Shades
                </div>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>

        <div
          className="pb-6 grid options_modal"
          key="Options"
          id="all_options_list"
          style={{ display: 'none' }}
        >
          <div className="flex justify-between items-baseline headModal">
            <h2 className="uppercase font-medium text-sm tracking-wide">
              Color
            </h2>
            <div className="filter_middle">
              <button
                className="in-stock-btn active"
                id="in_stock_filter"
                aria-label="In Stock"
                type="button"
                onClick={(event) => {
                  filterInStockOptions(event, null, null, null, null)
                }}
              >
                In Stock
              </button>
              <button
                className="out-of-stock-btn"
                id="out_of_stock_filter"
                aria-label="Out Of Stock"
                type="button"
                onClick={(event) => {
                  filterOutOfStockOptions(event, null, null, null, null)
                }}
              >
                Out Of Stock
              </button>
            </div>
            <span id="shade_search_block">
              <input type="hidden" id="filter_type" defaultValue="instock" />
              <input
                type="text"
                id="shade_search_modal"
                placeholder="Shade Search"
                onKeyUp={(event) => {
                  handleSearchModal(event, null, null, null, null)
                }}
              />
            </span>
            <span
              className="modal_close_btn cursor-pointer"
              onClick={(event) => {
                modalClose(event, null, null, null)
              }}
            >
              <Cross />
            </span>
            <div className="mobile_options">
              <span
                className="grid_btn active"
                id="modal_grid_btn"
                onClick={(event) => {
                  changeToGridModal(event, null, null)
                }}
              >
                Grid
              </span>
              <span className="seperator">/</span>
              <span
                className="list_btn"
                id="modal_list_btn"
                onClick={(event) => {
                  changeToListModal(event, null, null)
                }}
              >
                List
              </span>
            </div>
          </div>
          <div className="option-section">
            <div
              id="alloptions_modal"
              className="flex_div flex justify-start flex-wrap flex-row py-4"
            >
              <input type="hidden" value={currentVariant.id} />
              {variants.data.map((v: any, i: number) => {
                let pUrl = product.path.replace('.html', '')
                const opt = v.option_values[0]
                const active =
                  selectedOptions[opt.option_display_name.toLowerCase()]
                const swatch =
                  publicRuntimeConfig.COLOR_SWATCH_URL +
                  '/product_images/attribute_value_images/' +
                  opt.id +
                  '.preview.jpg'
                const isDisabled =
                  v.inventory_level == 0 ? ' color_disabled' : ' color_enabled'
                const itemQty = items ? items[v.id] : 0
                return (
                  <Swatch
                    key={`${opt.id}-${i}`}
                    active={currentVariant.sku == v.sku}
                    variant={opt.option_display_name}
                    color={v.hexColors ? v.hexColors[0] : ''}
                    image={swatch ? swatch : ''}
                    label={opt.label}
                    id={itemQty}
                    className={customclass + isDisabled}
                    onClick={(event) => {
                      pickColor(v, null, null, null, null, null, null, null)
                    }}
                  />
                )
              })}
            </div>
          </div>

          <div
            className="selected_color_options"
            id="selected_color_options"
            style={{ display: 'none' }}
          >
            <h4>Color Selected</h4>
            <span
              className="modal_close_btn cursor-pointer"
              onClick={(event) => {
                modalClose(event, null, null, null)
              }}
            >
              <Cross />
            </span>
            <div className="option-title" id="selected_color_title">
              {currentVariant.option_values
                ? currentVariant.option_values[0].label
                : ''}
            </div>
            <div className="option-sku" id="selected_color_sku">
              SKU: {currentVariant.sku}
            </div>
            <img
              className="option-img"
              src={currentVariant.image_url}
              id="selected_color_img"
            />
            <div className="add_to_cart">
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
              <div className="option-price" id="selected_color_price">
                $ {currentVariant.price}
              </div>
              <div className="d-block h-9 qtyInput">
                <label
                  className="form-label form-label--alternate"
                  htmlFor="varient_qty"
                >
                  Qty
                </label>
                <div className="qty_section">
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
                      id="varient_qty"
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
              </div>

              <div className="action to_cart" id="option_cart_btn">
                {process.env.COMMERCE_CART_ENABLED && (
                  <Button
                    aria-label="Add to Bag"
                    type="button"
                    className={s.button}
                    onClick={(event) => {
                      addToCart(event, null, null)
                    }}
                    loading={loading}
                    disabled={currentVariant?.availableForSale === false}
                  >
                    {currentVariant?.availableForSale === false
                      ? 'Not Available'
                      : 'ADD TO BAG'}
                  </Button>
                )}
              </div>
            </div>
          </div>

          <div
            className="selected_color_options out_of_stock_modal"
            id="disabled_color_options"
            style={{ display: 'none' }}
          >
            <h4>Be Notified</h4>
            <span
              className="modal_close_btn cursor-pointer"
              onClick={(event) => {
                modalClose(event, null, null, null)
              }}
            >
              <Cross />
            </span>
            <div className="name_img">
              <div className="option-title" id="disabled_color_title">
                {currentVariant.option_values
                  ? currentVariant.option_values[0].label
                  : ''}
              </div>
              <img
                className="option-img"
                src={currentVariant.image_url}
                id="disabled_color_img"
              />
            </div>
            <div className="add_to_cart">
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
            </div>

            <div className="notify-section">
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
        </div>
      </div>
    )
  }
)

export default ProductOptions
