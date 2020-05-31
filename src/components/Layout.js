import React from 'react'
import Header from './Header'

export default function Layout ({children}) {
  return (
    <div>
      <Header/>
      <div className="flex justify-center" style={{padding: "2%" }}>
      {children}
      </div>
    </div>
  )
}