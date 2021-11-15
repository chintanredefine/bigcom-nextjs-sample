import type { GetStaticPropsContext } from 'next'
import commerce from '@lib/api/commerce'
import { Bag } from '@components/icons'
import { Layout } from '@components/common'
import { Container, Text } from '@components/ui'
import { useState } from 'react'

import ProfileHead from '@components/common/ProfileNavlink/profile_head'
import AddPayment from '@components/checkout/PaymentWidget/PaymentWidget'
import AddPaymentForm from '@components/checkout/PaymentMethodView/PaymentMethodView'

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const { pages } = await pagesPromise
  const { categories } = await siteInfoPromise

  return {
    props: { pages, categories },
  }
}

export default function Orders() {
  const [isValid, setisValid] = useState(false)

  return (
    // <Container>
    //   <div className="container">
    <div className="account account--fixed">
      <h2 className="page-heading">Rewards</h2>
      <ProfileHead />

      <div className="flex-1 p-24 flex flex-col justify-center items-center ">
        <span className="border border-dashed border-secondary rounded-full flex items-center justify-center w-16 h-16 p-12 bg-primary text-primary">
          <Bag className="absolute" />
        </span>
        <h2 className="pt-6 text-2xl font-bold tracking-wide text-center">
          No Payment method(s) found
        </h2>
      </div>

      <div onClick={() => setisValid(true)}>
        {isValid ? <AddPaymentForm /> : <AddPayment isValid={isValid} />}
      </div>
    </div>
    //   </div>
    // </Container>
  )
}

Orders.Layout = Layout
