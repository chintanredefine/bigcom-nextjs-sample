import { useEffect, useState } from 'react'
import useCustomer from '@framework/customer/use-customer'
import { Button } from '@components/ui'
import { useUI } from '@components/ui'

import style from '@assets/css/profileAccount.module.css'
import editAddressStyle from '@assets/css/edit_shipping_address.module.css'

export default function editProfile() {
  const { data } = useCustomer()
  const { openModal, setModalView } = useUI()

  let [formData, setformData] = useState({
    first_name: '',
    last_name: '',
    customerId: '',
    email: '',
    phone: '',
    company: '',
    password: '',
    confirmPassword: '',
  })

  let [resMessage, setresMessage] = useState({
    type: '',
    msg: '',
  })

  const [Toggle, setToggle] = useState(false)

  useEffect(() => {
    if (!data) {
      setModalView('LOGIN_VIEW')
      return openModal()
    }

    setformData({
      ...formData,
      first_name: data?.firstName,
      last_name: data?.lastName,
      customerId: data?.entityId,
      email: data?.email,
      phone: data?.phone,
      company: data?.company,
    })
  }, [data])

  const handleUpdateProfile = async (
    event: React.SyntheticEvent<EventTarget>
  ) => {
    event.preventDefault() // don't redirect the page

    const {
      first_name,
      last_name,
      customerId,
      email,
      phone,
      company,
      password,
      confirmPassword,
    } = formData

    function validate() {
      let letters = /[a-zA-Z]/
      let number = /\d+/g

      if (first_name && last_name && customerId && email && phone && company) {
        if (Toggle) {
          if (password && confirmPassword && password === confirmPassword) {
            if (
              password.length < 7 ||
              !password.match(letters) ||
              !password.match(number)
            ) {
              setresMessage({
                type: 'warn',
                msg: 'Passwords must be "at least 7 characters" and contain both "alphabetic" and "numeric" characters.',
              })
              setTimeout(() => {
                setresMessage({
                  type: '',
                  msg: '',
                })
              }, 4000)
            } else {
              return true
            }
            return false
          } else {
            setresMessage({
              type: 'warn',
              msg: 'Password and confirm password should be equal and filled',
            })
            setTimeout(() => {
              setresMessage({
                type: '',
                msg: '',
              })
            }, 4000)
            return false
          }
        }
        return true
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
        return false
      }
    }

    if (validate()) {
      fetch('https://www.ystore.us/sleekshop/updatecustomer.php', {
        mode: 'cors',
        body: JSON.stringify({ ...formData }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })
        .then((res) => {
          console.log('res', res)
          return res.json()
        })
        .then((resObj) => {
          console.log('resObj', resObj)

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
            }, 4000)
          } else {
            setresMessage({
              type: 'danger',
              msg:
                resObj.message ||
                'Cant Update Now , Please Talk To Administrator',
            })

            setTimeout(() => {
              setresMessage({
                type: '',
                msg: '',
              })
            }, 4000)
          }
        })
    }
  }

  return (
    <>
      <div className="MainContentInnerdiv">
        <div
          className={`${editAddressStyle.formComtainer} `}
          style={{ width: '100%' }}
        >
          <div
            className="flex-1 flex flex-col justify-center items-center W-90"
            style={{ width: '85%' }}
          >
            <h2 className="page-heading mt-10" style={{ width: 'auto' }}>
              Edit Profile
            </h2>
            <div className="account-body " style={{ width: '100%' }}></div>
            <form
              onSubmit={handleUpdateProfile}
              className={`${editAddressStyle.form}`}
            >
              {/* First Name */}
              <fieldset className="form-fieldset">
                <div className={`form-row form-row--half pb-30 ${style.mb_30}`}>
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    className="Input_root__2vmVG"
                    placeholder="First Name"
                    onChange={(e) =>
                      setformData({
                        ...formData,
                        first_name: e.target.value,
                      })
                    }
                    value={formData.first_name}
                  />
                </div>

                {/* Last Name */}
                <div className={`form-row form-row--half pb-30 ${style.mb_30}`}>
                  <label className="form-label">Last Name</label>

                  <input
                    type="text"
                    placeholder="Last Name"
                    onChange={(e) =>
                      setformData({
                        ...formData,
                        last_name: e.target.value,
                      })
                    }
                    value={formData.last_name}
                    className="Input_root__2vmVG"
                  />
                </div>

                {/* company */}
                <div className={`form-row form-row--half pb-30 ${style.mb_30}`}>
                  <label className="form-label">Company</label>

                  <input
                    type="text"
                    placeholder="Company"
                    onChange={(e) =>
                      setformData({
                        ...formData,
                        company: e.target.value,
                      })
                    }
                    value={formData.company}
                    className="Input_root__2vmVG"
                  />
                </div>

                {/* phone */}
                <div className={`form-row form-row--half pb-30 ${style.mb_30}`}>
                  <label className="form-label">Phone Number</label>

                  <input
                    type="text"
                    placeholder="Phone Number"
                    onChange={(e) =>
                      setformData({
                        ...formData,
                        phone: e.target.value,
                      })
                    }
                    value={formData.phone}
                    className="Input_root__2vmVG"
                  />
                </div>

                {/* email */}
                <div className={`form-row form-row--half pb-30 ${style.mb_30}`}>
                  <label className="form-label">Email</label>

                  <input
                    type="text"
                    placeholder="Email"
                    onChange={(e) =>
                      setformData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
                    value={formData.email}
                    className="Input_root__2vmVG"
                  />
                </div>

                {/* Change Password toggler  */}
                <div className={`form-row form-row--half pb-30 ${style.mb_30}`}>
                  <label className="form-label">Change Password</label>

                  <label className={`${style.switch}`}>
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        setToggle(e.target.checked)
                      }}
                    />
                    <span className={`${style.slider} ${style.round} `}></span>
                  </label>
                </div>
                {Toggle && (
                  <>
                    {/* New Password */}
                    <div
                      className={`form-row form-row--half pb-30 ${style.mb_30}`}
                    >
                      <label className="form-label">New Password</label>

                      <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) =>
                          setformData({
                            ...formData,
                            password: e.target.value,
                          })
                        }
                        value={formData.password}
                        className="Input_root__2vmVG"
                      />
                    </div>

                    {/* Confirm New Password */}
                    <div
                      className={`form-row form-row--half pb-30 ${style.mb_30}`}
                    >
                      <label className="form-label">Confirm New Password</label>

                      <input
                        type="password"
                        placeholder="Confirm Password"
                        onChange={(e) =>
                          setformData({
                            ...formData,
                            confirmPassword: e.target.value,
                          })
                        }
                        value={formData.confirmPassword}
                        className="Input_root__2vmVG"
                      />
                    </div>
                  </>
                )}

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

                {/* Update Button */}
                <div className="pt-2 w-full flex flex-col mb-6">
                  <Button
                    className="Button_root__24MxS Button_slim__2caxo"
                    style={{
                      background: '#e99da1',
                      border: 'none',
                      textTransform: 'capitalize',
                      color: 'white',
                      padding: '10px 20px ',
                      borderRadius: '4px',
                    }}
                    variant="slim"
                    type="submit"
                  >
                    Update Profile
                  </Button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
