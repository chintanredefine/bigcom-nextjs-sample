import { FC, useState, useEffect } from 'react'
import cn from 'classnames'
import Link from 'next/link'
import Image from 'next/image'
import s from './WishlistCard.module.css'
import { Trash } from '@components/icons'
import { Button, Text } from '@components/ui'

import style from '@components/ProfileInnerPages/ProfileInner.module.css'
import AddToCartPlus from '@assets/sleekshop-new-svg/addToCartPlus.svg'
import CloseSvg from '@assets/sleekshop-new-svg/close.svg'

import { useUI } from '@components/ui/context'
import type { Product } from '@commerce/types/product'
import usePrice from '@framework/product/use-price'
import useAddItem from '@framework/cart/use-add-item'
import useRemoveItem from '@framework/wishlist/use-remove-item'
import useWishlist from '@framework/wishlist/use-wishlist'

import Modals from '../Modals/AddToCartModal'

interface Props {
  product: Product
}

const placeholderImg = '/product-img-placeholder.svg'

const WishlistCard: FC<Props> = ({ product }) => {
  const { price } = usePrice({
    amount: product.price?.value,
    baseAmount: product.price?.retailPrice,
    currencyCode: product.price?.currencyCode!,
  })
  // @ts-ignore Wishlist is not always enabled
  const removeItem = useRemoveItem({ wishlist: { includeProducts: true } })
  const [loading, setLoading] = useState(false)
  const [removing, setRemoving] = useState(false)

  const [ShowPartialProductDetailsPage, setShowPartialProductDetailsPage] =
    useState(false)

  const [itemCountState, setitemCountState] = useState({
    val: 1,
    status: '',
    diableAddToCart: false,
  })

  // TODO: fix this missing argument issue
  /* @ts-ignore */
  const addItem = useAddItem()
  const { openSidebar } = useUI()
  const { data } = useWishlist()

  const handleRemove = async () => {
    setRemoving(true)
    // console.log('productIdToRemove', product.id!)

    try {
      // If this action succeeds then there's no need to do `setRemoving(true)`
      // because the component will be removed from the view
      console.log('product which has to be deleted ', product)

      const itemInWishlist = data?.items?.find(
        // @ts-ignore Wishlist is not always enabled
        (item) =>
          item.product_id === Number(product.id) &&
          (item.variant_id as any) === Number(product.variants[0].id)
      )

      if (itemInWishlist) {
        let deleteRes = await removeItem({ id: itemInWishlist.id! })
        console.log('after delete ==> ', deleteRes, 'product.id', product.id)
      }
    } catch (error) {
      // console.log('error while removing wishlist ', error)

      setRemoving(false)
    }
  }
  const addToCart = async () => {
    setLoading(true)

    try {
      await addItem({
        productId: String(product.id),
        variantId: String(product.variants[0].id),
        quantity: itemCountState.val,
      })

      openSidebar()
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }

  const handleDecrement = () => {
    if (itemCountState.val > 1) {
      setitemCountState((prevState) => ({
        ...prevState,
        val: itemCountState.val - 1,
      }))

      // if (itemCountState.val - 1 <= 3) {
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

  // useEffect(() => {
  //   console.log('wishlist ', product)
  // }, [product])

  return (
    // <div className={cn(s.root, { 'opacity-75 pointer-events-none': removing })}>
    //   <div className={`col-span-3 ${s.productBg}`}>
    //     <Image
    //       src={product.images[0]?.url || placeholderImg}
    //       width={400}
    //       height={400}
    //       alt={product.images[0]?.alt || 'Product Image'}
    //     />
    //   </div>

    //   <div className="col-span-7">
    //     <h3 className="text-2xl mb-2">
    //       <Link href={`/product${product.path}`}>
    //         <a>{product.name}</a>
    //       </Link>
    //     </h3>
    //     <div className="mb-4">
    //       <Text html={product.description} />
    //     </div>
    //     <Button
    //       aria-label="Add to Cart"
    //       type="button"
    //       className={
    //         'py-1 px-3 border border-secondary rounded-md shadow-sm hover:bg-primary-hover'
    //       }
    //       onClick={addToCart}
    //       loading={loading}
    //     >
    //       Add to Cart
    //     </Button>
    //   </div>
    //   <div className="col-span-2 flex flex-col justify-between">
    //     <div className="flex justify-end font-bold">{price}</div>
    //     <div className="flex justify-end">
    //       <button onClick={handleRemove}>
    //         <Trash />
    //       </button>
    //     </div>
    //   </div>
    // </div>

    <>
      {ShowPartialProductDetailsPage && (
        <Modals
          setShowPartialProductDetailsPage={setShowPartialProductDetailsPage}
          ShowPartialProductDetailsPage={ShowPartialProductDetailsPage}
          CurrentObj={product}
        />
      )}

      <div className="productCard">
        <div className="d-flex align-items-center justify-content-end closeSvg">
          <button onClick={handleRemove}>
            <CloseSvg />
          </button>
        </div>

        <div className="productCardImgParent">
          <img
            className="ProductImg"
            src={product.images[0]?.url}
            alt={product.images[0]?.alt || 'Product Image'}
          />
        </div>
        <div className="Product-Model-Parent mt-3">
          <p className="Product-Model">SKU: {product.id}</p>
        </div>
        <div className="mt-2 orderNameP">
          <Link href={`${product.path?.replace('.html', '')}`}>
            <p className="Product-Name">{product.name}</p>
          </Link>
        </div>
        <div className="productBrandP mt-2">
          {/* <p className="Product-brand ">{product.brand}</p> */}
        </div>
        <div className="pPrice_AddToCartP">
          <div className="mt-2 d-flex align-items-center justify-content-between pPrice_AddToCart ">
            <p className="Product-price">{price}</p>
            <p
              className="addToCartButton"
              onClick={() => {
                setShowPartialProductDetailsPage(true)
              }}
            >
              <AddToCartPlus />
            </p>
          </div>
        </div>

        <div className="AddToCartOnHover">
          <div className={`${style.incrementParent}`}>
            <div className={`${style.AddToCartOnHover_0ne}`}>
              {/* ===================Qty Text=================== */}
              <span className={`${style.QtyText}`}>QTY</span>

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
          <button
            // disabled={Boolean(
            //   handleRenderingItemCount(index, itemCountState)[2]
            // )}
            className="h6AddToCart"
            onClick={addToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  )
}

export default WishlistCard
