import cn from 'classnames'
import Image from 'next/image'
import { NextSeo } from 'next-seo'
import s from './ProductView.module.css'
import { FC } from 'react'
import type { Product } from '@commerce/types/product'
import usePrice from '@framework/product/use-price'
import { WishlistButton } from '@components/wishlist'
import { ProductSlider, ProductCard } from '@components/product'
import { Container, Text } from '@components/ui'
import ProductSidebar from '../ProductSidebar'
import ProductTag from '../ProductTag'
interface ProductViewProps {
  product: Product
  relatedProducts: Product[]
  variants: any
  currentVariant: any
  skuChange: any
}

const ProductView: FC<ProductViewProps> = ({ product, relatedProducts, variants, currentVariant, skuChange }) => {

  return (
    <>
      <Container className="max-w_none w_full container_page" clean>
        
        {currentVariant && variants  ? (

        <div className={cn(s.root, 'fit')}>
          <div className={cn(s.main, 'fit productIMG')}>
            <div className={cn(s.sliderContainer,'bgColor')}>
              <ProductSlider key={product.id}>
                {product.images.map((image, i) => (
                  <div key={currentVariant.data[0].image_url} className={s.imageContainer}>
                    <Image
                      className={s.img}
                      src={currentVariant.data[0].image_url!}
                      alt={image.alt || 'Product Image'}
                      width={600}
                      height={600}
                      priority={i === 0}
                      quality="85"
                    />
                  </div>
                ))}
              </ProductSlider>
            </div>
            {process.env.COMMERCE_WISHLIST_ENABLED && (
              <WishlistButton
                className={cn(s.wishlistButton,'wishBtn')}
                productId={product.id}
                variant={product.variants[0]}
              />
            )}
          </div>
          <ProductSidebar product={product} className={cn(s.sidebar,'productInfo fit')} variants={variants} currentVariant={currentVariant.data[0]} skuChange={skuChange} />
        </div>

        ) : "" }

        <hr className="mt-7 border-accent-2" />
        <section className="py-12 px-6 mb-10">
          <Text variant="sectionHeading">Related Products</Text>
          <div className={s.relatedProductsGrid}>
            {relatedProducts.map((p) => (
              <div
                key={p.path}
                className="animated fadeIn bg-accent-0 border border-accent-2"
              >
                <ProductCard
                  noNameTag
                  product={p}
                  key={p.path}
                  variant="simple"
                  className="animated fadeIn"
                  imgProps={{
                    width: 300,
                    height: 300,
                  }}
                />
              </div>
            ))}
          </div>
        </section>
      </Container>
      <NextSeo
        title={product.name}
        description={product.description}
        openGraph={{
          type: 'website',
          title: product.name,
          description: product.description,
          images: [
            {
              url: product.images[0]?.url!,
              width: 800,
              height: 600,
              alt: product.name,
            },
          ],
        }}
      />
    </>
  )
}

export default ProductView
