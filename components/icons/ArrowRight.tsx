import Image, { ImageProps } from 'next/image'

import ArrowRightSvg from '@assets/sleekshop-new-svg/arrow-right.svg'

const ArrowRight = ({ ...props }) => {
  return (
    // <Image
    //   src="https://cdn6.bigcommerce.com/s-hmhnh4h9/product_images/uploaded_images/arrow-r.png"
    //   width="27"
    //   height="47"
    // ></Image>
    <ArrowRightSvg />
  )
}

export default ArrowRight
