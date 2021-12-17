import React, { useEffect } from 'react'
import { useUI } from '@components/ui'

const login = ({ ShowPage }: any) => {
  const { openModal, setModalView } = useUI()

  useEffect(() => {
    setModalView('LOGIN_VIEW')
    openModal()
  }, [ShowPage])

  return (
    <div
      className="MainContentInnerdiv mb-2 orderHistory"
      style={{
        display: 'flex',
        height: '40vh',
        width: '100%',
        flexWrap: 'wrap',
        alignContent: 'center',
        justifyContent: 'space-evenly',
        fontSize: '20px',
        fontWeight: 600,
      }}
    >
      Login First ...
    </div>
  )
}

export default login
