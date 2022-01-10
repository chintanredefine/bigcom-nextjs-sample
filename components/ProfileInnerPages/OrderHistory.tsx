import { FC } from 'react'

import { Bag } from '@components/icons'
import useCustomer from '@framework/customer/use-customer'
import { useEffect, useState } from 'react'
import OrderHistoryDetails from '@components/ProfileInnerPages/OrderhistoryDetails'

interface Props {
  ShowOrderHistoryDetails?: any
  setShowOrderHistoryDetails?: any
}

const Reward: FC<Props> = ({
  ShowOrderHistoryDetails,
  setShowOrderHistoryDetails,
}) => {
  const { data: customer } = useCustomer()
  const [OrderHistoryData, setOrderHistoryData] = useState<string[]>([])
  const [DetailedData, setDetailedData] = useState<string[]>([])

  useEffect(() => {
    let cid = customer?.entityId
    if (customer && customer?.entityId) {
      fetch('https://www.ystore.us/sleekshop/getOrders.php?customer_id=' + cid)
        .then((response) => response.json())
        .then((rs1) => {
          setOrderHistoryData(rs1)
        })
    }
  }, [customer])

  return (
    <>
      {ShowOrderHistoryDetails ? (
        <OrderHistoryDetails data={DetailedData} />
      ) : (
        <>
          {Array.isArray(OrderHistoryData) && OrderHistoryData.length > 0 ? (
            <>
              {/* <!-- ---------------------------- component order card ---------------------------- --> */}
              <div className="MainContentInnerdiv mb-2 orderHistory d-flex justify-content-between">
                <div>
                  <p className="Heading">Order History</p>
                  <p className="subHeading d-flex align-items-center">
                    Review Your Order Here
                  </p>
                </div>
              </div>
              {/* <!-- ---------------------------- component order card ---------------------------- --> */}

              {/* <!-- ---------------------------- component View Orders ---------------------------- --> */}

              {OrderHistoryData.map((order: any) => {
                return (
                  <>
                    <div className="MainContentInnerdiv mb-2 orderHistory ViewOrderGparent">
                      <div className="d-flex justify-content-between">
                        <div>
                          <p className="subHeading">
                            <span className="Heading"> Oder Id : </span>
                            {order?.orderId}
                          </p>
                          <p className="subHeading">
                            <span className="Heading"> Order Data :</span>
                            {order?.dateCreated}
                          </p>
                        </div>
                        <div className="trackOrderParent d-flex justify-content-around align-items-center">
                          <p className="subHeading">
                            <span className="Heading">Grand Total :</span> $
                            {Number(order?.orderTotal).toFixed(2)}
                          </p>
                        </div>
                      </div>

                      <div className="OHIGPC">
                        <div className="d-flex OrderHistoryImagesContainer">
                          {order?.productImage.map((imgString: any) => (
                            <div className="productCardImgParent productCardImgParentOnly">
                              <img
                                className="ProductImg"
                                src={imgString}
                                alt=""
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      <div
                        className="
                    subHeading
                    trackOrderParent
                    d-flex
                    justify-content-around
                    align-items-center
                    mt-3
                  "
                      >
                        <button
                          className="View-Order-Button"
                          onClick={() => {
                            setShowOrderHistoryDetails(true)
                            setDetailedData(order)
                          }}
                        >
                          View Order
                        </button>
                      </div>
                    </div>
                  </>
                )
              })}
            </>
          ) : (
            <>
              <div className="MainContentInnerdiv mb-2">
                <div className="flex-1 p-24 flex flex-col justify-center items-center ">
                  <span className="border border-dashed border-secondary rounded-full flex items-center justify-center w-16 h-16 p-12 bg-primary text-primary">
                    <Bag className="absolute" />
                  </span>
                  <h2 className="pt-6 text-2xl font-bold tracking-wide text-center">
                    No Orders found
                  </h2>
                </div>
              </div>
            </>
          )}

          {/* <!-- ---------------------------- component View Orders ---------------------------- --> */}
        </>
      )}
    </>
  )
}

export default Reward
