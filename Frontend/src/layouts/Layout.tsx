import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Outlet } from 'react-router'

function Layout() {
  return (
    <>
      <div className="main-content">
        <Header />
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

export default Layout
