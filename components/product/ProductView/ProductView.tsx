import cn from 'classnames'
import Image from 'next/image'
import { NextSeo } from 'next-seo'
import s from './ProductView.module.css'
import { FC } from 'react'
import type { Product } from '@commerce/types/product'
import usePrice from '@framework/product/use-price'
import { WishlistButton } from '@components/wishlist'
import { ProductSlider, ProductCard } from '@components/product'
import { Container, Collapse, Text, Rating } from '@components/ui'
import ProductSidebar from '../ProductSidebar'
import ProductTag from '../ProductTag'
import Head from "next/head";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import getConfig from "next/config"
import Link from 'next/link'

interface ProductViewProps {
  product: Product
  relatedProducts: Product[]
  variants: any
  currentVariant: any
  skuChange: any
  reviews: any
  ratings: any
}

const { publicRuntimeConfig } = getConfig()

const ProductView: FC<ProductViewProps> = ({ product, relatedProducts, variants, currentVariant, skuChange, reviews, ratings }) => {

  // console.log(reviews)

  const productSku = currentVariant.data ? currentVariant.data[0].sku : ''
  const currentSwatchId = currentVariant.data ? currentVariant.data[0].option_values[0].id : ''
  const currentSwatchLabel = currentVariant.data ? currentVariant.data[0].option_values[0].label : ''
  const currentSwatchImg = publicRuntimeConfig.COLOR_SWATCH_URL + "/product_images/attribute_value_images/" + currentSwatchId + ".preview.jpg"

  const { SOCIALANNEX_TEMPLATE_ID } = process.env

  const productImage = product.images[0] ? product.images[0].url : ''

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 767 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 767, min: 0 },
      items: 1.5
    }
  };

  function getPrice(product: any) {
    const { price } = usePrice({
      amount: product.price.value,
      baseAmount: product.price.retailPrice,
      currencyCode: product.price.currencyCode!,
    })
    return price;
  }

  return (
    <>
      <Container className="max-w_none w_full container_page PDPView" clean>
        <div className="productInfo mobile_view">
          <h1 className="productView-title">{product.name}</h1>
          <div className="flex flex-row items-left reviews-section">
            <Text
              className="product-reviews-top top-review-custom w-full"
              html={reviews.topContent || reviews.topContent}
            />
          </div>
          <div className="product-sku">
            SKU: {productSku}
          </div>
        </div>

        {currentVariant && variants ? (

          <div className={cn(s.root, 'fit PDPcontainer')}>
            <div className={cn(s.main, 'fit productIMG')}>
              <div className={cn(s.sliderContainer, 'bgColor')}>
                <ProductSlider key={product.id} viewCount={5}>
                  {product.images.map((image, i) => (
                    <div key={currentVariant.data[0].image_url} className={s.imageContainer}>
                      <Image
                        className={s.img}
                        src={image.url!}
                        alt={image.alt || 'Product Image'}
                        width={292}
                        height={609}
                        priority={i === 0}
                        quality="100"
                      />
                    </div>
                  ))}
                </ProductSlider>
                <div className="selected_swatch_details">
                  <div className="selected_swatch_label">{currentSwatchLabel}</div>
                  <img className="selected_swatch_thumb" src={currentSwatchImg} />
                </div>
              </div>
            </div>
            <ProductSidebar product={product} className={cn(s.sidebar, 'productInfo fit')} variants={variants} currentVariant={currentVariant.data[0]} skuChange={skuChange} reviews={reviews} />
          </div>

        ) : ""}

        <div className="mt-2 TabsSection">

          <Tabs>
            <TabList>
              <Tab>Description</Tab>
              <Tab>Feature & Details</Tab>
              <Tab>Shipping & Returns</Tab>
            </TabList>

            <TabPanel>
              <Text
                className="pb-4 break-words w-full max-w-xl"
                html={product.descriptionHtml || product.description}
              />
            </TabPanel>
            <TabPanel>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </TabPanel>
            <TabPanel>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </TabPanel>
          </Tabs>
        </div>

        <section className="py-12 px-6 mb-10 BoughtSection">
          <Text variant="sectionHeading">Bought also Bought</Text>
          <Carousel
            responsive={responsive}
            arrows={true}
            showDots={true}
            infinite={true}
          >
            {relatedProducts.map((p) => (
              <Link href={`/${p.slug ? p.slug.replace('.html', '') : p.slug}`}>
                <div key={p.path} className="animated fadeIn ItemPro">
                  <img src={p.images[0]?.url!} />
                  <div className="produtDetails">
                    <h5>{p.name}</h5>
                    <p>{getPrice(p)}</p>
                  </div>
                </div>
              </Link>
            ))}
          </Carousel>
        </section>
        {reviews ? (
          <section className="py-12 px-6 mb-10 ReviewsSection">
            <div className="review_bottom">
              <h2 className="Text_sectionHeading__2H2XC">Reviews</h2>
              <div className="product_reviews">
                <h3>All Comments ({reviews.total})</h3>
                {reviews.results.map((preview: any, i: number) => {

                  let date = new Date(preview.review.dateCreated);
                  let reviewDate = `${date.getDate()} - ${date.getMonth()} - ${date.getFullYear()}`;

                  return (
                    <div key={i} className="review-item">
                      <div className="review-details">
                        <div className="customer-name">
                          {preview.customer ? (
                            <>
                              {preview.customer.profileImageUrl ? (
                                <img src={preview.customer.profileImageUrl} />
                              ) : (
                                <img src="/user.jpg" />
                              )}

                              <p>
                                {preview.customer.name ? (
                                  preview.customer.name
                                ) : (
                                  preview.customer.firstName + ' ' + preview.customer.lastName
                                )
                                }
                                <span className="review-date">{reviewDate}</span>
                              </p>
                            </>
                          ) : (
                            <>
                              <img src="/user.jpg" />
                              <p>
                                {preview.review.email}
                                <span className="review-date">{reviewDate}</span>
                              </p>
                            </>
                          )}

                        </div>
                        <div className="review-ratings">
                          {preview.review.rating > 0 ? (
                            <img src={'/' + preview.review.rating + 'star.png'} />
                          ) : ''}
                        </div>
                      </div>

                      <div className="review-body">
                        <h4>{preview.review.title}</h4>
                        <Text
                          className="break-words w-full max-w-xl"
                          html={preview.review ? preview.review.body : ''}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>
        ) : ''}
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
