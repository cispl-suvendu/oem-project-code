"use client"
import React from 'react'
import { useAuth } from '../../context/authcontext'

export default function Page() {
    const {logout} = useAuth()
  return (
    <div>
      <h2>user dashboard</h2>
      <button onClick={()=>logout()}>Logout</button>
    </div>
  )
}
