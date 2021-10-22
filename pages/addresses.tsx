import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

import commerce from '@lib/api/commerce'
import useCustomer from '@framework/customer/use-customer'
import { useEffect, useState } from "react"
import { useRouter } from "next/router";
import { Bag } from '@components/icons'
import { Layout } from '@components/common'
import { Container, Text } from '@components/ui'
//import useAddresses from '@framework/customer/address/use-addresses'


interface OrdersProps {
  cdata: []
}



export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
 const  {data: customer } =  useCustomer()
 const cdata = await data

  
 return {
    props: {
        cdata
    },
    revalidate: 60,
  }
    
 
}


export default function Orders({
  cdata
}: InferGetStaticPropsType<typeof getStaticProps>) {
console.log(cdata)

/*const [adata, setVariants] = useState<string>('')

// const { data, isLoading, isEmpty } = useAddresses({ })
  let cid = customer?.entityId

  useEffect(()=>{

      if(cid){
        fetch('https://www.redefinesolutions.com/sleekshop/getAddresses.php?customer_id='+cid)
          .then(response => response.json())
          .then(response => setVariants(response))
          .catch(error => setVariants(error));

       
      }

      
     

        
      
    },[cid])

  console.log(adata)*/

   /* const res = fetch(
      'https://www.redefinesolutions.com/sleekshop/getAddresses.php?customer_id='+customer?.entityId
      
    )
    const adata = res.json()
    */

      
  return (
    <Container>
     <div className="container">
    <div className="account account--fixed">
      <h2 className="page-heading">Addresses</h2>
       <nav className="navBar navBar--sub navBar--account">
            <ul className="navBar-section">
                <li className="navBar-item"><a className="navBar-action" href="/profile">Account Settings</a></li>
                <li className="navBar-item"><a href="/orders" className="navBar-action">Orders</a></li>
                <li className="navBar-item"><a className="navBar-action" href="/rewards">REWARDS</a></li>
                <li className="navBar-item"><a className="navBar-action" href="/messages">Messages</a></li>
                <li className="navBar-item is-active"><a className="navBar-action" href="javascript:void(0)">Addresses</a></li>
                <li className="navBar-item"><a className="navBar-action" href="/payments">Payment Methods</a></li>
                <li className="navBar-item"><a className="navBar-action" href="/wishlist">Wish Lists</a></li>
                <li className="navBar-item"><a className="navBar-action" href="/account.php?action=recent_items">Recently Viewed</a></li>
            </ul>
        </nav>
      <div className="flex-1 p-24 flex flex-col justify-center items-center ">
        <div className="account-body">
            <ul className="addressList">
                
            </ul>
        </div>
        
        
       
        
      </div>
      </div>
      </div>
    </Container>
  )
}

Orders.Layout = Layout
