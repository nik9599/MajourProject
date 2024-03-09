import React from 'react'
import "./adminPage.css"
import SidenavBar from '../SideNavBar/SidenavBar'
import MiddleNavBar from '../MiddleNavBar/MiddleNavBar'
import MainPage from '../MainPage/MainPage'

export default function AdminPage() {
  return (
    <div className='admin-container' >
        <div className='side-nav-container' >
            <SidenavBar/>
        </div>
        <div className='middle-nav-container' >
            <MiddleNavBar/>
        </div>
        <div className='main-page-container' >
            <MainPage/>
        </div>
      
    </div>
  )
}
