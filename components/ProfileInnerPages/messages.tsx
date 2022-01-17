import useCustomer from '@framework/customer/use-customer'
import { useEffect, useState } from 'react'

import style from '@assets/css/edit_shipping_address.module.css'

export default function Orders() {
  const [adata, setVariants] = useState<string[]>([])
  const { data: customer } = useCustomer()

  let [formData, setformData] = useState({
    message_order_id: '',
    message_subject: '',
    message_content: '',
  })

  let [resMessage, setresMessage] = useState({
    type: '',
    msg: '',
  })

  useEffect(() => {
    let cid = customer?.entityId
    if (customer && customer?.entityId) {
      fetch('https://www.ystore.us/sleekshop/getOrders.php?customer_id=' + cid)
        .then((response) => response.json())
        .then((rs1) => {
          setVariants(rs1)
        })
    }

    setformData({
      ...formData,
      message_order_id: 'Select Your Order',
    })
  }, [customer])

  const handleSendMessage = (newMessage: any) => {
    const { message_order_id, message_subject, message_content } = formData
    if (
      message_order_id !== 'Select Your Order' &&
      message_subject &&
      message_content
    ) {
      fetch('https://www.ystore.us/sleekshop/sendMessage.php', {
        // Adding method type
        method: 'POST',

        // Adding body or contents to send
        body: JSON.stringify({
          newMessage,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          return res.json()
        })
        .then((resObj) => {
          if (resObj.success) {
            setresMessage({
              type: 'success',
              msg: resObj.message,
            })
            setTimeout(() => {
              setresMessage({
                type: '',
                msg: '',
              })

              setformData({
                message_order_id: '',
                message_subject: '',
                message_content: '',
              })
            }, 4000)
          } else {
            setresMessage({
              type: 'danger',
              msg: resObj.message,
            })
            setTimeout(() => {
              setresMessage({
                type: '',
                msg: '',
              })
            }, 4000)
          }
        })
    } else {
      setresMessage({
        type: 'warn',
        msg: 'All Fields Are Required',
      })
      setTimeout(() => {
        setresMessage({
          type: '',
          msg: '',
        })
      }, 4000)
    }
  }

  const handleClearForm = () => {
    setformData({
      message_order_id: 'Select Your Order',
      message_subject: '',
      message_content: '',
    })
  }

  return (
    <>
      <div className="MainContentInnerdiv">
        <div className={`${style.formComtainer} `} style={{ width: '100%' }}>
          <div
            className="flex-1 flex flex-col justify-center items-center W-90"
            style={{ width: '85%' }}
          >
            <h2 className="page-heading mt-10" style={{ width: 'auto' }}>
              Send a Message
            </h2>

            <div className="account-body " style={{ width: '100%' }}>
              <form className={`${style.form}`}>
                <div className="form-field form-field--select">
                  <label className="form-label">
                    Order:
                    <small>Required</small>
                  </label>
                  <select
                    className="form-select"
                    name="message_order_id"
                    id="message_order_id"
                    value={formData.message_order_id}
                    onChange={(e) => {
                      setformData({
                        ...formData,
                        message_order_id: e.target.value,
                      })
                    }}
                  >
                    {Array.isArray(adata) && adata.length > 0 && (
                      <>
                        <option selected disabled value="Select Your Order">
                          Select Your Order
                        </option>
                        {adata.map((order: any) => {
                          return (
                            <option value={order.orderId}>
                              Order #{order.orderId} - Placed on{' '}
                              {order.dateCreated}
                              for $ {Number(order.orderTotal).toFixed(2)}
                            </option>
                          )
                        })}
                      </>
                    )}
                  </select>
                </div>

                <div
                  className="form-field form-field--input form-field--inputText"
                  id="FormField_4"
                >
                  <label className="form-label">
                    Subject
                    <small>Required</small>
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    name="message_subject"
                    id="message_subject"
                    value={formData.message_subject}
                    onChange={(e) => {
                      setformData({
                        ...formData,
                        message_subject: e.target.value,
                      })
                    }}
                  />
                </div>

                <div
                  className="form-field form-field--textarea"
                  id="FormField_4_input"
                >
                  <label className="form-label">
                    Message
                    <small>Required</small>
                  </label>

                  <textarea
                    className="form-input"
                    name="message_content"
                    id="message_content"
                    value={formData.message_content}
                    rows={7}
                    onChange={(e) => {
                      setformData({
                        ...formData,
                        message_content: e.target.value,
                      })
                    }}
                  ></textarea>
                </div>
                {/* response message */}
                {resMessage.msg && (
                  <div
                    className={
                      resMessage.type === 'danger'
                        ? 'bg-danger'
                        : resMessage.type === 'warn'
                        ? 'bg-warn'
                        : 'bg-success'
                    }
                  >
                    * {resMessage.msg}
                  </div>
                )}

                <div className="form-field form-field--textarea d-flex">
                  <button
                    type="submit"
                    className="btn "
                    style={{
                      background: '#e99da1',
                      border: 'none',
                      color: 'white',
                      textTransform: 'capitalize',
                      padding: '10px 20px ',
                      borderRadius: '4px',
                    }}
                    onClick={() => handleSendMessage(formData)}
                  >
                    Send Message
                  </button>

                  <button
                    className="btn "
                    style={{
                      background: 'white',
                      border: '1px solid #B0B0B0	',
                      textTransform: 'capitalize',
                      color: 'black',
                      padding: '10px 20px',
                      borderRadius: '4px',
                      marginLeft: '20px',
                    }}
                    onClick={() => handleClearForm()}
                  >
                    Clear
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
