import { FC } from 'react'
import cn from 'classnames'
import Link from 'next/link'
import type { Product } from '@commerce/types/product'
import s from './ProductCard.module.css'
import Image, { ImageProps } from 'next/image'
import WishlistButton from '@components/wishlist/WishlistButton'
import usePrice from '@framework/product/use-price'
import ProductTag from '../ProductTag'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
interface Props {
  className?: string
  product: Product
  noNameTag?: boolean
  imgProps?: Omit<ImageProps, 'src' | 'layout' | 'placeholder' | 'blurDataURL'>
  variant?: 'default' | 'slim' | 'simple'
}

const placeholderImg = '/product-img-placeholder.svg'

const ProductCard: FC<Props> = ({
  product,
  imgProps,
  className,
  noNameTag = false,
  variant = 'default',
}) => {
  const { price } = usePrice({
    amount: product.price.value,
    baseAmount: product.price.retailPrice,
    currencyCode: product.price.currencyCode!,
  })

  const rootClassName = cn(
    s.root,
    { [s.slim]: variant === 'slim', [s.simple]: variant === 'simple' },
    className
  )

  const router = useRouter()

  let newProductSlug = product?.slug?.replace('.html', '')

  // console.log(
  //   'router in productCard.tsx 1234',
  //   router,
  //   'product?.slug',
  //   product?.slug
  // )

  if (router.asPath && router.asPath !== '/' && router.asPath !== '/search') {
    newProductSlug = newProductSlug?.replace('products/', '')
  }

  const handleSetCookie = (newProductId: any) => {
    let newCookie: any[] = []

    let oldCookie = Cookies.get('recently_viewed_products') || '[]'

    if (oldCookie && oldCookie.length > 2) {
      const parsedCookie = JSON.parse(oldCookie)

      if (parsedCookie.indexOf(newProductId) === -1) {
        parsedCookie.push(newProductId)
        newCookie.push(...parsedCookie)
        return
      } else {
        newCookie.push(...parsedCookie)
        return
      }
    } else {
      newCookie.push(newProductId)
    }

    const stringifyNewProduct = JSON.stringify(newCookie)

    Cookies.set('recently_viewed_products', stringifyNewProduct, {
      expires: 1,
    })
  }

  return (
    <div className="a-ProductCard" onClick={() => handleSetCookie(product.id)}>
      <Link href={`${newProductSlug}`}>
        <a>
          {variant === 'slim' && (
            <>
              <div className="product-main-image">
                {product?.images && (
                  <Image
                    quality="100"
                    src={product.images[0]?.url || placeholderImg}
                    alt={product.name || 'Product Image'}
                    layout="fill"
                    objectFit="contain"
                  />
                )}
              </div>
              <div className="name_header">
                <span>{product.name}</span>
              </div>
            </>
          )}

          {variant === 'simple' && (
            <>
              {process.env.COMMERCE_WISHLIST_ENABLED && (
                <WishlistButton
                  className={s.wishlistButton}
                  productId={product.id}
                  variant={product.variants[0]}
                />
              )}
              <div className={s.imageContainer}>
                <div className="product-main-image">
                  {product?.images && (
                    <Image
                      alt={product.name || 'Product Image'}
                      className={s.productImage}
                      src={product.images[0]?.url || placeholderImg}
                      height={540}
                      width={540}
                      quality="85"
                      layout="responsive"
                      {...imgProps}
                    />
                  )}
                </div>
              </div>
              {!noNameTag && (
                <div className="name_header">
                  <h3 className={s.name}>
                    <span>{product.name}</span>
                  </h3>
                  <div className={s.price}>
                    {`${price} ${product.price?.currencyCode}`}
                  </div>
                </div>
              )}
            </>
          )}

          {variant === 'default' && (
            <>
              {process.env.COMMERCE_WISHLIST_ENABLED && (
                <WishlistButton
                  className={s.wishlistButton}
                  productId={product.id}
                  variant={product.variants[0] as any}
                />
              )}
              <ProductTag
                name={product.name}
                price={`${price} ${product.price?.currencyCode}`}
              />
              <div className={s.imageContainer}>
                {product?.images && (
                  <Image
                    alt={product.name || 'Product Image'}
                    className={s.productImage}
                    src={product.images[0]?.url || placeholderImg}
                    height={540}
                    width={540}
                    quality="85"
                    layout="responsive"
                    {...imgProps}
                  />
                )}
              </div>
            </>
          )}
        </a>
      </Link>
    </div>
  )
}

export default ProductCard
