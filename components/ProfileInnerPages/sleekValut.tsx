// import { useEffect } from 'react'
// import useCustomer from '@framework/customer/use-customer'
// import { useUI } from '@components/ui'

// declare global {
//   interface Window {
//     attachEvent(event: string, listener: EventListener): boolean
//     detachEvent(event: string, listener: EventListener): void
//   }
// }

export default function SleekVault() {
  // const { data } = useCustomer()
  // const { openModal, setModalView } = useUI()

  // let sa_uni: string[][] = []
  // let sa_emailid
  // let site_id = process.env.site_id || 7870040

  // const sa_async_load = () => {
  //   let sa = document.createElement('script')

  //   sa.type = 'text/javascript'
  //   sa.async = true
  //   sa.src = `//cdn.socialannex.com/partner/${site_id}/universal.js`
  //   var sax = document.getElementsByTagName('script')[0]
  //   sax?.parentNode?.insertBefore(sa, sax)
  //   return sa
  // }

  // useEffect(() => {
  //   if (!data) {
  //     setModalView('LOGIN_VIEW')
  //     return openModal()
  //   }

  //   sa_emailid = data?.email
  //   sa_uni.push(['sa_pg', '5'])

  //   let ScriptLogger = sa_async_load()

  //   console.log('ScriptLogger 41 abc ==>> ', ScriptLogger)

  //   if (window.attachEvent) {
  //     window.attachEvent('onload', sa_async_load)
  //   } else {
  //     window.addEventListener('load', sa_async_load, false)
  //   }
  // }, [data])

  return (
    <>
      <div className="MainContentInnerdiv mb-2 orderHistory d-flex justify-content-between">
        <div id="socialannex_dashboard"></div>
      </div>
    </>
  )
}
