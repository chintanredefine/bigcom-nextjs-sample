import useCustomer from '@framework/customer/use-customer'
import { useEffect, useState } from 'react'
import { useUI } from '@components/ui'

import EditAddressCompo from '@components/ShippingAddress/edit_shipping_address'
import AddAddressCompo from '@components/ShippingAddress/add_address'

import style from '@assets/css/addresses.module.css'

export default function Address() {
  const [addressData, setaddressData] = useState<string[]>([])
  const [FormData, setFormData] = useState<string[]>([])
  const [showEditAddressCompo, setshowEditAddressCompo] = useState(false)
  const [showAddAddressCompo, setshowAddAddressCompo] = useState(false)
  const [refresh, setrefresh] = useState(false)

  const { data: customer } = useCustomer()
  const { openModal, setModalView } = useUI()

  useEffect(() => {
    if (!customer) {
      setModalView('LOGIN_VIEW')
      return openModal()
    }
  }, [customer])

  // listing of all admin or users inside address tab
  useEffect(() => {
    let cid = customer?.entityId

    if (customer && customer?.entityId) {
      fetch(
        'https://www.ystore.us/sleekshop/getAddresses.php?customer_id=' + cid
      )
        .then((response) => response.json())
        .then((rs1) => {
          setaddressData(rs1)
        })
    }
  }, [customer, showEditAddressCompo, showAddAddressCompo, refresh])

  const handleDeleteAddress = (address_id: any) => {
    fetch('https://www.ystore.us/sleekshop/deleteAddress.php', {
      // Adding method type
      method: 'POST',

      // Adding body or contents to send
      body: JSON.stringify({
        address_id,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setrefresh(!refresh)
        }
      })
  }

  return (
    <>
      <div className="MainContentInnerdiv mb-2">
        <ul className={`flex justify-center items-center ${style.ulParen}`}>
          {Array.isArray(addressData) && addressData.length > 0 ? (
            <>
              {addressData.map((item: any) => {
                return (
                  <li key={item.id} className={`${style.panelbodyCo} `}>
                    <div className="panel panel--address">
                      <div className={`${style.panelbody} panel-body`}>
                        <h5 className="address-title">
                          {item?.first_name} {item?.last_name}
                        </h5>
                        <ul
                          className="address-details address-details--postal"
                          style={{ height: '120px' }}
                        >
                          <li>{item?.company}</li>
                          <li>{item?.street_1}</li>
                          <li>{item?.street_2}</li>
                          <li>
                            {item?.city}, {item?.state} {item?.zip}
                          </li>
                          <li>{item?.country}</li>
                        </ul>
                        <dl className="address-details">
                          <dt className="address-label">Phone:</dt>
                          <dd className="address-description">{item?.phone}</dd>
                        </dl>
                        <div className="form-actions">
                          <a
                            className="button button--primary button--small"
                            href="#editAddressForm"
                            onClick={() => {
                              setFormData(item)
                              setshowEditAddressCompo(true)
                              setshowAddAddressCompo(false)
                            }}
                          >
                            Edit
                          </a>
                          <button
                            type="submit"
                            className="button secondary button--small"
                            onClick={() => handleDeleteAddress(item.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                )
              })}
            </>
          ) : (
            <div className="flex-1 flex flex-col justify-center items-center">
              <h1 className={`p-20`}>LOADING ...</h1>
            </div>
          )}

          <div className="MainContentInnerdiv mb-2">
            <li className="address">
              <a
                className="panel panel--address panel--newAddress"
                href="#addAddressForm"
                onClick={() => {
                  setshowAddAddressCompo(true)
                  setshowEditAddressCompo(false)
                }}
              >
                <div>
                  <span className="address-symbol">+</span>
                  <h5 className="address-title">New Address</h5>
                </div>
              </a>
            </li>
          </div>
        </ul>
        {/* <!-- ---------------------------- component View Orders ---------------------------- --> */}
        {showEditAddressCompo ? (
          <EditAddressCompo
            setshowEditAddressCompo={setshowEditAddressCompo}
            FormData={FormData}
          />
        ) : (
          showAddAddressCompo && (
            <AddAddressCompo setshowAddAddressCompo={setshowAddAddressCompo} />
          )
        )}
      </div>
    </>
  )
}
