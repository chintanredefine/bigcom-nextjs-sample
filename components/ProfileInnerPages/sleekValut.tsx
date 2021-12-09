import { useEffect } from 'react'
import Script from 'next/script'

declare global {
  interface Window {
    attachEvent(event: string, listener: EventListener): boolean
    detachEvent(event: string, listener: EventListener): void
  }
}

export default function SleekVault() {
  let sa_uni: string[][] = []

  const sa_async_load = () => {
    console.log('started creating script ...')

    let sa = document.createElement('script')

    sa.type = 'text/javascript'
    sa.async = true
    sa.src = '//cdn.socialannex.com/partner/7870040/universal.js'
    var sax = document.getElementsByTagName('script')[0]
    sax?.parentNode?.insertBefore(sa, sax)
    console.log('sax', sax)
    return sa
  }

  useEffect(() => {
    var sa_emailid = 'chandan@redefinesolutions.com' //Pass logged in user’s email address var
    sa_uni.push(['sa_pg', '5'])
    console.log('sa_emailid', sa_emailid, 'sa_uni', sa_uni)

    let ScriptLogger = sa_async_load()
    console.log('ScriptLogger', ScriptLogger)
  }, [])

  return (
    <>
      <div className="MainContentInnerdiv mb-2 orderHistory d-flex justify-content-between">
        <div id="socialannex_dashboard"></div>
      </div>
    </>
  )
}
