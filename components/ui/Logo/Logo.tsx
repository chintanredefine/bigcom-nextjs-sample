import Image from 'next/image'

const Logo = ({ className = '', ...props }) => (
  <Image
    src="https://cdn11.bigcommerce.com/s-hmhnh4h9/images/stencil/original/sleekshop_logo_250x34px_1565895760__32121.original.png"
    width="250"
    height="34"
    alt="Sleekshop Logo"
  ></Image>
)

export default Logo
