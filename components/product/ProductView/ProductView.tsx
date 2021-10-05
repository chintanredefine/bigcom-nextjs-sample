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
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

interface ProductViewProps {
  product: Product
  relatedProducts: Product[]
  variants: any
  currentVariant: any
  skuChange: any
}

const ProductView: FC<ProductViewProps> = ({ product, relatedProducts, variants, currentVariant, skuChange }) => {
 
  const productSku = currentVariant.data ? currentVariant.data[0].sku : ''

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

  function getPrice(product: any){
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
        <div className="flex flex-row items-center reviews-section">
          <Rating value={4} />
          <div className="text-accent-6 pl-3 pr-1 font-medium text_size">203 Reviews</div>
        </div>
        <div className="product-sku">
          SKU: {productSku}
        </div>
      </div>
        
        {currentVariant && variants  ? (

        <div className={cn(s.root, 'fit PDPcontainer')}>
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
          </div>
          <ProductSidebar product={product} className={cn(s.sidebar,'productInfo fit')} variants={variants} currentVariant={currentVariant.data[0]} skuChange={skuChange} />
        </div>

        ) : "" }

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
                <div key={p.path} className="animated fadeIn ItemPro">
                  <img src={p.images[0]?.url!} />
                  <div className="produtDetails">
                    <h5>{p.name}</h5>
                    <p>{getPrice(p)}</p>
                  </div>
                </div>
              ))}
            </Carousel>          
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
