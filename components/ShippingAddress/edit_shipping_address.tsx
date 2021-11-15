import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import style from '@assets/css/edit_shipping_address.module.css'

const EditAddressCompo = (props: {
  setshowEditAddressCompo: any
  FormData: any
  // setfetchAgain: any
  // fetchAgain: any
}) => {
  const router = useRouter()

  const [countries, setcountries] = useState([])
  const [States, setStates] = useState([])
  const [FetchCountries, setFetchCountries] = useState(false)

  let [formData, setformData] = useState({
    firstName: props.FormData.first_name,
    lastName: props.FormData.last_name,
    address1: props.FormData.street_1,
    address2: props.FormData.street_2,
    company: props.FormData.company,
    city: props.FormData.city,
    phoneNumber: props.FormData.phone,
    zipCode: props.FormData.zip,
    country: props.FormData.country,
    state: props.FormData.state,
    customerId: props.FormData.customer_id,
    address_id: props.FormData.id,
    country_code: props.FormData.country_iso2,
  })

  useEffect(() => {
    if (FetchCountries) {
      fetch('https://www.ystore.us/sleekshop/getCountries.php')
        .then((res) => res.json())
        .then((AllCountry) => {
          setcountries(AllCountry)
        })
    }
  }, [FetchCountries])

  const fetchAllStates = (countryId: any) => {
    // console.log('started fetching all states data ... |')
    fetch('https://www.ystore.us/sleekshop/getStates.php', {
      method: 'Post',
      body: JSON.stringify({
        country_id: countryId,
      }),
    })
      .then((res: any) => res.json())
      .then((allState: any) => {
        setStates(allState)
      })
  }

  const handleEditCoustomerDetails = () => {
    const data = { ...formData }
    if (true) {
      fetch(
        'https://www.ystore.us/sleekshop/update-customer-address.php',
        // 'http://10.0.10.59/webProjects/sleekshop/api/update-customer-address.php',
        {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
        .then((res) => {
          // console.log("res ",res,  res?.body);

          return res.json()
        })
        .then((data) => console.log('customer address updated ', data))
    }
  }

  return (
    <>
      <div className={`${style.formComtainer}`} id="FormField_11">
        {/* {console.log('formData inside body', formData)} */}
        <h2 className="page-heading mt-10">Edit New Address</h2>

        <form className={`${style.form}`} id="editAddressForm">
          <fieldset className="form-fieldset">
            <div className="form-row form-row--half">
              <div
                className="form-field form-field--select"
                data-validation='{"type":"singleselect","label":"Country","required":true,"prefix":"Choose a Country"}'
                data-type="Country"
              >
                <label className="form-label">
                  Country
                  <small>Required</small>
                </label>
                <select
                  className={`${style.inputFieldAd} form-select `}
                  id="FormField_11_select"
                  data-label="Country"
                  value={formData.country}
                  onChange={(e) => {
                    const arr = e.target.value.split(',')
                    fetchAllStates(arr[1])
                    setformData({
                      ...formData,
                      country: arr[0],
                      country_code: arr[2],
                    })
                  }}
                  onClick={() => {
                    if (!FetchCountries) {
                      setformData({
                        ...formData,
                        state: '',
                        country: '',
                      })
                    }
                    setFetchCountries(true)
                  }}
                >
                  {formData.country ? (
                    <option disabled value={formData.country}>
                      {formData.country}
                    </option>
                  ) : (
                    <span>Choose a Country</span>
                  )}

                  {countries.map((country) => {
                    // console.log('countries => ', countries, country)
                    let countryName = country['country'] || ''
                    let countryId = country['id'] || ''
                    let countryCode = country['country_iso2'] || ''

                    return (
                      <>
                        <option value={[countryName, countryId, countryCode]}>
                          {countryName}
                        </option>
                      </>
                    )
                  })}
                </select>
                {/* <span style={{ display: 'none' }}></span> */}
              </div>

              <div
                className="form-field form-field--input form-field--inputText"
                id="FormField_4"
                data-validation='{"type":"singleline","label":"First Name","required":true,"maxlength":0}'
                data-type="FirstName"
              >
                <label className="form-label">
                  First Name
                  <small>Required</small>
                </label>
                <input
                  className={`${style.inputFieldAd} form-input`}
                  type="text"
                  id="FormField_4_input"
                  data-label="First Name"
                  name="FormField[2][4]"
                  value={formData.firstName}
                  aria-required="true"
                  data-field-type="FirstName"
                  onChange={(e) => {
                    setformData({ ...formData, firstName: e.target.value })
                  }}
                />
                <span style={{ display: 'none' }}></span>
              </div>

              <div
                className="form-field form-field--input form-field--inputText"
                id="FormField_5"
                data-validation='{"type":"singleline","label":"Last Name","required":true,"maxlength":0}'
                data-type="LastName"
              >
                <label className="form-label">
                  Last Name
                  <small>Required</small>
                </label>
                <input
                  className={`${style.inputFieldAd} form-input`}
                  type="text"
                  id="FormField_5_input"
                  data-label="Last Name"
                  name="FormField[2][5]"
                  value={formData.lastName}
                  aria-required="true"
                  data-field-type="LastName"
                  onChange={(e) => {
                    setformData({ ...formData, lastName: e.target.value })
                  }}
                />
                <span style={{ display: 'none' }}></span>
              </div>

              <div
                className="form-field form-field--input form-field--inputText"
                id="FormField_8"
                data-validation='{"type":"singleline","label":"Address Line 1","required":true,"maxlength":0}'
                data-type="AddressLine1"
              >
                <label className="form-label">
                  Address Line 1<small>Required</small>
                </label>
                <input
                  className={`${style.inputFieldAd} form-input`}
                  type="text"
                  id="FormField_8_input"
                  data-label="Address Line 1"
                  name="FormField[2][8]"
                  value={formData.address1}
                  aria-required="true"
                  data-field-type="AddressLine1"
                  onChange={(e) => {
                    setformData({ ...formData, address1: e.target.value })
                  }}
                />
                <span style={{ display: 'none' }}></span>
              </div>

              <div
                className="form-field form-field--input form-field--inputText"
                id="FormField_9"
                data-validation='{"type":"singleline","label":"Address Line 2","required":false,"maxlength":0}'
                data-type="AddressLine2"
              >
                <label className="form-label">Address Line 2</label>
                <input
                  className={`${style.inputFieldAd} form-input`}
                  type="text"
                  id="FormField_9_input"
                  data-label="Address Line 2"
                  name="FormField[2][9]"
                  value={formData.address2}
                  aria-required="false"
                  data-field-type="AddressLine2"
                  onChange={(e) => {
                    setformData({ ...formData, address2: e.target.value })
                  }}
                />
              </div>

              <div
                className="form-field form-field--input form-field--inputText"
                id="FormField_6"
                data-validation='{"type":"singleline","label":"Company Name","required":false,"maxlength":0}'
                data-type="CompanyName"
              >
                <label className="form-label">Company Name</label>
                <input
                  className={`${style.inputFieldAd} form-input`}
                  type="text"
                  id="FormField_6_input"
                  data-label="Company Name"
                  name="FormField[2][6]"
                  aria-required="false"
                  value={formData.company}
                  data-field-type="CompanyName"
                  onChange={(e) => {
                    setformData({ ...formData, company: e.target.value })
                  }}
                />
              </div>

              <div
                className="form-field form-field--input form-field--inputText"
                id="FormField_10"
                data-validation='{"type":"singleline","label":"Suburb\/City","required":true,"maxlength":0}'
                data-type="City"
              >
                <label className="form-label">
                  Suburb/City
                  <small>Required</small>
                </label>
                <input
                  className={`${style.inputFieldAd} form-input`}
                  type="text"
                  id="FormField_10_input"
                  data-label="Suburb/City"
                  name="FormField[2][10]"
                  value={formData.city}
                  aria-required="true"
                  data-field-type="City"
                  onChange={(e) => {
                    setformData({ ...formData, city: e.target.value })
                  }}
                />
                <span style={{ display: 'none' }}></span>
              </div>

              <div
                className="form-field form-field--select"
                id="FormField_12"
                data-validation='{"type":"selectortext","label":"State\/Province","required":true}'
                data-type="State"
              >
                <label className="form-label">
                  State/Province
                  <small>Required</small>
                </label>
                <select
                  name="FormField[2][12]"
                  className={`${style.inputFieldAd} form-select `}
                  aria-required="true"
                  id="FormField_12_select"
                  data-label="State/Province"
                  data-field-type="State"
                  value={formData.state}
                  onChange={(e) => {
                    setformData({
                      ...formData,
                      state: e.target.value,
                    })
                  }}
                >
                  {formData.state ? (
                    <option disabled value={formData.state}>
                      {formData.state}
                    </option>
                  ) : (
                    <span>Choose a State</span>
                  )}

                  {States &&
                    States.length > 0 &&
                    States.map((state) => {
                      // console.log('countries => ', countries, state)
                      let stateName = state['state'] || ''

                      return (
                        <>
                          <option value={stateName}>{stateName}</option>
                        </>
                      )
                    })}
                </select>
                <span style={{ display: 'none' }}></span>
              </div>

              <div
                className="form-field form-field--input form-field--inputText"
                id="FormField_7"
                data-validation='{"type":"singleline","label":"Phone Number","required":true,"maxlength":0}'
                data-type="Phone"
              >
                <label className="form-label">
                  Phone Number
                  <small>Required</small>
                </label>
                <input
                  className={`${style.inputFieldAd} form-input`}
                  type="text"
                  id="FormField_7_input"
                  data-label="Phone Number"
                  name="FormField[2][7]"
                  value={formData.phoneNumber}
                  aria-required="true"
                  data-field-type="Phone"
                  onChange={(e) => {
                    setformData({ ...formData, phoneNumber: e.target.value })
                  }}
                />
                <span style={{ display: 'none' }}></span>
              </div>

              <div
                className="form-field form-field--input form-field--inputText"
                id="FormField_13"
                data-validation='{"type":"singleline","label":"Zip\/Postcode","required":true,"maxlength":0}'
                data-type="Zip"
              >
                <label className="form-label">
                  Zip/Postcode
                  <small>Required</small>
                </label>
                <input
                  className={`${style.inputFieldAd} form-input`}
                  type="text"
                  id="FormField_13_input"
                  data-label="Zip/Postcode"
                  name="FormField[2][13]"
                  value={formData.zipCode}
                  aria-required="true"
                  data-field-type="Zip"
                  onChange={(e) => {
                    setformData({ ...formData, zipCode: e.target.value })
                  }}
                />
                <span style={{ display: 'none' }}></span>
              </div>
            </div>
          </fieldset>

          <fieldset className="form-fieldset">
            <div className="form-row form-row--half">
              <div
                className="form-field form-field--select"
                id="FormField_11"
                data-validation='{"type":"singleselect","label":"Country","required":true,"prefix":"Choose a Country"}'
                data-type="Country"
              >
                <div className={`form-fieldset `}>
                  <button
                    className={`button button--primary ${style.submitBtn}`}
                    type="button"
                    onClick={() => {
                      handleEditCoustomerDetails()
                      // props.setfetchAgain(!props.fetchAgain)
                      setTimeout(() => {
                        props.setshowEditAddressCompo(false)
                      }, 2000)
                    }}
                  >
                    Save Address
                  </button>
                  <a
                    href="#"
                    onClick={() => props.setshowEditAddressCompo(false)}
                    className="button"
                  >
                    Cancel
                  </a>
                </div>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    </>
  )
}

export default EditAddressCompo
