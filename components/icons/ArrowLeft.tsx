import Image, { ImageProps } from 'next/image'
import ArrowLeftSvg from '@assets/sleekshop-new-svg/arrow-left.svg'
const ArrowLeft = ({ ...props }) => {
  return (
    // <Image
    //   src="https://cdn6.bigcommerce.com/s-hmhnh4h9/product_images/uploaded_images/arrow-l.png"
    //   width="27"
    //   height="47"
    // ></Image>
    <ArrowLeftSvg />
  )
}

export default ArrowLeft
