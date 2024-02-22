import React from 'react'
import './SideMenu.css'

export default function SideMenu({items}) {
  return (
    <div className='SM' >
      <p>{items}</p>
    </div>
  )
}
