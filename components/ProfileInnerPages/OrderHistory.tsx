import { FC } from 'react'

import { Bag } from '@components/icons'
import useCustomer from '@framework/customer/use-customer'
import { useEffect, useState } from 'react'
import OrderHistoryDetails from '@components/ProfileInnerPages/OrderhistoryDetails'

import BackIconSvg from '@assets/sleekshop-new-svg/BackIcon.svg'

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
      {Array.isArray(OrderHistoryData) && OrderHistoryData.length > 0 && (
        <div className="d-flex align-items-center orderHistoryHeading">
          {ShowOrderHistoryDetails && (
            <div
              className="backBtnOH"
              onClick={() => setShowOrderHistoryDetails(false)}
            >
              <BackIconSvg />
            </div>
          )}

          <div className="orderHistoryHeadingUnd">
            <p className="Heading">Order History</p>
            <p className="subHeading d-flex align-items-center">
              Review Your Order Here
            </p>
          </div>
        </div>
      )}
      {ShowOrderHistoryDetails ? (
        <OrderHistoryDetails data={DetailedData} />
      ) : (
        <>
          {Array.isArray(OrderHistoryData) && OrderHistoryData.length > 0 ? (
            <>
              {/* <!-- ---------------------------- component View Orders ---------------------------- --> */}

              {OrderHistoryData.map((order: any) => {
                return (
                  <>
                    <div className="MainContentInnerdivOrderHis mb-2 orderHistory ViewOrderGparent">
                      <div className="ViewOrderGparentChld">
                        <div>
                          <p className="subHeading subHeadingOrdrHis">
                            <span className="Heading HeadingOrdrHis">
                              Oder Id :
                            </span>
                            <span>{order?.orderId}</span>
                          </p>
                          <p className="subHeading subHeadingOrdrHis">
                            <span className="Heading HeadingOrdrHis">
                              Order Data :
                            </span>
                            <span>{order?.dateCreated}</span>
                          </p>
                        </div>
                        <div className="trackOrderParent trackOrderParentDeskV">
                          <p className="subHeading subHeadingOrdrHis">
                            <span className="Heading HeadingOrdrHis">
                              Grand Total :
                            </span>
                            <span>
                              $ {Number(order?.orderTotal).toFixed(2)}
                            </span>
                          </p>
                        </div>
                      </div>

                      <div className="OrderHistoryImagesContainer OrderHistoryImagesContainerdesk">
                        {order?.productImage.map((imgString: any) => (
                          <div className=" productCardImgParentOnly">
                            <img
                              className="ProductImageOnlyOrderHistory"
                              src={imgString}
                              alt=""
                            />
                          </div>
                        ))}
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
                <div className="flex-1 PaddingForNoItemForDeskTopView flex flex-col justify-center items-center ">
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
