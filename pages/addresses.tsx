import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

import commerce from '@lib/api/commerce'
import useCustomer from '@framework/customer/use-customer'
import {useCommerce } from '@commerce'
import { useEffect, useState } from "react"
import { useRouter } from "next/router";
import { Bag } from '@components/icons'
import { Layout } from '@components/common'
import { Container, Text } from '@components/ui'
import Cookies from 'js-cookie'
//import useAddresses from '@framework/customer/address/use-addresses'


export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
 
  
 return {
    props: {
        //adata: []
    },
    revalidate: 60,
  }
    
 
}


export default function Orders({
  
}: InferGetStaticPropsType<typeof getStaticProps>) {

const [adata, setVariants] = useState<[]>([])

// const { data, isLoading, isEmpty } = useAddresses({ })
  
  const { data: customer } =   useCustomer()
        
  useEffect(()=>{

    const fetchData = async () => {
        //console.log(data)
        let cid = customer?.entityId
        
        
        if(customer && customer?.entityId)
        {
            const res = fetch('https://www.redefinesolutions.com/sleekshop/getAddresses.php?customer_id='+cid)
                        .then((response) => response.json())
                        .then((rs1) => {
                            setVariants(rs1[0])
                        })
            /*const {mdata} = await res.json()
            setVariants(mdata)
            console.log(mdata, res)
*/

       }
          
    }
    
    if(customer && customer?.entityId)
    {
       // console.log(customer + " - " + customer?.entityId)
        fetchData()

    }
        
      
    },[customer])

   


  //console.log(adata)

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

        {console.log("adata", adata)}
            <ul className="addressList">
            {Array.isArray(adata) && (adata.length > 0) ? ( 
                    <>
                    {adata.map((item: any) => {
                          return (
                                    <li key={item.id}  className="address">
                                    <div className="panel panel--address">
                                        <div className="panel-body">
                                            <h5 className="address-title">{item?.first_name} {item?.last_name}</h5>
                                            <ul className="address-details address-details--postal">
                                                <li>{item?.company}</li>
                                                <li>{item?.street_1}</li>
                                                <li>{item?.street_2}</li>
                                                <li>{item?.city}, {item?.state} {item?.zip}</li>
                                                <li>United States</li>
                                            </ul>
                                                <dl className="address-details">
                                                    <dt className="address-label">Phone:</dt>
                                                    <dd className="address-description">{item?.phone}</dd>
                                                </dl>
                                           <div className="form-actions">
                                                    <a className="button button--primary button--small" href="/account.php?action=edit_shipping_address&amp;address_id=60367&amp;from=account.php%3Faction%3Daddress_book">Edit</a>
                                                    <button type="submit" className="button secondary button--small">Delete</button>
                                                </div>
                                            
                                        </div>
                                    </div>
                                </li>
                          );
                        })}
                    </>
                    ) : ''}
                
            </ul>
        </div>
        
        
       
        
      </div>
      </div>
      </div>
    </Container>
  )
}

Orders.Layout = Layout
