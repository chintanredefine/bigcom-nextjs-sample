import type { GetStaticPropsContext } from 'next'
import { FC, useEffect, useState, useCallback } from 'react'
import useCustomer from '@framework/customer/use-customer'
import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import { Container, Text, Input, Button } from '@components/ui'


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


export default function Profile() {
  const { data } = useCustomer()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  console.log(data)
  /*const handleSignup = async (event: React.SyntheticEvent<EventTarget>) => {
    event.preventDefault() // don't redirect the page
    const res = await fetch(
      'https://www.redefinesolutions.com/sleekshop/updatecustomer.php?first_name='+firstName+'&last_name='+lastName+'&customerId='+data.entityId,
      
    )
    // where we'll add our form logic
  }*/

    const handleSignup = async (event: React.SyntheticEvent<EventTarget>) => {
    event.preventDefault() // don't redirect the page
    const res = await fetch(
      'https://www.redefinesolutions.com/sleekshop/updatecustomer.php',
      {
        mode: 'cors',
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName

        }),
        headers: {
          'Content-Type': 'application/json',
          'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
          'X-Request-Id': '505c99d89ea0296cce18636bfdce20bss',
          'Access-Control-Allow-Origin': "*",
          "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        },
        method: 'POST'
      }
    )
    // where we'll add our form logic
  }
  return (
    <Container>
    <div className="container">
    <div className="account account--fixed">
      <h2 className="page-heading">My Profile</h2>

      <nav className="navBar navBar--sub navBar--account">
    <ul className="navBar-section">
     <li className="navBar-item  is-active">
                <a className="navBar-action" href="javascript:void(0)">Account Settings</a>
            </li>
                <li className="navBar-item"><a href="/orders" className="navBar-action">Orders</a></li>
            <li className="navBar-item">
                <a className="navBar-action" href="/rewards ">REWARDS</a>
            </li>
        <li className="navBar-item">
            <a className="navBar-action" href="/messages">Messages</a>
        </li>
            <li className="navBar-item">
                <a className="navBar-action" href="/addresses">Addresses</a>
            </li>
                <li className="navBar-item">
                    <a className="navBar-action" href="/payments">Payment Methods</a>
                </li>
                <li className="navBar-item">
                    <a className="navBar-action" href="/wishlist">Wish Lists</a>
                </li>

            <li className="navBar-item">
                <a className="navBar-action" href="/account.php?action=recent_items">Recently Viewed</a>
            </li>
           
    </ul>
</nav>

      {data && (
         <form
      onSubmit={handleSignup}
      className="w-100 flex flex-col justify-between"
    >
        <div className="margin-0">
          <div className="width100">
            <div className="mb-6">
              <label className="form-label">First Name</label>
              <label>
               <Input  type="text" placeholder="First Name"  onChange={setFirstName} defaultValue={data.firstName} className="Input_root__2vmVG" />
              </label>
            </div>
            <div>
              <label className="form-label">Last Name</label>
              <label>
                <Input type="text" placeholder="Last Name"  onChange={setLastName} defaultValue={data.lastName} className="Input_root__2vmVG" />
              </label>
            </div>
            <div className="mt-5">
              <label className="form-label">Email</label>
              <label>{data.email}</label>
            </div>
            <div className="pt-2 w-full flex flex-col">
            <Button className="Button_root__24MxS Button_slim__2caxo"
            variant="slim"
            type="submit"
            
          >
            Update
          </Button>
          </div>
          </div>
        </div>
        </form>
      )}
      </div>
      </div>
    </Container>
  )
}

Profile.Layout = Layout
