import { Bag } from '@components/icons'
import { useState } from 'react'

import AddPayment from '@components/checkout/PaymentWidget/PaymentWidget'
import AddPaymentForm from '@components/checkout/PaymentMethodView/PaymentMethodView'

export default function Orders() {
  const [isValid, setisValid] = useState(false)

  return (
    <>
      <div
        className="MainContentInnerdiv mb-2 orderHistory d-flex justify-content-between"
        style={{ flexDirection: 'column' }}
      >
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
    </>
  )
}
