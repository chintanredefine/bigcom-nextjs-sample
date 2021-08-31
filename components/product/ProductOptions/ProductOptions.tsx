import { Swatch } from '@components/product'
import type { Product } from '@commerce/types/product'
import type { ProductOption } from '@commerce/types/product'
import { SelectedOptions } from '../helpers'
import React, {useState, useEffect} from "react"
import getConfig from "next/config"

interface ProductOptionsProps {
  options: ProductOption[]
  selectedOptions: SelectedOptions
  setSelectedOptions: React.Dispatch<React.SetStateAction<SelectedOptions>>
  product: any
  variants: any
  currentVariant: any
  skuChange: any
}

const {publicRuntimeConfig} = getConfig()

const ProductOptions: React.FC<ProductOptionsProps> = React.memo(
  ({ options, selectedOptions, setSelectedOptions, product, variants, currentVariant, skuChange }) => {

    const customclass = 'color-swatch'

    function loadOptions(va: any){
      let sku = (va.sku).toLowerCase()
      skuChange(sku)
    }

    function handleSearch(input: any, ul: any, li: any) {
      var filter,a, i, txtValue;
        input = document.getElementById("shade_search");
        filter = input.value.toUpperCase();

        ul = document.getElementById("alloptions");
        li = ul.getElementsByTagName("button");
        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName("div")[0];
            txtValue = a.textContent || a.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }
    }

    function viewMoreShow(element: any, x: any, y: any) {
      element = document.getElementById("alloptions");
      element.classList.add("show_all_options");

      x = document.getElementById("view_more");
      x.style.display = "none";

      y = document.getElementById("view_less");
      y.style.display = "block";
    }

    function viewLessShow(element: any, x: any, y: any) {
      element = document.getElementById("alloptions");
      element.classList.remove("show_all_options");

      x = document.getElementById("view_more");
      x.style.display = "block";

      y = document.getElementById("view_less");
      y.style.display = "none";
    }

    return (
      <div className="product-options">
          <div className="pb-4" key="Options">
            <h2 className="uppercase font-medium text-sm tracking-wide">
              Options <span className="option-title"> {currentVariant.option_values ? currentVariant.option_values[0].label : ''} </span>
            </h2>
            <div className="option-section">
              <span id="shade_search_block">
                <input type="text" id="shade_search" placeholder="SEARCH BY COLOR" onKeyUp={(event) => {handleSearch(event,null,null)}} />
              </span>
              <div id="alloptions" className="flex_div flex justify-between flex-wrap flex-row py-4">
              <input id="selected_variant" type="hidden" value={currentVariant.id} />
                {variants.data.map((v: any, i: number) => {
                  let pUrl = product.path.replace('.html', '')
                  const opt = v.option_values[0]
                  const active = selectedOptions[opt.option_display_name.toLowerCase()]
                  const swatch = publicRuntimeConfig.COLOR_SWATCH_URL + "/stencil/70x68/attribute_value_images/"+opt.id+".preview.jpg"
                  return (
                    <Swatch
                      key={`${opt.id}-${i}`}
                      active={currentVariant.sku == v.sku}
                      variant={opt.option_display_name}
                      color={v.hexColors ? v.hexColors[0] : ''}
                      image={swatch ? swatch : ''}
                      label={opt.label}
                      className={customclass}
                      disabled={v.inventory_level == 0 ? true : false}
                      onClick={(event) => {loadOptions(v)}}
                    />
                  )
                })}
              </div>
              <div className="moreOption expanderButton view-more-section" id="view_more">
                <div className="a-section a-spacing-none expanderBullet" onClick={(event) => {viewMoreShow(event, null,null)}}>
                  View More
                  <span className="icon">
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" shapeRendering="geometricPrecision" className="Collapse_icon__1PlZL Collapse_open__mXeI0">
                      <path d="M9 18l6-6-6-6"></path>
                    </svg>
                  </span>
                </div>
              </div>

              <div className="moreOption expanderButton view-less-section" id="view_less" style={{ display: "none" }}>
                <div className="a-section a-spacing-none expanderBullet" onClick={(event) => {viewLessShow(event,null,null)}}>
                  View Less
                  <span className="icon">
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" shapeRendering="geometricPrecision" className="Collapse_icon__1PlZL Collapse_open__mXeI0">
                      <path d="M9 18l6-6-6-6"></path>
                    </svg>
                  </span>
                </div>
              </div>

            </div>
          </div>
      </div>
    )
  }
)

export default ProductOptions
